const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')
chai.use(sinonChai)
const assert = chai.assert

const DeepClone = require('../src/index')

describe('DeepCline.clone', () => {
  it('他是一个类', () => {
    assert.isFunction(DeepClone)
  })
  it('能够复制基本类型', () => {
    const number = 123
    const deepClone = new DeepClone()
    const number2 = deepClone.clone(number)
    assert(number === number2)
    const string = '123456'

    const string2 = deepClone.clone(string)
    assert(string === string2)
    const boolean1 = true
    const boolean2 = deepClone.clone(boolean1)
    assert(boolean1 === boolean2)
    const u = undefined
    const u2 = deepClone.clone(u)
    assert(u === u2)
    const empty = null
    const empty2 = deepClone.clone(empty)
    assert(empty === empty2)
    const symbol = Symbol()
    const symbol2 = deepClone.clone(symbol)
    assert(symbol === symbol2)
  })
  describe('对象', () => {
    it('能够复制普通对象', () => {
      const a = {name: 'wwwbh', child: {name: 'xwwwbh', age: 1}}
      const deepClone = new DeepClone()
      const a2 = deepClone.clone(a)
      assert(a !== a2)
      assert(a.name === a2.name)
      assert(a.child !== a2.child)
      assert(a.child.name === a2.child.name)
      assert(a.child.age === a2.child.age)
    })
    it('能够复制数组对象', () => {
      const a = [[11, 12], [21, 22], [31, 32]]
      const deepClone = new DeepClone()
      const a2 = deepClone.clone(a)
      assert(a !== a2)
      assert(a[0] !== a2[0])
      assert(a[1] !== a2[1])
      assert(a[2] !== a2[2])
      assert.deepEqual(a, a2)
    })
    it('能够复制函数对象', () => {
      const a = function (x, y) {
        return x + y
      }
      a.xxx = {yyy: {zzz: 1}}
      const deepClone = new DeepClone()
      const a2 = deepClone.clone(a)
      assert(a !== a2)
      assert(a.xxx !== a2.xxx)
      assert(a.xxx.yyy !== a2.xxx.yyy)
      assert(a.xxx.yyy.zzz === a2.xxx.yyy.zzz)
      assert(a(1, 2) === a2(1, 2))
    })
    it('能够复制环引用的对象', () => {
      const a = {name: 'wwwbh'}
      a.self = a
      const deepClone = new DeepClone()
      const a2 = deepClone.clone(a)
      assert(a !== a2)
      assert(a.name === a2.name)
      assert(a.self !== a2.self)
    })
    it('可以复制正则', () => {
      const a = new RegExp('hi\\d+', 'gi')
      a.xxx = {yyy: {zzz: 1}}
      const deepClone = new DeepClone()
      const a2 = deepClone.clone(a)
      assert(a.source === a2.source)
      assert(a.flags === a2.flags)
      assert(a.xxx !== a2.xxx)
      assert(a.xxx.yyy !== a2.xxx.yyy)
      assert(a.xxx.yyy.zzz === a2.xxx.yyy.zzz)
    })
    it('可以复制日期', () => {
      const a = new Date()
      a.xxx = {yyy: {zzz: 1}}
      const deepClone = new DeepClone()
      const a2 = deepClone.clone(a)
      assert(a !== a2)
      assert(a.getTime() === a2.getTime())
      assert(a.xxx !== a2.xxx)
      assert(a.xxx.yyy !== a2.xxx.yyy)
      assert(a.xxx.yyy.zzz === a2.xxx.yyy.zzz)
    })
    it('不会复制原型上的属性', () => {
      const a = Object.create({name: 'a'})
      a.xxx = {yyy: {zzz: 1}}
      const deepClone = new DeepClone()
      const a2 = deepClone.clone(a)
      assert(a !== a2)
      assert.isFalse('name' in a2)
      assert(a.xxx !== a2.xxx)
      assert(a.xxx.yyy !== a2.xxx.yyy)
      assert(a.xxx.yyy.zzz === a2.xxx.yyy.zzz)
    })
  })
})
