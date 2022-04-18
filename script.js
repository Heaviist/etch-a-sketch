let gridSide = 16;
const container = document.querySelector('#container');
const topSection = document.querySelector('.top');

const viewPortSize = window.innerHeight;
const containerHeight = (viewPortSize - (viewPortSize % 100)) / 100 * 90;
container.style.width = `${containerHeight}px`; //set canvas
container.style.height = `${containerHeight}px`;
topSection.style.width = `${containerHeight}px`;

const colorCheckbox = document.querySelector('input[id="random-color"]');
const gradientCheckbox = document.querySelector('input[id="colorful"]');

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
      if (gradientCheckbox.checked) {
        verticalBox.style.backgroundColor = 'white';
       // verticalBox.style.opacity = 0;
      }
      horizontalContainer.appendChild(verticalBox); //Append boxes vertically to containers
    }
  }
  etch();
}

function etch() {
  const etchBox = document.querySelectorAll('.box');
  let etchColor = '';

  etchBox.forEach(box => {
    box.addEventListener('mouseover', () => {
      box.classList.add('etched');
      if (colorCheckbox.checked) {
        etchColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
      } else if (gradientCheckbox.checked) {
        etchColor = 'black';
        //box.style.opacity += .5;
      } else {
        etchColor = 'gold';
      }
      box.style.backgroundColor = etchColor;
    })
  });
}

function reset() {
  const newSize = prompt('How many pixels do you want each side of the canvas to have? (A maximum grid size of 100 is allowed)', '16');
  if (newSize == null) { //if cancelled or invalid number, end the function so the etch is kept
    return;
  } else if (newSize >= 100 || newSize < 1) {
    alert('Please enter a whole number between 0 and 100');
    return;
  }
  container.innerHTML = '';
  if (gradientCheckbox.checked) {
    colorCheckbox.checked = false;
    colorCheckbox.disabled = true;
  } else {
    colorCheckbox.disabled = false;
  }
  createGrid(newSize);
}