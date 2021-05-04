function showData(dateFrom, dateTo) {
    // Import
    var moment = require('moment'); 

    const mongoose = require('mongoose')
    const Conscript = require('../models/Conscript')

    var temp2 = `${dateFrom.split('.')[1]}.${dateFrom.split('.')[0]}.${dateFrom.split('.')[2]}`
    var temp3 = `${dateTo.split('.')[1]}.${dateTo.split('.')[0]}.${dateTo.split('.')[2]}`
    
    var leftDate = moment(temp2).format("MM.DD.YYYY").toString();
    var rightDate = moment(temp3).format("MM.DD.YYYY").toString();

    // DB connection
    mongoose.connect('mongodb+srv://admin:aKU5z6bdkW0j34wC@kursova1.t8vg1.mongodb.net/kursova-electron-app?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true})
        .then((result) => console.log('Connected to DB'))
        .catch((error) => {
            console.log(error)
            document.getElementById("title").innerHTML = `Помилка!`;
            showError('debug-container', error)
        })

    Conscript
    .find({})
    .sort({ dateOut: 'asc'})  
        .then((conscripts) => {
            console.log('Database contents fetched successfully');

            var counter = 0

            try{
                for (i = 0; i < conscripts.length; i++) {
                    if(checkDate(conscripts[i]._doc.dateOut, dateFrom, dateTo)){
                        renderRow(conscripts, i)
                        counter++
                    }
                }

                if (counter > 0) createTxtDocument(conscripts, dateFrom, dateTo)

                document.getElementById("title").innerHTML = `${dateFrom}-${dateTo} (${document.getElementsByTagName('tr').length-1} знайдено)`;
            }
            catch(error){
                console.log(error)
                document.getElementById("title").innerHTML = `Помилка!`;
                
                showError('debug-container', error)
            }

            if (counter > 0) {
                document.getElementById("table-and-debug").style.display = "block";
                document.getElementById("preloader").style.display = "none";
            }
            else if (counter == 0) {
                document.getElementById("nothing").style.display = "block";
                document.getElementById("preloader").style.display = "none";
            }
            
        })
        .catch((error) => {
            console.log(error)
            document.getElementById("title").innerHTML = `Помилка!`;

            showError('debug-container', error)
        })
}