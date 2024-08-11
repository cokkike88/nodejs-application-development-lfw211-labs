import { once, EventEmitter } from 'events'
const uneventful = new EventEmitter()

await once(uneventful, 'ping')
console.log('pinged!!')