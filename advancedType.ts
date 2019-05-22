// 高级类型

// 交叉类型

function extend<T, U> (first: T, second: U): T & U {
  let result = { } as T & U
  for (let id in first) {
    result[id] = first[id] as any
  }
  for (let id in second) {
    if (!result.hasOwnProperty(id)) {
      result[id] = second[id] as any
    }
  }
  return result
}

class Person {
  constructor (public name: string) {

  }
}

interface Loggable {
  log (): void
}

class ConsoleLogger implements Loggable {
  log () {
    // ...
  }
}

var jim = extend(new Person('Jim'), new ConsoleLogger())
var n  = jim.name
jim.log()

// 联合类型

function padLeft (value: string, padding: any) {
  if (typeof padding === 'number') {
    return Array(padding + 1).join(' ') + value
  }
  if (typeof padding === 'string') {
    return padding + value
  }
  throw new Error(`Expected string or number, got '${padding}'`)
}

const str = padLeft('Hello world!', 4)
console.log(str) // "    Hello world!"

let indentedString = padLeft('Hello world!', true) // 编译通过，运行时报错

// 修改padLeft ,解决上面的问题

function padLeft2 (value: string, padding: number | string) {
  if (typeof padding === 'number') {
    return Array(padding + 1).join(' ') + value
  }
  if (typeof padding === 'string') {
    return padding + value
  }
  throw new Error(`Expected string or number, got '${padding}'`)
}

// 编译阶段报错
// let indentedString2 = padLeft2('Hello world!', true) // error: [ts] 类型“true”的参数不能赋给类型“string | number”的参数。

// 如果一个值是联合类型，只能访问此联合类型的所有类型里共有的成员

interface Bird {
  fly ()
  layEggs ()
}

interface Fish {
  swim ()
  layEggs ()
}

function getSmallPet(): Fish | Bird {
  //
  return
}

let pet = getSmallPet()
pet.layEggs()
// pet.swim() // errors: [ts]类型“Bird | Fish”上不存在属性“swim”。类型“Bird”上不存在属性“swim”。

// 类型保护

if ((pet as Fish).swim) {
  (pet as Fish).swim()
} else {
  (pet as Bird).fly()
}

// 用户自定义的类型的保护

function isFish(pet: Fish | Bird): pet is Fish {
  return (pet as Fish).swim !== undefined
}

if (isFish(pet)) {
  pet.swim()
} else {
  pet.fly()
}

// typepf 类型保护

function isNumber (x: any): x is string {
  return typeof x === 'number'
}

function isString (x: any): x is string {
  return typeof x === 'string'
}

function padLeft3 (value: string, padding: number | string) {
  if (isNumber(padding)) {
    return Array(padding + 1).join(' ') + value
  }
  if (isString(padding)) {
    return padding + value
  }
  throw new Error(`Expected string or number, got '${padding}'`)
}

// 可以不用 isNumber or isString, 直接是用 typeof
function padLeft4 (value: string, padding: number | string) {
  if (typeof padding === 'number') {
    return Array(padding + 1).join(' ') + value
  }
  if (typeof padding === 'string') {
    return padding + value
  }
  throw new Error(`Expected string or number, got '${padding}'`)
}

// instanceof 类型保护

class Bird2 {
  fly () {
    console.log('bird fly')
  }

  layEggs () {
    console.log('bird lay eggs')
  }
}

class Fish2 {
  swim () {
    console.log('fish swim')
  }

  layEggs () {
    console.log('fish lay eggs')
  }
}

function getRandomPet () {
  return Math.random() > 0.5 ? new Bird2(): new Fish2()
}

let pet2 = getRandomPet()

if (pet2 instanceof Bird2) {
  pet2.fly()
}
if (pet2 instanceof Fish2) {
  pet2.swim()
}

// 可以为 null 的类型

let s = 'lee'

// s = null // error: 'null'不能赋值给'string'

let sn: string | null = 'hai'

sn = null // ok

// sn = undefined // error: 'undefined'不能赋值给 'string | null'

// 可选参数和可选属性

//  使用了 --strictNullChecks，可选参数会被自动地加上 | undefined
function f (x: number, y?: number) {
  return x + (y || 0)
}

f(1, 2)
f(1)
f(1, undefined)
// f(1, null) // Argument of type 'null' is not assignable to parameter of type 'number | undefined'.

// 可选属性的处理方式

class L {
  a: number
  b?: number
}

let l = new L()
l.a = 12
// l.a = undefined // error
l.b = 13
l.b = undefined // ok
// l.b = null // error

// 类型保护和类型断言

function H (sn: string | null): string {
  if (sn === null) {
    return 'default'
  } else {
    return sn
  }
}

// 使用短路运算符
function H2 (sn: string | null): string {
  return sn || 'default'
}

// 使用! 后缀去除 null 和 undefined

function broken (name: string | null) {
  function postfix(epithet: string) {
    return name.charAt(0) + '. the ' + epithet // error: name 可能为 null
  }
  name = name || 'Lee'
  return postfix('great')
}
function fixed (name: string | null) {
  function postfix(epithet: string) {
    return name!.charAt(0) + '. the ' + epithet // ok
  }
  name = name || 'Lee'
  return postfix('great')
}
broken(null)
fixed(null)

// 字符串字面量类型

type Easing = 'ease-in' | 'ease-out' | 'ease-in-out'

class UIElement {
  animate (dx: number, dy: number, easing: Easing) {
    if (easing === 'ease-in') {

    } else if (easing === 'ease-out') {

    }else if (easing === 'ease-in-out') {

    } else {
      // error
    }
  }
}

let button = new UIElement()
button.animate(0, 0, 'ease-in')
button.animate(0, 0, 'uneasy') // error: [ts] 类型“"uneasy"”的参数不能赋给类型“Easing”的参数。
