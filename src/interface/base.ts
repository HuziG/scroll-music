export interface baasFile {
  id: string
  size: number
  path: string
  created_at: number
}

export interface sheetDetailStore {
  sheetData: {
    step?: number
    speed?: number
  },
  sheetNote: any
}
