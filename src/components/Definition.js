import React from 'react';

const COLORS = ['#673ab7', '#2196f3', '#26a69a', '#e91e63'];

let Definition = props => {
  const { idx, def } = props;

  const styles = {
    color: 'white',
    padding: '10px',
    backgroundColor: COLORS[idx]
  };

  return (
    <div className='card text-center' style={styles}>
      <h5>Definition {idx + 1}</h5>
      <p>{def.definitions}</p>
    </div>
  );
};

export default Definition;
