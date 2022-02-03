import * as fs from 'fs'

export interface MainInfo {
  title: string
  aid: string
  bvid: string
  pages: { title: string; endTime: string }[]
}
export interface ListItem {
  time: string
  page: number
  title: string
  aid?: string
  bvid?: string
}
export const updateList = (config: {
  mainInfo: MainInfo
  items: ListItem[]
  template: string
  singleCount: number
}) => {
  const { mainInfo, items, template, singleCount: totalSingleCount } = config
  const prefix = `https://www.bilibili.com/video/`
  const placeholder = '<!-- data -->'
  const header = `
|节目|时间|时长|单品|
|----|----|----|----|
`.trim()
  const getSeconds = (time: string) => {
    const [minutes, seconds] = time.split(':').map(it => parseInt(it))
    return minutes * 60 + seconds
  }
  const getTime = (seconds: number) => {
    return `${Math.trunc(seconds / 60).toString().padStart(2, '0')}:${(seconds % 60).toString().padStart(2, '0')}`
  }
  const table = items.map((item, index) => {
    const mainLink = (() => {
      const title = item.title.replace('~', '\\~')
      if (item.time) {
        const page = item.page || 1
        return `| [${title}](${prefix}${mainInfo.bvid}?p=${page}&t=${getSeconds(item.time)}) `
      }
      return `| ${title} `
    })()
    const time = (() => {
      if (item.time) {
        const page = item.page || 1
        const hasNextItem = index !== items.length - 1 && items[index + 1].time && (items[index + 1].page || 1) === page
        if (hasNextItem) {
          const length = getTime(getSeconds(items[index + 1].time) - getSeconds(item.time))
          return `| ${item.time} ~ ${items[index + 1].time} | ${length} `
        }
        const endTime = mainInfo.pages[page - 1].endTime
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
## ${mainInfo.pages[item.page - 1].title}
${header}
${mainLink + time + single + '|'}`
    }
    return mainLink + time + single + '|'
  }).join('\n')
  const note = (() => {
    const singleCount = items.filter(it => Boolean(it.aid)).length
    if (singleCount === totalSingleCount) {
      console.log('单品已全部发布')
      return ''
    }
    return `\n\n单品发布进度: ${singleCount}/${totalSingleCount} (${Math.trunc(singleCount * 100 / totalSingleCount)}%)`
  })()
  fs.writeFileSync('README.md', template.replace(placeholder, table + note))
}