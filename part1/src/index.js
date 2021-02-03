// クラスを書かずにstate機能を使えるようになる
import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const History = (props) => {
  if (props.allClicks.length === 0) {
    return (
      <div>
        the app is used by pressing the buttons
      </div>
    )
  }

  return (
    <div>
      button press history: {props.allClicks.join(' ')}
    </div>
  )
}

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const App = () => {
  //左右を１つのオブジェクトに保存することで左右のstate(クリック数)を保存
  const [clicks, setClicks] = useState({
    left: 0, right: 0
  })
  //全てのクリックを記憶する配列state
  const [allClicks, setAll] = useState([])

  //左クリック
  //スプレッド構文を用いている
  //leftだけを更新するのではなく、オブジェクトを丸ごと新しいものに置き換える必要がある
  const handleLeftClick = () => {
    //既存の配列を変更せず、Lが追加された配列の新しいコピーを定義
    setAll(allClicks.concat('L'))
    setClicks({...clicks, left: clicks.left + 1})
  }

  //右クリック
  const handleRightClick = () => {
    setAll(allClicks.concat('R'))
    setClicks({...clicks, right: clicks.right + 1})
  }

  return (
    <>
      {clicks.left}
      <Button onClick={handleLeftClick} text='left' />
      <Button onClick={handleRightClick} text='right' />
      {clicks.right}
      <History allClicks={allClicks} />
    </>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
