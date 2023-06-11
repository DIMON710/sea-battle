const express = require('express');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 5000;
const ADDRESS = 'localhost';
const CLIENT = 'https://dimension-sea-battle.onrender.com';
// const CLIENT = 'http://localhost:5173';



const https = require('https').Server(app)
const cors = require('cors')
const socketIO = require('socket.io')(http, {
    cors: {
        origin: CLIENT
    }
});

let myField1 = [
    // ['▩','','','','','','','','',''],
    // ['','','','','','','','','',''],
    // ['▩','','','▩','▩','','','','',''],
    // ['▩','','','','','','','▩','▩',''],
    // ['','','▩','▩','▩','▩','','','',''],
    // ['▩','','','','','','','','▩',''],
    // ['','','','','','','','','▩',''],
    // ['','▩','▩','▩','','','','','▩',''],
    // ['','','','','','','','','',''],
    // ['▩','','','','▩','','','','','']
    ['','','','','','','','','',''],
    ['','','','','','','','','',''],
    ['','','','','','','','','',''],
    ['','','','','','','','','',''],
    ['','','','','','','','','',''],
    ['','','','','','','','','',''],
    ['','','','','','','','','',''],
    ['','','','','','','','','',''],
    ['','','','','','','','','',''],
    ['','','','','','','','','','']
];
let fieldAttac1 = [
    ['','','','','','','','','',''],
    ['','','','','','','','','',''],
    ['','','','','','','','','',''],
    ['','','','','','','','','',''],
    ['','','','','','','','','',''],
    ['','','','','','','','','',''],
    ['','','','','','','','','',''],
    ['','','','','','','','','',''],
    ['','','','','','','','','',''],
    ['','','','','','','','','','']
];
let myField2 = [
    // ['','','','','▩','▩','','','',''],
    // ['','','▩','','','','','▩','',''],
    // ['','','▩','','','','','▩','','▩'],
    // ['▩','','','','','','','','',''],
    // ['','','','','','▩','','','',''],
    // ['','','','','','▩','','▩','',''],
    // ['▩','▩','▩','','','▩','','▩','',''],
    // ['','','','','','▩','','▩','',''],
    // ['','','','','','','','','',''],
    // ['▩','','','','','','','','▩','']
    ['','','','','','','','','',''],
    ['','','','','','','','','',''],
    ['','','','','','','','','',''],
    ['','','','','','','','','',''],
    ['','','','','','','','','',''],
    ['','','','','','','','','',''],
    ['','','','','','','','','',''],
    ['','','','','','','','','',''],
    ['','','','','','','','','',''],
    ['','','','','','','','','','']
];
let fieldAttac2 = [
    ['','','','','','','','','',''],
    ['','','','','','','','','',''],
    ['','','','','','','','','',''],
    ['','','','','','','','','',''],
    ['','','','','','','','','',''],
    ['','','','','','','','','',''],
    ['','','','','','','','','',''],
    ['','','','','','','','','',''],
    ['','','','','','','','','',''],
    ['','','','','','','','','','']
];
let change = {Player1: true, Player2: true};
let move = true;
let name1 = '';
let name2 = '';
let killShip1 = [
    [false,false,false,false,false,false,false,false,false,false],
    [false,false,false,false,false,false,false,false,false,false],
    [false,false,false,false,false,false,false,false,false,false],
    [false,false,false,false,false,false,false,false,false,false],
    [false,false,false,false,false,false,false,false,false,false],
    [false,false,false,false,false,false,false,false,false,false],
    [false,false,false,false,false,false,false,false,false,false],
    [false,false,false,false,false,false,false,false,false,false],
    [false,false,false,false,false,false,false,false,false,false],
    [false,false,false,false,false,false,false,false,false,false]
];
let killShip2 = [
    [false,false,false,false,false,false,false,false,false,false],
    [false,false,false,false,false,false,false,false,false,false],
    [false,false,false,false,false,false,false,false,false,false],
    [false,false,false,false,false,false,false,false,false,false],
    [false,false,false,false,false,false,false,false,false,false],
    [false,false,false,false,false,false,false,false,false,false],
    [false,false,false,false,false,false,false,false,false,false],
    [false,false,false,false,false,false,false,false,false,false],
    [false,false,false,false,false,false,false,false,false,false],
    [false,false,false,false,false,false,false,false,false,false]
];
let user = {
    first: {name: '', online: false, id: ''},
    second: {name: '', online: false, id: ''}
}
let win = 0
let chat = [];
let usersId = []

let timeoutLogout;
const delay = 300000;
const callback = () => {
    user.first = {...user.first, name: ''};
    user.second = {...user.second, name: ''};
    chat = [];
    console.log(user)
};

const startTimer = () => {
    timeoutLogout = setTimeout(callback, delay);
}

const cancelTimer = () => {
    clearTimeout(timeoutLogout);
}

socketIO.on('connection', (socket) => {
    console.log(`${socket.id} user connected`);
    cancelTimer();
    usersId.push(socket.id)

    socketIO.emit('changeUsers', user)
    socketIO.emit('getAll', {
        Player1: {
            MyField: myField1,
            FieldAttac: fieldAttac1,
            KillShip: killShip1,
            Name: name1
        },
        Player2: {
            MyField: myField2,
            FieldAttac: fieldAttac2,
            KillShip: killShip2,
            Name: name2
        }, Move: move, Change: change, Win: win, Chat: chat
    });
    socket.on('setMyField1', (data) => {
        socketIO.emit('MyField1', data)
        myField1 = data
    });
    socket.on('setFieldAttac1', (data) => {
        socketIO.emit('FieldAttac1', data)
        fieldAttac1 = data
    });
    socket.on('setMyField2', (data) => {
        socketIO.emit('MyField2', data)
        myField2 = data
    });
    socket.on('setFieldAttac2', (data) => {
        socketIO.emit('FieldAttac2', data)
        fieldAttac2 = data
    });
    socket.on('setChange', (data) => {
        socketIO.emit('Change', data)
        change = data
    });
    socket.on('setMove', (data) => {
        socketIO.emit('Move', data)
        move = data
    });
    socket.on('setKillShip1', (data) => {
        socketIO.emit('KillShip1', data)
        killShip1 = data
    });
    socket.on('setKillShip2', (data) => {
        socketIO.emit('KillShip2', data)
        killShip2 = data
    });
    socket.on('setWin', (data) => {
        socketIO.emit('Win', data)
        win = data
    });
    socket.on('setChat', (data) => {
        socketIO.emit('changeChat', data)
        chat = data
    });

    socket.on("changeOnlineUser", (data) => {
        if (data === 'first') {
            user.first.online = true;
            user.first.id = socket.id;
        } else if (data === 'second') {
            user.second.online = true;
            user.second.id = socket.id;
        }
    });

    socket.on('setUserName', (data) => {
        if (data.user === 'first') {
            user.first.name = data.name;
            console.log(user)
        } else if (data.user === 'second') {
            user.second.name = data.name;
            console.log(user)
        }
        socketIO.emit('changeUsers', user)
    });

    socket.on('disconnect', () => {
        console.log(`${socket.id} user disconnected`);
        usersId = [...usersId].filter(e => e !== socket.id);
        if (usersId.length === 0) {
            startTimer();
        }

        if (user.first.id === socket.id) {
            user.first.online = false;
            user.first.id = '';
        } else if (user.second.id === socket.id) {
            user.second.online = false;
            user.second.id = '';
        }
    });
});
https.listen(PORT, () => {
    console.log(`Server working on port ${'https://'+ADDRESS+':'+PORT}`)
})