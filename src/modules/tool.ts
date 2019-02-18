


@Component('tool')
export class Tool {
  name: string
  image: string
  durability: number
  strength: number
  constructor(name: string, image: string, durability: number, strength: number) {
   this.name = name
   this.image = image
   this.durability = durability
   this.strength = strength
  }
}



// component group floating texts
export const tools = engine.getComponentGroup(Tool)
