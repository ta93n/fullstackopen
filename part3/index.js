//httpモジュールでWebサーバー構築

//Node.jsの組み込みWebサーバー構成モジュールを有効にする
//Node.jsはモジュールをrequire()で呼び出して使う必要がある
const http = require('http')

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

//createServer()メソッドを使ってWebサーバーを構築
const app = http.createServer((request, response) => {
  //以下にサーバー処理を記述
  //リクエストはステータスコード200で応答され、
  //writeHead()でContent-Typeヘッダーをapplication/json(データがJSON形式であること)に設定
  //end()の引数をブラウザに表示させるコンテンツに設定(JSON.stringify()メソッドによってjsonに変換)
  response.writeHead(200, { 'Content-Type': 'application/json' })
  response.end(JSON.stringify(notes))
})

//listen()でポート番号を指定すれば、「localhost:3001」にブラウザからアクセスできる
const port = 3001
app.listen(port)
console.log(`Server running on port ${port}`)
