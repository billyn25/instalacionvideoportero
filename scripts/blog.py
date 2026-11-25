"""Actualiza los enlaces del blog conservando la última selección si falla un medio."""
import json
import re
import sys
from datetime import timezone
from datetime import datetime
from email.utils import parsedate_to_datetime
from pathlib import Path
from urllib.parse import urlsplit
from urllib.request import Request, urlopen
import xml.etree.ElementTree as ET

sources = {
    'Videoporteros.info': 'https://videoporteros.info/feed/',
    'CG Instalaciones': 'https://cginstalaciones.com/feed/',
    'Tegui Distel': 'https://tegui-distel.com/blogs/noticias.atom',
}
path = Path('data/blog-lecturas.json')
saved = json.loads(path.read_text()) if path.exists() else {}
success = 0
for name, feed in sources.items():
    try:
        with urlopen(Request(feed, headers={'User-Agent': 'VideoporteroConecta/1.0'}), timeout=20) as response:
            root = ET.fromstring(response.read(4_000_000))
        for elem in root.iter():
            elem.tag = elem.tag.split('}')[-1]
        items = {}
        for entry in root.findall('.//item') + root.findall('entry'):
            title = ' '.join((entry.findtext('title') or '').split())
            if not re.search(r'video\s?portero|portero|telefonillo|interfono|fermax|tegui|bticino|golmar|abrepuertas', title, re.I):
                continue
            url = next(((el.get('href') or el.text or '').strip() for el in entry.findall('link') if el.get('rel','alternate') == 'alternate'), '')
            target = urlsplit(url)
            if target.scheme != 'https' or target.hostname.removeprefix('www.') != urlsplit(feed).hostname.removeprefix('www.'):
                continue
            raw = entry.findtext('published') or entry.findtext('pubDate') or entry.findtext('updated')
            if not raw:
                continue
            try:
                date = datetime.fromisoformat(raw.replace('Z','+00:00'))
            except ValueError:
                date = parsedate_to_datetime(raw)
            items[url] = {'title': title, 'url': url, 'date': date.astimezone(timezone.utc).date().isoformat()}
        if items:
            archive = {row['url']: row for row in saved.get(name, [])}
            archive.update(items)
            saved[name] = sorted(archive.values(), key=lambda row: (row['date'],row['url']), reverse=True)[:30]
            success += 1
        print(name, len(items))
    except Exception as error:
        print(name, error, file=sys.stderr)
if not success:
    sys.exit('Ninguna fuente ha entregado artículos válidos')
path.write_text(json.dumps(saved, ensure_ascii=False, indent=2)+'\n')
