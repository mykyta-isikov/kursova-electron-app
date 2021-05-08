function checkDate (currentDateOut, leftDateString, rightDateString) {
  try {
    currentDateOut = moment(currentDateOut).format('DD.MM.YYYY').toString()

    const contDateStr = `${currentDateOut.split('.')[1]}.${currentDateOut.split('.')[0]}.${currentDateOut.split('.')[2]}`
    const lDateStr = `${leftDateString.toString().split('.')[1]}.${leftDateString.toString().split('.')[0]}.${leftDateString.toString().split('.')[2]}`
    const rDateStr = `${rightDateString.toString().split('.')[1]}.${rightDateString.toString().split('.')[0]}.${rightDateString.toString().split('.')[2]}`

    const controlDate = moment(contDateStr).format('YYYY-MM-DD').toString()
    const leftDate = moment(lDateStr).subtract(1, 'days').format('YYYY-MM-DD').toString()
    const rightDate = moment(rDateStr).add(1, 'days').format('YYYY-MM-DD').toString()

    if ((moment(controlDate).isAfter(leftDate)) && (moment(controlDate).isBefore(rightDate))) {
      return true
    } else {
      return false
    }
  } catch (error) {
    console.log(error)
  }
}
