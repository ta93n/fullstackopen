import React from 'react'

const Note = ({ note, toggleImportance }) => {
  //ノートのimportantがtrueの場合は'make not important'
  const label = note.important
    ? 'make not important' : 'make important'

  return (
    <li>
      {note.content}
      <button onClick={toggleImportance}>{label}</button>
    </li>
  )
}

export default Note
