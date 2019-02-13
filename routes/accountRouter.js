const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const helper = require('../utility/_helper');

const Accounts = require('../models/accounts');

const accountRouter = express.Router();
accountRouter.use(bodyParser.json());

accountRouter.route('/')
.get(helper.validEmployee, (req, res, next) => {
    Accounts.find({})
    .then((accounts) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(accounts);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(helper.validEmployee, (req, res, next) => {
    Accounts.create(req.body)
    .then((account) => {
        console.log('Account Created ', account);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(account);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete(helper.validAdmin, (req, res, next) => {
    Accounts.remove({})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));    
});

accountRouter.route('/:accountId')
.get(helper.validEmployee, (req, res, next) => {
    Accounts.findById(req.params.accountId)
    .then((account) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(account);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put(helper.validEmployee, (req, res, next) => {
    Accounts.findByIdAndUpdate(req.params.accountId, {
        $set: req.body
    }, { new: true })
    .then((account) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(account);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete(helper.validAdmin, (req, res, next) => {
     Accounts.findByIdAndRemove(req.params.accountId)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});

accountRouter.route('/pancard/:pancard')
.get(helper.validEmployee, (req, res, next) => {
    Accounts.find({pancard: req.params.pancard})
    .then((accounts) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(accounts);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete(helper.validAdmin, (req, res, next) => {
    Accounts.find({pancard: req.params.pancard})
    .then((accounts) => {
        Accounts.findByIdAndRemove(accounts.accountId)
        .then((resp) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(resp);
        }, (err) => next(err))
        .catch((err) => next(err));
    }, (err) => next(err))
    .catch((err) => next(err));
});

module.exports = accountRouter;