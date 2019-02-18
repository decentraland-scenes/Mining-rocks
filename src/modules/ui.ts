import { generateInventoryItem } from "./inventoryItem";

let testImage = "images/rock1.jpg"


///// UI
// Create entity
const ui = new Entity()

// Create screenspace component
const screenSpaceUI = new UIScreenSpaceShape()

// Add screenspace component to entity
ui.set(screenSpaceUI)

// Add entity to engine
engine.addEntity(ui)


const container = new UIContainerRectShape(screenSpaceUI)
container.width = '100%'
container.height = '100%'
container.color = 'blue' // we set global text color here
container.hAlign = 'center'
container.vAlign = 'center'


// We add separate rect container to act as a background with opacity
const bg = new UIContainerRectShape(container)
bg.opacity = 0.2
bg.thickness = 1
bg.cornerRadius = 10
bg.background = 'green'

// --- INVENTORY

export const inventoryContainer = new UIContainerStackShape(container)
inventoryContainer.adaptWidth = true
// inventoryContainer.adaptHeight = true --- you can only set adaptWidth (X)OR adaptHeight for it to work correctly
inventoryContainer.width = '40%'
inventoryContainer.top = '100px'
inventoryContainer.left = '10px'
inventoryContainer.color = 'white'
inventoryContainer.background = 'blue'
inventoryContainer.hAlign = 'center'
inventoryContainer.vAlign = 'top'
inventoryContainer.vertical = true // when adapting height, set this to false


//generateInventoryItem(btc, 1, inventoryContainer)
//generateInventoryItem(eth, 2, inventoryContainer)
//generateInventoryItem(mana, 1, inventoryContainer)




const button = new UIButtonShape(container)
button.text = 'Close UI'
button.fontSize = 15
button.color = 'black'
button.background = 'yellow'
button.cornerRadius = 10
button.thickness = 1
button.width = '120px'
button.height = '30px'
button.vAlign = 'bottom'
button.top = '-80px'

const close = new Entity()
close.set(
  new OnClick(() => {
    log('clicked on the close image')
    screenSpaceUI.visible = false
  })
)
close.set(button)
engine.addEntity(close)



// const testRock = new UIImageShape(container)
// testRock.source = testImage
// testRock.hAlign = 'left'
// testRock.sourceLeft = `0px`
// testRock.sourceTop = `0px`
// testRock.sourceWidth = `1000px`
// testRock.sourceHeight = `1000px`
// testRock.width = `100px`
// testRock.height = `100px`
