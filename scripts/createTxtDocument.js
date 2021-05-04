var moment = require('moment'); 
const fs = require('fs')

function createTxtDocument (array, dateFrom, dateTo){
    
    /*** Variables  ***/
    var headers = [
        "Прізвище, ім'я",
        "Телефон",
        "Звання",
        "Дата призову",
        "Дата звільнення",
        "Днів",
        "Частина"
    ]
    var outputString = ""
    var maxLengthArray = [0,0,0,0,0,0,0]
    var checkedRows = []
    counter = 0

    /*** Calculating maximum column width  ***/
    for(i = 0; i < maxLengthArray.length; i++) {
        if(maxLengthArray[i] < headers[i].length+1) maxLengthArray[i] = headers[i].length+1
    }

    for (var i = 0; i < array.length; i++) { 
        if(checkDate(array[i]._doc.dateOut, dateFrom, dateTo)) {
            checkedRows[counter] = []
            
            for (var j = 0; j < maxLengthArray.length; j++) {
                if(j == 0) checkedRows[counter][j] = `${array[i]._doc.name.last} ${array[i]._doc.name.first}`
                if(j == 1) checkedRows[counter][j] = array[i]._doc.phone
                if(j == 2) checkedRows[counter][j] = array[i]._doc.rank
                if(j == 3) checkedRows[counter][j] = moment(array[i]._doc.dateIn).format("DD.MM.YYYY")
                if(j == 4) checkedRows[counter][j] = moment(array[i]._doc.dateOut).format("DD.MM.YYYY")
                if(j == 5) checkedRows[counter][j] = calculateDays(array[i]._doc.dateIn, array[i]._doc.dateOut)
                if(j == 6) checkedRows[counter][j] = array[i]._doc.base
                
                if(maxLengthArray[j] < checkedRows[counter][j].length+1) {
                     maxLengthArray[j] = checkedRows[counter][j].length+1
                }
            }
            counter++
        }
    }

    /*** Table building ***/
    outputString += blankRow('-', '+') + headerRow() + blankRow('=', '+')

    for(i = 0; i < checkedRows.length; i++) {
        outputString += filledRow(i)
        outputString += blankRow('-', '+')
    }

    /*** Table exproting ***/
    fs.writeFile(`../exports/${dateFrom}-${dateTo}.txt`, outputString, function(error) {
        if (error) {
            console.log(error);
        }
    })

    /*** Row-creating methods ***/
    function blankRow(bottomline, intersection) {
        var res = ""
        res += intersection
        for (var i = 0; i < maxLengthArray.length; i++) {
            
            for (var j = 0; j < maxLengthArray[i]; j++) {
                res += bottomline
            }
            res += intersection
        }
        res += "\n"

        return res
    }

    function filledRow(index) {
        var res = ""
        res += "|"
        for (var i = 0; i < maxLengthArray.length; i++) {
            res += columnWithSpaces(maxLengthArray[i], checkedRows[index][i])
            res += "|"
        }
        
        res += "\n"

        return res
    }

    function headerRow() {     

        var res = ""
        res += "|"

        for(i = 0; i < maxLengthArray.length; i++) {
            res += columnWithSpaces(maxLengthArray[i], headers[i])
            res += "|"
        }
        res += "\n"

        return res
    }

    function columnWithSpaces(totalLength, input) {
        var res = ""
        res += input.toString()

        for (var i = 0; i < totalLength-input.toString().length; i++) {
            res += " "
        }
        
        return res
    }
}