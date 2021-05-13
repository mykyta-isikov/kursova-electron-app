function executeDBQuery (browseMode, dateFrom, dateTo) {
  /* Import */
  const mongoose = require('mongoose')
  const Conscript = require('../models/Conscript')

  /* DB connection */
  mongoose.connect('mongodb+srv://admin:aKU5z6bdkW0j34wC@kursova1.t8vg1.mongodb.net/kursova-electron-app?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => console.log('Connected to DB'))
    .catch((error) => {
      console.log(error)
      document.getElementById('title').innerHTML = 'Помилка!'
      showError('debug-container', error)
    })

  /* DB query */
  if (browseMode === false) {
    const dateFromString = `${dateFrom.split('.')[1]}.${dateFrom.split('.')[0]}.${dateFrom.split('.')[2]}`
    const dateToString = `${dateTo.split('.')[1]}.${dateTo.split('.')[0]}.${dateTo.split('.')[2]}`
    
    Conscript
      .find({ 
        dateOut: {
          $gte: moment(dateFromString).format('YYYY-MM-DDT00:00:00.000+00:00'),
          $lte: moment(dateToString).format('YYYY-MM-DDT00:00:00.000+00:00')
        } 
      })
      .sort({ dateOut: 'asc' })
      .then((conscripts) => showData(false, conscripts, dateFrom, dateTo))
      .catch((error) => {
        console.log(error)
        document.getElementById('title').innerHTML = 'Помилка!'
        showError('debug-container', error)
      })
  } else if (browseMode === true) {
    Conscript
      .find({})
      .sort({ dateOut: 'asc' })
      .then((conscripts) => showData(true, conscripts, '', ''))
      .catch((error) => {
        console.log(error)
        document.getElementById('title').innerHTML = 'Помилка!'
        showError('debug-container', error)
      })
  }
}
