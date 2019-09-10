import { Rock, mineRock } from "./rocks";
import { inventoryItems, InventoryItem, generateInventoryItem } from "./inventoryItem";
import { inventoryContainer, durability } from "./ui";
import { createFloatingText } from "./floatingText";
import { Tool } from "./tool";


@Component('progressBar')
export class ProgressBar {
  ratio: number = 0
  fullLength: number = 0.9
  speed: number = 1
  bar: IEntity
  height: number
  constructor(speed: number = 1, height: number) {
    this.speed = speed
    this.height = height
  }
}

// material for bars
let greenMaterial = new Material()
greenMaterial.albedoColor = Color3.Green()
this.greenMaterial = greenMaterial



// component group grid positions
export const progressBars = engine.getComponentGroup(ProgressBar)

export class ProgressBarUpdate implements ISystem {
  camera: Camera
  tool: Tool

  constructor(camera: Camera, tool: Tool){
    this.camera = camera
    this.tool = tool
  }

  update(dt: number) {

    for (let bar of progressBars.entities) {
      let data = bar.getComponent(ProgressBar)
      let transform = data.bar.getComponent(Transform)
      
      let distance = Vector3.DistanceSquared(this.camera.position, transform.position)

      if (this.tool.durability <= 0){
        log("Tool is wasted")
        return
      }

      if (data.ratio < 1) {
        data.ratio += (dt / 20) * data.speed
        // if ( distance > 5){
        //   log("went away from rock")
        //   engine.removeEntity(bar.getParent(), true)
        // }
        this.tool.durability -= 0.1
        durability.width = this.tool.durability.toString().concat("px")
      }

      let width = Scalar.Lerp(0, data.fullLength, data.ratio)
      transform.scale.x = width
      transform.position.x = -data.fullLength / 2 + width / 2
      if (data.ratio > 1) {
      
          // add items to inventory
          mineRock(bar)
          //engine.removeEntity(data.parent, true)
          
        }
    }
  }

  onAddEntity(ent: IEntity){
    let bar = ent.getComponent(ProgressBar)
    let background = new Entity()
    background.addComponent(new PlaneShape())
    background.addComponent(new Billboard(true, true ,true))
    background.setParent(ent)
    background.addComponent(
      new Transform({
        position: new Vector3(0, bar.height, 0),
        scale: new Vector3(0.82, 0.15, 1)
      })
    )
    engine.addEntity(background)
  
    let progressBar = new Entity()
    progressBar.addComponent(new PlaneShape())
    progressBar.addComponent(greenMaterial)
    progressBar.setParent(background)
    progressBar.addComponent(
      new Transform({
        position: new Vector3(0, 0, -0.05),
        scale: new Vector3(0.95, 0.8, 1)
      })
    )
    engine.addEntity(progressBar)

    bar.bar = progressBar
  }
}

export function createProgressBar(
  parent: IEntity,
  speed: number = 1,
  height: number = 1
) {
  let background = new Entity()
  background.addComponent(new PlaneShape())
  background.addComponent(new Billboard(true, true ,true))
  background.setParent(parent)
  background.addComponent(
    new Transform({
      position: new Vector3(0, height, 0),
      scale: new Vector3(0.82, 0.15, 1)
    })
  )
  engine.addEntity(background)

  let progressBar = new Entity()
  progressBar.addComponent(new PlaneShape())
  progressBar.addComponent(greenMaterial)
  progressBar.setParent(background)
  progressBar.addComponent(
    new Transform({
      position: new Vector3(0, 0, -0.05),
      scale: new Vector3(0.95, 0.8, 1)
    })
  )
  progressBar.addComponent(new ProgressBar(speed, height))
  engine.addEntity(progressBar)

  return progressBar
}