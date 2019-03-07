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
bg.background = '#F2E2D2'

// --- INVENTORY

export const inventoryContainer = new UIContainerStackShape(container)
inventoryContainer.adaptWidth = true
// inventoryContainer.adaptHeight = true --- you can only set adaptWidth (X)OR adaptHeight for it to work correctly
inventoryContainer.width = '50%'
//inventoryContainer.top = '100px'
inventoryContainer.left = '150px'
inventoryContainer.color = '0F1217'
inventoryContainer.background = '#46B1C9'
inventoryContainer.hAlign = 'center'
inventoryContainer.vAlign = 'center' 
inventoryContainer.vertical = true


//generateInventoryItem(btc, 1, inventoryContainer)
//generateInventoryItem(eth, 2, inventoryContainer)
//generateInventoryItem(mana, 1, inventoryContainer)




const button = new UIButtonShape(container)
button.text = 'Close UI'
button.fontSize = 20
button.color = '#0F1217'
button.background = '#84C0C6'
button.cornerRadius = 10
button.thickness = 2
button.width = '150px'
button.height = '50px'
button.vAlign = 'bottom'
button.top = '-80px'
button.shadowColor = "#46B1C9"

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
toolContainer.width = '30%'
toolContainer.height = '45%'
toolContainer.top = '100px'
toolContainer.left = '25px'
toolContainer.color = '#0F1217'
toolContainer.background = '#46B1C9'
toolContainer.hAlign = 'left'
toolContainer.vAlign = 'top'
toolContainer.cornerRadius = 10


const toolTitle = new UITextShape(toolContainer)
toolTitle.value = "Tool:"
toolTitle.fontSize = 20
toolTitle.vAlign = 'top'
toolTitle.hAlign = 'left'
toolTitle.width = '150px'
toolTitle.height = '35px'
toolTitle.paddingTop = '10px'
toolTitle.color = '#0F1217'

const toolName = new UITextShape(toolContainer)
toolName.value = "PickAxe"
toolName.fontSize = 25
toolName.vAlign = 'top'
toolName.hAlign = 'right'
toolName.width = '150px'
toolName.height = '35px'
toolName.paddingRight = '20px'
toolName.paddingTop = '10px'
toolName.color = '#0F1217'

const testRock = new UIImageShape(toolContainer)
testRock.source = 'images/pickaxe.jpeg'
testRock.hAlign = 'center'
testRock.vAlign = 'center'
testRock.sourceLeft = `0px`
testRock.sourceTop = `0px`
testRock.sourceWidth = `1000px`
testRock.sourceHeight = `1000px`
testRock.width = `150px`
testRock.height = `150px`

const durabilityLabel = new UITextShape(toolContainer)
durabilityLabel.value = "Durability"
durabilityLabel.fontSize = 20
durabilityLabel.vAlign = 'bottom'
durabilityLabel.hAlign = 'left'
durabilityLabel.left = '15px'
durabilityLabel.width = '85px'
durabilityLabel.height = '30px'
durabilityLabel.paddingBottom = '10px'
durabilityLabel.color = '#0F1217'

const durabilityBg = new UIContainerRectShape(toolContainer)
durabilityBg.background = "grey"
durabilityBg.width = "200px"
durabilityBg.height = "25px"
durabilityBg.vAlign = 'bottom'
durabilityBg.hAlign = 'right'
durabilityBg.left = '15px'


export const durability = new UIContainerRectShape(durabilityBg)
durability.background = "green"
durability.width = "100px"
durability.height = "25px"
durability.vAlign = 'center'
durability.hAlign = 'left'
