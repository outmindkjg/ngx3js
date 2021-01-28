var
    worker = require("worker-loader!./worker"),
    three  = require("three")

var Physijs = require("./physi")(worker, three)

module.exports = Physijs