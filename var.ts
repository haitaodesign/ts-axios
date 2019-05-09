// var 声明

// var a = 10

function f () {
  var message = 'Hello LeeHaiTao!'
  return message
}

function f2 () {
  var a = 10
  return function g () {
    var b = a + 1
    return b
  }
}

var g = f2()
g() // 11

// 作用域规则

function f3 (shouldInitialize) {
  if (shouldInitialize) {
    var x = 10
  }
  console.log(shouldInitialize, x)
  return x
}

// f3(true)  // true 10
// f3(false) // false undefined

function sumMatrix (matrix) {
  var sum = 0
  for (var i =0; i < matrix.length; i++) {
    var currentRow = matrix[i]
    console.log('i', i)
    console.log('currentRow', currentRow)
    for (var i = 0;  i < currentRow.length; i++) {
      sum += currentRow[i]
      console.log('sum', sum)
    }    
  }
  return sum
}
// sumMatrix([[1,2,3],[3,4,5]])

// 捕获变量怪异之处

// for (var i = 0; i < 20; i++) {
//   setTimeout(function () {
//     console.log(i)
//   }, 100 * i);
// }

// 使用立即执行函数捕获每次迭代时 i 的值

for (var i = 0; i < 20; i++) {
  (function (i) {
    setTimeout(function () {
      console.log(i)
    }, 100 * i);
  })(i)
}

// let 声明

let leehaitao = 'leehaitao'

// 块级作用域

function f4 (input: boolean) {
  let a = 100

  if (input) {
    // a可以被访问
    let b = a + 1
    return b
  }
  // Error: Cannot find name 'b'
  // return b
}

// catch 语句里声明的变量也具有同样的作用域

try {
  throw 'oh error!'
} catch (error) {
  console.log('catch you!')
}

// console.log(error) // 找不到名称“error”。你是否指的是“Error”?

// a++ // 声明之前已使用的块范围变量“a”

// let a

function foo () {
  return a
}

foo()

let a