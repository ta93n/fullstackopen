import React from 'react'
import Note from './components/Note'

const App = ({ notes }) => {
  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {/*
          mapメソッドによって生成された要素は
          それぞれ一意のキー値（keyと呼ばれる属性）を
          持っている必要がある。
        */}
        {notes.map(note =>
          <Note key={note.id} note={note} />
        )}
      </ul>
    </div>
  )
}

export default App
