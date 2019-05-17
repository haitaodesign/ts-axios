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
  // 默认为 public
  // name: string
  public name: string
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

// 公共，私有与受保护的修饰符

// 默认为 public

// private 

class Animal2 {
  private name: string
  constructor (name: string) {
    this.name = name
  }
}

// error:  属性“name”为私有属性，只能在类“Animal2”中访问。
// new Animal2('hai').name

class Rhino extends Animal2 {
  constructor () {
    super('Rhino')
  }
}

class Employee {
  private name: string
  constructor (name: string) {
    this.name = name
  }
}

let animal2 = new Animal2('Goat')

let rhino = new Rhino()

let employee = new Employee('Bob')

animal2 = rhino

// error: 不能将类型“Employee”分配给类型“Animal2”。类型具有私有属性“name”的单独声明。
// animal2 = employee // Animal 与 Employee 不兼容

// protected

class Person {
  protected name: string
  // 只读属性必须在声明时或构造函数里被初始化
  readonly age: number
  // constructor (name: string) {
  //   this.name = name
  // }
  // 构造函数也是可以被标记为 protected
  protected constructor (name: string) {
    this.name = name
  }
}

class Employee2 extends Person {
  private department: string
  constructor (name: string, department: string) {
    super(name)
    this.department = department
  }
  getElevatorPitch () {
    return `Hello, my name is ${this.name} and I work in ${this.department}`
  }
}

let howard = new Employee2('Howard', 'dev')

// 可以通过类的实例方法访问
console.log(howard.getElevatorPitch())
// error: 不能将类型“Employee”分配给类型“Animal2”。类型具有私有属性“name”的单独声明。
// console.log(howard.name) // error

// error : 类“Person”的构造函数是受保护的，仅可在类声明中访问。
// let person3 = new  Person('haitao')

// readonly 修饰符

// 参数属性

class Person3 {
  // 声明和赋值合并在一起
  // constructor (readonly name: string) {
  // }
  constructor (private name: string) {
  }
}

// 存取器
// 将其改写为使用 get 和 set
// class Student {
//   fullName: string
// }

// let student = new Student()
// student.fullName = 'Lee HaiTao'

// if (student.fullName) {
//   console.log(student.fullName)
// }

// 这里 ts 编译通过需要 tsc class.ts --target es5
// 不等降级到 es3
let passcode = 'leehaitao'

class Student {
  private _fullName: string
  get fullName(): string {
    return this._fullName
  }
  set fullName (newName: string) {
    if (passcode && passcode == 'leehaitao') {
      this._fullName = newName
    } else {
      console.log('Error: Unauthorized update of student!')
    }
  }
}

let student = new Student()
student.fullName = 'Lee HaiTao'
if (student.fullName) {
  console.log(student.fullName)
}

// 静态属性

class Grid {
  static origin = { x: 0, y: 0 }

  scale: number

  constructor (scale: number) {
    this.scale = scale
  }

  calculateDistanceFromOrigin (point: { x: number, y: number }){
    let xDist = point.x - Grid.origin.x
    let yDist = point.y - Grid.origin.y
    return Math.sqrt(xDist * xDist + yDist * yDist) * this.scale
  }
}

let grid1 = new Grid(1.0)
let grid2 = new Grid(5.0)

console.log('grid1', grid1.calculateDistanceFromOrigin({x: 3, y: 4}))
console.log('grid2', grid2.calculateDistanceFromOrigin({x: 3, y: 4}))

// 抽象类

// abstract 关键字是用于定义抽象类和在抽象类内部定义抽象方法

abstract class Animal3 {
  abstract makeSound(): void
  move(): void {
    console.log('roaming the earth ......')
  }
}

abstract class Department {
  name: string
  
  constructor (name: string) {
    this.name = name
  }

  printName(): void {
    console.log('Department name: ' + this.name)
  }

  abstract printMeeting(): void // 必须在派生类中实现
}

class AccountingDepartment extends Department {
  constructor () {
    // 在派生类的构造函数中必须调用 super()
    super('Accounting and Auditing') 
  }

  printMeeting(): void {
    console.log('The Accounting Department meets each Monday at 10am.')
  }

  generateReports(): void {
    console.log('Generating accounting reports...')
  }
}

let department : Department

// department = new Department() // error: 无法创建抽象类的实例。

department = new AccountingDepartment() // 允许对一个抽象子类进行实例化和赋值

department.printName()

department.printMeeting()
// error: 类型“Department”上不存在属性“generateReports”。
// department.generateReports() 


// 高级技巧，这里特别注意，由于缺乏使用经验，不是特别的理解

// 构造函数

// 把类当作接口使用