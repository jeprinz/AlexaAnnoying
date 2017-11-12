// @flow
import {importantTwoAndAll} from './importantWords'
import type {Word, TextWord, PhonemeWord} from './WordTypes'



function moreLike(input: string): string{
  const [i1, i2, all: [string]] = importantTwoAndAll(input)
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
  //const [new1, new2] = spoonerism(word1, word2)
  //all[i1] = new1
  //all[i2] = new2



  const innerText = allAsWords.map(formatWord).join(" ")

  return "<speak> more like " + innerText + ".</speak>"
}

function formatWord(word: Word): string{
  function phonemeText(word: Word): string{
    return "<phoneme alphabet=\"ipa\" ph=" + word.val + ">placeholder</phoneme>"
  }
  if (word.type == "PhonemeWord"){
    return phonemeText(word)
  } else {
    return word.val
  }
}
