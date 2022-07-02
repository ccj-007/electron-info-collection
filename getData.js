let inputNpmVal = 'mini-h5-tools'
let isLoading = false
let timer = null

const getNpmInfo = async (inputNpmVal) => {
  startLoading()
  try {
    let response = await fetch('http://localhost:3001/api/getInfo', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: inputNpmVal
      })
    })
    let data = await response.json()

    const regex = /\n/g;

    for (const k in data) {
      data[k] = data[k].replace(regex, ' ')
      document.querySelector(`.${k}`).innerText = data[k]
    }
    endLoading()
    return Promise.resolve()
  } catch (error) {
    return Promise.reject(error)
  }
}

const updateNpmInfo = async (time) => {
  try {
    startLoading()
    if (time === 'h1') {
      timer = setInterval(async () => {
        await getNpmInfo(inputNpmVal)
      }, 1000 * 60 * 60)
    } else {
      timer && clearInterval(timer)
      await getNpmInfo(inputNpmVal)
    }
    endLoading()
  } catch (error) {
    alert(JSON.stringify(error))
  }
}

const searchNpm = async () => {
  timer && clearInterval(timer)
  startLoading()

  let inputNpmVal = document.querySelector('.input-npm').value
  if (inputNpmVal) {
    document.querySelector(`.npm-title`).innerText = inputNpmVal
    await getNpmInfo(inputNpmVal)
    endLoading()
  }
  console.log(val);
}

const startLoading = () => {
  let infoDOM = document.querySelector('.info')
  let loadDOM = document.querySelector('.loading')
  console.log(infoDOM);
  infoDOM.style.display = 'none'
  loadDOM.style.display = 'block'
  isLoading = !isLoading
}
const endLoading = () => {
  let infoDOM = document.querySelector('.info')
  let loadDOM = document.querySelector('.loading')
  infoDOM.style.display = 'block'
  loadDOM.style.display = 'none'
  isLoading = !isLoading
}


getNpmInfo()
