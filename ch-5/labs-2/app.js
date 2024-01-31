const assert = require('assert')

// TODO: 
// implement a way to create a prototype chain
// of leopard -> lynx -> cat
// leopard prototype must have ONLY a hiss method
// lynx prototype must have ONLY a purr method
// cat prototype must have ONLY a meow method

class Leopard {
    constructor(name){
        this.name = name + ' the cat: '
    }

    hiss () {
        console.log(this.name + 'hsss')
    }
}

class Lynx extends Leopard {
    constructor(name){
        super(name)
    }

    purr () {
        console.log(this.name + 'prrr')
    }
}

class Cat extends Lynx{
    constructor(name){
        super(name)
    }

    meow () {
        console.log(this.name + 'meow')
    }
}



const felix = new Cat('Felix') //TODO replace null with instantiation of a cat
felix.meow() // prints Felix the cat: meow
felix.purr() // prints Felix the cat: prrr
felix.hiss() // prints Felix the cat: hsss

// prototype checks, do not remove
const felixProto = Object.getPrototypeOf(felix)
const felixProtoProto = Object.getPrototypeOf(felixProto)
const felixProtoProtoProto = Object.getPrototypeOf(felixProtoProto)
const protoPropNames = Object.getOwnPropertyNames(felixProto)
const protoProtoPropNames = Object.getOwnPropertyNames(felixProtoProto)
const protoProtoProtoPropNames = Object.getOwnPropertyNames(felixProtoProtoProto)

assert(protoPropNames.includes('meow'))
assert(protoProtoPropNames.includes('purr'))
assert(protoProtoProtoPropNames.includes('hiss'))
assert(protoPropNames.length <= (protoPropNames.includes('constructor') ? 2 : 1))
assert(protoProtoPropNames.length <= (protoProtoPropNames.includes('constructor') ? 2 : 1))
assert(protoProtoProtoPropNames.length <= (protoProtoProtoPropNames.includes('constructor') ? 2 : 1))
assert.equal(typeof felixProto.meow, 'function')
assert.equal(typeof felixProtoProto.purr, 'function')
assert.equal(typeof felixProtoProtoProto.hiss, 'function')
console.log('prototype checks passed!')
