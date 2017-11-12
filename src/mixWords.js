//@flow
import type {TextWord, PhonemeWord, Word} from './WordTypes'
import {spoon} from './spoon'
import {arpaToIpa} from './ipa'
import {findRhymes} from './rhyme'

export function mixWords(word1:string, word2:string):[Word, Word] {
  let rhymes1 = findRhymes(word1)
  let rhymes2 = findRhymes(word2)
  if (rhymes1.length + rhymes2.length > 0 && Math.random() < .5) {
    let words = [{type: "TextWord", val: ""}, {type: "TextWord", val: ""}]
    if (rhymes1.length > 0) {
      words[0].val = rhymes1[Math.floor(Math.random() * rhymes1.length)]
    }
    else {
      words[0].val = word1
    }
    if (rhymes2.length > 0) {
      words[1].val = rhymes2[Math.floor(Math.random() * rhymes2.length)]
    }
    else {
      words[1].val = word2
    }
    return words
  }
  let words = spoon(word1, word2)
  if (words){
    words[0] = {type: "PhonemeWord", val:arpaToIpa(words[0])}
    words[1] = {type: "PhonemeWord", val:arpaToIpa(words[1])}
    return words
  } else {
    return [
      {type: "TextWord", val: word1},
      {type: "TextWord", val: word2}
    ]
  }
}
