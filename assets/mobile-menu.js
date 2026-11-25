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

const contactSheet = document.getElementById('contact-sheet');
const sheetTrigger = document.querySelector('.sheet-trigger');
sheetTrigger.addEventListener('click', () => {
  document.querySelectorAll('details[data-mobile-panel][open]').forEach(panel => { panel.open = false; });
  contactSheet.showModal();
});
contactSheet.addEventListener('click', event => {
  if (event.target === contactSheet && event.clientY < contactSheet.getBoundingClientRect().top) contactSheet.close();
});
window.matchMedia('(max-width: 650px)').addEventListener('change', () => contactSheet.close());
