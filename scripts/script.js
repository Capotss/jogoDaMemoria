let FACE = "card-face"
let BACK = "card-back"
let cards = [
    'avaart',
    'clint',
    'hex',
    'korra',
    'lyt',
    'mrkings',
    'theliel',
    'tyler']
let board = document.getElementsByClassName("game-board")[0]
let card = document.getElementsByClassName("card")
let clickCount = 0
let array = []
let firstCard = { id: '', lock: false }
let secondCard = { id: '', lock: false }
let checking = false
let i = 0

let startGame = () => {
    let start = document.getElementById("start")
    let h1 = document.getElementsByTagName("h1")[0]
    let h2 = document.getElementsByTagName("h2")[0]
    start.style.transition = 'all .5s'
    start.style.opacity = '1'
    start.style.opacity = '0'
    h1.style.visibility= 'visible'
    h2.style.visibility= 'visible'
    setTimeout(() => {
        start.style.display = 'none'
    }, 510);

    createCards()
    clickCard()
}
function shuffleCards() {
    currentIndex = cards.length
    randomNumb = 0
    while (currentIndex !== 0) {
        let randomNumb = Math.floor(Math.random() * currentIndex)
        currentIndex--
        [cards[currentIndex], cards[randomNumb]] = [cards[randomNumb], cards[currentIndex]]
    }
}

function createCards() {
    shuffleCards()
    for (let n = 0; n < cards.length; n++) {
        board.innerHTML += `            
            <div class="card" id="${cards[n]}" data-locked="false">
                <div class="card-face">
                    <img src="./assets/Token-${cards[n]}.png" class="card-icon" >
                </div>
                <div class="card-back">&lt/&gt</div>
            </div>    
            `
    }
    shuffleCards()
    for (let n = 0; n < cards.length; n++) {
        board.innerHTML += `            
            <div class="card" id="${cards[n]}2" data-locked="false">
                <div class="card-face">
                    <img src="./assets/Token-${cards[n]}.png" class="card-icon">
                </div>
                <div class="card-back">&lt/&gt</div>
            </div>`
    }
    for (var i = board.children.length; i >= 0; i--) {
        board.appendChild(board.children[Math.floor(Math.random() * i)]);
    }
    console.log(board)
}
function clickCard() {
    for (click of card) {
        click.addEventListener('click', flipCard)
    }
}
function flipCard(e) {
    if (e.target.parentElement.dataset.locked == 'false') {
        clickCount++
        let pai = e.target.parentElement
        pai.classList.add("flip")
        array.push(pai)
        if (clickCount == 2) {
            checkMatch()
        }
    }
}
function checkMatch() {
    checking = false
    firstCard.id = array[0].id
    secondCard.id = array[1].id
    if (firstCard.id != secondCard.id || firstCard.id == '' || secondCard.id == '') {
        if (firstCard.id + '2' == secondCard.id || firstCard.id == secondCard.id + '2') {
            clickCount = 0
            array = []
            firstCard.lock = true
            secondCard.lock = true
        }
        if (firstCard.id + '2' != secondCard.id && firstCard.id != secondCard.id + '2') {
            firstCard.lock = false
            secondCard.lock = false
            clickCount = 0
            array = []
        }
        if (firstCard.lock == false) {
            if (checking == false) {
                for (click of card) {
                    click.removeEventListener('click', flipCard)
                }
                setTimeout(() => {
                    let irmao0 = document.getElementById(String(firstCard.id))
                    let irmao1 = document.getElementById(String(secondCard.id))
                    irmao0.classList.remove("flip")
                    irmao1.classList.remove("flip")
                    checking = true
                    if (checking == true) {
                        for (click of card) {
                            click.addEventListener('click', flipCard)
                        }
                    }
                }, 500);
            }
        }
        if (firstCard.lock == true) {
            let irmao0 = document.getElementById(String(firstCard.id))
            let irmao1 = document.getElementById(String(secondCard.id))
            irmao0.setAttribute("data-locked", 'true')
            irmao1.setAttribute("data-locked", 'true')
        }
    }
    i=0
    setTimeout(() => {
        checkGameOver()
    }, 510);
}

function checkGameOver() {
    for (gameOver of board.children) {
        if (gameOver.dataset.locked == 'true') {
            i++
            console.log(i)
        }
    }
    if (i == 16) {
        let gameOverScreen = document.getElementById("gameOver")
        gameOverScreen.style.transition = 'all .5s'
        gameOverScreen.style.opacity = "0"
        gameOverScreen.style.opacity = "1"
        gameOverScreen.style.visibility = "visible"
        
    } else {
        console.log("não é gameOver")
    }
}
function restartGame() {
    let gameOverScreen = document.getElementById("gameOver")
    gameOverScreen.style.transition = 'all .5s'
    gameOverScreen.style.opacity = "1"
    gameOverScreen.style.opacity = "0"
    gameOverScreen.style.visibility = 'hidden'
    board.innerHTML = ''
    createCards()
    clickCard()
}