import { Rock } from "./rocks";
import { inventoryItems, InventoryItem, generateInventoryItem } from "./inventoryItem";
import { inventoryContainer, durability } from "./ui";
import { createFloatingText } from "./floatingText";
import { Tool } from "./tool";


@Component('progressBar')
export class ProgressBar {
  ratio: number = 0
  fullLength: number = 0.9
  speed: number = 1
  parent: Entity
  constructor(parent: Entity, speed: number = 1) {
    this.parent = parent
    this.speed = speed
  }
}



// material for bars
let greenMaterial = new Material()
greenMaterial.albedoColor = Color3.Green()

// component group grid positions
export const progressBars = engine.getComponentGroup(ProgressBar)

export class ProgressBarUpdate implements ISystem {
  camera: Camera
  tool: Tool
  update(dt: number) {

    for (let bar of progressBars.entities) {
      let transform = bar.get(Transform)
      let data = bar.get(ProgressBar)
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
          mineRock(data.parent)
          //engine.removeEntity(data.parent, true)
          
        }
    }
  }
  constructor(camera: Camera, tool: Tool){
    this.camera = camera
    this.tool = tool
  } 
}

export function createPotProgressBar(
  parent: Entity,
  speed: number = 1,
  height: number = 1
) {
  let background = new Entity()
  background.add(new PlaneShape())
  background.add(new Billboard(true, true ,true))
  background.setParent(parent)
  background.set(
    new Transform({
      position: new Vector3(0, height, 0),
      scale: new Vector3(0.82, 0.15, 1)
    })
  )
  engine.addEntity(background)

  let progressBar = new Entity()
  progressBar.add(new PlaneShape())
  progressBar.add(greenMaterial)
  progressBar.setParent(background)
  progressBar.set(
    new Transform({
      position: new Vector3(0, 0, -0.05),
      scale: new Vector3(0.95, 0.8, 1)
    })
  )
  progressBar.add(new ProgressBar(parent, speed))
  engine.addEntity(progressBar)

  return progressBar
}


function mineRock(rock: Entity){
  let data = rock.get(Rock)
  if (data.minerals[0]){
    let text = data.amounts[0].toString().concat(" ").concat(data.minerals[0].name)
    log(text)
    createFloatingText(text,rock)
    let mineralExistsFlag = false
    for (let i of inventoryItems.entities){
      let inv = i.get(InventoryItem)
      if( inv.name == data.minerals[0].name){
        inv.amount += data.amounts[0]
        inv.counter.value = inv.amount.toString()
        mineralExistsFlag = true
        log("adding to existing mineral")
      } 

    }
    if (mineralExistsFlag == false){
      generateInventoryItem(data.minerals[0], data.amounts[0], inventoryContainer)
      log("new mineral", data.minerals[0].name)
    }
  }
  engine.removeEntity(rock, true)
}