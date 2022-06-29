import axios from 'axios'
const BaaS = window.BaaS

const SHEET_TABLE_NAME = 'sheet_music'
const SHEET_NOTE_TABLE_NAME = 'sheet_note'

export const addSheet = ({
  name, imgs,
}: { name: string; imgs: string[] }) => {
  const MyTableObject = new BaaS.TableObject(SHEET_TABLE_NAME)
  const MyRecord = MyTableObject.create()

  MyRecord.set({
    user_id: JSON.parse(localStorage.ifx_baas_uid).value,
    name,
    imgs,
  })

  return MyRecord.save()
}

// 修改曲谱
export const editSheet = (value: any) => {
  const Product = new BaaS.TableObject(SHEET_TABLE_NAME)

  const product = Product.getWithoutData(value._id)

  product.set(value)

  return product.update()
}

/**
 * 删除曲谱
 * @param param0 _id 数据id
 * @returns
 */
export const delSheet = ({
  _id,
}: { _id: string }) => {
  const Product = new BaaS.TableObject(SHEET_TABLE_NAME)
  return Product.delete(_id)
}

// 获取曲谱
export const getSheets = async() => {
  const query = new BaaS.Query()

  query.compare('user_id', '=', JSON.parse(localStorage.ifx_baas_uid).value)

  const Product = new BaaS.TableObject(SHEET_TABLE_NAME)

  const { data } = await Product.setQuery(query).find()

  return data
}

/**
 * 添加曲谱笔记
 * @param param0 sheet_id 曲谱id, content 笔记内容
 * @returns
 */
export const addSheetNote = ({
  sheet_id, content,
}: { sheet_id: string; content: string }) => {
  const MyTableObject = new BaaS.TableObject(SHEET_NOTE_TABLE_NAME)
  const MyRecord = MyTableObject.create()

  MyRecord.set({
    sheet_id,
    content,
  })

  return MyRecord.save()
}

/**
 * 修改曲谱笔记
 * @param param0 _id 曲谱id
 * @returns
 */
export const editSheetNote = ({
  _id, content,
}: { _id: string; content: string }) => {
  const Product = new BaaS.TableObject(SHEET_NOTE_TABLE_NAME)

  const product = Product.getWithoutData(_id)

  product.set('content', content)

  return product.update()
}

/**
 * 获取曲谱笔记
 * @param param0 sheet_id 曲谱id
 * @returns
 */
export const getSheetsNote = async(sheet_id: string) => {
  const query = new BaaS.Query()

  query.compare('sheet_id', '=', sheet_id)

  const Product = new BaaS.TableObject(SHEET_NOTE_TABLE_NAME)

  const { data } = await Product.setQuery(query).find()

  return data
}

/**
 * 获取壁纸
 */
export const getBgImgList = (cid: string, start = 0) => {
  return axios.get(`https://service-dpw12r2n-1258462188.sh.apigw.tencentcs.com/pic/wallpaper?start=${start}&cid=${cid}`)
}
