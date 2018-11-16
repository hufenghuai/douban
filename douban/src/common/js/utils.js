export const objectIsNull = data => {
  if (!data) {
    return true
  }
  // 1.转为json判断
  // return (JSON.stringify(data) === '{}')

  // 2.for in 循环判断
  // for (let key in data) {
  //     return false
  // }
  // return true

  // 3.object.getOwnPropertyNames()方法 不兼容IE8
  // const arr = Object.getOwnPropertyNames(data)
  // return arr.length === 0

  // 4.ES6 Object.keys()方法
  const arr = Object.keys(data)
  return arr.length === 0
}
