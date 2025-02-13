export default function decorate(block) {
  
  const extractedData = extractContentFromDOM(block);
  console.log(extractedData)
  renderExtractedDataToDom(block, extractedData);
}

function extractContentFromDOM(block) {
  const accordionItems = block.querySelectorAll('.accordion > div');

  return Array.from(accordionItems).map(item => {
      const title = item.querySelector('div > div:nth-child(1)').textContent;
      const content = item.querySelector('div > div:nth-child(2)').textContent;
      return { title, content };
  });
}

function renderExtractedDataToDom(block, extractedData) {
  const accordionContainer = document.createElement('div');
  accordionContainer.className = 'accordion';
  let activeItem = null;

  extractedData.forEach((item, index) => {
      const accordionItem = document.createElement('div');
      accordionItem.className = 'accordion-item';
      accordionItem.id = `accordion-${index}`;

      const header = document.createElement('div');
      header.className = 'accordion-header';

      const toggle = document.createElement('div');
      toggle.className = 'accordion-toggle';
      toggle.textContent = '+';

      const title = document.createElement('div');
      title.className = 'accordion-title';
      title.textContent = item.title;

      const content = document.createElement('div');
      content.className = 'accordion-content';
      content.innerHTML = `<p>${item.content}</p>`;

      header.appendChild(toggle);
      header.appendChild(title);
      accordionItem.appendChild(header);
      accordionItem.appendChild(content);
      accordionContainer.appendChild(accordionItem);

      header.addEventListener('click', () => {
          if (activeItem && activeItem !== accordionItem) {
              activeItem.classList.remove('active');
              activeItem.querySelector('.accordion-content').classList.remove('active');
              activeItem.querySelector('.accordion-toggle').textContent = '+';
          }

          const isActive = accordionItem.classList.contains('active');
          accordionItem.classList.toggle('active');
          content.classList.toggle('active');
          toggle.textContent = isActive ? '+' : '-';
          activeItem = isActive ? null : accordionItem;
      });
  });
  block.innerHTML = ""
  block.appendChild(accordionContainer);
}