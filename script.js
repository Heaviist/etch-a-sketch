let gridSide = 16;
const container = document.querySelector('#container');
const topSection = document.querySelector('.top');

const viewPortSize = window.innerHeight;
const containerHeight = (viewPortSize - (viewPortSize % 100)) / 100 * 90;
container.style.width = `${containerHeight}px`; //set canvas
container.style.height = `${containerHeight}px`;
topSection.style.width = `${containerHeight}px`; //set menu width similar to canvas

const colorCheckbox = document.querySelector('input[id="random-color"]');
const gradientCheckbox = document.querySelector('input[id="colorful"]');
const eraserCheckbox = document.querySelector('input[id="remove-color"]');
let gradientCheck = gradientCheckbox.checked; //checked variables to later set these manually. Tried using the checkbox values themselves, but then everything changes on checking the box instead of when reloading, obviously

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
      if (gradientCheck) {
        verticalBox.style.backgroundColor = 'white';
        verticalBox.style.opacity = 0; //In case of black and white canvas, let boxes start off with maximum opacity
      }
      horizontalContainer.appendChild(verticalBox); //Append boxes vertically to containers
    }
  }
  etch();
}

function etch() {
  const etchBox = document.querySelectorAll('.box');
  let etchColor = ''; // create local variable to later set depending on state of game and make code simpler

  etchBox.forEach(box => {
    box.addEventListener('mousemove', function (e) {
      
      if (colorCheckbox.checked) {
        etchColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`; //random etchColor
      } else if (gradientCheck) {
        etchColor = 'black'; //gradient etchColor
        let boxOpacity = +this.style.opacity; // read opacity every time the pixel is hovered
        
        if (eraserCheckbox.checked) { //check if eraser checkbox is true
          boxOpacity -= 0.01;
        } else {
          boxOpacity += 0.01; //change opacity by 10%
        }
      
        this.style.opacity = boxOpacity; //set new opacity value
      } else {
        etchColor = 'gold'; //regular etchColor
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
  gradientCheck = gradientCheckbox.checked;
  if (gradientCheck) {
    colorCheckbox.checked = false;
    colorCheckbox.disabled = true;
    eraserCheckbox.disabled = false;
  } else {
    colorCheckbox.disabled = false;
    eraserCheckbox.checked = false;
    eraserCheckbox.disabled = true;
  }
  createGrid(newSize);
}