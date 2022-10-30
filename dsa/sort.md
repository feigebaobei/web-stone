# order

## 冒泡排序

n^2

```js
const bobbleSort = (arr) => {
  let length = arr.length
  for (let i = 0; i < length; i++) {
    for (let j = 0; j < length - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        ;[arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
      }
    }
  }
}
```

## 快速排序

```js
//
let quickOrder = function (arr, left, right) {
  let index = null
  let position = (arr, left, right) => {
    let pivot = arr[Math.floor((left + right) / 2)],
      i = left,
      j = right
    while (i <= j) {
      while (arr[i] < pivot) {
        i++
      }
      while (arr[j] > pivot) {
        j--
      }
      if (i <= j) {
        ;[arr[i], arr[j]] = [arr[j], arr[i]]
        i++
        j--
      }
    }
    return i
  }
  if (arr.length > 1) {
    index = position(arr, left, right)
    if (left < index - 1) {
      quickOrder(arr, left, index - 1)
    }
    if (index < right) {
      quickOrder(arr, index, right)
    }
  }
}

let quickOrder = (arr) => {
  if (arr.length <= 1) {
    return arr
  }
  let pivotIndex = Math.floor(arr.length / 2),
    pivot = arr.splice(pivotIndex, 1)[0],
    left = [],
    right = []
  for (let i = 0, iLen = arr.length; i < iLen; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i])
    } else {
      right.push(arr[i])
    }
  }
  return quickOrder(left).concat([pivot], quickOrder(right))
}
```

## 归并排序

```js
function mergeSort(array) {
  if (array.length === 1) {
    return array
  }
  let mid = Math.floor(array.length / 2)
  let arrLeft = array.slice(0, mid)
  let arrRight = array.slice(mid, array.length)
  return merge(mergeSort(arrLeft), mergeSort(arrRight))
}
function merge(left, right) {
  let result = []
  let ll = 0
  let rl = 0
  while (ll < left.length && rl < right.length) {
    if (right[rl] < left[ll]) {
      result.push(right[rl++])
    } else {
      result.push(left[ll++])
    }
  }
  while (ll < left.length) {
    result.push(left[ll++])
  }
  while (rl < right.length) {
    result.push(right[rl++])
  }
  return result
}
```

## 选择排序

```js
// n^2
function selectionSort(array) {
  for (let i = 0; i < array.length; i++) {
    let indexMin = i
    for (let j = i + 1; j < array.length; j++) {
      if (array[j] < array[indexMin]) {
        indexMin = j
        // [array[i], array[]]
      }
    }
    if (i !== indexMin) {
      ;[array[i], array[indexMin]] = [array[indexMin], array[i]]
    }
  }
}
```

## 插入排序

```js
function insertionSort(arr) {
  let length = arr.length
  let j
  let temp
  for (let i = 0; i < length; i++) {
    j = i
    temp = arr[i]
    while (j > 0 && arr[j - 1] > temp) {
      arr[j] = arr[j - 1]
      j--
    }
    arr[j] = temp
  }
}
```

##快速排序 ##快速排序

    function quickSort(array) {
        function sort(prev, numsize) {
            var nonius = prev;
            var j = numsize - 1;
            var flag = array[prev];
            if ((numsize - prev) > 1) {
                while (nonius < j) {
                    for (; nonius < j; j--) {
                        if (array[j] < flag) {
                            array[nonius++] = array[j];　 //a[i] = a[j]; i += 1;
                            break;
                        };
                    }
                    for (; nonius < j; nonius++) {
                        if (array[nonius] > flag) {
                            array[j--] = array[nonius];
                            break;
                        }
                    }
                }
                array[nonius] = flag;
                sort(0, nonius);
                sort(nonius + 1, numsize);
            }
        }
        sort(0, array.length);
        return array;
    }

# unOrder

    let unOrder = (arr) => {
        let temp = [],
            arrShadow = JSON.parse(JSON.stringify(arr)),
            index = null
        while (arrShadow.length) {
            index = Math.floor(Math.random() * arrShadow.length)
            temp.push(arrShadow.splice(index, 1)[0])
        }
        return temp
    }
