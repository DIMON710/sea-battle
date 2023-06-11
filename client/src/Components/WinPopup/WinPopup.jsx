import React, {useContext} from 'react';
import cl from "../LoginPopup/LoginPopup.module.scss";
import {Context} from "../../Context/Context.jsx";
import ResetBtn from "../ResetBtn/ResetBtn.jsx";

const WinPopup = ({Player, SetWin}) => {
    const {Player1, Player2} = useContext(Context);
    return (
        <div className={cl.Name}>
            <div className={cl.Win}>
                <h2>Победил(а) {Player === 1 ? `${Player1.Name[0]}` : `${Player2.Name[0]}`}</h2>
                <ResetBtn SetWin={SetWin}/>
            </div>
        </div>
    );
};

export default WinPopup;