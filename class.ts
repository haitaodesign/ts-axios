// 类

// 基本示例
class Greeter {
  greeting: string
  constructor (message: string) {
    this.greeting = message
  }
  greet () {
    return 'Hello, ' + this.greeting
  }
}

let greeter = new Greeter('LeeHaiTao')

// 继承，使用继承来扩展现有的类

class Animal {
  name: string
  constructor (name: string) {
    this.name = name
  }
  move (distance: number = 0) {
    console.log(`${this.name} moved ${distance}`)
  }
}

class Snake extends Animal {
  constructor (name: string) {
    // 在构造器里访问 this 的属性之前，一定要调用 super()
    // ts 强制执行的一条重要规则
    super(name)
  }
  move (distance: number = 5) {
    console.log('Slithering...')
    super.move(distance)
  }
}

class Horse extends Animal {
  constructor (name: string) {
    super(name)
  }
  move (distance: number = 5) {
    console.log('Galloping...')
    super.move(distance)
  }
}

class Dog extends Animal {
  bark () {
    console.log('Woof! Woof!')
  }
}

const dog = new Dog('lee')
dog.bark()
dog.move(10)

const sam = new Snake('Sammy')
const tom: Animal = new Horse('Tommy')

sam.move()
tom.move(100)