const gridSide = 16;
const container = document.querySelector('#container')

for (let i = 0; i < gridSide; i++) {
  const horizontalContainer = document.createElement('div');
  horizontalContainer.classList.add('horizontal-container');
  container.appendChild(horizontalContainer);

  for (let j = 0; j < gridSide; j++) {
    const verticalBox = document.createElement('div');
    verticalBox.classList.add('box');
    horizontalContainer.appendChild(verticalBox);
  }

}