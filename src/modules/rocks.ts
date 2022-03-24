import { createProgressBar } from './progressBar'
import { Mineral } from './mineral'
import { createFloatingText } from './floatingText'
import {
  inventoryItems,
  InventoryItem,
  generateInventoryItem
} from './inventoryItem'
import { inventoryContainer } from './ui'

const rock1 = new GLTFShape('models/RockLarge_02.glb')
const rock2 = new GLTFShape('models/RockLarge_03.glb')
const rock3 = new GLTFShape('models/RockLarge_01.glb')
const rock4 = new GLTFShape('models/RockMedium_01.glb')
const rock5 = new GLTFShape('models/RockMedium_02.glb')
const rock6 = new GLTFShape('models/RockMedium_03.glb')
const rock7 = new GLTFShape('models/RockSmall_01.glb')
const rock8 = new GLTFShape('models/RockSmall_02.glb')
const rock9 = new GLTFShape('models/RockSmall_03.glb')

const rocks = [rock1, rock2, rock3, rock4, rock5, rock6, rock7, rock8, rock9]

@Component('rock')
export class Rock {
  size: number
  minerals: null | Mineral[]
  amounts: number[]
  progressBar: IEntity

  constructor(size: number, minerals: Mineral[], amounts: number[]) {
    this.size = size
    this.minerals = minerals
    this.amounts = amounts
  }
}

export function generateRock(minerals: Mineral[], amounts: number[]) {
  const ent = new Entity()
  const rockIndex = Math.floor(Math.random() * rocks.length)
  ent.addComponent(rocks[rockIndex])

  const x = Math.random() * 12 + 2
  const z = Math.random() * 12 + 2

  ent.addComponent(
    new Transform({
      position: new Vector3(x, 0, z)
    })
  )

  ent.addComponent(new Rock(rockIndex, minerals, amounts))

  let height = 1
  if (rockIndex < 2) {
    height = 2.5
  } else if (rockIndex < 3) {
    height = 1.75
  }

  const speed = rockIndex + 1

  //   ent.addComponent(
  //     new OnClick(e => {

  // 	  log("clicked rock")
  //       //   let mineral = ent.getComponent(Rock)
  //       //mineral.progressBar = createProgressBar(ent, speed, height)

  //       mineRock(ent)

  // 	})
  //   )

  ent.addComponent(
    new OnPointerDown(
      (e) => {
        const mineral = ent.getComponent(Rock)
        log('clicked rock')

        mineral.progressBar = createProgressBar(ent, speed, height)
        if (e.hit.length > 4) {
          log('button A Down', e.hit.length)
          log('too far')
          engine.removeEntity(mineral.progressBar.getParent())
        }
      },
      { button: ActionButton.POINTER, hoverText: 'Mine' }
    )
  )

  engine.addEntity(ent)
}

export function mineRock(rock: IEntity) {
  const data = rock.getComponent(Rock)
  if (data.minerals[0]) {
    const text = data.amounts[0]
      .toString()
      .concat(' ')
      .concat(data.minerals[0].name)
    log(text)
    createFloatingText(text, rock)
    let mineralExistsFlag = false
    for (const i of inventoryItems.entities) {
      const inv = i.getComponent(InventoryItem)
      if (inv.name === data.minerals[0].name) {
        inv.amount += data.amounts[0]
        inv.counter.value = inv.amount.toString()
        mineralExistsFlag = true
        log('adding to existing mineral')
      }
    }
    if (mineralExistsFlag === false) {
      generateInventoryItem(
        data.minerals[0],
        data.amounts[0],
        inventoryContainer
      )
      log('new mineral', data.minerals[0].name)
    }
  }
  engine.removeEntity(rock)
}
