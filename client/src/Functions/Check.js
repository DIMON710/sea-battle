export const CheckFunc = (arr, final = false, helpShip = false) => {
    const obj = {
        four: 1,
        three: 2,
        two: 3,
        one: 4,
        sum: 20
    };
    let objCheck = {
        four: 0,
        three: 0,
        two: 0,
        one: 0,
        sum: 0
    };
    let arrNum = [];

    for (let i = 0; i < arr.length; i++) {
        let total = 0, totalV = 0;
        for (let j = 0; j < arr.length; j++) {

            if (arr[i][j] !== '') {
                objCheck.sum += 1
                if (arr[i-1] === undefined) { // check one ship
                    if (arr[i+1][j+1] === '▩' || arr[i+1][j-1] === '▩') {
                        console.log('Error diagonal')
                        return false;
                    }
                    if (((arr[i][j-1] === '' || arr[i][j-1] === undefined) && (arr[i][j+1] === '' || arr[i][j+1] === undefined)) && arr[i+1][j] === '') {
                        objCheck.one += 1
                    }
                } else if (arr[i+1] === undefined) {
                    if (arr[i-1][j+1] === '▩' || arr[i-1][j-1] === '▩') {
                        console.log('Error diagonal')
                        return false;
                    }
                    if (((arr[i][j-1] === '' || arr[i][j-1] === undefined) && (arr[i][j+1] === '' || arr[i][j+1] === undefined)) && arr[i-1][j] === '') {
                        objCheck.one += 1
                    }
                } else {
                    if (arr[i-1][j+1] === '▩' || arr[i+1][j+1] === '▩' || arr[i+1][j-1] === '▩' || arr[i-1][j-1] === '▩') {
                        console.log('Error diagonal')
                        return false;
                    }
                    if (((arr[i][j-1] === '' || arr[i][j-1] === undefined) && (arr[i][j+1] === '' || arr[i][j+1] === undefined)) && (arr[i-1][j] === '' && arr[i+1][j] === '')) {
                        objCheck.one += 1
                    }
                }
            }

            if (arr[i][j] !== '' && arr[i][j+1] !== '' && arr[i][j+1] !== undefined) { // check total ship
                total++
            } else if (arr[i][j] !== '') {
                total++
            }

            if (arr[i][j] !== '' && arr[i][j+1] === '') {
                if (total > 1) {
                    arrNum.push(total);
                }
                total = 0;
            }

            if (arr[j+1] === undefined) {
                if (arr[j][i] !== '') {
                    totalV++
                }
            } else {

                 if (arr[j][i] !== '' && arr[j+1][i] !== '' && arr[j+1][i] !== undefined) {
                    totalV++
                } else if (arr[j][i] !== '') {
                    totalV++
                }

                if (arr[j][i] !== '' && arr[j+1][i] === '') {
                    if (totalV > 1) {
                        arrNum.push(totalV)
                    }
                    totalV = 0;
                }
            }
        }
        total > 1 && arrNum.push(total);
        total = 0;

        totalV > 1 && arrNum.push(totalV);
        totalV = 0;
    }

    for (const val of arrNum) {
        if (val === 4) {
            objCheck.four += 1
        } else if (val === 3) {
            objCheck.three += 1
        } else if (val === 2) {
            objCheck.two += 1
        } else if (val > 4) {
            return false
        }
    }
    if (helpShip) {
        return objCheck
    }

    if (final) { // Final check

        if (objCheck.one !== obj.one) {
            console.log('1 bed');
            return false;
        } else if (objCheck.two !== obj.two) {
            console.log('2 bed');
            return false;
        } else if (objCheck.three !== obj.three) {
            console.log('3 bed');
            return false;
        } else if (objCheck.four !== obj.four) {
            console.log('4 bed');
            return false;
        }  else if (objCheck.sum !== obj.sum) {
            console.log('sum bed');
            console.log(`bed total (${objCheck.sum})`);
            return false;
        } else {
            console.log('Good job');
            return true;
        }
    } else { // Intermediate check
        if (((objCheck.one > obj.one) && (objCheck.two === obj.two && objCheck.three === obj.three && objCheck.four === obj.four)) || (objCheck.sum > obj.sum) || (objCheck.one > obj.one+1)) {
            return false;
        } else if (((objCheck.two > obj.two) && (objCheck.three === obj.three && objCheck.four === obj.four)) || (objCheck.sum > obj.sum) || (objCheck.two > obj.two+1)) {
            return false;
        } else if ((objCheck.three > obj.three && objCheck.four === obj.four) || (objCheck.sum > obj.sum) || (objCheck.three > obj.three+1)) {
            return false;
        } else if (objCheck.four > obj.four) {
            return false;
        }  else if ((objCheck.one === obj.one) && (objCheck.two === obj.two) && (objCheck.three === obj.three) && (objCheck.four === obj.four) && (objCheck.sum !== obj.sum)) {
            console.log('sum bed');
            console.log(`bed total (${objCheck.sum})`);
            return false;
        } else {
            console.log('Acceptable');
            return true;
        }
    }
}
