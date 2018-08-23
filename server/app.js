const _ = require('lodash');
const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const fs = require('fs');




var USERS = [
    { 'id': 1, 'username': 'abcd', 'role':'admin' },
    { 'id': 2, 'username': 'xyz', 'role':'user' },
];
function getLists(user) {
    let jsonData = require('./appointments.json');
    var list;
    if(user.role == 'admin'){
        list = jsonData.table;
    } else {
        list = _.filter(jsonData.table, ['user_id', user.userID]);
    }
    return list;
}

function getUsers() {
    return USERS;
}

app.use(bodyParser.json());
app.use(expressJwt({secret: 'my-app-super-shared-secret'}).unless({path: ['/api/auth']}));

app.get('/', function (req, res) {
    res.send('Myklassroom appointments');
});
app.post('/api/auth', function(req, res) {
    const body = req.body;

    const user = USERS.find(user => user.username == body.username);
    if(user) {
        if((user.username == 'abcd' && body.password == '1234') || (user.username == 'xyz' && body.password == '4321')){
            var setVal = {"userID":"user_"+user.username,"role":user.role}
            var token = jwt.sign(setVal, 'my-app-super-shared-secret', {expiresIn: '2h'});
            var role = user.role;
            res.send({token,role});
        } else {
            return res.sendStatus(401);
        }
    } else {
        return res.sendStatus(401); 
    }
});
app.get('/api/lists', function (req, res) {
    res.type("json");
    res.send(getLists(req.user));
});

app.post('/api/lists/add', function(req, res) {
    var obj = {
        table: []
     };
    const body = req.body;
    let newdata = req.body;
    fs.readFile('./appointments.json', 'utf8', function readFileCallback(err, data){
        if (err){
            console.log(err);
        } else {
            obj = JSON.parse(data);
            obj.table.push(newdata); 
            json = JSON.stringify(obj, null, 2); 
            fs.writeFile('./appointments.json', json, 'utf8');
            res.send({"status":"success"});
        }
    });
});

app.listen(4000, function () {
    console.log('Angular myKlass Appointments listening on port 4000!')
});
