import { useSheetDetailStore } from '~/stores/sheetDetail'

declare let jquery: any

export default function() {
  const createDom = (fn: any) => {
    const sheet = useSheetDetailStore().sheetData

    if (sheet.length <= 0)
      return false

    jquery('#print-selector-imgs').html('')

    sheet.imgs.forEach((item: any) => {
      jquery('#print-selector-imgs').append(`<img src=${item.url} />`)
    })

    fn()
  }

  const printSheet = () => {
    createDom(() => {
      setTimeout(() => {
        jquery('#print-selector-imgs').printThis({
          importCSS: true,
          importStyle: true,
        })
      }, 1000)
    })
  }

  return {
    printSheet,
  }
}
