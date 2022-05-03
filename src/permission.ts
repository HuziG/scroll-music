const routerWatch = (router: any) => {
  router.beforeEach((to: any, from: any) => {

    console.log(to)
    console.log(from)
    
    return false
  })
} 

export default routerWatch
