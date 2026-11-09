const directory = document.querySelector('[data-directory]');
if (directory) {
  const normalize = value => value.toLowerCase().normalize('NFD').replace(/\p{Mark}/gu, '');
  const input = directory.querySelector('input');
  const count = directory.querySelector('[data-count]');
  const groups = [...directory.querySelectorAll('[data-group]')].map(section => [
    section, [...section.querySelectorAll('[data-town]')].map(item => [item,normalize(item.textContent)]),
  ]);
  input.addEventListener('input', () => {
    const query = normalize(input.value.trim());
    let total = 0;
    for (const [section, items] of groups) {
      let matches = 0;
      for (const [item, name] of items) {
        item.hidden = !name.includes(query);
        if (!item.hidden) matches++;
      }
      section.hidden = matches === 0;
      total += matches;
    }
    count.textContent = query ? total + (total === 1 ? ' municipio encontrado' : ' municipios encontrados') : '';
  });
}
