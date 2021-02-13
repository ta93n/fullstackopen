import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Note from './components/Note'
import noteService from './services/notes'

const Footer = () => {
  //CSSルールはオブジェクトとして書くため、Javascript構文に従って下記のように記述
  //ReactではCSSを独自のファイルに分けて書くのは古いやり方
  const footerStyle = {
    color: 'green',
    fontStyle: 'italic',
    fontSize: 16
  }

  return (
    <div style={footerStyle}>
      <br />
      <em>Note app, Department of Computer Science, University of Helsinki 2020</em>
    </div>
  )
}

const App = () => {
  const [notes, setNotes] = useState([])//全てのnoteを保持するstate
  const [newNote, setNewNote] = useState('')//フォーム入力内容を保持するstate
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState('some error happened...')

  /*
  effect Hooksはサーバーからデータを取得するための正しい方法
  effect Hooksはデフォルトではページレンダリング直後に実行される
  useEffect関数の2番目のパラメーターは、エフェクトが実行される頻度を指定するために使用される
  */
  useEffect(() => {
    noteService
      .getAll()
        .then(initialNotes => {
        setNotes(initialNotes)//state更新すると、コンポーネントは再度レンダリングされる
      })
  }, [])

  const toggleImportanceOf = id => {
    const note = notes.find(n => n.id === id)//変更するノートを検索し、そのノートへの参照をnote変数に格納する
    const changedNote = { ...note, important: !note.important }//...noteでnoteオブジェクト全体をコピーして、importantだけ変えてる

    noteService
      .update(id, changedNote)
        .then(returnedNote => {
        //サーバーでメモがchangedNoteで更新されたら、stateのnotesを丸ごと更新する
        setNotes(notes.map(note => note.id !== id ? note : returnedNote))
      })
      //リクエストに失敗した時の処理
      .catch(error => {
        setErrorMessage(
          `Note '${note.content}' was already removed from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setNotes(notes.filter(n => n.id !== id))
      })
  }

  const addNote = event => {
    event.preventDefault()//inputのsubmitクリックで発生する動作(ページリロード)を防止する
    const noteObject = {
      content: newNote,//newNote stateから値を受け取る
      date: new Date().toISOString(),//
      inportant: Math.random() < 0.5,//Math.random()は0~1間の値を返す 50%の確率で重要なメモと判断させる
    }

    noteService
      .create(noteObject)
        .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
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

  //エラーメッセージを表示させるコンポーネント
  const Notification = ({ message }) => {
    if (message === null) {
      return null
    }

    return (
      <div className="error">
        {message}
      </div>
    )
  }

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
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
      <Footer />
    </div>
  )
}

export default App
