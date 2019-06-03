import { generateInventoryItem } from "./inventoryItem";

let testImage = "images/rock1.jpg"


///// UI
// Create entity
const ui = new Entity()

// Create screenspace component
const screenSpaceUI = new UICanvas()

// Add screenspace component to entity
ui.addComponent(screenSpaceUI)

// Add entity to engine
engine.addEntity(ui)
//

const container = new UIContainerRect(screenSpaceUI)
container.width = '90%'
container.height = '90%'
container.color = Color4.Blue() // we set global text color here
container.hAlign = 'center'
container.vAlign = 'center'


// // We add separate rect container to act as a background with opacity
// const bg = new UIContainerRect(container)
// bg.opacity = 0.2
// bg.thickness = 1
// //bg.cornerRadius = 10
// bg.color = Color4.Teal()  //.FromHexString('#F2E2D2')


// --- INVENTORY

export const inventoryContainer = new UIContainerStack(container)
inventoryContainer.adaptWidth = true
// inventoryContainer.adaptHeight = true --- you can only set adaptWidth (X)OR adaptHeight for it to work correctly
inventoryContainer.width = '50%'
//inventoryContainer.top = '100px'
//inventoryContainer.paddingLeft = 150
inventoryContainer.color = Color4.Teal()  //FromHexString(`#42a4f4`)
inventoryContainer.hAlign = 'right'
inventoryContainer.vAlign = 'center' 
inventoryContainer.stackOrientation = 0


//generateInventoryItem(btc, 1, inventoryContainer)
//generateInventoryItem(eth, 2, inventoryContainer)
//generateInventoryItem(mana, 1, inventoryContainer)







export const toolContainer = new UIContainerRect(container)
toolContainer.width = '30%'
toolContainer.height = 400
toolContainer.positionY = -80
toolContainer.positionX = 50
toolContainer.color = Color4.Teal()//FromHexString('#3a609e')
toolContainer.hAlign = 'left'
toolContainer.vAlign = 'top'
//toolContainer.cornerRadius = 10


const toolTitle = new UIText(toolContainer)
toolTitle.value = "Tool:"
toolTitle.fontSize = 20
toolTitle.vAlign = 'top'
toolTitle.hAlign = 'left'
toolTitle.width = '150px'
toolTitle.height = '35px'
toolTitle.paddingTop = 10
toolTitle.paddingLeft = 10
toolTitle.color = Color4.White()//FromHexString('#0F1217')

const toolName = new UIText(toolContainer)
toolName.value = "PickAxe"
toolName.fontSize = 25
toolName.vAlign = 'top'
//toolName.hAlign = 'right'
toolName.width = '150px'
toolName.height = '35px'
toolName.positionX = 50
toolName.paddingTop = 10
toolName.color = Color4.White()//FromHexString('#0F1217')

let testToolTexture = new Texture('images/pickaxe.jpeg')

const toolPic = new UIImage(toolContainer, testToolTexture)
toolPic.hAlign = 'center'
toolPic.vAlign = 'center'
toolPic.sourceLeft = 0
toolPic.sourceTop = 0
toolPic.sourceWidth = 1000
toolPic.sourceHeight = 1000
toolPic.width = `150px`
toolPic.height = `150px`
toolPic.positionX = 20
toolPic.positionY = -30

const durabilityLabel = new UIText(toolContainer)
durabilityLabel.value = "Durability"
durabilityLabel.fontSize = 20
durabilityLabel.vAlign = 'bottom'
durabilityLabel.hAlign = 'left'
durabilityLabel.positionX = '15px'
durabilityLabel.width = '85px'
durabilityLabel.height = '30px'
durabilityLabel.paddingBottom = 10
durabilityLabel.color = Color4.FromHexString('#0f1217ff')

const durabilityBg = new UIContainerRect(toolContainer)
durabilityBg.color = Color4.Gray()
durabilityBg.width = "200px"
durabilityBg.height = "25px"
durabilityBg.vAlign = 'bottom'
durabilityBg.hAlign = 'right'
durabilityBg.positionX = 5


export const durability = new UIContainerRect(durabilityBg)
durability.color = Color4.Green()
durability.width = "100px"
durability.height = "25px"
durability.vAlign = 'center'
durability.hAlign = 'left'



const close = new Entity()

const clickableImage = new UIImage(container, new Texture('images/icon.png'))
clickableImage.name = 'clickable-image'
clickableImage.width = '92px'
clickableImage.height = '91px'
clickableImage.sourceWidth = 92
clickableImage.sourceHeight = 91
clickableImage.isPointerBlocker = true
clickableImage.onClick = new OnClick(() => {
	log('clicked on the close image')
	screenSpaceUI.visible = false
	screenSpaceUI.isPointerBlocker = false
})


// const button = new UIButton(container)
// button.text = 'Close UI'
// button.fontSize = 20
// button.color = Color4.Yellow() 
// //button.cornerRadius = 10
// button.thickness = 2
// button.width = '150px'
// button.height = '50px'
// //button.vAlign = 'bottom'
// button.positionY = `-80%`
// button.positionX = `50%`
// //button.shadowColor = Color4.Teal()//FromHexString("#46B1C9")
// close.addComponent(button)

// close.addComponent(
//   new OnPointerDown(() => {
//     log('clicked on the close image')
//     screenSpaceUI.visible = false
//   })
// )

// engine.addEntity(close)


//container.visible = false

const uiTrigger = new Entity()
const transform = new Transform({ position: new Vector3(5, 1, 5), scale: new Vector3(0.3, 0.3, 0.3) })
uiTrigger.addComponent(transform)

uiTrigger.addComponent(
  new OnPointerDown(() => {
	container.visible = true
	container.isPointerBlocker = true
  })
)

uiTrigger.addComponent(new BoxShape())
engine.addEntity(uiTrigger)



