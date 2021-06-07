function validateInput (dateInput1, dateInput2) {
  try {
    let score = 0

    /* Date 1 */
    let day = parseInt(dateInput1.split('.')[0])
    let month = parseInt(dateInput1.split('.')[1])
    let year = parseInt(dateInput1.split('.')[2])

    if (day >= 1 && day <= 31) score++
    if (month >= 1 && month <= 12) score++
    if (year >= 1000 && year <= 3000) score++

    const compareDate1 = `${year}-${month}-${day}`

    /* Date 2 */
    day = parseInt(dateInput2.split('.')[0])
    month = parseInt(dateInput2.split('.')[1])
    year = parseInt(dateInput2.split('.')[2])

    if (day >= 1 && day <= 31) score++
    if (month >= 1 && month <= 12) score++
    if (year >= 1000 && year <= 3000) score++

    const compareDate2 = `${year}-${month}-${day}`

    /* if Date 1 < Date 2 */
    if (moment(compareDate1).isBefore(compareDate2) || moment(compareDate1).isSame(compareDate2)) score++

    return (score === 7)
  } catch {
    return false
  }
}
