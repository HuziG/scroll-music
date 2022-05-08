import BaaS from 'minapp-sdk'

export const uploadFile = (file: any) => {
  let File = new BaaS.File()
  let fileParams = {fileObj: file}

  return File.upload(fileParams)
}

export const delFiles = (fileIDs: string[]) => {
  let MyFile = new BaaS.File()
  return MyFile.delete(fileIDs)
}
