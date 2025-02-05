const notFound = (req, res, next) => {
    res.status(400).json({message: "Resource not found this server"})
}

module.exports = notFound