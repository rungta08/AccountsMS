const axios = require('axios');

exports.validEmployee = (req, res, next) => {
    var config = {
        headers: {'Authorization': "bearer " + req.headers.authorization.split(' ')[1]}
    };
    axios.get('http://localhost:5000/users/authEmployee', config)
    .then((response) => {
        next();
    })
    .catch((err) => {
        next(err.response);
    });
};

exports.validAdmin = (req, res, next) => {
    var config = {
        headers: {'Authorization': "bearer " + req.headers.authorization.split(' ')[1]}
    };
    axios.get('http://localhost:5000/users/authAdmin', config)
    .then((response) => {
        next();
    })
    .catch((err) => {
        next(err.response);
    });
};