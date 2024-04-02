

function factory() {
    return function doSomeThing(name){
        return 'hola ' + name
    }
}

const fun = factory()
console.log(fun('oscar'))

const obj = {id:999, fn: function (){console.log(this.id)}}
const obj2 = {id:2, fn: obj.fn}

obj2.fn()
obj.fn()

function fn() { console.log(this.id) }
const obj3 = {id:999}
const obj4 = {id:2}
fn.call(obj3)
fn.call(obj4)

function fn (){
    return (offset) => {
        console.log(this.id + offset)
    }
}

const offsetFunction = fn.call(obj3)
offsetFunction(1)
obj3.fn = fn
const off = obj3.fn()
off(2)

console.log('=========== Prototypal inheritance (Functional)')

const wolf = {
    howl: function () {
        console.log(this.name + ': awooooooooooooo')
    }
}

const dog = Object.create(wolf, {
    woof: { value: function () {
            console.log(this.name + ': woof')
        }}
})

function createDog (name) {
    return Object.create(dog, {
        name: {value: name + ' the dog'}
    })
}

const rufus = createDog('rufus')
rufus.howl()
rufus.woof()

console.log(Object.getPrototypeOf(rufus) === dog)
console.log(Object.getPrototypeOf(dog) === wolf)

console.log('=========== Prototypal inheritance (Constructor functions)')


function Wolf (name){
    this.name = name
}

Wolf.prototype.howl = function (){
    console.log(this.name + ': awoooooo')
}

function Dog (name){
    Wolf.call(this, name + ' the dog')
}

function inherit (proto) {
    function ChainLink(){}
    ChainLink.prototype = proto
    return new ChainLink()
}

Dog.prototype = inherit(Wolf.prototype)
Dog.prototype.woof = function (){
    console.log(this.name + ': woof')
}

const ruffus = new Dog('Rufus')
ruffus.howl()
ruffus.woof()

console.log(Object.getPrototypeOf(ruffus) === Dog.prototype)
console.log(Object.getPrototypeOf(Dog.prototype) === Wolf.prototype)

console.log('-----------')

const util = require('util')

function Dog (name) {
    Wolf.call(this, name + ' the dog')
}

Dog.prototype.woof = function () {
    console.log(this.name + ': woof')
}

util.inherits(Dog, Wolf)
const rufffus = new Dog('Rufus')
rufffus.howl()
rufffus.woof()

console.log('=========== Prototypal inheritance (Class-Syntax construction)')

class Wolf2 {
    constructor(name) {
        this.name = name
    }
    howl () {console.log(this.name + ': awwwooooo')}
}

class Dog2 extends Wolf2 {
    constructor(name) {
        super(name + " the dog");
    }
    woof() {console.log(this.name + ': woof')}
}

const ruf = new Dog2('Rufus')
ruf.woof()
ruf.howl()

console.log(Object.getPrototypeOf(ruf) === Dog2.prototype)
console.log(Object.getPrototypeOf(Dog2.prototype) === Wolf2.prototype)