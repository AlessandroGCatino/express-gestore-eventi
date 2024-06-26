const express = require('express');
const app = express();
const path = require('path');
const eventsRouter = require('./routers/eventsRouter.js');
const pageNotFound = require('./middlewares/pageNotFound.js');
const handleErrors = require("./middlewares/handleErrors.js");


app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.get("/", (req, res) => {
    const homepage = path.join(__dirname, "./index.html")
    res.sendFile(homepage);
})

app.use("/events", eventsRouter)

app.use(pageNotFound);

app.use(handleErrors)



app.listen(3000, () => {
    console.log('Server attivo sulla porta http://localhost:3000.');
});