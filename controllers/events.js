const ModelEvent = require("../models/event.js")

const index = (req, res)=>{
    let events = JSON.parse(ModelEvent.getFromDB(req.query))
    let html = `<h1>Lista Eventi Trovati</h1>`
    events.map(event => {
        html+= `<h3>${event.title}</h3>
                <p>${event.description}</p>
                <span><strong>${event.maxSeats} </strong></span> <span>${event.date}</span>`
    })
    res.send(html)
}

const store = (req, res)=>{
    let {title, description, date, maxSeats} = req.body;
    if(!title || !description || !date || !maxSeats){
        return res.status(400).send("Inserisci tutti i dati dell'evento da aggiungere")
    }
    let test = new ModelEvent(title, description, date, maxSeats)
    ModelEvent.saveOnDB(test)
    res.send("Creato nuovo evento")
    
}

const update = (req, res)=>{

    let requestedEventID = parseInt(req.params.event);
    let {title, description, date, maxSeats} = req.body;
    if(!title || !description || !date || !maxSeats){
        return res.status(400).send("Inserisci tutti i dati dell'evento da modificare")
    }
    ModelEvent.saveOnDB({"id": requestedEventID, ...req.body})
    res.send("Evento modificato")


}

module.exports = {
    index,
    store,
    update
}