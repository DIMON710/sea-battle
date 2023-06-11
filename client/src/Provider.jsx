import React, {useEffect, useState} from 'react';
import {Context} from "./Context/Context.jsx";
import App from "./App.jsx";
import socketIO from "socket.io-client"
// const socket = socketIO.connect('https://dimension-server-for-sea-battle.onrender.com')
const socket = socketIO.connect('http://localhost:5000')
const Provider = () => {
    const [myField1, setMyField1] = useState([]);
    const [fieldAttac1, setFieldAttac1] = useState([]);
    const [myField2, setMyField2] = useState([]);
    const [fieldAttac2, setFieldAttac2] = useState([]);
    const [change, setChange] = useState({});
    const [move, setMove] = useState(true);
    const [name1, setName1] = useState('');
    const [name2, setName2] = useState('');
    const [killShip1, setKillShip1] = useState([]);
    const [killShip2, setKillShip2] = useState([]);
    const [testPlayer, setTestPlayer] = useState(0);
    const [chat, setChat] = useState({isOpen: false, newSms: false, messages: []});
    const [helpShip, setHelpShip] = useState({
        isOpen: false,
        one: 0,
        two: 0,
        three: 0,
        four: 0
    })
    useEffect(() => {
        socket.on('getAll', (data) => {
            if (myField1.length === 0) {
                setMyField1(data.Player1.MyField);
                setFieldAttac1(data.Player1.FieldAttac);
            }
            if (myField2.length === 0) {
                setMyField2(data.Player2.MyField);
                setFieldAttac2(data.Player2.FieldAttac);
            }
            setChange(data.Change)
            setMove(data.Move)
            setKillShip1(data.Player1.KillShip)
            setKillShip2(data.Player2.KillShip)
            setChat({...chat, ...data.Chat})
            console.info(200)
        });
    }, []);
    useEffect(() => {
        socket.on('MyField1', (data) => {
            setMyField1(data)
        });
    }, [socket, myField1]);
    useEffect(() => {
        socket.on('FieldAttac1', (data) => {
            setFieldAttac1(data)
        });
    }, [socket, fieldAttac1]);
    useEffect(() => {
        socket.on('MyField2', (data) => {
            setMyField2(data)
        });
    }, [socket, myField2]);
    useEffect(() => {
        socket.on('FieldAttac2', (data) => {
            setFieldAttac2(data)
        });
    }, [socket, fieldAttac2]);
    useEffect(() => {
        socket.on('Change', (data) => {
            setChange(data)
        });
    }, [socket, change]);
    useEffect(() => {
        socket.on('Move', (data) => {
            setMove(data)
        });
    }, [socket, move]);
    useEffect(() => {
        socket.on('KillShip1', (data) => {
            setKillShip1(data)
        });
    }, [socket, killShip1]);
    useEffect(() => {
        socket.on('KillShip2', (data) => {
            setKillShip2(data)
        });
    }, [socket, killShip2]);
    useEffect(() => {
        socket.on('changeUsers', (data) => {
            setName1(data.first.name)
            setName2(data.second.name);
        });
    }, [socket, name1, name2]);
    useEffect(() => {
        socket.on('changeChat', (data) => {
            if (data.id !== socket.id && !chat.isOpen) {
                setChat({...chat, messages: data.messages, newSms: true})
            } else if (chat.isOpen) {
                setChat({...chat, messages: data.messages})
            }
        });
    }, [socket, chat]);

    const Player1 = {
        MyField: [myField1, setMyField1],
        FieldAttac: [fieldAttac1, setFieldAttac1],
        KillShip: [killShip1, setKillShip1],
        Name: [name1, setName1]
    }
    const Player2 = {
        MyField: [myField2, setMyField2],
        FieldAttac: [fieldAttac2, setFieldAttac2],
        KillShip: [killShip2, setKillShip2],
        Name: [name2, setName2]
    }
    const value = {
        Player1, Player2, Move: [move, setMove],
        Change: [change, setChange], TestPlayer: [testPlayer, setTestPlayer],
        socket, Chat: [chat, setChat], HelpShip: [helpShip, setHelpShip]
    }
    return (
        <Context.Provider value={value}>
            <App/>
        </Context.Provider>
    );
};

export default Provider;