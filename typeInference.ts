// 类型推断

// 基础
let x = 3

// 最佳通用类型

let x2 = [0, 1, null]

class Animal {
  numLegs: number
}

class Bee extends Animal {

}

class Lion extends Animal {

}

// 没有找到最佳通用类型的话，类型推断的结果为联合数组类型
let zoo = [new Bee(), new Lion()]
let zoo2: Animal [] = [new Bee(), new Lion()]

// 上下文类型
window.onmousedown = function (mouseEvent) {
  // console.log(mouseEvent.clickTime) // error: [ts] 类型“MouseEvent”上不存在属性“clickTime”。
}

// 若上下文类型表达式包含了明确的类型信息，上下文的类型被忽略了
window.onmousedown = function (mouseEvent: any) {
  console.log(mouseEvent.clickTime)
}

function createZoo(): Animal[] {
  return [new Bee(), new Lion()]
}

// Animal 被作为最佳通用类型
let zoo3 = createZoo()