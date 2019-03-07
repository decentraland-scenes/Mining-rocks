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
    bg.width = '95%'
    bg.height = '60px'
    bg.hAlign = 'center'
    bg.vAlign = 'center'
    bg.cornerRadius = 15
    bg.color = '#0F1217'
   
 
  
    const image = new UIImageShape(bg)
    image.source = mineral.image
    image.hAlign = 'left'
    image.height = '20px'
    image.width = '20px'
    image.sourceTop = '0px'
    image.sourceLeft = '0px'
    image.sourceHeight = '20px'
    image.sourceWidth = '20px'
    image.left = '20px'
  
    const text = new UITextShape(bg)
    text.id = `text-${mineral}`
    text.value = mineral.name
    text.vAlign = 'center'
    text.hAlign = 'left'
    text.resizeToFit = true
    text.fontSize = 20
    text.left = '60px'
    text.color = '#0F1217'


    const textAmount = new UITextShape(bg)
    textAmount.id = `amount-${mineral}`
    textAmount.value = amount.toString()
    textAmount.vAlign = 'center'
    textAmount.hAlign = 'right'
    textAmount.resizeToFit = true
    textAmount.fontSize = 20
    textAmount.paddingRight = '80px'
    textAmount.color = '#0F1217'

    let ent = new Entity()
    ent.addComponent(new InventoryItem(mineral.name, amount, textAmount))
    engine.addEntity(ent)
    ent.addComponent(bg)
  }