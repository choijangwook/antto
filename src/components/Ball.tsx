import React, { memo } from 'react';

interface IBall  {
    number: number
}

const Ball = memo( ({number}:IBall) => {
    let colorClass = '';

    if (number <= 10) {
        colorClass = 'color-1';
    } else if (number <= 20) {
        colorClass = 'color-11';
    } else if (number <= 30) {
        colorClass = 'color-21';
    } else if (number <= 40) {
        colorClass = 'color-31';
    }


    return (
        <div className={`ball ${colorClass}`} >
            {number}
        </div>
    )
})

export default Ball;