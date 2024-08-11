const { readFile } = require('fs').promises
const { promisify } = require('util')

async function run() {
    const contents = await readFile(__filename)
    console.log(contents.toString())
}

// run().catch(console.error)

const print = (contents) => {
    console.log(contents.toString())
}

const [bigFile, mediumFile, smallFile] = Array.from(['./file1.txt', './file2.txt', './file3.txt'])

// Secuential execution
async function runSecuential (){
    print(await readFile(bigFile))
    print(await readFile(mediumFile))
    print(await readFile(smallFile))
}

//runSecuential().catch(console.error)

// concatenating files
async function concatFile (){
    const data = [
        await readFile(bigFile),
        await readFile(mediumFile),
        await readFile(smallFile)
    ]
    print(Buffer.concat(data))
}
// concatFile().catch(console.error)

// files array of unknown length
const files = Array.from(['./file1.txt', './file2.txt', './file3.txt'])
async function unknownLength () {
    const data = []
    for (const file of files){
        data.push(await readFile(file))
    }
    print(Buffer.concat(data))
}
// unknownLength().catch(console.error)

// Doesn't matter the result order
async function noOrderMatter () {
    const readers = files.map(file => readFile(file))
    const data = await Promise.all(readers)
    print(Buffer.concat(data))
}

// noOrderMatter().catch(console.error)

// Using promise.allsettled to avoid to reject the entire execution if there is just one failure
async function avoidReject () {
    const readers = files.map(file => readFile(file))
    const results = await Promise.allSettled(readers)
    results.filter(({status}) => status === 'rejected').forEach(({value}) => value)
    const data = results.filter(({status}) => status === 'fulfilled').map(({value}) => value)
    print(Buffer.concat(data))
}

// avoidReject().catch(console.error)

const wrapCallback = promisify((cb) => {
    let index = 0
    const print = (err, contents) => {
        index++
        if (err) {
            console.error(err)
            if (index === 3) cb()
            return
        }
        console.log(contents.toString())
        if (index === 3) cb()
    }
    require('fs').readFile(bigFile, print)
    require('fs').readFile(mediumFile, print)
    require('fs').readFile(smallFile, print)

})

async function runWrapCallback () {
    await wrapCallback()
    console.log('finished!!')
}
runWrapCallback().catch(console.error)

// console.log('done')
