import BaaS from 'minapp-sdk'

export const uploadFile = (file: any) => {
  const File = new BaaS.File()
  const fileParams = { fileObj: file }

  return File.upload(fileParams)
}

export const delFiles = (fileIDs: string[]) => {
  const MyFile = new BaaS.File()
  return MyFile.delete(fileIDs)
}
