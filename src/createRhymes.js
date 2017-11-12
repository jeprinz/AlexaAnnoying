//@flow

let fs = require("fs")
let path = "assets/cmudict-0.7b"
let derp = "assets/wordlistshort.txt"
let cmuDict = fs.createReadStream(path)
let wordList = fs.createReadStream("assets/wordlist.10000.txt")
let gutenList = fs.createReadStream("assets/gutenList.txt")

export let dict = {}

function readLines(input, func) {
  var remaining = ''

  input.on('data', function(data) {
    remaining += data
    let index = remaining.indexOf("\n")
    while (index > -1) {
      let line = remaining.substring(0, index)
      remaining = remaining.substring(index+1)
      func(line)
      index = remaining.indexOf("\n")
    }
  })

  input.on('end', function() {
    if (remaining.length > 0) {
      func(remaining)
    }
  })
}

function yeaJustPrintEm(line) {
  console.log(line)
}

function addToSet(word) {
  dict[word.toUpperCase()] = true
}

function setPronunciation(line) {
  if (line.charAt(0) >= "A" && line.charAt(0) <= "Z") {
    let words = line.split(" ")
    if (dict[words[0]] === true) {
      dict[words[0]] = words.slice(2,words.length)
    }
  }
}
readLines(wordList, addToSet)
//readLines(gutenList, addGutenToSet)
readLines(cmuDict, setPronunciation)

function addGutenToSet(line) {
  line = line.replace(/[^a-z]/gi, '');
  addToSet(line)
}

setTimeout(function() {
  let temp = {}
  for (let key of Object.keys(dict)) {
    if (dict[key] !== true) {
      temp[key] = dict[key]
    }
  }
  dict = temp
  let jsondict = JSON.stringify(dict)
  fs.writeFile("src/rhymeDict.js", jsondict, function(err) {
    if (err) {
      return console.log(err)
    }
  })
}, 10000);

//don't forget to go in and fix hello

/* also do
export function getRhymes() {
  return rhymes
}
var rhymes =
*/
