export function wordDeclension(count: number, words: string[]) {
  if (count % 10 === 1 && count % 100 !== 11) {
    return words[0]
  } else if (count % 10 >= 2 && count % 10 <= 4 && (count % 100 < 12 || count % 100 > 14)) {
    return words[1]
  } else {
    return words[2]
  }
}
