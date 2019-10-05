const round = (digits, fixedDecimals) => number => {
  const rounded = Math.round(Math.pow(10, digits) * number) / Math.pow(10, digits)
  if (fixedDecimals) {
    let resultString = rounded.toString()
    if (rounded === Math.round(rounded)) {
      resultString += '.'
    }
    let n = Math.pow(10, digits) * number
    for (let i = 0; i < digits; i++) {
      if (n >= 10 && n % 10 === 0) {
        resultString += '0'
        n /= 10
      } else {
        break
      }
    }
    return resultString
  }
  return rounded.toString()
}

// TODO: proper implementation
const hasAdministrationRights = userId => userId === '61270112'


export {round, hasAdministrationRights}