
export interface Song {
  id: number; // 序号, 作为标识
  title: string; // 标题
  name: string[]; // 歌名, 使用数组的方式匹配多个歌名, 防止多名歌曲
  singer: string; // 歌手
  album: string; // 专辑
  totalTime: string; // 时长
  startTime: string; // 副歌开始时间
  endTime: string; // 副歌结束时间
  selected: boolean; // 是否为当前鼠标选中项
  playing: boolean; // 是否处于播放状态
  guessing: boolean; // 是否正在猜题
  right: boolean; // 是否已答题
}

export const songsList: Song[] = [
  {
    id: 1,
    title: 'Clever勺子 - 如果我变成回忆(吉他女版)（Cover：Tank）.mp3',
    name: ['如果我变成回忆'],
    singer: '阴阳师',
    album: '我要的(完整版)',
    totalTime: '04:46',
    startTime: '01:13',
    endTime: '02:13',
    selected: false,
    playing: false,
    guessing: false,
    right: false
  },
  {
    id: 2,
    title: '高橋洋樹 - 摩诃不思议アドベンチャー!(TV ver.).mp3',
    name: ['摩诃不思议アドベンチャー'],
    singer: '阴阳师',
    album: '我要的(完整版)',
    totalTime: '03:34',
    startTime: '00:10',
    endTime: '00:34',
    selected: false,
    playing: false,
    guessing: false,
    right: false
  },
  {
    id: 3,
    title: '泥鳅Niko - 樱花草（男版）（Cover：Sweety）.mp3',
    name: ['樱花草'],
    singer: '阴阳师',
    album: '我要的(完整版)',
    totalTime: '02:13',
    startTime: '1:11',
    endTime: '1:39',
    selected: false,
    playing: false,
    guessing: false,
    right: false
  },
  {
    id: 4,
    title: 'Westlife - My Love (Radio Edit).mp3',
    name: ['相思'],
    singer: '阴阳师',
    album: '我要的(完整版)',
    totalTime: '03:53',
    startTime: '01:58',
    endTime: '02:38',
    selected: false,
    playing: false,
    guessing: false,
    right: false
  },
  {
    id: 5,
    title: '杨搏 - 遇见.mp3',
    name: ['遇见'],
    singer: '阴阳师',
    album: '我要的(完整版)',
    totalTime: '03:39',
    startTime: '01:15',
    endTime: '01:38',
    selected: false,
    playing: false,
    guessing: false,
    right: false
  },
  {
    id: 6,
    title: '水木年华 - 一生有你.mp3',
    name: ['一生有你'],
    singer: '阴阳师',
    album: '我要的(完整版)',
    totalTime: '04:18',
    startTime: '03:08',
    endTime: '03:54',
    selected: false,
    playing: false,
    guessing: false,
    right: false
  },
  {
    id: 7,
    title: '胡歌 - 忘记时间.mp3',
    name: ['忘记时间'],
    singer: '阴阳师',
    album: '我要的(完整版)',
    totalTime: '04:32',
    startTime: '01:32',
    endTime: '02:00',
    selected: false,
    playing: false,
    guessing: false,
    right: false
  },
  {
    id: 8,
    title: '莫文蔚 - 盛夏的果实.mp3',
    name: ['盛夏的果实'],
    singer: '阴阳师',
    album: '我要的(完整版)',
    totalTime: '04:10',
    startTime: '02:42',
    endTime: '03:50',
    selected: false,
    playing: false,
    guessing: false,
    right: false
  },
  {
    id: 9,
    title: 'Backstreet Boys - As Long as You Love Me.mp3',
    name: ['As Long as You Love Me'],
    singer: '阴阳师',
    album: '我要的(完整版)',
    totalTime: '03:32',
    startTime: '00:57',
    endTime: '01:18',
    selected: false,
    playing: false,
    guessing: false,
    right: false
  },
  {
    id: 10,
    title: '蔡依林,周杰伦 - 布拉格广场.mp3',
    name: ['布拉格广场'],
    singer: '阴阳师',
    album: '我要的(完整版)',
    totalTime: '04:54',
    startTime: '01:00',
    endTime: '01:41',
    selected: false,
    playing: false,
    guessing: false,
    right: false
  }
];
