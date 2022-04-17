const gridSide = 16;
const container = document.querySelector('#container');
const viewPort = window.innerHeight-50;
const boxSide = (viewPort - (viewPort % gridSide))/gridSide;
console.log(viewPort, boxSide);

for (let i = 0; i < gridSide; i++) {
  const horizontalContainer = document.createElement('div');
  horizontalContainer.classList.add('horizontal-container');
  container.appendChild(horizontalContainer); //Create horizontal container divs
  for (let j = 0; j < gridSide; j++) {
    const verticalBox = document.createElement('div');
    verticalBox.classList.add('box');
    verticalBox.style.padding = `${boxSide/2}px`;
    horizontalContainer.appendChild(verticalBox); //Append boxes vertically to containers
  }
}

const etchBox = document.querySelectorAll('.box');

etchBox.forEach(box => {
  box.addEventListener('mouseover', () => {
    box.classList.add('etched');
  })
});