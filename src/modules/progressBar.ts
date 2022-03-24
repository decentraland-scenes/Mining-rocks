import { Rock, mineRock } from './rocks'
import {
  inventoryItems,
  InventoryItem,
  generateInventoryItem
} from './inventoryItem'
import { inventoryContainer, durability } from './ui'
import { createFloatingText } from './floatingText'
import { Tool } from './tool'

@Component('progressBar')
export class ProgressBar {
  ratio: number = 0
  fullLength: number = 0.9
  speed: number = 1
  bar: IEntity
  height: number
  constructor(speed: number = 1, height: number, bar: IEntity) {
    this.speed = speed
    this.height = height
    this.bar = bar
  }
}

// // material for bars
const greenMaterial = new Material()
greenMaterial.albedoColor = Color3.Green()

// component group grid positions
export const progressBars = engine.getComponentGroup(ProgressBar)

export class ProgressBarUpdate implements ISystem {
  camera: Camera
  tool: Tool

  constructor(camera: Camera, tool: Tool) {
    this.camera = camera
    this.tool = tool
  }

  update(dt: number) {
    for (const bar of progressBars.entities) {
      const data = bar.getComponent(ProgressBar)
      const transform = data.bar.getComponent(Transform)

      const distance = Vector3.DistanceSquared(
        this.camera.position,
        transform.position
      )

      if (this.tool.durability <= 0) {
        log('Tool is wasted')
        createFloatingText('Tool is wasted', bar)
        return
      }

      if (data.ratio < 1) {
        data.ratio += (dt / 20) * data.speed

        this.tool.durability -= 0.01
        durability.width = this.tool.durability.toString().concat('px')
      }

      const width = Scalar.Lerp(0, data.fullLength, data.ratio)
      transform.scale.x = width
      transform.position.x = data.fullLength / 2 - width / 2
      if (data.ratio > 1) {
        mineRock(bar.getParent().getParent())
      }
    }
  }
}

export function createProgressBar(
  parent: IEntity,
  speed: number = 1,
  height: number = 1
) {
  const background = new Entity()
  background.addComponent(new PlaneShape())
  background.addComponent(new Billboard(true, true, true))
  background.setParent(parent)
  background.addComponent(
    new Transform({
      position: new Vector3(0, height, 0),
      scale: new Vector3(0.82, 0.15, 1)
    })
  )
  engine.addEntity(background)

  const progressBar = new Entity()
  progressBar.addComponent(new PlaneShape())
  progressBar.addComponent(greenMaterial)
  progressBar.setParent(background)
  progressBar.addComponent(
    new Transform({
      position: new Vector3(0, 0, 0.05),
      scale: new Vector3(0.95, 0.8, 1)
    })
  )
  progressBar.addComponent(new ProgressBar(speed, height, progressBar))
  engine.addEntity(progressBar)

  return progressBar
}
