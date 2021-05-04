var moment = require('moment'); 

function checkDate(currentDateOut, leftDateString, rightDateString){
    try{
        currentDateOut = moment(currentDateOut).format("DD.MM.YYYY").toString()

        var temp1 = `${currentDateOut.split('.')[1]}.${currentDateOut.split('.')[0]}.${currentDateOut.split('.')[2]}`
        var temp2 = `${leftDateString.toString().split('.')[1]}.${leftDateString.toString().split('.')[0]}.${leftDateString.toString().split('.')[2]}`
        var temp3 = `${rightDateString.toString().split('.')[1]}.${rightDateString.toString().split('.')[0]}.${rightDateString.toString().split('.')[2]}`

        var controlDate = moment(temp1).format("YYYY-MM-DD").toString();
        var leftDate = moment(temp2).subtract(1, 'days').format("YYYY-MM-DD").toString();
        var rightDate = moment(temp3).add(1, 'days').format("YYYY-MM-DD").toString();

    }
    catch(error){
        console.log(error)
    }

    if((moment(controlDate).isAfter(leftDate)) && (moment(controlDate).isBefore(rightDate))){
        return true
    }else{
        return false
        
    }
}
