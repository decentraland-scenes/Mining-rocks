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
    bg.color = Color4.FromHexString('#84C0C6')
    bg.width = '95%'
    bg.height = '60px'
    bg.hAlign = 'center'
    bg.vAlign = 'center'
    //bg.  cornerRadius = 15
 
	const imageTexture = new Texture(mineral.image)
    const image = new UIImage(bg, imageTexture)

    image.hAlign = 'left'
    image.height = '20px'
    image.width = '20px'
	image.sourceTop = 0
    image.sourceLeft = 0
    image.sourceHeight = 20
	image.sourceWidth = 20
	image.paddingLeft = 20
  
    const text = new UIText(bg)
    text.value = mineral.name
    text.vAlign = 'center'
    text.hAlign = 'left'
    text.fontAutoSize = true
    text.fontSize = 2
    text.paddingLeft = 60
    text.color = Color4.FromHexString('#0F1217')


    const textAmount = new UIText(bg)
    //textAmount.id = `amount-${mineral}`
    textAmount.value = amount.toString()
    textAmount.vAlign = 'center'
    textAmount.hAlign = 'right'
    textAmount.fontAutoSize = true
    textAmount.fontSize = 2
    textAmount.paddingRight = 80
    textAmount.color = Color4.FromHexString('#0F1217')

  }