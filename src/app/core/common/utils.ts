/** 本文件用于常用自定义函数 */

/** 保留两位整数, 1 => 01 */
export function toDoubleInteger(index: number | string): string {
  const value = index.toString();
  if (value.length > 1) {
    return value;
  } else {
    return `0${value}`;
  }
}

/** 将秒转换为mm:ss */
export function toMinute(_seconds: number): string {
  const minutes = toDoubleInteger(~~(~~_seconds / 60));
  const seconds = toDoubleInteger(~~(~~_seconds % 60));
  return `${minutes}:${seconds}`;
}

/** 将时间转换为秒数, 仅支持 01:44 => 104 */
export function toSeconds(time: string): number {
  const times = time.split(':');
  const minutes = Number.parseInt(times[0], 10);
  const seconds = Number.parseInt(times[1], 10);
  return minutes * 60 + seconds;
}

/**
 * 将字符串中对应下标的字符换成新的字符
 * @param source 原字符串
 * @param position 需要被替换的下标
 * @param newChar 新的字符值
 */
export function replaceChat(source: string, position: number, newChar: string) {
  if (position < 0 || position >= source.length || source.length === 0) {
    return 'invalid parameters...';
  }
  const iBeginPos = 0;
  const sFrontPart = source.substr(iBeginPos, position);
  const sTailPart = source.substr(position + 1, source.length);
  const sRet = sFrontPart + newChar + sTailPart;
  return sRet;
}

/**
 * 数组乱序
 * @param array 数组
 */
export function shuffle(array: Array<any>) {
  let i = array.length;
  while (i) {
    const j = Math.floor(Math.random() * i--);
    [array[j], array[i]] = [array[i], array[j]];
  }
  return array;
}

/**
 * 将数据存入localStorage
 * @param name 需要存储的名称
 * @param value 需要存储的值
 */
export function setLocalStorage(name: string, value: any): void {
  localStorage.setItem(name, escape(JSON.stringify(value)));
}

/**
 * 从localStorage中取出数据
 * @param name 需要取出的名称
 */
export function getLocalStorage(name: string): any {
  let result: any;
  try {
    result = JSON.parse(unescape(localStorage.getItem(name)));
  } catch (error) {
    return null;
  }
  return result;
}
