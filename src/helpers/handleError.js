const httpError = (res, err) => {
res.status(500)
res.send({ error: 'Error en el servidor'})
}

module.exports = { httpError }