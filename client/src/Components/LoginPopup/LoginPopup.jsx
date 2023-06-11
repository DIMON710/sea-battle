import React, {useContext, useEffect, useRef, useState} from 'react';
import cl from "./LoginPopup.module.scss";
import {Context} from "../../Context/Context.jsx";

const LoginPopup = ({ActiveField}) => {
    const {Player1, Player2, TestPlayer, socket} = useContext(Context);
    const [testPlayer, setTestPlayer] = TestPlayer;
    const [activeField, setActiveField] = ActiveField;
    const [login, setLogin] = useState({Player1: '', Player2: ''});
    const [localUser, setLocalUser] = useState(1);
    const inputRef = useRef(null);
    useEffect(() => {
        inputRef.current.focus();
    }, []);
    useEffect(() => {
        setLocalUser(testPlayer)
    }, [])
    const loginBtn = () => {
        if (localUser === 1) {
            if (login.Player1 !== '' && (Player1.Name[0] === '' || Player1.Name[0] === login.Player1)) {
                setActiveField({...activeField, Player1: true})
                Player1.Name[1](login.Player1)
                localStorage.setItem('user', login.Player1)
                setTestPlayer(localUser)
                socket.emit('setUserName', {user: 'first', name: login.Player1})
            }
        } else {
            if (login.Player2 !== '' && (Player2.Name[0] === '' || Player2.Name[0] === login.Player2)) {
                setActiveField({...activeField, Player2: true})
                Player2.Name[1](login.Player2)
                localStorage.setItem('user', login.Player2)
                setTestPlayer(localUser)
                socket.emit('setUserName', {user: 'second', name: login.Player2})
            }
        }
    }
    const switchFunc = (num) => {
        inputRef.current.focus();
        if ((Player1.Name[0] !== '' || Player2.Name[0] !== '') && login[`Player${localUser}`] === '') {
            setLocalUser(num)
        }
    }
    const inputChange = (e) => {
        let obj = {...login}
        obj[`Player${localUser}`] = e.target.value;
        setLogin(obj)
    }
    return (
        <div className={cl.Name}>
            <h2>Введите имя</h2>
            <div className={cl.Switch}>
                <button style={localUser === 1 ? {borderColor: '#646cff'}:{}} onClick={() => switchFunc(1)}>Игрок 1</button>
                <button style={localUser === 2 ? {borderColor: '#646cff'}:{}} onClick={() => switchFunc(2)}>Игрок 2</button>
            </div>
            <form onSubmit={(e) => {
                e.preventDefault()
                loginBtn()
            }}>
                <input ref={inputRef} value={login[`Player${localUser}`]} onChange={(e) => inputChange(e)}/>
                <button type='submit' className={cl.LoginBtn}>Продолжить</button>
            </form>
        </div>
    );
};

export default LoginPopup;