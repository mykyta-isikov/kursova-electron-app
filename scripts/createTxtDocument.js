const fs = require('fs')
const path = require('path')

function createTxtDocument (array, dateFrom, dateTo) {
  /* Variables  */
  const headers = [
    'Прізвище, ім\'я',
    'Телефон',
    'Звання',
    'Дата призову',
    'Дата звільнення',
    'Днів',
    'Частина'
  ]
  const maxLengthArray = [0, 0, 0, 0, 0, 0, 0] // Should be always == headers.length
  const folderPath = path.join(__dirname, '../../../exports')
  const filePath = path.join(__dirname, `../../../exports/${dateFrom}-${dateTo}.txt`)
  const checkedRows = []
  let outputString = ''
  let counter = 0

  /* Calculating maximum column width  */
  for (let i = 0; i < maxLengthArray.length; i++) {
    if (maxLengthArray[i] < headers[i].length + 1) maxLengthArray[i] = headers[i].length + 1
  }

  for (let i = 0; i < array.length; i++) {
    if (checkDate(array[i]._doc.dateOut, dateFrom, dateTo)) {
      checkedRows[counter] = []

      for (let j = 0; j < maxLengthArray.length; j++) {
        if (j === 0) checkedRows[counter][j] = `${array[i]._doc.name.last} ${array[i]._doc.name.first}`
        if (j === 1) checkedRows[counter][j] = array[i]._doc.phone
        if (j === 2) checkedRows[counter][j] = array[i]._doc.rank
        if (j === 3) checkedRows[counter][j] = moment(array[i]._doc.dateIn).format('DD.MM.YYYY')
        if (j === 4) checkedRows[counter][j] = moment(array[i]._doc.dateOut).format('DD.MM.YYYY')
        if (j === 5) checkedRows[counter][j] = calculateDays(array[i]._doc.dateIn, array[i]._doc.dateOut)
        if (j === 6) checkedRows[counter][j] = array[i]._doc.base

        if (maxLengthArray[j] < checkedRows[counter][j].length + 1) {
          maxLengthArray[j] = checkedRows[counter][j].length + 1
        }
      }
      counter++
    }
  }

  /* Table building */
  outputString += blankRow('-', '+') + headerRow() + blankRow('=', '+')

  for (let i = 0; i < checkedRows.length; i++) {
    outputString += filledRow(i)
    outputString += blankRow('-', '+')
  }

  fs.mkdir(folderPath, (error) => {
    if (error) {
      console.log(error)
      console.log(folderPath)
    } else {
      console.log('directory created')
    }
  })
  /* Table exproting */
  fs.writeFile(filePath, outputString, function (error) {
    if (error) {
      console.log(error)
    } else {
      console.log('file created')
    }
  })

  /* Row-creating methods */
  function blankRow (bottomline, intersection) {
    let res = ''
    res += intersection
    for (let i = 0; i < maxLengthArray.length; i++) {
      for (let j = 0; j < maxLengthArray[i]; j++) {
        res += bottomline
      }
      res += intersection
    }
    res += '\n'

    return res
  }

  function filledRow (index) {
    let res = ''
    res += '|'
    for (let i = 0; i < maxLengthArray.length; i++) {
      res += columnWithSpaces(maxLengthArray[i], checkedRows[index][i])
      res += '|'
    }
    res += '\n'

    return res
  }

  function headerRow () {
    let res = ''
    res += '|'

    for (let i = 0; i < maxLengthArray.length; i++) {
      res += columnWithSpaces(maxLengthArray[i], headers[i])
      res += '|'
    }
    res += '\n'

    return res
  }

  function columnWithSpaces (totalLength, input) {
    let res = ''
    res += input.toString()

    for (let i = 0; i < totalLength - input.toString().length; i++) {
      res += ' '
    }
    return res
  }
}
