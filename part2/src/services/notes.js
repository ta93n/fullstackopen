import axios from 'axios'
const baseUrl = 'http://localhost:3001/notes'

/*
AxiosのメソッドgetはPromiseを返します。
PromiseとはJavaScriptにおいて、非同期処理の操作が完了したときに結果を返すものです。
*/
const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = newObject => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

export default { getAll, create, update }

/*
上記エクスポートは下記の簡略化ver
export default {
  getAll: getAll,
  create: create,
  update: update
}
*/
