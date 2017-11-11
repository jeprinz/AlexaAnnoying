// @flow

export function moreLike(text: string): string | null{
  var words = text.split(' ');
  if (words.length < 2){
    return null
  }

  var word1 = words[0];
  var word2 = words[1];

  var [st1, rest1] = getStartRest(word1)
  var [st2, rest2] = getStartRest(word2)

  word1 = st2 + rest1
  word2 = st1 + rest2

  words[0] = word1
  words[1] = word2

  return words.join(' ')
}


function isVowel(a: string): boolean{
  return "aeiou".indexOf(a) >= 0;
}

function findFirstVowel(word: string): number{
  var letters = word.split('');
  var firstVowel:any = letters.find(isVowel);
  if (typeof firstVowel == "string"){
    return word.indexOf(firstVowel);
  }
  return -1;
}

function getStartRest(word: string){
  var firstVowel = findFirstVowel(word);
  var start = word.substr(0, firstVowel);
  var rest = word.substr(firstVowel);
  return [start, rest]
}
