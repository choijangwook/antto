import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import Ball from 'components/Ball';


const Antto = () => {

    const lottoNumbers = useMemo(() => getNumbers(), []);
    const [winNumbers, setWinNumbers] = useState<number[]>(lottoNumbers);
    const [winBalls, setWinBalls] = useState<number[]>([]);
    const [bouns, setBouns] = useState<number | null>(null);
    const [redu, setRedo] = useState(false);
    const timeouts = useRef<any[]>([]);
    const TIME = 100;
    useEffect(()=> {
        console.log('useEffect');
        for( let i = 0; i < winNumbers.length - 1; i++) {
            timeouts.current[i] = setTimeout( () => {
                setWinBalls((prevBalls)=> [...prevBalls, winNumbers[i]])
            }, (i + 1 ) * TIME);
        }

        timeouts.current[6] = setTimeout( ()=> {
            setBouns(winNumbers[6]);
            setRedo(true);
        }, 7 * TIME);
        return () => {
            timeouts.current.forEach((v) => {
                clearTimeout(v);
            })
        }
    }, [winNumbers]);

    const onClickRedo = useCallback(() => {
        console.log('onClickRedo');
        console.log(winNumbers);
        setWinNumbers(getNumbers());
        setWinBalls([]);
        setBouns(null);
        setRedo(false)
        timeouts.current = [];
    },[])

    
    return (
        <main>
            <h1>당첨번호</h1>
            {
                winBalls.map((i) => {
                    return <Ball key={ i } number={i} />
                })
            }
            <div>보너스볼</div>
            {
                bouns &&
                <Ball number={bouns} />
            }
            <div>
                <button type="button" onClick={onClickRedo}>한번더</button>
            </div>
        </main>
    )
}


const getNumbers = (): number[] => {
    console.log(`call getNumber`);
    const arr = Array(45).fill(0).map((v, i) => i+1);
    const shuffle = [];
    while(arr.length > 0) {
        shuffle.push(arr.splice(Math.floor(Math.random() * arr.length),1)[0])
    }
    let card6 = shuffle.slice(0,6).sort((a,b) => a - b);
    let cardBonus = shuffle.slice(6,7);
    return [...card6, ...cardBonus]
}

export default Antto;