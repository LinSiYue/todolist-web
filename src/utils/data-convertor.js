import dayjs from 'dayjs'

/**
 * @param {Array} array
 * @returns {string}
 */
export function arrayToString(array) {
  var str = ''
  if (array.length > 0) {
    array.forEach(item => {
      str += item + ','
    })
    str = str.substring(0, str.lastIndexOf(','))
  }
  return str
}

export function dateFormat(fromDate) {
  if (fromDate !== null) {
    return dayjs(fromDate).format('YYYY-MM-DD HH:mm')
  }
  return ''
}
