const timerText = document.querySelector('[data-text]')
const playBtn = document.querySelector('[data-play]')
const pauseBtn = document.querySelector('[data-pause]')
const resetBtn = document.querySelector('[data-reset]')
const circle = document.querySelector('[data-circle]')
const form = document.querySelector('[data-form]')

const audio = document.createElement('audio')
audio.src = "./zen.mp3"

let isPaused = false

function setTimer(mm = 0) {
  if(mm <= 0) return
  
  let timeInSeconds = Math.floor(mm * 60)
  
  setInterval(() => {
    if(!isPaused) {
      const minutes = Math.floor(timeInSeconds / 60);
      const hours = Math.floor(minutes / 60);
      const seconds = Math.floor(timeInSeconds % 60);
      // console.log("timeInSeconds :", timeInSeconds % 60);

      // 360 / 100 = 3.6
      const deg = seconds * (360 / 60)
      // console.log("deg :", deg);

      
      // html & css
      circle.style.background = `conic-gradient(#2B5B43 ${deg}deg, #959595 0deg)`
      timerText.textContent = `${hours.toString().padStart(2, 0)}:${(minutes % 60).toString().padStart(2, 0)}:${seconds.toString().padStart(2, 0)}`

      timeInSeconds = timeInSeconds <= 0 ? 0 : timeInSeconds - 1

      if(timeInSeconds <= 0) location.reload()
    }

  }, 1000);
}

function playMelodie() {
  audio.play()
  audio.loop = true
}

function pauseMelodie() {
  audio.pause()
}

playBtn.addEventListener('click', e => {
  isPaused = false
  setTimer(+form.timerInput.value)
  playMelodie()

  playBtn.style.display = 'none'
  pauseBtn.style.display = 'block'
  form.style.display = 'none'

  form.timerInput.value = null
})

pauseBtn.addEventListener('click', () => {
  isPaused = true
  pauseMelodie()

  playBtn.style.display = 'block'
  pauseBtn.style.display = 'none'
  circle.classList.remove('play')
})

resetBtn.addEventListener('click', () => {
  location.reload()
})
