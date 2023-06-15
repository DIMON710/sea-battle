import React, { useContext, useEffect, useRef, useState } from 'react';
import { Context } from "../../Context/Context.jsx";
import cl from "./Chat.module.scss";

const ChatCom = () => {
    const { Chat, TestPlayer, Player1, Player2, socket } = useContext(Context);
    const [chat, setChat] = Chat;
    const [name1] = Player1.Name;
    const [name2] = Player2.Name;
    const [testPlayer] = TestPlayer;
    const [message, setMessage] = useState('');
    const inputRef = useRef(null);
    const blockRef = useRef(null);

    useEffect(() => {
        inputRef.current.focus();
    }, []);

    useEffect(() => {
        if (blockRef.current) {
            blockRef.current.scrollTop = blockRef.current.scrollHeight;
        }
    }, [blockRef.current?.scrollHeight])
    return (
        <div>
            {chat.isOpen && (
                <div className={cl.Chat}>
                    <div className={cl.Close} onClick={() => setChat({ ...chat, isOpen: false })}>
                        x
                    </div>
                    <div ref={blockRef} className={cl.Block}>
                        {chat.messages.map((e, i, arr) => (
                            <React.Fragment key={i}>
                                {testPlayer === 1 ?
                                    e[0] === 1 ? (
                                        <div className={cl.Right}>
                                            <h3>{e[1]}</h3>
                                        </div>
                                    ) : (
                                        <div style={arr[i-1] === undefined ? {marginTop: '20px'} : arr[i-1][0] !== e[0] ? {marginTop: '20px'} : {}} className={cl.Left}>
                                            {arr[i-1] === undefined ? <h4>{name2}</h4> : arr[i-1][0] !== e[0] && <h4>{name2}</h4>}
                                            <h3>{e[1]}</h3>
                                        </div>
                                    ) :
                                    e[0] === 2 ? (
                                        <div className={cl.Right}>
                                            <h3>{e[1]}</h3>
                                        </div>
                                    ) : (
                                        <div style={arr[i-1] === undefined ? {marginTop: '20px'} : arr[i-1][0] !== e[0] ? {marginTop: '20px'} : {}} className={cl.Left}>
                                            {arr[i-1] === undefined ? <h4>{name1}</h4> : arr[i-1][0] !== e[0] && <h4>{name1}</h4>}
                                            <h3>{e[1]}</h3>
                                        </div>
                                    )}
                            </React.Fragment>
                        ))}
                    </div>
                    <form
                        className={cl.Writing}
                        onSubmit={(e) => {
                            e.preventDefault();
                            if (message === '') return;
                            setChat({ ...chat, messages: [...chat.messages, [testPlayer, message]] });
                            socket.emit('setChat', {messages: [...chat.messages, [testPlayer, message]], id: socket.id});
                            setMessage('');
                        }}
                    >
                        <input
                            ref={inputRef}
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        />
                        <button type="submit">
                            {window.matchMedia('(prefers-color-scheme: dark)').matches ? (
                                <img src="/assets/sendWhite.svg" alt="=>"/>
                            ) : (
                                <img src="/assets/sendBlack.svg" alt="=>"/>
                            )}
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default ChatCom;