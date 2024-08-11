const { readFile } = require('fs')
const [ bigFile, mediumFile, smallFile] = Array.from(['./file1.txt', './file2.txt', './file3.txt'])

const print = (err, contents) => {
    if (err) {
        console.error(err)
        return
    }
    console.log(contents.toString())
}

// Parallel execution
readFile(bigFile, print)
readFile(mediumFile, print)
readFile(smallFile, print)

// Serial execution
readFile(bigFile, (err, contents) => {
    print(err, contents)
    readFile(mediumFile, (err, contents) => {
        print(err, contents)
        readFile(smallFile, print)
    })
})

// concat the content of each file
const data = []
readFile(bigFile, (err, contents) => {
    console.group('## Concat the content of each file')
    if (err) print(err)
    else data.push(contents)
    readFile(mediumFile, (err, contents) => {
        if (err) print(err)
        else data.push(contents)
        readFile(smallFile, (err, contents) => {
            if (err) print(err)
            else data.push(contents)
            print(null, Buffer.concat(data))
            console.groupEnd('')
        })
    })
})

// Unknown amount of asynchronous operations
const files = Array.from(Array(3)).fill(__filename)
const count = files.length
let index = 0
const read = (file) => {
    console.group(`## Unknown amount of asynchronous operations index: ${index}`)
    readFile(file, (err, contents) => {
        index += 1
        if (err) print(err)
        else data.push(contents)
        if(index < count) read(files[index])
        else print(null, Buffer.from(contents))
        console.groupEnd(`## Unknown amount of asynchronous operations index: ${index} - END`)
    })
}
read(files[0])