let events = require('../db/events.json');
const path = require('path');
const fs = require('fs');



class ModelEvent {
    id
    title
    description
    date
    maxSeats

    constructor(title, description, date, maxSeats){
        this.description = description
        this.date = date
        this.maxSeats = maxSeats

        let latestid = 1
        events.forEach(el=>el.id>=latestid?latestid=(el.id)+1:latestid)
        this.id = latestid

        this.title = `${title}-${this.id}`

    }


    static saveOnDB(event){
        let modifiedEvent = events.find(el => el.id === event.id)
        if(!modifiedEvent){
            addToList([...events, event])
        } else {
            addToList(events.filter(ev => ev.id !== modifiedEvent.id))
            addToList([...events, event])
        }
    }

    static getFromDB(filters){

        let filteredEvents = [...events]
        if(filters){
            //creo array con le chiavi e filtro per ogni chiave
            Object.keys(filters).forEach(key => {

                let value = filters[key];
                //il nuovo array sarà filtrato in base al valore e alla chiave passati
                filteredEvents = filteredEvents.filter(e => e[key] == value);

            });
        }
        return JSON.stringify(filteredEvents);
    }
}

const addToList = (newElement) => {
    const filePath = path.join(__dirname, '../db/events.json');
    fs.writeFileSync(filePath, JSON.stringify(newElement));
    events = newElement;
}

module.exports = ModelEvent