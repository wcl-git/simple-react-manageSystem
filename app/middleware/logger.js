// 统一日志
export default store => next => action => {
  // console.log(action)
  return next(action)
}
