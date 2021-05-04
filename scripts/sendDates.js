
const { ipcRenderer } = require("electron")
const resultWindowLib = require('../app-components/resultWindow')

function sendDates(){ 
    
    const dates = {
        dateFrom: document.querySelector('#dateFrom').value,
        dateTo: document.querySelector('#dateTo').value
    }
    
    ipcRenderer.send("test-signal", dates)
    console.log("sent!")
    ipcRenderer.on("test-reply", (event, data) => {
        console.log(data)
    })
}