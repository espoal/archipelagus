export const buildLoggerPlugin = (name) => ({
  name: 'Logger Plugin',
  setup(build) {
    build.onEnd((result) => {
      console.log(`Build successful at: ${timeNow()} for: ${name}`)

      for (const error of result.errors) {
        console.error({ error })
      }
    })
  },
})

const twoDigits = (n) => {
  if (n > 9) return parseInt(n)
  return `0${parseInt(n)}`
}

export const timeNow = (date = new Date()) =>
  `${twoDigits(date.getHours())}:${twoDigits(date.getMinutes())}:${twoDigits(
    date.getSeconds(),
  )}`
