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
