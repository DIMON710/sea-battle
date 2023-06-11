import React, {useContext, useEffect} from 'react';
import cl from './HelpPopup.module.scss'
import {Context} from "../../Context/Context.jsx";
import {CheckFunc} from '../../Functions/Check.js'
const HelpPopup = () => {
    const {HelpShip} = useContext(Context);
    const [helpShip, setHelpShip] = HelpShip;
    const needShip = {
        one: 4,
        two: 3,
        three: 2,
        four: 1
    }
    return (
        <div className={cl.Help}>
            <div className={cl.Close} onClick={() => setHelpShip({...helpShip, isOpen: false})}>x</div>
            <div>
                <h3>Должно быть:</h3>
                <h4><span>{needShip.one}</span> однопалубных</h4>
                <h4><span>{needShip.two}</span> двухпалубных</h4>
                <h4><span>{needShip.three}</span> трёхпалубных</h4>
                <h4><span>{needShip.four}</span> четырёхпалубных</h4>
            </div>
            <div>
                <h3>У тебя:</h3>
                <h4><span style={needShip.one === helpShip.one ? {color: 'green'} : {color: 'red'}}>{helpShip.one}</span> однопалубных</h4>
                <h4><span style={needShip.two === helpShip.two ? {color: 'green'} : {color: 'red'}}>{helpShip.two}</span> двухпалубных</h4>
                <h4><span style={needShip.three === helpShip.three ? {color: 'green'} : {color: 'red'}}>{helpShip.three}</span> трёхпалубных</h4>
                <h4><span style={needShip.four === helpShip.four ? {color: 'green'} : {color: 'red'}}>{helpShip.four}</span> четырёхпалубных</h4>
            </div>
        </div>
    );
};

export default HelpPopup;