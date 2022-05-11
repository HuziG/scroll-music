import BaaS from 'minapp-sdk'

const TABLE_NAME = 'sheet_music'

export const addSheet = ({
  name, imgs
}: { name: string, imgs: string[]}) => {
  let MyTableObject = new BaaS.TableObject(TABLE_NAME)
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
  let Product = new BaaS.TableObject(TABLE_NAME)

  let product = Product.getWithoutData(value._id)

  product.set(value)
  
  return product.update()
}

// 删除曲谱
export const delSheet = ({
  _id
}: { _id: string }) => {
  let Product = new BaaS.TableObject(TABLE_NAME)
  return Product.delete(_id)
}

export const getSheets = async () => {
  // 实例化查询对象
  let query = new BaaS.Query()

  query.compare('user_id', '=',  JSON.parse(localStorage.ifx_baas_uid).value)

  // 应用查询对象
  let Product = new BaaS.TableObject(TABLE_NAME)

  const { data } = await Product.setQuery(query).find()

  return data
}
