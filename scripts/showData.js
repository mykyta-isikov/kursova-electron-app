function showData (browseMode, dataObject, dateFrom, dateTo) {
  console.log('processing db contents')

  let counter = 0

  try {
    /* Loop through search results */
    for (let i = 0; i < dataObject.length; i++) {
      renderRow(dataObject, i)
      counter++
    }

    /* If found anything, create .txt document */
    if (counter > 0 && browseMode === false) createTxtDocument(dataObject, dateFrom, dateTo)

    /* Change header */
    if (browseMode === false) {
      document.getElementById('title').innerHTML = `${dateFrom}-${dateTo} (${document.getElementsByTagName('tr').length - 1} знайдено)`
    } else {
      document.getElementById('title').innerHTML = `Всі військовозобов'язані: ${document.getElementsByTagName('tr').length - 1} осіб`
    }
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
}
