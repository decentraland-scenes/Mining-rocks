import { Mineral } from "./mineral";

@Component('inventoryItem')
export class InventoryItem {
  name: string
  amount: number
  counter: UIText

  constructor( name: string, amount: number, counter: UIText){
    this.name = name
    this.amount = amount
    this.counter = counter
  }
}


// component group grid positions
export const inventoryItems = engine.getComponentGroup(InventoryItem)



export function generateInventoryItem(mineral: Mineral, amount: number, container: UIContainerStack) {
   

    const bg = new UIContainerRect(container)
    //bg.id = `mineral`
    bg.thickness = 2
    bg.color = Color4.FromHexString('#84C0C6ff')
    bg.width = '70px'
    bg.height = '85px'
    bg.hAlign = 'left'
	bg.vAlign = 'center'
	
    
	const imageTexture = new Texture(mineral.image)

    const image = new UIImage(bg, imageTexture)
    image.height = '60px'
    image.width = '60px'
	image.sourceTop = 0
    image.sourceLeft = 0
    image.sourceHeight = 1302
	image.sourceWidth = 1668
	image.vAlign = `top`
	image.hAlign = `center`
	image.paddingTop = 5


  
    const text = new UIText(bg)
    text.value = mineral.name
    text.vAlign = 'bottom'
	text.hAlign = 'left'
	text.paddingLeft = 2
    //text.fontAutoSize = true
    text.fontSize = 11
    //text.paddingLeft = 60
    text.color = Color4.FromHexString('#0F1217ff')


    const textAmount = new UIText(bg)
    //textAmount.id = `amount-${mineral}`
    textAmount.value = amount.toString()
    textAmount.vAlign = 'bottom'
	textAmount.hAlign = 'left'
    //textAmount.fontAutoSize = true
	textAmount.fontSize = 11
	textAmount.positionX = 35
    textAmount.paddingRight = 2
    textAmount.color = Color4.FromHexString('#0F1217ff')

  }