const mariadb = require('mariadb');
const {host, user, password } = require('./dbConfig')
const raphael = mariadb.createPool({
    host: host,
    user: user,
    password: password,
    database: 'raphael',
    supportBigNumbers: true,
    bigNumberStrings: true
});

raphael.getConnection()
    .then(conn => {
    console.log('Connected')
})
    .catch(err => {
        console.log('Error at Connection', err)
    });

module.exports = {
    raphael
}