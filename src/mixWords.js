//@flow
import type {TextWord, PhonemeWord, Word} from './WordTypes'
import {spoon} from './spoon'
import {arpaToIpa} from './ipa'

export function mixWords(word1:string, word2:string):[Word, Word] {
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
