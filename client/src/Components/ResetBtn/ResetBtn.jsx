import React, {useContext} from 'react';
import {Context} from "../../Context/Context.jsx";
import "./ResetBtn.scss";
const ResetBtn = ({SetWin}) => {
    const {Player1, Player2, Change, socket} = useContext(Context)
    const [change, setChange] = Change;
    const [fieldAttac1, setFieldAttac1] = Player1.FieldAttac;
    const [myField1, setMyField1] = Player1.MyField;
    const [fieldAttac2, setFieldAttac2] = Player2.FieldAttac;
    const [myField2, setMyField2] = Player2.MyField;
    const [killShip1, setKillShip1] = Player1.KillShip;
    const [killShip2, setKillShip2] = Player2.KillShip;

    const reset = () => {
        let arrAttac1 = fieldAttac1.map(e => e.map(e => ''))
        let myArr1 = myField1.map(e => e.map(e => ''))
        let arrAttac2 = fieldAttac2.map(e => e.map(e => ''))
        let myArr2 = myField2.map(e => e.map(e => ''))
        let killArr1 = killShip1.map(e => e.map(e => false))
        let killArr2 = killShip2.map(e => e.map(e => false))
        setChange({Player1: true, Player2: true})
        socket.emit('setChange', {Player1: true, Player2: true})
        setFieldAttac1(arrAttac1)
        socket.emit('setFieldAttac1', arrAttac1)
        setMyField1(myArr1)
        socket.emit('setMyField1', myArr1)
        setFieldAttac2(arrAttac2)
        socket.emit('setFieldAttac2', arrAttac2)
        setMyField2(myArr2)
        socket.emit('setMyField2', myArr2)
        SetWin(0)
        socket.emit('setWin', 0)
        setKillShip1(killArr1)
        socket.emit('setKillShip1', killArr1)
        setKillShip2(killArr2)
        socket.emit('setKillShip2', killArr2)
    }
    return (
        <button className='resetBtn' onClick={reset}>Новая игра</button>
    );
};

export default ResetBtn;