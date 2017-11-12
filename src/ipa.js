export let ipa = {}
ipa.AA = "ɑ"
ipa.AE = "æ"
ipa.AH = "ʌ"
ipa.AO = "ɔ"
ipa.AW = "aʊ"
ipa.AY = "aɪ"
ipa.B  = "b"
ipa.CH = "tʃ"
ipa.D  = "d"
ipa.DH = "ð"
ipa.EH = "ɛ"
ipa.ER = "ɝ"
ipa.EY = "eɪ"
ipa.F  = "f"
ipa.G  = "ɡ"
ipa.HH = "h"
ipa.IH = "ɪ"
ipa.IY = "i"
ipa.JH = "dʒ"
ipa.K  = "k"
ipa.L  = "l"
ipa.M  = "m"
ipa.N  = "n"
ipa.NG = "ŋ"
ipa.OW = "oʊ"
ipa.OY = "ɔɪ"
ipa.P  = "p"
ipa.R  = "ɹ"
ipa.S  = "s"
ipa.SH = "ʃ"
ipa.T  = "t"
ipa.TH = "θ"
ipa.UH = "ʊ"
ipa.UW = "u"
ipa.V  = "v"
ipa.W  = "w"
ipa.Y  = "j"
ipa.Z  = "z"
ipa.ZH = "ʒ"

import type {PhonemeWord} from './WordTypes'
import type {TextWord} from './WordTypes'

let vowelList = ["AA", "AE", "AH", "AO", "AW", "AY", "EH", "ER", "EY", "IH", "IY", "OW", "OY", "UH", "UW"]
export let vowelPhonemes = {}
for (let vowel of vowelList) {
  vowelPhonemes[vowel] = true
}

export function arpaToIpa(pron) {
  let ipaPron = []
  for (let i = 0; i < pron.length; i++) {
    if (vowelPhonemes[pron[i].substring(0,2)]) {
      ipaPron[i] = ipa[pron[i].substring(0,2)]
      if (pron[i].charAt(2) == "1") {
        ipaPron[i] = "ˈ" + ipaPron[i]
      }
      else if (pron[i].charAt(2) == "2") {
        ipaPron[i] = "ˌ"
      }
    }
    else {
      ipaPron[i] = ipa[pron[i]]
    }
  }
  let ipaString = ipaPron.join("")
  return ipaString
}
