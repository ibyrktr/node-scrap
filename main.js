/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

console.log("Initialize..");

var express = require('express');
var cassandra = require('cassandra-driver');
var app = express();

app.get('/', function (req, res) {
//    res.send('Hello world');
    const client = new cassandra.Client({contactPoints: ['127.0.0.1']});
    client.connect()
            .then(function () {
                console.log('Connected to cluster with %d host(s): %j', client.hosts.length, client.hosts.keys());
                console.log('Keyspaces: %j', Object.keys(client.metadata.keyspaces));
                console.log('Shutting down');
                res.send(Object.keys(client.metadata.keyspaces));
                return client.shutdown();
            })
            .catch(function (err) {
                console.error('There was an error when connecting', err);
                return client.shutdown();
            });
});

var server = app.listen(3000, function () {
    console.log('Express is listening to http://localhost:3000');
});
