// @flow
import {importantTwoAndAll} from './importantWords'
import type {Word, TextWord, PhonemeWord} from './WordTypes'
import {mixWords} from './mixWords'


export function moreLike(input: string): string{
  var innerText;
  const [i1, i2, all: [string]] = importantTwoAndAll(input)
  if (all.length <= 2){
    innerText = input;
  } else {
    const word1 = all[i1]
    const word2 = all[i2]

    const allAsWords: any = all.map(function(w:string): TextWord{
      return ({
        type: "TextWord",
        val: w}
      )
    });

    (allAsWords: [Word])

    //do swap and whatever
    const [new1, new2] = mixWords(word1, word2)
    allAsWords[i1] = new1
    allAsWords[i2] = new2
    const words = allAsWords.map(formatWord)
    words[i1] = emphasise(words[i1])
    words[i2] = emphasise(words[i2])
    innerText = words.join(" ")
  }

  return "more like " + innerText + "."
}

function emphasise(text: string): string{
  return "<emphasis level=\"strong\"> " + text + "</emphasis>"
}

function formatWord(word: Word): string{
  function phonemeText(word: Word): string{
    return "<phoneme alphabet=\"ipa\" ph=\"" + word.val + "\">placeholder</phoneme>"
  }
  if (word.type == "PhonemeWord"){
    return phonemeText(word)
  } else {
    return word.val
  }
}
