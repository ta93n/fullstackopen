//Node.jsはモジュールをrequire()で呼び出して使う必要がある
//expressの導入
const express = require('express')
//app変数に配置されるExpressアプリケーションに対応するオブジェクトを作成する関数
const app = express()

let notes = [
  {
    id: 1,
    content: "HTML is easy",
    date: "2020-01-10T17:30:31.098Z",
    important: true
  },
  {
    id: 2,
    content: "Browser can execute only Javascript",
    date: "2020-01-10T18:39:34.091Z",
    important: false
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    date: "2020-01-10T19:20:14.298Z",
    important: true
  }
]

/*
アプリケーションに対してルート定義
reqはapp.getの第一引数で指定されたパスに入ってきたHTTPリクエストを表すオブジェクト
resは指定されたパスに入ってきたリクエストに対するHTTPレスポンスを構成するためのオブジェクト
*/
app.get('/', (req, res) => {
  //以下にサーバー処理を記述
  //sendメソッドでブラウザに文字列を送信
  res.send('<h1>Hello World!</h1>')
})

app.get('/api/notes', (req, res) => {
  //jsonメソッドでパラメータ内のJavascriptオブジェクトに対応するJSON形式の文字列を送信
  res.json(notes)
})

app.get('/api/notes/:id', (request, response) => {
  //Number()メソッドで、受け取ったパラメータの文字列IDを数値に変更(後のnote.idが数値なので)
  const id = Number(request.params.id)
  const note = notes.find(note => note.id === id)

  //受け取ったIDに対応するnoteが見つからない場合はステータスコード404を返す
  if (note) {
    response.json(note)
  } else {
    //responseにデータが関連づけられていないため、status()に加えてend()する必要がある
    response.status(404).end()
  }
})

app.delete('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  notes = notes.filter(note => note.id !== id)

  //204ステータスは成功レスポンス(送信するコンテンツは無い)
  response.status(204).end()
})

//listen()でポート番号を指定すれば、「localhost:3001」にブラウザからアクセスできる
const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
