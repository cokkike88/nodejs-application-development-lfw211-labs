// const timeout = setTimeout(() => {
//     console.log('will not be logged');
// }, 1000)
//
// setImmediate(() => { clearTimeout(timeout)})

import { setTimeout } from 'timers/promises'

const timeout = setTimeout(1000, 'will be logged')
setImmediate(() => {
    clearTimeout(timeout)
})

// console.log(await timeout)

const ac = new AbortController()
const { signal } = ac
const timeout2 = setTimeout(1000,'Will NOT be logged', { signal })

setImmediate(() => {
    ac.abort()
})

try {
    console.log(await timeout2)
} catch (e) {
    if (e.code !== 'ABORT_ERR') throw e
}