// @flow
//Returns list of some words in the input, in order of importance (most to least)

import nlp from 'compromise'

export function load(name: string){
  delete require.cache[require.resolve(name)]
  return require(name)
}

const verbs = "gets".split(" ")
const nouns = "you me him her I".split(" ")
const articles = "a an the".split(" ")
const others = "can".split(" ")

function getPOS(word: string){
  word = word.toLowerCase()
  if (verbs.indexOf(word) >= 0){
    return "verb"
  }
  if (nouns.indexOf(word) >= 0){
    return "noun"
  }
  if (articles.indexOf(word) >= 0){
    return "article"
  }
  if (others.indexOf(word) >= 0){
    return "other"
  }

  const r = nlp(word);
  if (r.nouns().out('string') != ""){
    return "noun"
  } else if (r.verbs().out('string') != ""){
    return "verb"
  } else if (r.adjectives().out('string') != ""){
    return "adjective"
  } else if (r.adverbs().out('string') != ""){
    return "adverb"
  }
}

export function importantWords(text: string){
  var words: any =  nlp.tokenize(text).out("string").split(" ")
  var poss = words.map((w) => getPOS(w))
  // return sortByImportance(words, poss);
  var importances: any =
    poss.map((word, i, arr) => getImportance(words, poss, i))
  return importances
}

export function importantTwoAndAll(text: string): [number, number, [string]]{
  const importancies = importantWords(text)
  var biggest = 0
  var biggIndex =
    importancies.reduce((iMax, x, i, arr) => x > arr[iMax] ? i : iMax, 0);
  var secondIndex =
    importancies.reduce((iMax, x, i, arr) => x > arr[iMax] && i != biggIndex ? i : iMax, 0);

  return [biggIndex, secondIndex, nlp.tokenize(text).out("string").split(" ")]
}

function sortByImportance(words: [string], poss: [string]){
    var importances: any =
      poss.map((word, i, arr) => getImportance(words, poss, i))
    return sortWithImportance(words, importances)
}

function getImportance(words: [string], poss: [string], i: number): number{
  const prevp = poss[i-1]
  const wordp = poss[i]
  const nextp = poss[i+1]

  const prev = words[i-1]
  const word = words[i]
  const next = words[i+1]

  var importance = 0
  if (wordp == "noun"){
    importance += 1
  }
  if (wordp == "noun" && nextp == "verb"){
    importance += 1
  }
  if (wordp == "noun" && (prevp == "verb" || prevp == "article")){
    importance += 0.5
  }
  if (prevp == "adjective"){
    importance += 1
  }
  if (nextp == "noun" || nextp == "adverb"){
    importance += 0.5
  }

  if (i == 0 && ((wordp == "noun" && nextp != "noun") || wordp == "verb")){
    importance += 2
  }

  if (i == words.length - 1 && wordp == "verb"){
    importance += 2
  }

  return importance
}

const zip = rows=>rows[0].map((_,c)=>rows.map(row=>row[c]))

function sortWithImportance(valList, importanceList){
  var list: any = zip([valList, importanceList])
  list.sort(([v, i], [v1, i1]) => i1 - i)
  return list.map(([v,i]) => v)
}
