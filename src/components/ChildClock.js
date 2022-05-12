import React from 'react';

const ChildClock = ({hour}) =>  {
  return(
    <h1>Child clock: {hour + 1}</h1>
  )
}

export default ChildClock;