'use strict';

document.addEventListener('click', click => {
  if (click.target.classList.contains('has-tooltip')) {
    click.preventDefault();

    const tooltip = document.createElement('div');
    tooltip.classList.add('tooltip');
    tooltip.innerText = click.target.title;
    tooltip.style = 'display: block; position: absolute;';

    if (document.querySelector('div.tooltip')) {
      document.querySelector('div.tooltip').remove();
    }

    click.target.insertAdjacentElement('afterEnd', tooltip);

    const linkPosition = click.target.getBoundingClientRect();
    const tooltipPosition = tooltip.getBoundingClientRect();
    switch (click.target.dataset.position){
      case 'top':
        tooltip.style.top = linkPosition.top - tooltipPosition.height + pageYOffset + 'px';
        tooltip.style.left = linkPosition.left + 'px';
        break;
      case 'left':
        tooltip.style.top = linkPosition.top + pageYOffset - (tooltipPosition.height - linkPosition.height) / 2 + 'px';
        tooltip.style.left = linkPosition.left - tooltipPosition.width + 'px';
        break;
      case 'right':
        tooltip.style.top = linkPosition.top + pageYOffset - (tooltipPosition.height - linkPosition.height) / 2 + 'px';
        tooltip.style.left = linkPosition.left + linkPosition.width + 'px';
        break;
      default:
        tooltip.style.left = linkPosition.left + 'px';
    }
  }
});