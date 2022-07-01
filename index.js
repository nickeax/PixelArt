/**
 * @type HTMLCanvasElement
 */

const canvas = document.querySelector('#canvas')
const guide = document.querySelector('#guide')
const colourInput = document.querySelector('#colourInput')
const toggleGuide = document.querySelector('#toggleGuide')
const clearButton = document.querySelector('#clearButton')
const x = canvas.getContext('2d')
const CELL_SIDE_COUNT = 15
const CELL_PIXEL_LENGTH = canvas.width / CELL_SIDE_COUNT
const colourHistory = {}

// Set default colour
colourInput.value = '#009578'

// Initialise the canvas background
x.fillStyle = '#ffffff'
x.fillRect(0, 0, canvas.width, canvas.height)

// Setup the guide
guide.style.width = `${canvas.width}px`
guide.style.height = `${canvas.height}px`
guide.style.gridTemplateColumns = `repeat(${CELL_SIDE_COUNT}, 1fr)`;
guide.style.gridTemplateRows = `repeat(${CELL_SIDE_COUNT}, 1fr)`;

[...Array(CELL_SIDE_COUNT ** 2)].forEach(() => guide.insertAdjacentElement('beforeend', document.createElement('div')))

function handleCanvasMouseDown(e) {
  // Ensure user is using their primary mouse button
  if (e.button != 0) {
    return
  }

  const canvasBoundingRect = canvas.getBoundingClientRect()

  const x = e.clientX - canvasBoundingRect.left
  const y = e.clientY - canvasBoundingRect.top

  const cellX = Math.floor(x / CELL_PIXEL_LENGTH)
  const cellY = Math.floor(y / CELL_PIXEL_LENGTH)
  const currentColour = colourHistory[`${cellX}_${cellY}`]

  if (e.ctrlKey) {
    if (currentColour) {
      colourInput.value = currentColour
    }
  } else {
    fillCell(cellX, cellY);
  }

}

function handleClearButtonClick() {
  const yes = confirm('Are you sure you wish to clear the canvas?')

  if (yes) {
    x.fillStyle = colourInput.value
    x.fillRect(0, 0, canvas.width, canvas.height)
  }

  return
}

function handleToggleGuideChange() {
  guide.style.display = toggleGuide.checked ? null : 'none'
}

function fillCell(cellX, cellY) {
  const startX = cellX * CELL_PIXEL_LENGTH
  const startY = cellY * CELL_PIXEL_LENGTH
  x.fillStyle = colourInput.value
  x.fillRect(startX, startY, CELL_PIXEL_LENGTH, CELL_PIXEL_LENGTH)
  colourHistory[`${cellX}_${cellY}`] = colourInput.value
}

canvas.addEventListener('mousedown', handleCanvasMouseDown)
clearButton.addEventListener('click', handleClearButtonClick)
toggleGuide.addEventListener('change', handleToggleGuideChange)

