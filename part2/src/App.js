import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Note from './components/Note'

const App = () => {
  const [notes, setNotes] = useState([])//全てのnoteを保持するstate
  const [newNote, setNewNote] = useState('')//フォーム入力内容を保持するstate
  const [showAll, setShowAll] = useState(true)

  const hook = () => {
    console.log('effect')
    /*
    AxiosのメソッドgetはPromiseを返します。
    PromiseとはJavaScriptにおいて、非同期処理の操作が完了したときに結果を返すものです。
    */
    axios
      .get('http://localhost:3001/notes')
      .then(response => {
        console.log('promise fulfilled')
        setNotes(response.data)//state更新すると、コンポーネントは再度レンダリングされる
      })
  }

  /*
  effect Hooksはサーバーからデータを取得するための正しい方法
  effect Hooksはデフォルトではページレンダリング直後に実行される
  useEffect関数の2番目のパラメーターは、エフェクトが実行される頻度を指定するために使用される
  */
  useEffect(hook, [])

  const toggleImportanceOf = id => {
    const url = `http://localhost:3001/notes/${id}`
    const note = notes.find(n => n.id === id)//変更するノートを検索し、そのノートへの参照をnote変数に格納する
    const changedNote = { ...note, important: !note.important }//...noteでnoteオブジェクト全体をコピーして、importantだけ変えてる

    //サーバーでメモがchangedNoteで更新されたら、stateのnotesを丸ごと更新する
    axios.put(url, changedNote).then(response => {
      setNotes(notes.map(note => note.id !== id ? note : response.data))
    })
  }

  const addNote = event => {
    event.preventDefault()//inputのsubmitクリックで発生する動作(ページリロード)を防止する
    const noteObject = {
      content: newNote,//newNote stateから値を受け取る
      date: new Date().toISOString(),//
      inportant: Math.random() < 0.5,//Math.random()は0~1間の値を返す 50%の確率で重要なメモと判断させる
    }

    axios
      .post('http://localhost:3001/notes', noteObject)
      .then(response => {
        setNotes(notes.concat(response.data))
        setNewNote('')
      })
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
        {/* showAllのtrue:falseを切り替える */}
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
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
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
