const express = require('express');
const app = express();
const path = require('path');
const eventsRouter = require('./routers/eventsRouter.js');


app.get("/", (req, res) => {
    const homepage = path.join(__dirname, "./index.html")
    res.sendFile(homepage);
})

app.use("/events", eventsRouter)


app.listen(3000, () => {
    console.log('Server attivo sulla porta http://localhost:3000.');
});