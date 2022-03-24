import { Mineral } from './mineral'

@Component('inventoryItem')
export class InventoryItem {
  name: string
  amount: number
  counter: UIText

  constructor(name: string, amount: number, counter: UIText) {
    this.name = name
    this.amount = amount
    this.counter = counter
  }
}

// component group grid positions
export const inventoryItems = engine.getComponentGroup(InventoryItem)

export function generateInventoryItem(
  mineral: Mineral,
  amount: number,
  container: UIContainerStack
) {
  const bg = new UIContainerRect(container)
  bg.name = 'mineral'
  bg.thickness = 2
  bg.color = Color4.FromHexString('#84C0C6ff')
  bg.width = '100px'
  bg.height = '100px'
  bg.vAlign = 'center'

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
  image.positionY = -5

  const text = new UIText(bg)
  text.value = mineral.name
  text.width = '50%'
  text.height = 25
  text.vAlign = 'bottom'
  text.hAlign = 'left'
  text.vTextAlign = 'center'
  text.fontSize = 15
  text.color = Color4.FromHexString('#0F1217ff')

  const textAmount = new UIText(bg)
  textAmount.name = `amount-${mineral}`
  textAmount.value = amount.toString()
  textAmount.width = '50%'
  textAmount.height = 25
  textAmount.vAlign = 'bottom'
  textAmount.hAlign = 'right'
  textAmount.vTextAlign = 'center'
  textAmount.fontSize = 15
  textAmount.color = Color4.FromHexString('#0F1217ff')
}
