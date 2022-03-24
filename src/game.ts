import {
  ProgressBarUpdate,
  ProgressBar,
  progressBars,
  createProgressBar
} from './modules/progressBar'
import { Mineral } from './modules/mineral'
import { generateRock } from './modules/rocks'
import { generateInventoryItem } from './modules/inventoryItem'
import { FloatingTextUpdate, createFloatingText } from './modules/floatingText'
import { Tool } from './modules/tool'

const rockAmount = 10

const testImage = 'images/rock1.jpg'

// let btcMaterial = new Material()
// let ethMaterial = new Material()
// let manaMaterial = new Material()

const btc = new Mineral('BTC', testImage)
const eth = new Mineral('ETH', testImage)
const mana = new Mineral('MANA', testImage)

const pick = new Tool('Pick', testImage, 40, 1)

// Object that tracks user position and rotation
const camera = Camera.instance

// Instance the input object
const input = Input.instance

// add random rocks
for (let i = 0; i < rockAmount; i++) {
  let mineral = null
  const mineralIndex = Math.floor(Math.random() * 6)
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
  if (mineral) {
    mineralAmount = Math.floor(Math.random() * 2000) / 1000
  }

  generateRock([mineral], [mineralAmount])
}

// ground
const floor = new Entity()
floor.addComponent(new GLTFShape('models/FloorBaseGrass.glb'))
floor.addComponent(
  new Transform({
    position: new Vector3(8, 0, 8),
    scale: new Vector3(1.6, 1.6, 1.6)
  })
)
engine.addEntity(floor)

// Systems
engine.addSystem(new ProgressBarUpdate(camera, pick))
engine.addSystem(new FloatingTextUpdate())

// button down event
input.subscribe('BUTTON_DOWN', ActionButton.POINTER, false, (e) => {
  if (e.hit) {
    if (e.hit.length < 4) {
      createProgressBar(engine.entities[e.hit.entityId], 1, 1)
    } else {
      log('too far', e.hit.length)
      createFloatingText('Too far', floor) // engine.entities[e.hit.entityId])
    }
  }
})

// button up esvent
input.subscribe('BUTTON_UP', ActionButton.POINTER, false, (e) => {
  log('button up')
  for (const bar of progressBars.entities) {
    engine.removeEntity(bar.getParent())
  }
})
