let state = []

function generateList(num) {
  const list = document.querySelector('.game')
  for(let x = 0; x <= num; x++) {
    const element = `<li data-id="${x}">${x}</li>`  
    list.insertAdjacentHTML('beforeend', element)
  }
  list.addEventListener('click', playGame)
}

document.querySelector('body').appendChild(generateList(100))

function score(game) {
  state = state.slice(0,9).concat(game)

  const elements = state.map(game => {
    const css = game.result === 'won' ? 'class="win"' : ''
    return `<li ${css}>
      <p><strong>You: </strong>${game.choice}</p>
      <p><strong>Actual: </strong>${game.actual}</p>
      <p><strong>Result: </strong>${game.result}</p>
    </li>`
  }).reverse().join(",")

  const scorePanel = document.querySelector('.score')
  scorePanel.innerHTML = ''
  scorePanel.insertAdjacentHTML('afterbegin', elements)
}

function playGame(e) {
  console.log(e.target.tagName)
  if(e.target.tagName !== 'LI') return;
  const elm = e.target
  const url = '/api/game'
  
  fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({number: elm.dataset.id})
    })
    .then(response => response.json())
    .then(score)
    .catch(err => console.error(err))
  
  elm.classList.add('flash')
  
  setTimeout(() => {
    elm.classList.remove('flash')
  }, 500)
}
