import React from 'react';

const Tarea = ({ id, titulo, completada }) => {
  let styles = {
    backgroundColor: completada ? 'gray' : 'white',
    textDecoration: completada ? 'line-through' : 'none',
    margin: '10px',
    padding: '15px',
    border: '1px solid black',
    borderRadius: '5px',
  }

  return (
    <div className="tarea" style={styles} data-cy={'tarea' + id}>
      <span>{titulo}</span>
    </div>
  )
}

export default Tarea;