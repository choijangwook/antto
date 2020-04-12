import React from 'react';
import Ball from 'components/Ball';


const Antto = () => {
    const list = getNumber();
    const balls = list.slice(0,6);
    let bounsBall = list.slice(6,7)[0];
    
    return (
        <main>
            {
                balls.map((i) => {
                    return <Ball number={i} />
                })
            }
            <div>보너스볼</div>
            {
                <Ball number={bounsBall} />
            }
        </main>
    )
}

const getNumber = (): number[] => {
    console.log(`call getNumber`)
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