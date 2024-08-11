const { EventEmitter } = require('events')

const myEmitter = new EventEmitter()

myEmitter.on('close', () => {console.log('closed event fired!')})
myEmitter.emit('close')

myEmitter.on('add', (a,b) => { console.log(a + b) })
myEmitter.emit('add', 7, 6)

// Listener are also called in the order they are registered
myEmitter.on('my-event', ()=>{console.log('1st')})
myEmitter.on('my-event', ()=>{console.log('2nd')})
myEmitter.emit('my-event')

// add a listener before
myEmitter.on('my-event-2', ()=>{console.log('2nd')})
myEmitter.prependListener('my-event-2', ()=>{console.log('1st')})
myEmitter.emit('my-event-2')

// Event can be called more that once
myEmitter.emit('close')
myEmitter.emit('close')
myEmitter.emit('close')

// Event can be called just once
myEmitter.once('once', () => { console.log('my-event once') })
myEmitter.emit('once')
myEmitter.emit('once')
myEmitter.emit('once')