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
