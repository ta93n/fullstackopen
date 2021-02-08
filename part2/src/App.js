import React, { useState } from 'react'
import Note from './components/Note'

const App = (props) => {
  const [notes, setNotes] = useState(props.notes)//全てのnoteを保持するstate
  const [newNote, setNewNote] = useState('')//フォーム入力内容を保持するstate
  const [showAll, setShowAll] = useState(true)

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

  //条件演算子を用いて、showAllがtrueの場合は全てのnoteを、falseの場合は重要なnoteのみを返す
  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important === true)
    //( filter()は与えられた関数によって実装されたテストに合格した全ての配列からなる新しい配列を生成 )

  return (
    <div>
      <h1>Notes</h1>
      <div>
        //showAllのtrue:falseを切り替える
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {/*
          mapメソッドによって生成された要素は
          それぞれ一意のキー値（keyと呼ばれる属性）を
          持っている必要がある。
        */}
        {notesToShow.map(note =>
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
