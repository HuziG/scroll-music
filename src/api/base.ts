const BaaS = window.BaaS

export const uploadFile = (file: any) => {
  const File = new BaaS.File()
  const fileParams = { fileObj: file }

  return File.upload(fileParams)
}

export const delFiles = (fileIDs: string[]) => {
  const MyFile = new BaaS.File()
  return MyFile.delete(fileIDs)
}

export const getValue = async(tableName: string, key: string, _id: string) => {
  const query = new BaaS.Query()
  query.compare(key, '=', _id)

  const Product = new BaaS.TableObject(tableName)
  const { data } = await Product.setQuery(query).find()

  return data
}

export const addValue = (tableName: string, value: any = {}) => {
  const MyTableObject = new BaaS.TableObject(tableName)
  const MyRecord = MyTableObject.create()

  MyRecord.set({
    user_id: JSON.parse(localStorage.ifx_baas_uid).value,
    ...value,
  })

  return MyRecord.save()
}

export const editValue = (tableName: string, _id: string, value: any) => {
  const Product = new BaaS.TableObject(tableName)
  const product = Product.getWithoutData(_id)
  product.set(value)

  return product.update()
}
