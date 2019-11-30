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
