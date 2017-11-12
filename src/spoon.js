import {getRhymes} from './rhymeDict'
import {vowelPhonemes} from './ipa'


let rhymes = getRhymes()



export function spoon(word1, word2) {
  word1 = word1.toUpperCase()
  word2 = word2.toUpperCase()
  if (rhymes[word1.toUpperCase()] && rhymes[word2.toUpperCase()]) {
    let split1 = sliceStart(rhymes[word1])
    let split2 = sliceStart(rhymes[word2])
    let pron1 = split2[0].concat(split1[1])
    let pron2 = split1[0].concat(split2[1])
    return [pron1, pron2]
  }
  else {
    return null
  }
}

function sliceStart(pron) {
  let i = 0
  while (i < pron.length) {
    if (vowelPhonemes[pron[i].substring(0,2)]) {
      break
    }
    i++
  }
  return [pron.slice(0,i), pron.slice(i, pron.length)]
}
