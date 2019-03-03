import { Mineral } from "./mineral";

@Component('inventoryItem')
export class InventoryItem {
  name: string
  amount: number
  counter: UITextShape

  constructor( name: string, amount: number, counter: UITextShape){
    this.name = name
    this.amount = amount
    this.counter = counter
  }
}


// component group grid positions
export const inventoryItems = engine.getComponentGroup(InventoryItem)



export function generateInventoryItem(mineral: Mineral, amount: number, container: UIContainerStackShape) {
   

    const bg = new UIContainerRectShape(container)
    bg.id = `mineral`
    bg.thickness = 2
    bg.background = '#84C0C6'
    bg.width = '80%'
    bg.height = '60px'
    bg.hAlign = 'center'
    bg.vAlign = 'center'
    bg.cornerRadius = 15
   
 

  
    const text = new UITextShape(bg)
    text.id = `text-${mineral}`
    text.value = mineral.name
    text.vAlign = 'center'
    text.hAlign = 'left'
    text.resizeToFit = true
    text.fontSize = 10
    text.left = '20px'
    text.color = '#343533'
  
    const image = new UIImageShape(bg)
    image.source = mineral.image
    image.hAlign = 'center'
    image.height = '20px'
    image.width = '20px'
    image.sourceTop = '0px'
    image.sourceLeft = '0px'
    image.sourceHeight = '20px'
    image.sourceWidth = '20px'

    const textAmount = new UITextShape(bg)
    textAmount.id = `amount-${mineral}`
    textAmount.value = amount.toString()
    textAmount.vAlign = 'center'
    textAmount.hAlign = 'right'
    textAmount.resizeToFit = true
    textAmount.fontSize = 10
    textAmount.color = '#343533'
    textAmount.paddingRight = '20px'


    let ent = new Entity()
    ent.addComponent(new InventoryItem(mineral.name, amount, textAmount))
    engine.addEntity(ent)
    ent.addComponent(bg)
  }