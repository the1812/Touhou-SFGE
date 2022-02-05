import { MainInfo, updateList } from '../common/update'
import { items } from './data'

const mainInfo: MainInfo = {
  title: '【2022·东方华灯宴】',
  aid: 'av593747058',
  bvid: 'BV16q4y1h7xX',
  pages: [
    {
      title: 'P1 灯光映照千百景',
      endTime: '130:33',
    },
    {
      title: 'P2 华幕拉开万事新',
      endTime: '106:18',
    },
  ],
}


export const update = () => updateList({
  mainInfo,
  items,
  singleCount: 21 + 17,
  template: `
# 【2022·东方华灯宴】节目表
[【正片】2022·东方华灯宴](https://www.bilibili.com/video/BV16q4y1h7xX)

- 节目标题点击可直接跳转到华灯宴对应分 P 和时间点
- 时间一栏包含过场动画, 位于每个单品的开头
- 单品的 av / BV 链接点击可跳转到单品播放页面

<!-- data -->
  `.trim(),
})
