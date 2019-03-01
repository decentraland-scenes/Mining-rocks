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
    bg.thickness = 1
    bg.background = 'green'
    bg.width = '100%'
    bg.height = '60px'
    bg.hAlign = 'center'
    bg.vAlign = 'top'
 

  
    const text = new UITextShape(bg)
    text.id = `text-${mineral}`
    text.value = mineral.name
    text.vAlign = 'center'
    text.hAlign = 'left'
    text.resizeToFit = true
    text.fontSize = 10
    text.color = 'black'
  
    const image = new UIImageShape(bg)
    image.vAlign = mineral.image

    const textAmount = new UITextShape(bg)
    textAmount.id = `amount-${mineral}`
    textAmount.value = amount.toString()
    textAmount.vAlign = 'center'
    textAmount.hAlign = 'right'
    textAmount.resizeToFit = true
    textAmount.fontSize = 10
    textAmount.color = 'black'


    let ent = new Entity()
    ent.addComponent(new InventoryItem(mineral.name, amount, textAmount))
    engine.addEntity(ent)
    ent.addComponent(bg)
  }