(() => {
  const panels = [...document.querySelectorAll('details[data-mobile-panel]')];
  const closeAll = () => panels.forEach(panel => { panel.open = false; });

  for (const panel of panels) {
    panel.addEventListener('toggle', () => {
      if (panel.open) panels.forEach(other => { if (other !== panel) other.open = false; });
    });
    panel.addEventListener('click', event => {
      if (event.target.closest('a')) panel.open = false;
    });
  }

  document.addEventListener('click', event => {
    panels.forEach(panel => {
      if (panel.open && !panel.contains(event.target)) panel.open = false;
    });
  });
  document.addEventListener('keydown', event => {
    if (event.key !== 'Escape') return;
    const openPanel = panels.find(panel => panel.open);
    if (!openPanel) return;
    closeAll();
    openPanel.querySelector('summary').focus();
  });
  window.matchMedia('(max-width: 650px)').addEventListener('change', closeAll);
})();
