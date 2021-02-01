// クラスを書かずにstate機能を使えるようになる
import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  //左右を１つのオブジェクトに保存することで左右のstate(クリック数)を保存
  const [clicks, setClicks] = useState({
    left: 0, right: 0
  })

  //左クリック
  //スプレッド構文を用いている
  //leftだけを更新するのではなく、オブジェクトを丸ごと新しいものに置き換える必要がある
  const handleLeftClick = () => {
    setClicks({...clicks, left: clicks.left + 1})
  }

  //右クリック
  const handleRightClick = () => {
    setClicks({...clicks, right: clicks.right + 1})
  }

  return (
    <>
      {clicks.left}
      <button onClick={handleLeftClick}>left</button>
      <button onClick={handleRightClick}>right</button>
      {clicks.right}
    </>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
