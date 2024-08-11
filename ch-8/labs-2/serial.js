'use strict'
const { promisify } = require('util')

const print = (err, contents) => { 
  if (err) console.error(err)
  else console.log(contents) 
}

const opA = (cb) => {
  setTimeout(() => {
    cb(null, 'A')
    opB(cb)
  }, 500)
}

const opB = (cb) => {
  setTimeout(() => {
    cb(null, 'B')
    opC(cb)
  }, 250)
}

const opC = (cb) => {
  setTimeout(() => {
    cb(null, 'C')
  }, 125)
}

opA(print)