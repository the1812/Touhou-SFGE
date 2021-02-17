const { data } = require('./data')
const main = {
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
const prefix = `https://www.bilibili.com/video/`
const fs = require('fs')
const template = fs.readFileSync('template.md', { encoding: 'utf-8' })
const placeholder = '<!-- data -->'
const header = `
|节目|时间|时长|单品|
|----|----|----|----|
`.trim()
const getSeconds = time => {
  const [minutes, seconds] = time.split(':').map(it => parseInt(it))
  return minutes * 60 + seconds
}
const getTime = seconds => {
  return `${Math.trunc(seconds / 60).toString().padStart(2, '0')}:${(seconds % 60).toString().padStart(2, '0')}`
}
const table = data.map((item, index) => {
  const mainLink = (() => {
    const title = item.title.replace('~', '\\~')
    if (item.time) {
      const page = item.page || 1
      return `| [${title}](${prefix}${main.bvid}?p=${page}&t=${getSeconds(item.time)}) `
    }
    return `| ${title} `
  })()
  const time = (() => {
    if (item.time) {
      const page = item.page || 1
      const hasNextItem = index !== data.length - 1 && data[index + 1].time && (data[index + 1].page || 1) === page
      if (hasNextItem) {
        const length = getTime(getSeconds(data[index + 1].time) - getSeconds(item.time))
        return `| ${item.time} ~ ${data[index + 1].time} | ${length} `
      }
      const endTime = main.pages[page - 1].endTime
      const length = getTime(getSeconds(endTime) - getSeconds(item.time))
      return `| ${item.time} ~ ${endTime} | ${length} `
    }
    return '| / '
  })()
  const single = (() => {
    if (item.aid && item.bvid) {
      return `| [av${item.aid}](${prefix}av${item.aid}) / [${item.bvid}](${prefix}${item.bvid}) `
    }
    return '| / '
  })()
  if (item.time === '00:00') {
    return `
## ${main.pages[item.page - 1].title}
${header}
${mainLink + time + single + '|'}`
  }
  return mainLink + time + single + '|'
}).join('\n')
const note = (() => {
  const totalSingleCount = 8 + 10 + 11 + 13
  const singleCount = data.filter(it => Boolean(it.aid)).length
  if (singleCount === totalSingleCount) {
    console.log('单品已全部发布')
  }
  return `\n\n单品发布进度: ${singleCount}/${totalSingleCount} (${Math.trunc(singleCount * 100 / totalSingleCount)}%)`
})()
fs.writeFileSync('README.md', template.replace(placeholder, table + note))
