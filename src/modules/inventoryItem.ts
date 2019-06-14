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
    bg.width = '90%'
    bg.height = '60px'
    bg.hAlign = 'center'
	bg.vAlign = 'center'
    //bg.  cornerRadius = 15
 
	const imageTexture = new Texture(mineral.image)

    const image = new UIImage(bg, imageTexture)
    image.height = '40px'
    image.width = '40px'
	image.sourceTop = 0
    image.sourceLeft = 0
    image.sourceHeight = 1302
	image.sourceWidth = 1668
	image.vAlign = `top`
	image.hAlign = `center`
	image.positionY = -10

  
    const text = new UIText(bg)
    text.value = mineral.name
    text.vAlign = 'center'
    text.hAlign = 'left'
    text.fontAutoSize = true
    text.fontSize = 1.5
    text.paddingLeft = 60
    text.color = Color4.FromHexString('#0F1217ff')


    const textAmount = new UIText(bg)
    //textAmount.id = `amount-${mineral}`
    textAmount.value = amount.toString()
    textAmount.vAlign = 'center'
    textAmount.hAlign = 'right'
    textAmount.fontAutoSize = true
    textAmount.fontSize = 1.5
    textAmount.paddingRight = 80
    textAmount.color = Color4.FromHexString('#0F1217ff')

  }