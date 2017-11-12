// @flow
export type PhonemeWord = {
  type: "PhonemeWord",
  val: string
}
export type TextWord = {
  type: "TextWord",
  val: string
}

export type Word = PhonemeWord | TextWord
