// クラスを書かずにstate機能を使えるようになる
import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Display = ({ counter }) => <div>{counter}</div>

const Button = ({ handleClick, text }) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

const App = () => {
  //counterというstate変数を宣言しており、それを0にセット
  //counterを更新したい場合はsetCounterを呼ぶことができる
  const [ counter, setCounter ] = useState(0)

  //イベントハンドラーはJSX内で定義するべきではない
  const increaseByOne = () => setCounter(counter + 1)
  const decreaseByOne = () => setCounter(counter - 1)
  const setToZero = () => setCounter(0)

  //stateを読み出す時に直接counterを使うことができる
  return (
    <>
    <Display counter={counter} />
    <Button
      handleClick={increaseByOne}
      text='plus'
    />
    <Button
      handleClick={setToZero}
      text='zero'
    />
    <Button
      handleClick={decreaseByOne}
      text='minus'
    />
    </>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
