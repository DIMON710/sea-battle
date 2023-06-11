import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../../Context/Context.jsx";
import {CheckFunc} from "../../Functions/Check.js";
import './MyTd.scss'
import {KillCheck} from "../../Functions/KillCheck.js";
const MyTd = ({keys, GamerNum, Attac, ActiveField, SetWin}) => {
    const {Player1, Player2, Move, Change, socket, HelpShip} = useContext(Context);
    const [active, setActive] = useState(true);
    const [change] = Change;
    const [helpShip, setHelpShip] = HelpShip;
    const [move, setMove] = Move;
    let Field, EnemyField, EnemyKillShip;
    let FieldServ, EnemyFieldServ, EnemyKillShipServ
    let styles = {};
    if (GamerNum === 0) {
        if (Attac) {
            Field = Player1.FieldAttac;
            FieldServ = 'setFieldAttac1'
            EnemyField = Player2.MyField;
            EnemyFieldServ = 'setMyField2'
            EnemyKillShip = Player2.KillShip;
            EnemyKillShipServ = 'setKillShip2'
            EnemyKillShip[0][keys[0]][keys[1]] ? styles.color = 'red' : styles.color = 'white';
        } else {
            Field = Player1.MyField;
            FieldServ = 'setMyField1'
        }
    } else {
        if (Attac) {
            Field = Player2.FieldAttac;
            FieldServ = 'setFieldAttac2'
            EnemyField = Player1.MyField;
            EnemyFieldServ = 'setMyField1'
            EnemyKillShip = Player1.KillShip;
            EnemyKillShipServ = 'setKillShip1'
            EnemyKillShip[0][keys[0]][keys[1]] ? styles.color = 'red' : styles.color = 'white';
        } else {
            Field = Player2.MyField;
            FieldServ = 'setMyField2'
        }
    }
    const [field, setField] = Field;

    active && (GamerNum == move) ? styles.cursor = 'pointer' : styles.cursor = 'default';

    if (GamerNum === 0) {
        if (!change.Player1 && !Attac) styles = {};
    } else {
        if (!change.Player2 && !Attac) styles = {};
    }

    const fielAttac = () => {
        if (change.Player1 !== change.Player2) return;
        if (GamerNum != move) return;
        let arr = [...field];
        const [enemyField, setEnemyField] = EnemyField;
        let enemyArr = [...enemyField];
        setActive(false)
        if (enemyField[keys[0]][keys[1]] === '•') return;
        if (enemyField[keys[0]][keys[1]] === '') {
            arr[keys[0]][keys[1]] = '•';
            enemyArr[keys[0]][keys[1]] = '•';
            setMove(!move)
            socket.emit('setMove', !move)
        } else {
            arr[keys[0]][keys[1]] = 'x';
            enemyArr[keys[0]][keys[1]] = 'x';
            KillCheck(enemyArr, EnemyKillShip, EnemyKillShipServ, socket)
            { // check win
                const [activeField, setActiveField] = ActiveField;
                let check = true;
                for (let i = 0; i < 10; i++) {
                    for (let j = 0; j < 10; j++) {
                        if (enemyField[i][j] === '▩') check = false;
                    }
                }
                if (check) {
                    SetWin(GamerNum+1)
                    socket.emit('setWin', (GamerNum+1))
                    setActiveField({Player1: false, Player2: false})
                }
            }

        }
        setEnemyField(enemyArr);
        socket.emit(EnemyFieldServ, enemyArr)
        setField(arr);
        socket.emit(FieldServ, arr)
    }

    const myFiel = () => {
        if (GamerNum === 0) {
            if (!change.Player1) return;
        } else {
            if (!change.Player2) return;
        }
        let arr = [...field];
        if (arr[keys[0]][keys[1]] === '') {
                arr[keys[0]][keys[1]] = '▩';
                let helpObj = CheckFunc(arr, false, true)
                setHelpShip({...helpShip, ...helpObj})
                if (!CheckFunc(arr)) {
                    arr[keys[0]][keys[1]] = '';
                }
        } else {
            arr[keys[0]][keys[1]] = '';
            let helpObj = CheckFunc(arr, false, true)
            setHelpShip({...helpShip, ...helpObj})
        }
        setField(arr);
    }
    return (
        <td>
            <p style={styles} onClick={Attac ? fielAttac : myFiel}>{field[keys[0]][keys[1]]}</p>
        </td>
    );
};

export default MyTd;