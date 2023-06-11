import React, {useContext, useEffect, useState} from 'react';
import FieldComp from "../Field/FieldComp.jsx";
import {Context} from "../../Context/Context.jsx";
import cl from "./Game.module.scss";
import {CheckFunc} from "../../Functions/Check.js";
import LoginPopup from "../LoginPopup/LoginPopup.jsx";
import WinPopup from "../WinPopup/WinPopup.jsx";
import ChatCom from "../Chat/ChatCom.jsx";
import HelpPopup from "../helpPopup/HelpPopup.jsx";

const Game = () => {
    const {Player1, Player2, Change, TestPlayer, Move, socket, HelpShip, Chat} = useContext(Context)
    const [activeField, setActiveField] = useState({Player1: false, Player2: false});
    const [win, setWin] = useState(0);
    const [chat, setChat] = Chat;
    useEffect(() => {
        socket.on('Win', (data) => {
            setWin(data)
        });
    }, [socket, win]);
    const Hints = {
        ships: 'Расставь корабли',
        wait: 'Подожди соперника',
        go: 'Твой ход',
        stop: 'Ход соперника'
    }
    const [change, setChange] = Change;
    const [testPlayer, setTestPlayer] = TestPlayer;
    const [myField1, setMyField1] = Player1.MyField;
    const [myField2, setMyField2] = Player2.MyField;
    const [move] = Move;
    const [helpShip, setHelpShip] = HelpShip;

    let fieldStyle1 = {}, fieldStyle2 = {};
    activeField.Player1 ? fieldStyle1 = {} : fieldStyle1 = {filter: 'blur(3px)', pointerEvents: 'none'}
    activeField.Player2 ? fieldStyle2 = {} : fieldStyle2 = {filter: 'blur(3px)', pointerEvents: 'none'}

    const saveFunc = (arr, func) => {
        if (CheckFunc(arr, true)) {
            func()
        }
    }

    useEffect(() => {
        if (localStorage.getItem('user')) {
            if (localStorage.getItem('user') === Player1.Name[0]) {
                setTestPlayer(1);
                socket.emit('changeOnlineUser', 'first')
                setActiveField({...activeField, Player1: true})
            } else if (localStorage.getItem('user') === Player2.Name[0]) {
                setTestPlayer(2);
                socket.emit('changeOnlineUser', 'second')
                setActiveField({...activeField, Player2: true})
            } else {
                localStorage.removeItem('user')
                setTestPlayer(1);
            }
        }
    }, [Player1.Name[0], Player2.Name[0], win])

    return (
        <div className={cl.Game}>
            {activeField[`Player${testPlayer}`] && <div style={{position: 'absolute', left: '-20px', top: '-70px', display: 'flex', gap: '5px', zIndex: '1'}}>
                <button onClick={() => {
                    localStorage.removeItem('user')
                    testPlayer === 1 ? socket.emit('setUserName', {user: 'first', name: ''}) : socket.emit('setUserName', {user: 'second', name: ''})
                    socket.emit('setChat', []);
                    location.reload()
                }}>Выйти</button>
                 <button style={chat.newSms ? {borderColor: 'red'} : {}} onClick={() => {
                    setChat({...chat, isOpen: !chat.isOpen, newSms: false})
                }}>Чат</button>
            </div>}
            {testPlayer === 1 && <div className="player1" style={{margin: '0 auto'}}>
                <div style={fieldStyle1}>
                    {activeField.Player1 && <h2>{Player1.Name[0]}</h2>}
                    <h2>{activeField.Player1 && change.Player1 && Player1.Name[0] !== '' && Hints.ships}</h2>
                    <h2>{change.Player1 !== change.Player2 && !change.Player1 && Hints.wait}</h2>
                    <h2>{!change.Player1 && !change.Player2 && !move && Hints.go}</h2>
                    <h2>{!change.Player1 && !change.Player2 && move && Hints.stop}</h2>
                    <div style={{marginTop: '10px'}} className={cl.Fields}>
                        <FieldComp GamerNum={0} Attac={false}></FieldComp>
                        {!change.Player1 && <FieldComp GamerNum={0} Attac={true} ActiveField={[activeField, setActiveField]} SetWin={setWin}></FieldComp>}
                    </div>
                </div>
                {!activeField.Player1 && <LoginPopup ActiveField={[activeField, setActiveField]}/>}
                {win !== 0 && <WinPopup Player={win} SetWin={setWin}/>}
            </div>}

            {testPlayer === 2 && <div className="player2" style={{margin: '0 auto'}}>
                <div style={fieldStyle2}>
                    {activeField.Player2 && <h2>{Player2.Name[0]}</h2>}
                    <h2>{activeField.Player2 && change.Player2 && Player2.Name[0] !== '' && Hints.ships}</h2>
                    <h2>{change.Player1 !== change.Player2 && !change.Player2 && Hints.wait}</h2>
                    <h2>{!change.Player1 && !change.Player2 && move && Hints.go}</h2>
                    <h2>{!change.Player1 && !change.Player2 && !move && Hints.stop}</h2>
                    <div style={{marginTop: '10px'}} className={cl.Fields}>
                        <FieldComp GamerNum={1} Attac={false}></FieldComp>
                        {!change.Player2 && <FieldComp GamerNum={1} Attac={true} ActiveField={[activeField, setActiveField]} SetWin={setWin}></FieldComp>}
                    </div>
                </div>
                {!activeField.Player2 && <LoginPopup ActiveField={[activeField, setActiveField]}/>}
                {win !== 0 && <WinPopup Player={win} SetWin={setWin}/>}
            </div>}
            <br/>
            <div className={cl.Btns}>
                {change.Player1 && testPlayer === 1 && <>
                    <button style={fieldStyle1} onClick={() => saveFunc(myField1, () => {
                    setChange({...change, Player1: false})
                    socket.emit('setChange', {...change, Player1: false});
                    socket.emit('setMyField1', myField1)
                })}>Продолжить</button>
                <button style={fieldStyle1} onClick={() => {
                    setMyField1(myField1.map(e => e.map(e => '')))
                    socket.emit('setMyField1', myField1.map(e => e.map(e => '')));
                    setHelpShip({...helpShip, one: 0, two: 0, three: 0, four: 0})
                }}>Очистить поле</button>
                    <button style={fieldStyle1} onClick={() => setHelpShip({...helpShip, isOpen: !helpShip.isOpen})}>?</button>
                </>}

                {change.Player2 && testPlayer === 2 && <>
                    <button style={fieldStyle2} onClick={() => saveFunc(myField2,() => {
                    setChange({...change, Player2: false})
                    socket.emit('setChange', {...change, Player2: false});
                    socket.emit('setMyField2', myField2)
                })}>Продолжить</button>
                <button style={fieldStyle2} onClick={() => {
                    setMyField2(myField2.map(e => e.map(e => '')))
                    socket.emit('setMyField2', myField2.map(e => e.map(e => '')));
                    setHelpShip({...helpShip, one: 0, two: 0, three: 0, four: 0})
                }}>Очистить поле</button>
                <button style={fieldStyle2} onClick={() => setHelpShip({...helpShip, isOpen: !helpShip.isOpen})}>?</button>
                </>}
            </div>
            {helpShip.isOpen && <HelpPopup />}
            {chat.isOpen && <ChatCom/>}
        </div>
        );
};

export default Game;