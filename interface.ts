// 接口

// 接口初探

interface LabelledValue {
  label: string
}

// function printLabel (labelledObj: { label: string }) {
//   console.log(labelledObj.label)
// }

function printLabel (labelledObj: LabelledValue) {
  console.log(labelledObj.label)
}

let myObj = { size: 10, label: 'Size 10 Object'}

printLabel(myObj)

// 可选属性，好处在哪里？

interface Square {
  color: string,
  area: number
}

interface SquareConfig {
  color?: string,
  width?: number
}

function createSquare (config: SquareConfig) : Square {
  let newSquare = { color: 'white', area: 100}
  if (config.color) {
    newSquare.color = config.color
  }
  if (config.width) {
    newSquare.area = config.width * config.width
  }
  return newSquare
}

let mySquare = createSquare({ color: 'black' })

// 只读属性,对象属性只能在对象刚刚创建的时候修改其值

interface Point {
  readonly x: number,
  readonly y: number
}

let p1: Point = { x: 10, y: 20 }
// p1.x = 50  // error

let a1: number[] = [1, 2, 3, 4]

let ro: ReadonlyArray<number> = a1

// ro[0] = 12 // error

// ro.push(5) // error

// ro.length = 100 // error

// a = ro // error

a1 = ro as number[]

// readonly(属性) vs. const(变量)

// 额外的属性检查

// error: “colour”中不存在类型“SquareConfig”
// let mySquare2 = createSquare({ colour: 'red', width: 100})

// 通过类型断言绕开检查, 无 error
let mySquare2 = createSquare({ colour: 'red', width: 100} as SquareConfig)

// 另外一种方式，添加一个字符串索引签名, SquareConfig2可有有任意数量的属性
interface SquareConfig2 {
  color?: string,
  width?: number,
  [propName: string]: any
}

// 将对象赋值给另外一个变量绕过检查

let squareOptions = { colour: 'red', width: 100 }

// 无 error
let mySquare3 = createSquare(squareOptions)

// 函数类型

interface SearchFunc {
  (source: string, subString: string): boolean
}

let mySearch: SearchFunc
mySearch = function (source: string, subString: string): boolean {
  let result = source.search(subString)
  return result > -1
}

// 函数的参数名不需要与接口的名字相匹配
let mySearch2: SearchFunc
mySearch2 = function (src: string, sub: string): boolean {
  let result = src.search(sub)
  return result > -1
}

// 可以不制定类型，ts的类型系统自动推断参数类型
let mySearch3: SearchFunc
mySearch2 = function (src, sub){
  let result = src.search(sub)
  return result > -1
}

// 可索引的类型

interface StringArray {
  [index: number]: string
}

let myArray: StringArray
myArray = ['lee', 'liang']

let myString: string = myArray[0]
// console.log('myString', myString) // lee

// ts有两种索引签名：字符串和数字

class Animal {
  name: string
}

class Dog extends Animal {
  breed: string
}

interface NotOkay {
  // error,使用数值类型的索引，有时候会得到完全不同的Animal
  // [x: number]: Animal,
  [x: string]: Dog
}

// 字符串索引签名能够很好的描述 dictionary 模式

interface NumberDictionary {
  [index: string]: number,
  length: number,
  // name的类型与字符串索引类型不匹配
  // name: stirng
}

// 将索引签名设置为只读，防止给索引赋值

interface ReadonlyStringArray {
  readonly [index: number]: string
}

let myArray3: ReadonlyStringArray = ['lee', 'liang']

// myArray3[2] = 'haitao' // error

// 类类型

// 实现接口
// 接口中描述一个方法，在类里面实现
// 接口描述了类的公共部分
interface ColockInterface {
  currentTime: Date
  setTime (d: Date)
}

class Clock implements ColockInterface {
  currentTime: Date
  setTime (d: Date) {
    this.currentTime = d
  }
  constructor(h: number, m: number) {}
}

// 类静态部分与实例部分的区别

interface ClockConstructor {
  new (hour: number, minute: number)
}
// error: 类“Clock2”错误实现接口“ClockConstructor”。类型“Clock2”提供的内容与签名“new (hour: number, minute: number): any”不匹配。
// class Clock2 implements ClockConstructor {
//   currentTime: Date
//   constructor(h: number, m:number)
// }

interface ClockInterface {
  tick()
}

// 构造函数
function createClock (ctor: ClockConstructor, hour: number, minute: number): ClockInterface {
  return new ctor(hour, minute)
}

class DigitalClock implements ClockInterface {
  constructor(h: number, m:number) {}
  tick () {
    console.log('beep beep!')
  }
}

class AnalogClock implements ClockInterface {
  constructor(h: number, m:number) {}
  tick () {
    console.log('tick tick!')
  }
}

// createClock 检查 DigitalClock 是否符合构造函数签名
let digital = createClock(DigitalClock, 12, 17)
let analog = createClock(AnalogClock, 7, 32)

// 继承接口

interface Shape {
  color: string
}

interface Square extends Shape {
  sideLength: number
}

let square = {} as Square
square.color = 'blue'
square.sideLength = 10

// 一个接口可以继承多个接口，创建出多个接口的合成接口

interface PenStroke {
  penWidth: number
}

interface Square extends Shape, PenStroke {
  sideLength: number
}

let square2 = {} as Square
square2.color = 'blue'
square2.sideLength = 10
square2.penWidth = 5.0

// 混合类型

interface Counter {
  (start: number): string
  interval: number,
  reset(): void
}

function getCounter(): Counter {
  let counter = (function (start: number) {}) as Counter
  counter.interval = 123
  counter.reset = function () {}
  return counter
}

let c = getCounter()
c(10)
c.reset()
c.interval = 5.0

// 接口继承类

class Control {
  private state: any
}

interface SelectableControl extends Control {
  select(): void
}

class Button extends Control implements SelectableControl {
  select () {}
}

class TextBox extends Control {
  select () {}
}

// error: 类“ImageC”错误实现接口“SelectableControl”。类型“ImageC”中缺少属性“state”。
// class ImageC implements SelectableControl {
//   select () {}
// }