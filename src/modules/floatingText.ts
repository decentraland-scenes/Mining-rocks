

@Component('floatingText')
export class FloatingText {
  timeLeft: number = 1
  speed: number = 1
  opacity: number = 1
  constructor(speed: number = 1) {
   this.speed = speed
  }
}


// component group floating texts
export const texts = engine.getComponentGroup(FloatingText)


export function createFloatingText(
    val: string,
    parent: Entity,
    speed: number = 1,
    height: number = 1
  ) {
    let text = new Entity()
    text.add(new Billboard(true, true ,true))
    //text.setParent(parent)
    let pos = parent.get(Transform).position.clone()
    pos.y = height
    text.set(
      new Transform({
        position: pos  // new Vector3(0, height, 0)
      })
    )
    text.add(new FloatingText(speed))
    engine.addEntity(text)
  
    let textShape =  new TextShape(val)
    text.add(textShape)

    textShape.fontSize = 50
    textShape.fontWeight = "bold"
    textShape.color = Color3.Blue()
    
  }


  export class FloatingTextUpdate implements ISystem {
    update(dt: number) {
  
      for (let t of texts.entities) {
        let transform = t.get(Transform)
        let text = t.get(FloatingText)
        let textShape = t.get(TextShape)
        transform.position.y += dt/2
        text.timeLeft -= (dt) * 2 * text.speed
        textShape.opacity *= 0.95
        if (text.timeLeft < 0) {
            engine.removeEntity(t, true)
        }
      }
    }
  }