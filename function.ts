// 函数

// 命名函数

function add (x, y) {
  return x + y
}

// 匿名函数

let myAdd = function (x, y) {
  return x + y
}


// 函数内访问外部变量
let z = 100

function addToZ (x, y) {
  return x + y + z
}

// 函数类型
// 为函数定义类型

function addType (x: number, y: number): number {
  return x + y
}

let myAddType = function (x: number, y: number): number {
  return x + y
}

// 书写完整的函数类型
// 函数参数包含两部分：参数类型和返回值类型
let myAddComplete: (x: number, y: number) => number = 
function (x: number, y: number): number {
  return x + y
}

// 以参数列表的形式写出参数类型，为每个参数指定一个名字和类型。最大的意义在于增加可读性
// 只要参数类型是匹配的，那么就认为它是有效的参数类型
let myAddComplete2: (baseValue: number, increment: number) => number =
function (x: number, y: number): number {
  return x + y
}
