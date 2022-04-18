let gridSide = 16;
const container = document.querySelector('#container');

const viewPortSize = window.innerHeight;
const containerHeight = (viewPortSize - (viewPortSize % 100)) / 100 * 90;

container.style.width = `${containerHeight}px`; //set canvas
container.style.height = `${containerHeight}px`;


createGrid(gridSide); //initial grid

function createGrid(size) {
  const pixelSize = (containerHeight / size) / 2; // /2 because of padding going in both directions. This calculates the padding for the boxes which defines their size.

  for (let i = 0; i < size; i++) {
    const horizontalContainer = document.createElement('div');
    horizontalContainer.classList.add('horizontal-container');
    container.appendChild(horizontalContainer); //Create horizontal container divs
    for (let j = 0; j < size; j++) {
      const verticalBox = document.createElement('div');
      verticalBox.classList.add('box');
      verticalBox.style.padding = `${pixelSize}px`; //fill canvas with pixels with correct dimensions
      horizontalContainer.appendChild(verticalBox); //Append boxes vertically to containers
    }
  }
  etch();
}

function etch() {
  const etchBox = document.querySelectorAll('.box');

  etchBox.forEach(box => {
    box.addEventListener('mouseover', () => {
      box.classList.add('etched');
    })
  });
}

function reset() {
  const newSize = prompt('How many pixels do you want each side of the canvas to have? (A maximum grid size of 100 is allowed)', '16');
  console.log(newSize);
  if (newSize == null) {
    return;
  } else if (newSize >= 100 || newSize < 1) {
    alert('Please enter a whole number between 0 and 100');
    return;
  }
  container.innerHTML = '';
  createGrid(newSize);
}