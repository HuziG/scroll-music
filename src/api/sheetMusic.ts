import BaaS from 'minapp-sdk'

const SHEET_TABLE_NAME = 'sheet_music'
const SHEET_NOTE_TABLE_NAME = 'sheet_note'

export const addSheet = ({
  name, imgs
}: { name: string, imgs: string[]}) => {
  let MyTableObject = new BaaS.TableObject(SHEET_TABLE_NAME)
  let MyRecord = MyTableObject.create()

  MyRecord.set({
    user_id: JSON.parse(localStorage.ifx_baas_uid).value,
    name,
    imgs
  })

  return MyRecord.save()
}

// 修改曲谱
export const editSheet = (value: 
  {  _id: string, name?: string, imgs?: string[], speed?: number, step?: number }) => 
{
  let Product = new BaaS.TableObject(SHEET_TABLE_NAME)

  let product = Product.getWithoutData(value._id)

  product.set(value)
  
  return product.update()
}

// 删除曲谱
export const delSheet = ({
  _id
}: { _id: string }) => {
  let Product = new BaaS.TableObject(SHEET_TABLE_NAME)
  return Product.delete(_id)
}

export const getSheets = async () => {
  let query = new BaaS.Query()

  query.compare('user_id', '=',  JSON.parse(localStorage.ifx_baas_uid).value)

  let Product = new BaaS.TableObject(SHEET_TABLE_NAME)

  const { data } = await Product.setQuery(query).find()

  return data
}

export const addSheetNote = ({
  sheet_id, content
}: { sheet_id: string, content: string}) => {
  let MyTableObject = new BaaS.TableObject(SHEET_NOTE_TABLE_NAME)
  let MyRecord = MyTableObject.create()

  MyRecord.set({
    sheet_id,
    content
  })

  return MyRecord.save()
}

export const editSheetNote = ({
  _id, content
}: { _id: string, content: string}) => {
  let Product = new BaaS.TableObject(SHEET_NOTE_TABLE_NAME)

  let product = Product.getWithoutData(_id)

  product.set('content', content)
  
  return product.update()
}

export const getSheetsNote = async (sheet_id: string) => {
  let query = new BaaS.Query()

  query.compare('sheet_id', '=', sheet_id)

  let Product = new BaaS.TableObject(SHEET_NOTE_TABLE_NAME)

  const { data } = await Product.setQuery(query).find()

  return data
}
