import { generateInventoryItem } from "./inventoryItem";

let testImage = "images/rock1.jpg"


///// UI
// Create entity
const ui = new Entity()

// Create screenspace component
const screenSpaceUI = new UIScreenSpaceShape()

// Add screenspace component to entity
ui.addComponent(screenSpaceUI)

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
inventoryContainer.hAlign = 'right'
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
close.addComponent(
  new OnPointerDown(() => {
    log('clicked on the close image')
    screenSpaceUI.visible = false
  })
)
close.addComponent(button)
engine.addEntity(close)




export const toolContainer = new UIContainerRectShape(container)
toolContainer.width = '40%'
toolContainer.height = '60%'
toolContainer.top = '100px'
toolContainer.left = '25px'
toolContainer.color = 'white'
toolContainer.background = 'blue'
toolContainer.hAlign = 'left'
toolContainer.vAlign = 'top'


const toolTitle = new UITextShape(toolContainer)
toolTitle.value = "Tool"
toolTitle.fontSize = 20
toolTitle.vAlign = 'top'

const toolName = new UITextShape(toolContainer)
toolName.value = "Pick"
toolName.fontSize = 20




const testRock = new UIImageShape(toolContainer)
testRock.source = testImage
testRock.hAlign = 'left'
testRock.sourceLeft = `0px`
testRock.sourceTop = `0px`
testRock.sourceWidth = `1000px`
testRock.sourceHeight = `1000px`
testRock.width = `100px`
testRock.height = `100px`

const durabilityLabel = new UITextShape(toolContainer)
durabilityLabel.value = "Durability"
durabilityLabel.fontSize = 20
durabilityLabel.vAlign = 'bottom'
durabilityLabel.hAlign = 'left'

const durabilityBg = new UIContainerRectShape(toolContainer)
durabilityBg.background = "grey"
durabilityBg.width = "80px"
durabilityBg.height = "25px"
durabilityBg.vAlign = 'bottom'
durabilityBg.hAlign = 'right'

export const durability = new UIContainerRectShape(durabilityBg)
durability.background = "green"
durability.width = "30px"
durability.height = "25px"
durability.vAlign = 'center'
durability.hAlign = 'left'