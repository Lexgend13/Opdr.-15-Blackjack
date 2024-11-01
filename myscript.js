const suit = document.getElementsByClassName("suit")

//player table DOM
const playerScore = document.getElementById("playerScore")
const playerTH = document.getElementById("playerTh")
const playerCardsRow = document.getElementById("playerCards")
const playerCards = document.getElementsByClassName("playerCard")
//dealer table DOM
const dealerScore = document.getElementById("dealerScore")
const dealerTH = document.getElementById("dealerTh")
const dealerCardsRow = document.getElementById("dealerCards")
const dealerCards = document.getElementsByClassName("dealerCard")

//make buttons and link to functions
const dealButton = document.getElementById('deal')
dealButton.addEventListener("click", dealButtonClick)

const hitButton = document.getElementById('hit')
hitButton.addEventListener("click", hitButtonClick)

const passButton = document.getElementById('pass')
passButton.addEventListener("click", passButtonClick)

const playAgainbutton = document.getElementById('playAgain')
playAgainbutton.addEventListener("click", playAgainbuttonClick)

//disable buttons
hitButton.disabled = true
passButton.disabled = true
playAgainbutton.disabled = true

cards = []
for (let i=1; i<53; i++) {
    cards.push(i) // create list of all integers from 1 to 52
}

function randomCardgenerator(cardsarray) {
    randomCard = 0
    while (cardsarray.includes(randomCard) === false) { //check if card is already taken
        randomCard = parseInt(Math.ceil(Math.random()*52)) //take random card
    }
    return randomCard
}

function cardListUpdater(card, cardsarray) {
    i = cardsarray.indexOf(card) //evaluates index of randcard value in cards array
    cardsarray.splice(i,1) //Remove element
    return cardsarray
}

function webCardListUpdater(card) {
    if (card/4 === Math.floor(card/4)) {
        suit[card/4-1].innerHTML = suit[card/4-1].innerHTML.replace("♠ ", "") //remove spades-symbol from certain cardvalue
    } else if ((card-1)/4 === Math.floor(card/4)) {
        suit[Math.floor(card/4)].innerHTML = suit[Math.floor(card/4)].innerHTML.replace("♥ ","") //remove heart-symbol from certain cardvalue
    } else if ((card-2)/4 === Math.floor(card/4)) {
        suit[Math.floor(card/4)].innerHTML = suit[Math.floor(card/4)].innerHTML.replace("♣ ","") //remove clubs-symbol from certain cardvalue
    } else {
        suit[Math.floor(card/4)].innerHTML = suit[Math.floor(card/4)].innerHTML.replace("♦","") //remove diamond-symbol from certain cardvalue
    }
}

function cardUpdater(card,c,playerTurn) {
    if (playerTurn == true) { //determines which score field to edit
        turnScore = playerScore //edit player score
        cardClass = playerCards //edit a card into player table
    } else {
        turnScore = dealerScore //edit dealer score
        cardClass = dealerCards //edit a card into player table
    }
    cardClass[c].innerHTML = cardClass[c].innerHTML.replace("None", " ") //make placeholder for card empty
    initialScore = parseInt(turnScore)

    //add cardvalue into cardplaceholder and add points onto score
    if (card/4 <= 1) {
        cardClass[c].innerHTML = cardClass[c].innerHTML.replace(" ", "Ace ") //add cardvalue
        if (turnScore.innerHTML < 11) {
            turnScore.innerHTML = parseInt(turnScore.innerHTML) + 11 //add points onto score
        } else {
            turnScore.innerHTML = parseInt(turnScore.innerHTML) + 1 //add points onto score if 11 flows over 21
            cardClass[c].innerHTML = "." + cardClass[c].innerHTML
        }
    } else if (10 < card/4 && card/4 <= 11) {
        cardClass[c].innerHTML = cardClass[c].innerHTML.replace(" ", "Jack ")
        turnScore.innerHTML = parseInt(turnScore.innerHTML) + 10
    } else if (11 < card/4 && card/4 <= 12) {
        cardClass[c].innerHTML = cardClass[c].innerHTML.replace(" ", "Queen ")
        turnScore.innerHTML = parseInt(turnScore.innerHTML) + 10
    } else if (12 < card/4 && card/4 <= 13) {
        cardClass[c].innerHTML = cardClass[c].innerHTML.replace(" ", "King ")
        turnScore.innerHTML = parseInt(turnScore.innerHTML) + 10
    } else {
        cardClass[c].innerHTML = cardClass[c].innerHTML.replace(" ", Math.ceil(card/4) + " ")
        turnScore.innerHTML = parseInt(turnScore.innerHTML) + Math.ceil(card/4)
    }

    //add cardsuit into cardplaceholder
    if (card/4 === Math.floor(card/4)) {
        cardClass[c].innerHTML = cardClass[c].innerHTML.replace(" ", "♠")
    } else if ((card-1)/4 === Math.floor(card/4)) {
        cardClass[c].innerHTML = cardClass[c].innerHTML.replace(" ", "♥")
    } else if ((card-2)/4 === Math.floor(card/4)) {
        cardClass[c].innerHTML = cardClass[c].innerHTML.replace(" ", "♣")
    } else if ((card-3)/4 === Math.floor(card/4)) {
        cardClass[c].innerHTML = cardClass[c].innerHTML.replace(" ", "♦")
    }
}

function dealCard(cInt, cards,rowIndex,playerTurn) {
    randcard = randomCardgenerator(cards)
    cards = cardListUpdater(randcard, cards)
    webCardListUpdater(randcard)
    cardUpdater(randcard,cInt,rowIndex,playerTurn)
    return cInt
}

//button functions

function dealButtonClick() {
    playerExtraCards = 0
    dealerExtraCards = 0
    rowIndex = 2
    var playerTurn = true 
    dealCard(0, cards, playerTurn) //Deal player card 1
    dealCard(1, cards, playerTurn) //Deal player card 2 
    
    if (parseInt(playerScore.innerHTML) == 21) { //If blackjack, report win and end script
        playerWon = playerCardsRow.insertCell() //Adds cell at the end of the row which contains player's cards
        playerWon.innerHTML = "You have won!" //adds table text to new cell
        playerWon.classList.add("win")
        //disable/enable buttons
        dealButton.disabled = true
        playAgainbutton.disabled = false
        return
    }
    playerTurn = false
    dealCard(0, cards, playerTurn) //Deal casino card 1
    dealerCards[1].innerHTML = dealerCards[1].innerHTML.replace("None", "Hidden") //Deal casino card 2 as hidden 

    cInt = 2
    //disable deal button
    dealButton.disabled = true

    //enable hit and pas buttons
    hitButton.disabled = false
    passButton.disabled = false
    
    
}

function hitButtonClick () {
    playerTurn = true
    playerExtraCards += 1
    playerTH.insertCell(1) // adds a cell to the headings row of playerTable
    
    cellPlayerCard = playerCardsRow.insertCell(rowIndex) //adds a cell to cards row of playerTable
    cellPlayerCard.innerHTML = "None " //adds table text content to new cell
    cellPlayerCard.classList.add("playerCard") //assigns id to new cell
    
    cInt = dealCard(cInt, cards, playerTurn) +1
    if (parseInt(playerScore.innerHTML) == 21) { //If blackjack, report win and end script
        playerWon = playerCardsRow.insertCell() //Adds cell at the end of the row which contains player's cards
        playerWon.innerHTML = "You have won!" //adds table text to new cell
        playerWon.classList.add("win") 
        //enable/disable buttons
        hitButton.disabled = true
        passButton.disabled = true
        playAgainbutton.disabled = false
        return
    } else if (parseInt(playerScore.innerHTML) > 21) { //If more than 21 points..
        for (let i = 0; i < cInt-1; i++) { //Check in all cells..
            if (playerCards[i].innerHTML.startsWith("Ace") == true) { //For an 11-point Ace..
                playerCards[i].innerHTML = "." + playerCards[i].innerHTML //11-point Ace will get changed so it's not detected as 11-points anymore
                playerScore.innerHTML = parseInt(playerScore.innerHTML) - 10; //Change 11-point Ace for a 1-point Ace
                break;
            }
            
        }}
        if (parseInt(playerScore.innerHTML) > 21) {
        playerLoss = playerCardsRow.insertCell() //Adds cell at the end of the row which contains player's cards
        playerLoss.innerHTML = "You have lost!" //adds table text to new cell
        playerLoss.classList.add("loss")
        //enable/disable buttons
        hitButton.disabled = true
        passButton.disabled = true
        playAgainbutton.disabled = false
        }
    rowIndex += 1
    }
    
function passButtonClick () {
    //disable/enable buttons
    hitButton.disabled = true
    passButton.disabled = true
    playAgainbutton.disabled = false

    //reveal 2nd card
    cInt = 1
    rowIndex = 2
    playerTurn = false
    
    dealerCards[1].innerHTML = dealerCards[1].innerHTML.replace("Hidden", "None")
    
    cInt = dealCard(cInt, cards, playerTurn) +1

    //If player has 16 points, dealer should stop drawing cards at 16points, instead of the standard 17
    stopAt16or17 = 17
    if (parseInt(playerScore.innerHTML) == 16) {
        stopAt16or17 = 16
    }
    
    
    while (dealerScore.innerHTML < stopAt16or17) {
        dealerExtraCards += 1 //counts dealer Cards
        dealerTH.insertCell(1) // adds a cell to the headings row of playerTable
        cellDealerCard = dealerCardsRow.insertCell(rowIndex) //adds a cell to cards row of playerTable
        cellDealerCard.innerHTML = "None " //adds table text content to new cell
        cellDealerCard.classList.add("dealerCard") //assigns id to new cell
        cInt = dealCard(cInt, cards, playerTurn) +1 //draws card
        dealerExtraCards += 1 //counts dealer Cards
        rowIndex += 1
        if (parseInt(dealerScore.innerHTML) > 21) { //If more than 21 points..
            for (let i = 0; i < cInt-1; i++) { //Check in all cells..
                if (dealerCards[i].innerHTML.startsWith("Ace") == true) { //For an 11-point Ace..
                    dealerCards[i].innerHTML = "." + dealerCards[i].innerHTML //11-point Ace will get changed so it's not detected as 11-points anymore
                    dealerScore.innerHTML = parseInt(dealerScore.innerHTML) - 10; //Change 11-point Ace for a 1-point Ace
                    break;
                }
                
            }}
    }

    if (playerScore.innerHTML > dealerScore.innerHTML || dealerScore.innerHTML > 21) {
        playerWon = playerCardsRow.insertCell() //Adds cell at the end of the row which contains player's cards
        playerWon.innerHTML = "You have won!" //adds table text to new cell
        playerWon.classList.add("win")
    } else {
        playerLoss = dealerCardsRow.insertCell() //Adds cell at the end of the row which contains player's cards
        playerLoss.innerHTML = "You have lost!" //adds table text to new cell
        playerLoss.classList.add("loss")
    }
}

function playAgainbuttonClick () {
    location.reload()
}