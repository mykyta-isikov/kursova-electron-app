function renderRow (data, key) {
  const tbody = document.getElementById('dataTable')
  const tr = document.createElement('tr')

  for (let j = 0; j < 7; j++) {
    const td = document.createElement('td')

    if (j === 0) td.appendChild(document.createTextNode(`${data[key]._doc.name.last} ${data[key]._doc.name.first}`))
    if (j === 1) td.appendChild(document.createTextNode(data[key]._doc.phone))
    if (j === 2) td.appendChild(document.createTextNode(data[key]._doc.rank))
    if (j === 3) td.appendChild(document.createTextNode(moment(data[key]._doc.dateIn).format('DD.MM.YYYY')))
    if (j === 4) td.appendChild(document.createTextNode(moment(data[key]._doc.dateOut).format('DD.MM.YYYY')))
    if (j === 5) td.appendChild(document.createTextNode(calculateDays(data[key]._doc.dateIn, data[key]._doc.dateOut)))
    if (j === 6) td.appendChild(document.createTextNode(data[key]._doc.base))

    tr.appendChild(td)
  }
  tbody.appendChild(tr)
}
