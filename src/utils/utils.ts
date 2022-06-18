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
  console.log('快看哪个前端大佬来了！？')
  console.log('弹琴，音乐，前端共同融入生活，岂不美哉？')
}
