class DeepClone {
  cache = []
  clone(source) {
    if (source instanceof Object) {
      let cachedDist = this.findCache(source)
      if (cachedDist) {
        return cachedDist
      } else {
        let dist
        if (source instanceof Object) {
          if (source instanceof Array) {
            dist = []
          } else if (source instanceof Function) {
            dist = function () {
              return source.call(this, ...arguments)
            }
          } else if (source instanceof RegExp){
            dist = new RegExp(source.source, source.flags)
          } else if (source instanceof Date) {
            dist = new Date(source)
          }else {
            dist = {}
          }
          this.cache.push([source, dist])
          for (let key in source) {
            if(source.hasOwnProperty(key)){
              // 只复制不在原型上的属性
              dist[key] = this.clone(source[key])
            }
          }
          return dist
        }
      }
    }
    return source
  }

  findCache(source) {
    for (let i = 0; i < this.cache.length; i++) {
      if (this.cache[i][0] === source) {
        return this.cache[i][1]
      }
    }
  }
}

module.exports = DeepClone
