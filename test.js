let clog = console.log
let helper = {
  deepClone: (p) => p, // todo
}
let mockUlid = () => {
  return Math.floor(Math.random() * 100000)
}
let ulid = mockUlid

// 创建一个空间，用于容纳数据。
// 创建若干索引表，每条索引指向若干数据。
class MySql {
  constructor(
    indexField = ['id'],
    schema = {}
    // spaceSize = '500k'
  ) {
    // 预检
    // 设置实例属性
    this.space = new Map()
    this._indexTableBox = new Map()
    // this._indexFieldList = Array.isArray(indexField) ? indexField : [indexField]
    this._indexFieldSet = new Set()
    this._schema = schema
    // this.genIndexTableMap()
    this.init(indexField)
  }
  init(indexField) {
    this.getFieldSet(indexField)
    this.genIndexTableMap(indexField)
  }
  getFieldSet(indexField) {
    indexField.forEach((item) => {
      this._indexFieldSet.add(item)
    })
  }
  // Init 若干索引表
  genIndexTableMap(indexField) {
    indexField.forEach((indexKey) => {
      this._indexTableBox.set(indexKey, new Map())
    })
  }
  recastIndexTable() {
    // this.genIndexTable()
    this._indexTableBox = {}
    this.space.forEach((element) => {
      this.add(element)
    })
  }
  add(p) {
    // object
    // number
    // string
    // array
    // regexp
    // date
    let ulid = mockUlid()
    this.space.set(ulid, helper.deepClone(p))
    Array.from(Object.keys(p)).forEach((key) => {
      if (this._indexFieldSet.has(key)) {
        let value = p[key]
        let indexTable = this._indexTableBox.get(key)
        let ulidList = indexTable.get(value)
        if (ulidList) {
          ulidList.push(ulid)
        } else {
          indexTable.set(value, [ulid])
        }
      }
    })
  }
  get(key, value) {
    // return this._indexTableBox.get(key).get(value)
    // 预检
    if (this._indexFieldSet.has(key)) {
      // 查询
      let ulidList = this._indexTableBox.get(key).get(value)
      let res = []
      if (ulidList) {
        ulidList.forEach((ulid) => {
          res.push(this.space.get(ulid))
        })
      }
      return res
    } else {
      return new Error(`此${key}不是索引，不能做查询。`)
    }
  }
  delete(key, value) {
    let indexTable = this._indexTableBox.get(key)
    let ulidList = indexTable
      .get(value)(
        // let remainUlid = [...ulidList]
        ulidList || []
      )
      .forEach((ulid) => {
        this.space.delete(ulid)
      })
    indexTable.set(value, [])
  }
  // 没有改
  // set(key, value) {}
}
// export default MySql;
window.MySql = MySql
