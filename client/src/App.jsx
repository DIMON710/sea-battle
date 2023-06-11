import './App.scss'
import Game from "./Components/Game/Game.jsx";
import {useContext, useState} from "react";
import {Context} from "./Context/Context.jsx";
import {useAuthentication} from "./FuncForServer/useAuthentication.js";
function App() {
    const {TestPlayer, socket, Chat, Player1} = useContext(Context)
    const [myField1] = Player1.MyField;
    const [testPlayer] = TestPlayer;
    const [chat, setChat] = Chat;
    const [play, setPlay] = useState(false);
    useAuthentication()
  return (
        <div className="App">
            {play ? myField1.length === 0 ? <h1>Жду ответ от сервера...</h1> : <Game /> : <>
                <h1 className="title">Морской бой</h1>
                <button className="btn" style={{width: '50%'}} onClick={() => setPlay(true)}>Играть</button>
            </>}
        </div>
  )
}

export default App
