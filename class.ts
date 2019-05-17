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
  move (distance: number = 0) {
    console.log(`Animal moved ${distance}`)
  }
}

class Dog extends Animal {
  bark () {
    console.log('Woof! Woof!')
  }
}

const dog = new Dog()
dog.bark()
dog.move(10)