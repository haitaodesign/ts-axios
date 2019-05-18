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

// 推断类型
let myAddType2 = function (x: number, y: number): number {
  return x + y
}

// 上下文归类
let myAddType3: (baseValue: number, increment: number) => number = 
function (x, y) {
  return x + y
}

// 可选参数和默认参数

function buildName (firstName: string, lastName: string) {
  return firstName + ' ' + lastName
}

// let result1 = buildName('Bob') // Error: 应有 2 个参数，但获得 1 个。
// let result2 = buildName('bob', 'smiith', 'lee') // error: 应有 2 个参数，但获得 3 个。
let result3 = buildName('Bob', 'haitao') // right

// 可选参数
function buildName2 (firstName: string, lastName?: string) {
  if (lastName) {
    return firstName + ' ' + lastName
  } else {
    return firstName
  }
}

// let result4 = buildName2('Bob') // ok, 参数正常
// let result5 = buildName('bob', 'smiith', 'lee') //error
let result6 = buildName('Bob', 'haitao') // right

// 默认参数

function buildName3 (firstName: string, lastName = 'haitao') {
  return firstName + ' ' + lastName
}

let resut7 = buildName3('Bob', undefined) // ok, return 'Bob haitao'

// 剩余参数
// 剩余参数被当作个数不限的可选参数
function buildName4 (firstName: string, ...restOfName: string []) {
  return firstName + ' ' + restOfName.join(' ')
}

let employeeName = buildName4('vue', 'js', 'css', 'html')

// 省略号用在带有剩余参数的函数类型定义上

let buildNameFun: (firstName: string, ...rest: string[]) => string = buildName4

// this

let deck = {
  suits: ['hearts', 'spades', 'clubs', 'diamonds'],
  cards: Array(52),
  createCardPicker: function () {
    // 这里改写为箭头函数，可以解决 this 导致指向当前对象上下文
    return () => {
    // // 这里不实用箭头函数，在运行时会报错，this.suits[pickedSuit]
    // return function () {
      let pickedCard = Math.floor(Math.random() * 52)
      let pickedSuit = Math.floor(pickedCard / 13)

      return {
        suit: this.suits[pickedSuit], card: pickedCard % 13
      }
    }
  }
}

let cardPicker = deck.createCardPicker()

let pickedCard = cardPicker()

console.log('card: ' + pickedCard.card + ' of' + pickedCard.suit)

// this 参数

function func (this: void) {
  // 确保 this 在此独立函数中不可用
}

interface Card {
  suit: string,
  card: number
}

interface Deck {
  suits: string[]
  cards: number[]

  createCardPicker (this: Deck): () => Card
}

let deck2: Deck = {
  suits: ['hearts', 'spades', 'clubs', 'diamonds'],
  cards: Array(52),
  createCardPicker: function () {
    // NOTE: 函数现在显示指定其被调用方必须是 deck 类型
    return function (this: Deck) {
      let pickedCard = Math.floor(Math.random() * 52)
      let pickedSuit = Math.floor(pickedCard / 13)

      return {
        suit: this.suits[pickedSuit], card: pickedCard % 13
      }
    }
  }
}

let cardPicker2 = deck.createCardPicker()

let pickedCard2 = cardPicker()

console.log('card2: ' + pickedCard2.card + ' of' + pickedCard2.suit)

// this 参数在回调函数里

interface UIElement {
  addClickListener(onclick: (this: void, e: Event) => void): void
}

class Handler {
  type: string

  // onClickBad (this: Handler, e: Event) {
  onClickBad (this: void, e: Event) {
    console.log('clicked!')
    // this.type = e.type
  }
  onClickGood (e: Event) {
    this.type = e.type
  }
}

let h = new Handler()

let uiElement: UIElement = {
  addClickListener () {
  }
}

uiElement.addClickListener(h.onClickBad)

uiElement.addClickListener(h.onClickGood)