// 布尔值

let isDone: boolean = false

// 数字

let decLiteral: number = 20             // 十进制
let hexLiteral: number = 0x14           // 十六进制
let binaryLiteral: number = 0b10100     // 二进制
let octalLiteral: number = 0o24         // 八进制

// 字符串

let yourName: string = 'Lee'

yourName = 'lihaitao'

let age: number = 27

let sentence: string = `Hello, my name is ${ yourName }.
I'll be ${age + 1} years old next month`

// 数组（如何支持不同的类型）
// 第一种方式
let list: number[] = [1, 2, 3, 4]

// 第二种方式(泛型)
let list2: Array<number> = [1, 2, 3, 4]

// 元组 Tuple

let x: [string, number]

x = ['hello', 10] // ok

// x = [10, 'hello'] // Error

// 通过索引访问元素

console.log(x[0].substr(1)) // ok

// console.log(x[1].substr(1)) // error ,number不存在‘substr’ 方法

x[3] = 'world' // ok, 字符串可以赋值给（string | number）类型

console.log(x[5].toString()) // OK, 'string' 和 ‘number’ 都有 toString

// x[6] = true    // Error, 布尔不是（string | number）类型

// 注意：自从 TyeScript 3.1 版本之后，访问越界元素会报错，我们不应该再使用该特性。

// 枚举

enum Color {
  Red = 1, // 编号
  Green,
  Blue
}

// let c: Color = Color.Green

let colorName: string = Color[2]

console.log(colorName)

// any

let notSure: any = 4

notSure = 'leehaitao'

notSure = false

// void

function warnUser(): void {
  console.log('This iss my warning message')
}

let unusable: void = undefined

// null 和 undefined ps: 这里需要注意下两者的正确使用场景

let u: undefined = undefined

let n: null = null

// never 表示那些永不存在的值的类型

// 返回 never 的函数必须存在无法达到的终点 
function error(message: string): never {
  throw new Error(message)
}

// 推断的返回值类型为never
function fail () {
  return error('something failing!')
}

// 返回 never 的函数必须存在无法达到的终点
function infiniteLoop (): never {
  while (true) {
  }
}

// object

declare function create(o: object | null) : void

create({ prop: 0 }) // ok
create(null) // ok

// create(42) // Error
// create('string') // Error
// create(false) // Error
// create(undefined) // Error

// 类型断言

let someValue: any = 'this is a string'

// 尖括号
let strLength: number = (<string>someValue).length

// as 语法

let strLength2: number = (someValue as string).length


