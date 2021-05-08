function showData (dateFrom, dateTo) {
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
  Conscript
    .find({})
    .sort({ dateOut: 'asc' })
    .then((conscripts) => {
      console.log('Database contents fetched successfully')

      let counter = 0

      try {
        /* Loop through search results */
        for (let i = 0; i < conscripts.length; i++) {
          /* Render row if "dateOut" is in range */
          if (checkDate(conscripts[i]._doc.dateOut, dateFrom, dateTo)) {
            renderRow(conscripts, i)
            counter++
          }
        }

        /* If found anything, create .txt document */
        if (counter > 0) createTxtDocument(conscripts, dateFrom, dateTo)

        /* Change header */
        document.getElementById('title').innerHTML = `${dateFrom}-${dateTo} (${document.getElementsByTagName('tr').length - 1} знайдено)`
      } catch (error) {
        console.log(error)
        document.getElementById('title').innerHTML = 'Помилка!'

        showError('debug-container', error)
      }

      /* 0 search results handler */
      if (counter > 0) {
        document.getElementById('table-and-debug').style.display = 'block'
        document.getElementById('preloader').style.display = 'none'
      } else if (counter === 0) {
        document.getElementById('nothing').style.display = 'block'
        document.getElementById('preloader').style.display = 'none'
      }
    })
    .catch((error) => {
      console.log(error)
      document.getElementById('title').innerHTML = 'Помилка!'

      showError('debug-container', error)
    })
}
