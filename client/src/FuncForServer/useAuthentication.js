import {useContext, useEffect} from "react";
import {Context} from "../Context/Context.jsx";

export const useAuthentication = () => {
    const {TestPlayer, socket, Player1, Player2} = useContext(Context)
    const [testPlayer, setTestPlayer] = TestPlayer;
    const [name1, setName1] = Player1.Name;
    const [name2, setName2] = Player2.Name;
    useEffect(() => {
        socket.on('changeUsers', (data) => {
                setName1(data.first.name)
                setName2(data.second.name)
                if (localStorage.getItem('user') && data.first.name === '' && data.second.name === '') {
                    localStorage.removeItem('user');
                }
                if (localStorage.getItem('user') === null) {
                    if (data.first.name === '' && (data.first.id === socket.id || !data.first.online) && data.second.id !== socket.id) {
                        setTestPlayer(1);
                        socket.emit('changeOnlineUser', 'first')
                    } else if (data.second.name === '' && (data.second.id === socket.id || !data.second.online) && data.first.id !== socket.id) {
                        setTestPlayer(2);
                        socket.emit('changeOnlineUser', 'second')
                    } else {
                        setTestPlayer(1);
                        socket.emit('changeOnlineUser', 'first')
                    }
                }
            });
    }, []);
}