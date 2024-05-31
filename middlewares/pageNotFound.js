const notFound = (req, res) => {
    res.status(404).send('<h1>Pagina non trovata</h1>');
}

module.exports = notFound