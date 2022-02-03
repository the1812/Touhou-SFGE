const year = process.argv[2] ?? new Date().getFullYear().toString()
import(`./${year}/update`).then(({ update }) => {
  update()
})
