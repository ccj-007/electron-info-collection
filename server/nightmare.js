const Nightmare = require('nightmare')
const nightmare = Nightmare({
  show: true,
})

const getNpmData = () => {
  return nightmare
    .goto('https://www.npmjs.com/package/mini-h5-tools?activeTab=versions')
    .wait('._9ba9a726')
    .evaluate(() => {
      let info = {
        weekLoadNums: document.querySelector('._9ba9a726').innerText,
        repository: document.querySelector('._702d723c, .f2874b88 ').innerText,
        all: document.querySelectorAll('._702d723c, .f2874b88')[4].innerText
      }
      return info
    })
    .end()
}

const startNightmare = async () => {
  return await getNpmData()
}

module.exports = startNightmare
