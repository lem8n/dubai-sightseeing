const {
    getSights,
    getSightById,
    updateSight
} = require('./sights/sights');

const {
    logIn,
    logOut
} = require('./users/users')

module.exports = {
    logIn,
    logOut,
    getSights,
    getSightById,
    updateSight
}