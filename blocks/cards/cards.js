import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  /* change to ul, li */
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    while (row.firstElementChild) li.append(row.firstElementChild);
    [...li.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector('picture')) div.className = 'cards-card-image';
      else div.className = 'cards-card-body';
    });
    ul.append(li);
  });
  ul.querySelectorAll('picture > img').forEach((img) => {
    const pictureElement = img.closest('picture');
    const optimizedPicture = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
  
    // console.log("Arguments for createOptimizedPicture:", img.src, img.alt, false, [{ width: '750' }]);
  
    pictureElement.replaceWith(optimizedPicture);
  });
  block.textContent = '';
  block.append(ul);
}
