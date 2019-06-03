import { ProgressBarUpdate, ProgressBar, progressBars } from "./modules/progressBar";
import { Mineral } from "./modules/mineral";
import { generateRock } from "./modules/rocks";
import { generateInventoryItem } from "./modules/inventoryItem";
import { FloatingTextUpdate } from "./modules/floatingText";
import { Tool } from "./modules/tool";

let rockAmount = 10

let testImage = "images/rock1.jpg"


// let btcMaterial = new Material()
// let ethMaterial = new Material()
// let manaMaterial = new Material()


let btc = new Mineral("BTC", testImage)
let eth = new Mineral("ETH", testImage)
let mana = new Mineral("MANA", testImage)


let pick = new Tool("Pick", testImage, 40, 1)

// Object that tracks user position and rotation
const camera = Camera.instance


// Instance the input object
const input = Input.instance


// add random rocks
for (let i = 0; i < rockAmount;  i ++){
  let mineral = null
  let mineralIndex = Math.floor(Math.random() * 6)
  switch (mineralIndex) { 
    case 3:
      mineral = btc
      break
    case 2:
      mineral = eth
      break
    case 1:
      mineral = mana
      break
  }
  let mineralAmount = 0
  if (mineral){
    mineralAmount = Math.floor( Math.random() * 2000)/1000
  }


  generateRock([mineral], [mineralAmount] )
}



// ground
let floor = new Entity()
floor.addComponent(new GLTFShape("models/FloorBaseGrass.glb"))
floor.addComponent(new Transform({
  position: new Vector3(8, 0, 8),
  scale: new Vector3(1.6, 1.6, 1.6)
}))
engine.addEntity(floor)

// Systems
engine.addSystem(new ProgressBarUpdate(camera, pick) )
engine.addSystem(new FloatingTextUpdate() )





// button down event
// input.subscribe("BUTTON_DOWN", e => {
  
//   if (e.hit && e.hit.length > 4){
//       log("button A Down", e.hit.length)
//       log("too far")
//       for (let bar of progressBars.entities) {
//         engine.removeEntity(bar.getParent(), true)
//       }
//     }
   
// })

// button up esvent
input.subscribe("BUTTON_UP", e => {
  log("button up")
  for (let bar of progressBars.entities) {
    engine.removeEntity(bar.getParent())
  }
})




