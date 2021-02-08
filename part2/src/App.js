import React, { useState } from 'react'
import Note from './components/Note'

const App = (props) => {
  const [notes, setNotes] = useState(props.notes)//全てのnoteを保持するstate
  const [newNote, setNewNote] = useState(//フォーム入力内容を保持するstate
    'a new note...'
  )

  const addNote = (event) => {
    event.preventDefault()//inputのsubmitクリックで発生する動作(ページリロード)を防止する
    const noteObject = {
      content: newNote,//newNote stateから値を受け取る
      date: new Date().toISOString(),//
      inportant: Math.random() < 0.5,//Math.random()は0~1間の値を返す 50%の確率で重要なメモと判断させる
      id: notes.length + 1,//IDはnoteの総数に基づいて生成(noteが削除されない前提)
    }

    //concatメソッドによりnoteObjectが追加された新しいnotes配列を作成
    setNotes(notes.concat(noteObject))
    setNewNote('')
  }

  //フォーム内容の変更をstateと同期させる
  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)
  }

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
      <form onSubmit={addNote}>
        <input
          value={newNote}
          onChange={handleNoteChange}
        />
        <button type="submit">save</button>
      </form>
    </div>
  )
}

export default App
