// 泛型
// 基本示例

function identity(arg: number): number {
  return arg
}

function identity2(arg: any): any {
  return arg
}

function identity3<T>(arg: T): T {
  return arg
}

let output = identity3<string>('myString')

let output2 = identity3('myString')

// 泛型变量

function loggingIdentity<T>(arg: T): T {
  // console.log(arg.length) // error: [ts] 类型“T”上不存在属性“length”。
  return arg
}

function loggingIdentity2<T>(arg: T[]): T[] {
  console.log(arg.length)
  return arg
}


// 泛型类型

let myIdentity: <T>(arg: T) => T = identity3

// 使用不同的泛型参数名
let myIdentity2: <U>(arg: U) => U = identity3

// 使用带有调用签名的对象字面量来定义泛型函数

let myIdentity3: { <T>(arg: T) : T } = identity3

// 泛型接口

interface GenericIdentityFn {
  <T>(arg: T): T
}

let myIdentity4: GenericIdentityFn = identity3

// 转换为泛行接口
interface GenericIdentityFn2<T> {
  (arg: T): T
}

let myIdentity5: GenericIdentityFn2<number> = identity3

// 泛型类

class GenericNumber<T> {
  zeroValue: T
  add: (x: T, y: T) => T
}

// number
let myGenericNumber = new  GenericNumber<number>()
myGenericNumber.zeroValue = 0
myGenericNumber.add = function (x, y) {
  return x + y
}

// string
let stringNumberic = new GenericNumber<string>()
stringNumberic.zeroValue = ''
stringNumberic.add = function (x, y) {
  return x + y
}

// 泛型约束

interface Lengthwise {
  length: number
}

function loggingIdentity3<T extends Lengthwise>(arg: T): T {
  console.log(arg.length) // ok
  return arg
}

// loggingIdentity3(3) // error: [ts] 类型“3”的参数不能赋给类型“Lengthwise”的参数。

loggingIdentity3({length: 10, value: 3}) // ok

// 在泛型约束中使用类型参数

function getProperty<T, K extends keyof T> (obj: T, key: K) {
  return obj[key]
}

let x = { a: 1, b: 2, c: 3, d: 4 }

getProperty(x, 'a') // ok

// getProperty(x, 'm') // error: [ts] 类型“"m"”的参数不能赋给类型“"a" | "b" | "c" | "d"”的参数。
