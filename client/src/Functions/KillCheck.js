export const KillCheck = (arr, UserArr, UserArrServ, socket) => {
    const [userArr, setUserArr] = UserArr;
    let userArrCopy = userArr.slice(0)
    let arrIndex = [];
    for (let i = 0; i < arr.length; i++) {
        let total = [], totalV = [];
        for (let j = 0; j < arr.length; j++) {
            if (arr[i][j] === 'x') {
                total.push([i, j])
                let count = 0,
                    check = true,
                    left = () => arr[i][j + (count * -1)] !== '' && arr[i][j + (count * -1)] !== '•' && arr[i][j + (count * -1)] !== undefined,
                    right = () => arr[i][j + count] !== '' && arr[i][j + count] !== '•' && arr[i][j + count] !== undefined;

                while (check) {
                    if (!right()) right = () => false
                    if (!left()) left = () => false
                    if (!right() && !left()) check = false
                    count++;

                    if (right()) {
                        if (arr[i][j + count] === '▩') {
                            total = [];
                            check = false;
                            break;
                        } else if (arr[i][j + count] === 'x') {
                            total.push([i, (j + count)])
                        }
                    }
                    if (left()) {
                        if (arr[i][j + (count * -1)] === '▩') {
                            total = [];
                            check = false;
                            break;
                        } else if (arr[i][j + (count * -1)] === 'x') {
                            total.push([i, (j + (count * -1))])
                        }
                    }

                }

                count = 0;
                check = true;
                total.length > 1 && arrIndex.push(...total)
                total = [];
                {
                    const left = arr[i][j - 1],
                        right = arr[i][j + 1]
                    if (arr[i - 1] === undefined) { // check one ship
                        const down = arr[i + 1][j]
                        if (((left !== 'x' && left !== '▩') || left === undefined) && ((right !== 'x' && right !== '▩') || right === undefined) && (down !== 'x' && down !== '▩')) {
                            console.log(1)
                            arrIndex.push([i, j])
                        }
                    } else if (arr[i + 1] === undefined) {
                        const up = arr[i - 1][j];
                        if (((left !== 'x' && left !== '▩') || left === undefined) && ((right !== 'x' && right !== '▩') || right === undefined) && (up !== 'x' && up !== '▩')) {
                            console.log(2)
                            arrIndex.push([i, j])
                        }
                    } else {
                        const up = arr[i - 1][j],
                            down = arr[i + 1][j]
                        if (((left !== 'x' && left !== '▩') || left === undefined) && ((right !== 'x' && right !== '▩') || right === undefined) && (up !== 'x' && up !== '▩') && (down !== 'x' && down !== '▩')) {
                            console.log(3)
                            arrIndex.push([i, j])
                        }
                    }
                }

            }
            if (arr[j][i] === 'x') {
                totalV.push([j, i])
                let count = 0,
                    check = true,
                    top = () => arr[j + (count * -1)][i] !== '' && arr[j + (count * -1)][i] !== '•',
                    bottom = () => arr[j + count][i] !== '' && arr[j + count][i] !== '•';

                while (check) {
                    if (arr[j + count] !== undefined) {
                        if (!bottom()) bottom = () => false
                    } else {
                        bottom = () => false
                    }
                    if (arr[j + (count * -1)] !== undefined) {
                        if (!top()) top = () => false
                    } else {
                        top = () => false
                    }
                    if (!top() && !bottom()) check = false;
                    count++;

                    if (arr[j + count] !== undefined) {
                        if (bottom()) {

                            if (arr[j + count][i] === '▩') {
                                totalV = [];
                                check = false;
                                break;
                            } else if (arr[j + count][i] === 'x') {
                                totalV.push([(j + count), i])
                            }
                        }
                    } else {
                        bottom = () => false
                    }

                    if (arr[j + (count * -1)] !== undefined) {
                        if (top()) {

                            if (arr[j + (count * -1)][i] === '▩') {
                                totalV = [];
                                check = false;
                                break;
                            } else if (arr[j + (count * -1)][i] === 'x') {
                                totalV.push([(j + (count * -1)), i])
                            }
                        }
                    } else {
                        top = () => false
                    }

                }
                count = 0
                check = true;
                totalV.length > 1 && arrIndex.push(...totalV)
                totalV = [];
            }
        }
    }
    for (const val of arrIndex) {
        userArrCopy[val[0]][val[1]] = true
    }
    setUserArr(userArrCopy);
    socket.emit(UserArrServ, userArrCopy);
    return arrIndex;
}