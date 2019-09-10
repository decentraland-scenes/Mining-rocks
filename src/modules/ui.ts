
const screenSpaceUI = new UICanvas()

const container = new UIContainerRect(screenSpaceUI)
container.width = '90%'
container.height = '90%'
container.color = Color4.FromHexString(`#7c92bcff`)
container.hAlign = 'center'
container.vAlign = 'center'
container.visible = false
container.isPointerBlocker = false

// --- INVENTORY
export const inventoryContainer = new UIContainerStack(container)
inventoryContainer.spacing = 15
inventoryContainer.stackOrientation = UIStackOrientation.HORIZONTAL
inventoryContainer.width = '50%'
inventoryContainer.height = 130
inventoryContainer.color = Color4.FromHexString(`#42a4f4ff`)
inventoryContainer.hAlign = 'right'
inventoryContainer.vAlign = 'top'
inventoryContainer.stackOrientation = UIStackOrientation.HORIZONTAL
inventoryContainer.positionX = -10
inventoryContainer.positionY = -50

export const toolContainer = new UIContainerRect(container)
toolContainer.width = '30%'
toolContainer.height = 400
toolContainer.positionY = -80
toolContainer.positionX = 50
toolContainer.color = Color4.FromHexString('#3a609eff')
toolContainer.hAlign = 'left'
toolContainer.vAlign = 'top'

const toolTitle = new UIText(toolContainer)
toolTitle.value = "Tool:"
toolTitle.fontSize = 20
toolTitle.vAlign = 'top'
toolTitle.hAlign = 'left'
toolTitle.width = '150px'
toolTitle.height = '35px'
toolTitle.positionX = 10
toolTitle.paddingLeft = 10
toolTitle.color = Color4.FromHexString('#0F1217ff')

const toolName = new UIText(toolContainer)
toolName.value = "PickAxe"
toolName.fontSize = 20
toolName.vAlign = 'top'
toolName.width = '150px'
toolName.height = '35px'
toolName.positionX = 20
toolName.paddingTop = 10
toolName.color = Color4.FromHexString('#0F1217ff')

let testToolTexture = new Texture('images/pickaxe.jpeg')

const toolPic = new UIImage(toolContainer, testToolTexture)
toolPic.hAlign = 'center'
toolPic.vAlign = 'center'
toolPic.sourceLeft = 0
toolPic.sourceTop = 0
toolPic.sourceWidth = 1000
toolPic.sourceHeight = 1000
toolPic.width = `200px`
toolPic.height = `200px`
toolPic.positionX = 20
toolPic.positionY = -30

const durabilityLabel = new UIText(toolContainer)
durabilityLabel.value = "Durability"
durabilityLabel.fontSize = 20
durabilityLabel.vAlign = 'bottom'
durabilityLabel.hAlign = 'left'
durabilityLabel.positionX = '15px'
durabilityLabel.width = '75px'
durabilityLabel.height = '30px'
durabilityLabel.paddingBottom = 10
durabilityLabel.color = Color4.FromHexString('#0f1217ff')

const durabilityBg = new UIContainerRect(toolContainer)
durabilityBg.color = Color4.Gray()
durabilityBg.width = "180px"
durabilityBg.height = "25px"
durabilityBg.vAlign = 'bottom'
durabilityBg.hAlign = 'right'
durabilityBg.positionX = -55
durabilityBg.positionY = 5

export const durability = new UIContainerRect(durabilityBg)
durability.color = Color4.FromHexString('#426d48ff')
durability.width = "100px"
durability.height = "25px"
durability.vAlign = 'center'
durability.hAlign = 'left'

const closeIcon = new UIImage(container, new Texture('images/close-icon3.png'))
closeIcon.name = 'clickable-image'
closeIcon.width = '50px'
closeIcon.height = '50px'
closeIcon.hAlign = 'right'
closeIcon.vAlign = 'top'
closeIcon.sourceWidth = 128
closeIcon.sourceHeight = 128
closeIcon.isPointerBlocker = true
closeIcon.onClick = new OnClick(() => {
	container.visible = false
	container.isPointerBlocker = false
	log('clicked on the close image ', container.visible)
})


const alwaysOn = new UIContainerRect(screenSpaceUI)

alwaysOn.height = '90%'
alwaysOn.hAlign = 'center'
alwaysOn.vAlign = 'center'
alwaysOn.width = '100%'
alwaysOn.isPointerBlocker = false

const openImage = new UIImage(alwaysOn, testToolTexture)
openImage.name = 'clickable-image'
openImage.width = '50px'
openImage.height = '50px'
openImage.sourceWidth = 1000
openImage.sourceHeight = 1000
openImage.hAlign = 'right'
openImage.vAlign = 'top'
openImage.isPointerBlocker = true
openImage.onClick = new OnClick(() => {
	log('clicked on the open image')
	container.visible = true
	container.isPointerBlocker = true
})

// in-world trigger for UI
const uiTrigger = new Entity()
const transform = new Transform({ position: new Vector3(5, 1, 5), scale: new Vector3(0.3, 0.3, 0.3) })
uiTrigger.addComponent(transform)

uiTrigger.addComponent(
  new OnClick(() => {
	container.visible = true
	container.isPointerBlocker = true
  })
)

uiTrigger.addComponent(new BoxShape())
engine.addEntity(uiTrigger)
