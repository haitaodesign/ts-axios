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
