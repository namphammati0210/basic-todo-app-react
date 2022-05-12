import React, { useState } from 'react';
import ChildClock from './ChildClock';


const Clock = () =>  {
  const [ time, setTime ] = useState('');

  const tick = () => {
    setTime(new Date().toLocaleTimeString());
  }

  setInterval(tick, 1000);

  return(
    <div>
      <h2>It is {time}.</h2>
      <ChildClock hour={time} />
    </div>
  )
}

export default Clock;