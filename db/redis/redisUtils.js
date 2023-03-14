// const redisClient = require('./redisClient.js')

// 按数据类型分类
let str = {
  set: (k, v) => {
    return new Promise((r, j) => {
      redisClient.set(k, v, (err, resObj) => {
        err
          ? r({ error: err, result: null })
          : r({ error: null, result: resObj })
      })
    })
  },
  get: (k) => {
    return new Promise((r, j) => {
      redisClient.get(k, (err, resObj) => {
        err
          ? r({ error: err, result: null })
          : r({ error: null, result: resObj })
      })
    })
  },
  del: (k) => {
    return new Promise((r, j) => {
      redisClient.del(k, (err, resObj) => {
        err
          ? r({ error: err, result: null })
          : r({ error: null, result: resObj })
      })
    })
  },
}
let list = {
  // 在列表头部插入多个值
  lpush: (k, ...vs) => {
    return new Promise((r, j) => {
      redisClient.lpush(k, vs, (err, resObj) => {
        err
          ? r({ error: err, result: null })
          : r({ error: null, result: resObj })
      })
    })
  },
  // 在列表头部插入一个值
  lpushx: (k, v) => {
    return new Promise((r, j) => {
      redisClient.lpushx(k, v, (err, resObj) => {
        err
          ? r({ error: err, result: null })
          : r({ error: null, result: resObj })
      })
    })
  },
  // 当k不存在则创建空列表并添加元素。
  // 当k存在且不是列表类型时，返回错误。
  // 若成功则返回列表长度
  rpush: (k, ...vs) => {
    return new Promise((r, j) => {
      redisClient.rpush(k, vs, (err, resObj) => {
        err
          ? r({ error: err, result: null })
          : r({ error: null, result: resObj })
      })
    })
  },
  rpushx: (k, v) => {
    return new Promise((r, j) => {
      redisClient.rpushx(k, v, (err, resObj) => {
        err
          ? r({ error: err, result: null })
          : r({ error: null, result: resObj })
      })
    })
  },
  lrange: (k, start, stop) => {
    return new Promise((r, j) => {
      redisClient.lrange(k, start, stop, (err, resObj) => {
        err
          ? r({ error: err, result: null })
          : r({ error: null, result: resObj })
      })
    })
  },
  lindex: (k, index) => {
    return new Promise((r, j) => {
      redisClient.lindex(k, index, (err, resObj) => {
        err
          ? r({ error: err, result: null })
          : r({ error: null, result: resObj })
      })
    })
  },
  // 移除元素
  lrem: (k, count, v) => {
    // count > 0 从头开始移除与v相等的元素。数据为count
    // count < 0 从尾开始移除与v相等的元素。数据为count
    // count = 0 移除所有与v相等的元素。
    return new Promise((r, j) => {
      redisClient.lrem(k, count, v, (err, resObj) => {
        err
          ? r({ error: err, result: null })
          : r({ error: null, result: resObj })
      })
    })
  },
  // 删除指定索引的元素
  // 这种方法比较危险
  // lremIndex: (k, index) => {
  //   return redisClient.lindex(k, index).then(({error, result}) => {
  //     return result || Promise.reject({isError: true, payload: error})
  //   })
  //   .then(ele => {
  //     return redisClient.lrem(k, ) // 做到这里发现无法实现。
  //   })
  //   .catch(({isError, payload}) => {
  //     return isError ? Promise.resolve({error: payload, result: null}) : Promise.resolve({error: null, result: payload})
  //   })
  // },
  // 这种方法更危险
  // lremRange: () => {}
  // 通过索引来设置元素的值。
  // 当索引参数超出范围，或对一个空列表进行 LSET 时，返回一个错误。
  lset: (k, index, v) => {
    return new Promise((r, j) => {
      redisClient.lset(k, index, v, (err, resObj) => {
        err
          ? r({ error: err, result: null })
          : r({ error: null, result: resObj })
      })
    })
  },
  // 获取列表的长度
  llen: (k) => {
    return new Promise((r, j) => {
      redisClient.llen(k, (err, resObj) => {
        err
          ? r({ error: err, result: null })
          : r({ error: null, result: resObj })
      })
    })
  },
  // lpop
  lpop: (k) => {
    return new Promise((r, j) => {
      redisClient.lpop(k, (err, resObj) => {
        err
          ? r({ error: err, result: null })
          : r({ error: null, result: resObj })
      })
    })
  },
  // rpop
  rpop: (k) => {
    return new Promise((r, j) => {
      redisClient.rpop(k, (err, resObj) => {
        err
          ? r({ error: err, result: null })
          : r({ error: null, result: resObj })
      })
    })
  },
}
let set = {
  sadd: (k, ...vs) => {
    return new Promise((r, j) => {
      redisClient.sadd(k, vs, (err, resObj) => {
        err
          ? r({ error: err, result: null })
          : r({ error: null, result: resObj })
      })
    })
  },
  srem: (k, ...vs) => {
    return new Promise((r, j) => {
      redisClient.srem(k, vs, (err, resObj) => {
        err
          ? r({ error: err, result: null })
          : r({ error: null, result: resObj })
      })
    })
  },
  sismember: (k, v) => {
    return new Promise((r, j) => {
      redisClient.sismember(k, v, (err, resObj) => {
        err
          ? r({ error: err, result: null })
          : r({ error: null, result: resObj })
      })
    })
  },
  // 可取出全部成员，不能取出指定成员。
  smembers: (k) => {
    return new Promise((r, j) => {
      redisClient.smembers(k, (err, resObj) => {
        err
          ? r({ error: err, result: null })
          : r({ error: null, result: resObj })
      })
    })
  },
  // 获取集合的成员数
  scard: (k) => {
    return new Promise((r, j) => {
      redisClient.scard(k, (err, resObj) => {
        err
          ? r({ error: err, result: null })
          : r({ error: null, result: resObj })
      })
    })
  },
  // 返回第一个集合与其他集合之间的差异
  sdiff: (k, ...ok) => {
    return new Promise((r, j) => {
      redisClient.sdiff(k, ...ok, (err, resObj) => {
        err
          ? r({ error: err, result: null })
          : r({ error: null, result: resObj })
      })
    })
  },
  // 交集
  sinter: (k, ...ok) => {
    return new Promise((r, j) => {
      redisClient.sinter(k, ...ok, (err, resObj) => {
        err
          ? r({ error: err, result: null })
          : r({ error: null, result: resObj })
      })
    })
  },
  // 从source把member移动到destination
  smove: (source, destination, member) => {
    return new Promise((r, j) => {
      redisClient.smove(source, destination, member, (err, resObj) => {
        err
          ? r({ error: err, result: null })
          : r({ error: null, result: resObj })
      })
    })
  },
  // 随机移除一个元素
  // 不支持移除多个元素
  spop: (k) => {
    return new Promise((r, j) => {
      redisClient.spop(k, (err, resObj) => {
        err
          ? r({ error: err, result: null })
          : r({ error: null, result: resObj })
      })
    })
  },
  // 并集
  sunion: (k, ...ok) => {
    return new Promise((r, j) => {
      redisClient.sunion(k, ...ok, (err, resObj) => {
        err
          ? r({ error: err, result: null })
          : r({ error: null, result: resObj })
      })
    })
  },
}

// hash
let hash = {
  // 设置字段对应的值
  hset: (key, field, value) => {
    return new Promise((r, j) => {
      redisClient.hset(key, field, value, (err, resObj) => {
        err
          ? r({ error: err, result: null })
          : r({ error: null, result: resObj })
      })
    })
  },
  // 同时将多个 field-value
  hmset: (key, ...kv) => {
    return new Promise((r, j) => {
      redisClient.hmset(key, ...kv, (err, resObj) => {
        err
          ? r({ error: err, result: null })
          : r({ error: null, result: resObj })
      })
    })
  },
  // 若key存在则无操作，否则保存kv.
  hsetnx: (key, field, value) => {
    return new Promise((r, j) => {
      redisClient.hsetnx(key, field, value, (err, resObj) => {
        err
          ? r({ error: err, result: null })
          : r({ error: null, result: resObj })
      })
    })
  },
  // 获取指定字段的值。
  hget: (key, field) => {
    return new Promise((r, j) => {
      redisClient.hget(key, field, (err, resObj) => {
        err
          ? r({ error: err, result: null })
          : r({ error: null, result: resObj })
      })
    })
  },
  // hmget
  hmget: (key, ...f) => {
    return new Promise((r, j) => {
      redisClient.hmget(key, ...f, (err, resObj) => {
        err
          ? r({ error: err, result: null })
          : r({ error: null, result: resObj })
      })
    })
  },
  // 删除指定的key
  hdel: (key, ...f) => {
    return new Promise((r, j) => {
      redisClient.hdel(key, ...f, (err, resObj) => {
        err
          ? r({ error: err, result: null })
          : r({ error: null, result: resObj })
      })
    })
  },
  // 是否存在指定的字段
  hexists: (key, field) => {
    return new Promise((r, j) => {
      redisClient.hexists(key, field, (err, resObj) => {
        err
          ? r({ error: err, result: null })
          : r({ error: null, result: resObj })
      })
    })
  },
  hgetall: (key) => {
    return new Promise((r, j) => {
      redisClient.hgetall(key, (err, resObj) => {
        err
          ? r({ error: err, result: null })
          : r({ error: null, result: resObj })
      })
    })
  },
  hkeys: (key) => {
    return new Promise((r, j) => {
      redisClient.hkeys(key, (err, resObj) => {
        err
          ? r({ error: err, result: null })
          : r({ error: null, result: resObj })
      })
    })
  },
  hvals: (key) => {
    return new Promise((r, j) => {
      redisClient.hvals(key, (err, resObj) => {
        err
          ? r({ error: err, result: null })
          : r({ error: null, result: resObj })
      })
    })
  },
  // hlen
  hlen: (key) => {
    return new Promise((r, j) => {
      redisClient.hlen(key, (err, resObj) => {
        err
          ? r({ error: err, result: null })
          : r({ error: null, result: resObj })
      })
    })
  },
}

// 有序集合
let zset = {
  // 添加成员
  // zadd: (args) => {
  // args如：['testzset', 0, 'v0', 1, 'v1', 2, 'v2']
  // zadd: (...args) => {
  zadd: (key, ...fv) => {
    return new Promise((r, j) => {
      redisClient.zadd(key, ...fv, (err, resObj) => {
        err
          ? r({ error: err, result: null })
          : r({ error: null, result: resObj })
      })
    })
  },
  // 成员数量
  zcard: (k) => {
    return new Promise((r, j) => {
      redisClient.zcard(k, (err, resObj) => {
        err
          ? r({ error: err, result: null })
          : r({ error: null, result: resObj })
      })
    })
  },
  // 在尾部添加一个成员
  // zaddOneR: (k, v) => {
  //   return zset.zcard(k).then(({error, result}) => {
  //     if (error) {
  //       return Promise.resolve({error: error, result: null})
  //     } else {
  //       // 从0开始排序
  //       return zset.zadd([k, result, v])
  //     }
  //   })
  // },
  // 在头部添加一个成员
  // zaddOneL: (k, v) => {
  //   return zset.zcard(k).then(({error, result}) => {
  //     if (error) {
  //       return Promise.resolve({error: error, result: null})
  //     } else {
  //       return zset.zadd([k, 0, v])
  //     }
  //   })
  // },
  // 按索引范围取出成员。把分数从小到大排序。
  // [start, stop]
  zrange: (k, start, stop) => {
    return new Promise((r, j) => {
      redisClient.zrange(k, start, stop, (err, resObj) => {
        err
          ? r({ error: err, result: null })
          : r({ error: null, result: resObj })
      })
    })
  },
  // 按分值取出成员。从大到小
  zrangebyscore: (k, max, min) => {
    return new Promise((r, j) => {
      redisClient.zrangebyscore(k, max, min, (err, resObj) => {
        err
          ? r({ error: err, result: null })
          : r({ error: null, result: resObj })
      })
    })
  },
  // 按索引范围取出成员。把分数从大到小排序。
  zrevrange: (k, start, stop) => {
    return new Promise((r, j) => {
      redisClient.zrevrange(k, start, stop, (err, resObj) => {
        err
          ? r({ error: err, result: null })
          : r({ error: null, result: resObj })
      })
    })
  },
  // 返回指定分数区间的成员数量
  zcount: (key, min, max) => {
    return new Promise((r, j) => {
      redisClient.zcount(key, min, max, (err, resObj) => {
        err
          ? r({ error: err, result: null })
          : r({ error: null, result: resObj })
      })
    })
  },
  // 给指定的成员的分别增加incremment
  // result: 增加后的分数
  zincrby: (key, increment, member) => {
    return new Promise((r, j) => {
      redisClient.zincrby(key, increment, member, (err, resObj) => {
        err
          ? r({ error: err, result: null })
          : r({ error: null, result: resObj })
      })
    })
  },
  // 先计算若干个有序集的交集，再把numbers个元素保存到destination中。
  // destination中的分数值会增加
  zinterstore: (destination, number, key) => {
    return new Promise((r, j) => {
      redisClient.zinterstore(destination, number, key, (err, resObj) => {
        err
          ? r({ error: err, result: null })
          : r({ error: null, result: resObj })
      })
    })
  },
  // 返回分数区间内的成员数量
  // 不可以正常使用
  // zlexcount: (key, min, max) => {
  //   return new Promise((r, j) => {
  //     redisClient.zlexcount(key, min, max, (err, resObj) => {
  //       err ? r({error: err, result: null}) : r({error: null, result: resObj})
  //     })
  //   })
  // },
  // 返回指定成员的排名(即索引)。从小到大。
  // 排名 与 分数 不同
  zrank: (key, member) => {
    return new Promise((r, j) => {
      redisClient.zrank(key, member, (err, resObj) => {
        err
          ? r({ error: err, result: null })
          : r({ error: null, result: resObj })
      })
    })
  },
  // 若成员在有序集合中，则删除该成员。
  // [min, max]
  zrem: (k, ...members) => {
    return new Promise((r, j) => {
      redisClient.zrem(k, ...members, (err, resObj) => {
        err
          ? r({ error: err, result: null })
          : r({ error: null, result: resObj })
      })
    })
  },
  // zremrangebyscore
  // 返回成员的分数值 | null
  zscore: (k, member) => {
    return new Promise((r, j) => {
      redisClient.zscore(k, member, (err, resObj) => {
        err
          ? r({ error: err, result: null })
          : r({ error: null, result: resObj })
      })
    })
  },
  // 并集
  zunionstore: (destination, ...key) => {
    return new Promise((r, j) => {
      redisClient.zunionstore(destination, ...key, (err, resObj) => {
        err
          ? r({ error: err, result: null })
          : r({ error: null, result: resObj })
      })
    })
  },
}

module.exports = {
  str,
  list,
  set,
  hash,
  zset,
  // user,
}
