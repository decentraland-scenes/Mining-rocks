@Component('mineral')
export class Mineral {
  name: string
  image: string
  value: number
  constructor(name: string, image: string, value:number = 1) {
    this.name = name
    this.image = image
    this.value = value
  }
}


// component group grid positions
export const minerals = engine.getComponentGroup(Mineral)