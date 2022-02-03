import { MainInfo, updateList } from '../common/update'
import { items } from './data'

const mainInfo: MainInfo = {
  title: '【2021·东方华灯宴】',
  aid: '799209582',
  bvid: 'BV1Sy4y1Y773',
  pages: [
    {
      title: 'P1 牛年开气运',
      endTime: '66:12',
    },
    {
      title: 'P2 转念聚吉祥',
      endTime: '81:33',
    },
    {
      title: 'P3 乾道同和乐',
      endTime: '79:07',
    },
    {
      title: 'P4 坤仪美景长',
      endTime: '98:32',
    },
  ],
}

export const update = () => updateList({
  mainInfo,
  items,
  singleCount: 7 + 10 + 11 + 13,
  template: `
# 【2021·东方华灯宴】节目表
[【正片】2021·东方华灯宴](https://www.bilibili.com/video/BV1Sy4y1Y773)

- 节目标题点击可直接跳转到华灯宴对应分P和时间点
- 时间一栏包含过场动画, 位于每个单品的开头
- 单品的 av / BV 链接点击可跳转到单品播放页面
- 嘉宾祝福3中包含东方栖霞园PV, 因此会有单品
<!-- data -->
  `.trim(),
})
