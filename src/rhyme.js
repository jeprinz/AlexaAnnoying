//@flow

import {getRhymes} from './rhymeDict'
import {isVowel}   from './ipa'

export let rhymes = getRhymes()
export let rhymeMap = makeRhymeMap(rhymes)

function makeRhymeMap(prons) {
  let rMap = {}
  for (let key of Object.keys(prons)) {
    let ultima = getUltima(prons[key])
    if (!rMap[ultima]) {
      rMap[ultima] = [key]
    }
    else {
      rMap[ultima].push(key)
    }
  }
  return rMap
}

export function getUltima(pron:string[]):string {
  let i = pron.length - 1
  let index = 0
  let foundLastVowel = false
  while (i >= 0) {
    if (foundLastVowel) {
      if (isVowel(pron[i])) {
        index = i-1
        break
      }
    }
    else {
      if (isVowel(pron[i])) {
        foundLastVowel = true
        index = i-1
      }
    }
    i--
  }
  return pron.slice(index+1).join("")
}

export function findRhymes(word:string):string[] {
  word = word.toUpperCase()
  if (rhymes[word]) {
    let initialRhymes = rhymeMap[getUltima(rhymes[word])];
    let z = initialRhymes.indexOf(word)
    if (z > -1) {
      initialRhymes = initialRhymes.splice(z, 1)
    }
    return initialRhymes
  }
  else {
    return []
  }
}
