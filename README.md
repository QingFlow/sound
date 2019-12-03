
# Sound

轻流前端团队利用业余时间研发的一款应用, 基于Angular+Electron实现的, 主页仿照网易云, 做了三个功能页.

## 模块介绍

### 听歌识曲

| 模块负责人 |
|--|
| [<img src="https://avatars1.githubusercontent.com/u/30228406?v=4" width="100px;"/><br /><sub>Eve</sub>](https://github.com/Mr-Eve) |

#### 基本介绍

布局照抄PC端网易云, 每首歌曲处于『冻结』状态, 通过双击歌曲(或点击红锁)可以试听歌曲, 输入歌曲名后回车即可『解锁』歌曲.

处于冻结状态的歌曲有以下限制:

 * 仅能听副歌部分
 * 无法看清歌曲信息
 * 进度条拖拽不能超过副歌部分

#### 特色玩法

 * 等级机制, 答对歌曲可以积累经验用于升级
 * 钥匙道具, 点击『获取钥匙』, 猜对特殊歌曲可以用于解锁歌曲
 * 一键解锁, 用户达到6级即可一键解锁全部歌曲


## 如何使用

#### web

[https://qingflow.github.io/sound/](https://qingflow.github.io/sound/)

#### 桌面app

下载链接(仅支持windows): [sound.exe](https://file.qingflow.com/uploads/file/5554c6cd-e267-47a0-8f5e-ad4efe7ac305.exe
)

#### 本地运行

直接三连运行.(**git clone, npm i, npm start**)

在安装依赖时可能会遇到『install.js安装卡着不动』的情况, 请参考这篇[博文](https://www.jianshu.com/p/eac8f37d6992)或自行Google
