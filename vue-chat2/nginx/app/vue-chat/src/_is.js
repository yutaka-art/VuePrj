const toStr = Object.prototype.toString

/**
 * 指定された値が {@link Object} 型かどうかを確認します。
 * @param {Any} target - 判定する値
 * @return {boolean} {@link Object} 型の場合は true 、そうでない場合は false
 */
export function isObject(target) {
  return toStr.call(target) === '[object Object]' &&
    typeof target !== 'undefined' && target !== null
}

/**
 * 指定された値が {@link String} 型かどうかを確認します。
 * @param {Any} target - 判定する値
 * @return {boolean} {@link String} 型の場合は true 、そうでない場合は false
 */
export function isString(target) {
  return toStr.call(target) === '[object String]'
}

/**
 * 指定された値が {@link Number} 型かどうかを確認します。
 * @param {Any} target - 判定する値
 * @return {boolean} {@link Number} 型の場合は true 、そうでない場合は falseF
 */
export function isNumber(target) {
  return toStr.call(target) === '[object Number]'
}
/**
 * 指定された値が {@link Boolean} 型かどうかを確認します。
 * @param {Any} target - 判定する値
 * @return {boolean} {@link Boolean} 型の場合は true 、そうでない場合は false
 */
export function isBoolean(target) {
  return toStr.call(target) === '[object Boolean]'
}
/**
 * 指定された値が {@link Date} 型かどうかを確認します。
 * @param {Any} target - 判定する値
 * @return {boolean} {@link Date} 型の場合は true 、そうでない場合は false
 */
export function isDate(target) {
  return toStr.call(target) === '[object Date]'
}
/**
 * 指定された値が {@link Function} 型かどうかを確認します。
 * @param {Any} target - 判定する値
 * @return {boolean} {@link Function} 型の場合は true 、そうでない場合は false
 */
export function isFunction(target) {
  return toStr.call(target) === '[object Function]'
}
/**
 * この関数は Array.isArray をラップします。
 * 指定された値が {@link Array} 型かどうかを確認します。
 * @param {Any} target - 判定する値
 * @return {boolean} {@link Array} 型の場合は true 、そうでない場合は false
 */
export function isArray(target) {
  return Array.isArray(target)
}
/**
 * 指定された値が valid な {@link Date} 型の値かを確認します。
 * @param {Any} target 判定する値
 * @return {Boolean} {@link Date} 型で valid な場合は true 、そうでない場合は false
 */
export function isValidDate(target) {
  if (isDate(target)) {
    return !isNaN(target.getTime())
  }
  return false
}
/**
 * 指定された値が {@link RegExp}  型かどうかを確認します。
 * @param {Any} target 判定する値
 * @return {Boolean} {@link RegExp} 型の場合は true 、そうでない場合は false
 */
export function isRegExp(target) {
  return toStr.call(target) === '[object RegExp]'
}
/**
 * 指定された値が undefined かどうかを確認します。
 * @param {Any} target - 判定する値
 * @return {boolean} undefined の場合は true 、そうでない場合は false
 */
export function isUndefined(target) {
  if (arguments.length === 0) {
    return false
  }
  return typeof target === 'undefined'
}
/**
 * 指定された値が null かどうかを確認します。
 * @param {Any} target - 判定する値
 * @return {boolean} null の場合は true 、そうでない場合は false
 */
export function isNull(target) {
  return target === null
}
/**
 * 指定された値が null もしくは undefined かどうかを確認します。
 * @param {Any} target - 判定する値
 * @return {boolean} null もしくは undefined の場合は true 、そうでない場合は false
 */
export function isUndefinedOrNull(target) {
  if (arguments.length === 0) {
    return false
  }
  return (isUndefined(target) || isNull(target))
}
/**
 * 指定された値が 利用可能でないかどうかを判断します。
 * @param {Any} target 判定する値
 * @return {Boolean} 利用不可能な場合は true 、そうでない場合は false
 */
export function isUnusable(target) {
  if (arguments.length === 0) {
    return false
  }
  return isUndefined(target) || isNull(target) ||
    (isNumber(target) ? isNaN(target) || !isFinite(target)
      : (isDate(target) ? !isValidDate(target) : false))
}
/**
 * 指定された値が 数字 かどうかを確認します。
 * @param {Any} target - 判定する値
 * @return {boolean} 数字の場合は true 、そうでない場合は false
 */
export function isNumeric(target) {
  // 文字列か数値以外を弾く
  // ["123"]などは先頭の値を利用されるため
  if (isString(target) || isNumber(target)) {
    return !isNaN(parseFloat(target)) && isFinite(target)
  }
  return false
}

/**
 * 指定された値が Error かどうかを確認します。
 * @param {Any} target - 判定する値
 * @return {boolean} Error の場合は true 、そうでない場合は false
 */
export function isError(target) {
  return target instanceof Error
}

/**
 * この関数は、 Number.isSafeInteger のポリフィルです。
 * 指定された値が safe integer かどうかを確認します。
 * <ul>
 * <li>正確に IEEE-754 倍精度数として表すことができます。</li>
 * <li>IEEE-754 の表現は、IEEE-754 の表現に適合するように、他の整数を丸めた結果にすることはできません。</li>
 * </ul>
 * @param {Any} target - 判定する値
 * @return {boolean} safe integer の場合は true 、そうでない場合は false
 */
export function isSafeInteger(target) {
  return (Number.isSafeInteger || function (value) {
    return Number.isInteger(value) && Math.abs(value) <= Number.MAX_SAFE_INTEGER
  })(target)
}

/**
 * 指定された値が Symbol かどうかを確認します。
 * @param {Any} target - 判定する値
 * @return {boolean} Symbol の場合は true 、そうでない場合は false
 */
export function isSymbol(target) {
  const type = typeof target
  return type == 'symbol' || (type === 'object' && target !== null && toStr.call(target) === '[object Symbol]')
}

/**
 * value を check 関数で検証し、trueの場合は value 、そうでない場合は defaultVal を返します。
 * @param {Function} check 値を検証する関数
 * @param {Any} value 検証する値
 * @param {Any} defaultVal 検証に失敗した場合のデフォルト値
 */
export function getOrDefault(check, value, defaultVal) {
  if (!isFunction(check)) return defaultVal
  if (check(value)) return value
  return defaultVal
}
