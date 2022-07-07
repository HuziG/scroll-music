export const deepClone = (target: any) => {
  return JSON.parse(JSON.stringify(target))
}

export const logoConsole = () => {
  const str
  = `                                                                                                      
  _____                 ____   __  ___           _     
  / ___/______________  / / /  /  |/  /_  _______(_)____
  \__ \/ ___/ ___/ __ \/ / /  / /|_/ / / / / ___/ / ___/
 ___/ / /__/ /  / /_/ / / /  / /  / / /_/ (__  ) / /__  
/____/\___/_/   \____/_/_/  /_/  /_/\__,_/____/_/\___/  
 `

  console.log(`%c${str}`, 'color: #5138ED;font-size: 10px;')
  console.log('呀嘿，被发现了')
  console.log('弹琴，音乐，前端一起来玩')
}

export const getUrlParams = (key: string) => {
  try {
    const paramsArray = window.location.href.split('?')[1].split('&')

    const result: any = {}

    paramsArray.forEach((item) => {
      const spValue = item.split('=')
      result[spValue[0]] = spValue[1]
    })

    return result[key]
  }
  catch (err) {
    return null
  }
}
