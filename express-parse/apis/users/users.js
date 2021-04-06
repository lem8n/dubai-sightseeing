const router = require('express').Router();

const {
    logIn,
    logOut
} = require('../../functions/functions');

router.post('/login', async (req, res) => {
    console.log('irthe sto user api me login');
    await logIn(req, res);
});

router.get('/logout', async (req, res) => {
    console.log('irthe sto user api me logout');
    await logOut(req, res);
});

module.exports = router
