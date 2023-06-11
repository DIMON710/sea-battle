import React, {useContext} from 'react';
import cl from './FieldComp.module.scss'
import MyTd from "../MyTd/MyTd.jsx";
import {Context} from "../../Context/Context.jsx";
const FieldComp = ({GamerNum, Attac, ActiveField, SetWin}) => {
    const {Move} = useContext(Context)
    const [move] = Move
    const clearField = [
        ['','','','','','','','','',''],
        ['','','','','','','','','',''],
        ['','','','','','','','','',''],
        ['','','','','','','','','',''],
        ['','','','','','','','','',''],
        ['','','','','','','','','',''],
        ['','','','','','','','','',''],
        ['','','','','','','','','',''],
        ['','','','','','','','','',''],
        ['','','','','','','','','','']
    ];
        const nums = ['A', 'Б', 'В', 'Г', 'Д', 'Е', 'Ё', 'Ж', 'З', 'И'];
    return (
        <table className={cl.field} style = {move == GamerNum ? Attac ? {borderColor: 'green'} : {} : Attac ? {borderColor: 'red'} : {} }>
            <thead>
                <tr>{nums.map((e, i) => <td key={i}>{i+1}</td>)}</tr>
            </thead>
            <tbody>
            {clearField.map((el, i) => (
                <React.Fragment key={i}>
                    <tr><td style={{position: 'absolute', left: '-30px', border: '2px solid white', width: '27.8px', height: '27.8px'}}>{nums[i]}</td></tr>
                    <tr key={i}>{el.map((e, index) => <MyTd key={index} keys={[i, index]} GamerNum={GamerNum} Attac={Attac} ActiveField={ActiveField} SetWin={SetWin}>{e}</MyTd>)}</tr>
                </React.Fragment>
            ))}
            </tbody>
        </table>
    );
};

export default FieldComp;