const gameContainer = document.getElementById('game');

// const COLORS = [ 'red', 'blue', 'green', 'orange', 'purple', 'red', 'blue', 'green', 'orange', 'purple' ];
let COLORS = [];
let counter;

let easyHighScore;
let medHighScore;
let hardHighScore;

// While there are elements in the array
function createColorArray (int) {
	COLORS = [];
	let xCOLORS = [];
	if (int === 10) {
		COLORS = [ 'red', 'red', 'blue', 'blue', 'limegreen', 'limegreen', 'yellow', 'yellow', 'purple', 'purple' ];
	}
	if (int === 20) {
		COLORS = [
			'red',
			'red',
			'blue',
			'blue',
			'limegreen',
			'limegreen',
			'yellow',
			'yellow',
			'purple',
			'purple',
			'orange',
			'orange',
			'aquamarine',
			'aquamarine',
			'black',
			'black',
			'white',
			'white',
			'gray',
			'gray'
		];
	}
	if (int === 30) {
		COLORS = [
			'red',
			'red',
			'blue',
			'blue',
			'limegreen',
			'limegreen',
			'yellow',
			'yellow',
			'purple',
			'purple',
			'orange',
			'orange',
			'aquamarine',
			'aquamarine',
			'black',
			'black',
			'white',
			'white',
			'gray',
			'gray',
			'rgb(170, 139, 255)',
			'rgb(170, 139, 255)',
			'hotpink',
			'hotpink',
			'rgb(119, 74, 20)',
			'rgb(119, 74, 20)',
			'lightblue',
			'lightblue',
			'darkgreen',
			'darkgreen'
		];
	}
	return COLORS;
}

function shuffle (array, int) {
	while (int > 0) {
		// Pick a random index
		let index = Math.floor(Math.random() * int);

		// Decrease counter by 1
		int--;

		// And swap the last element with it
		let temp = array[int];
		array[int] = array[index];
		array[index] = temp;
	}

	return array;
}

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
let numCards = 0;
let score;
let scoreTitle;
let scoreCounter;
function createDivsForColors (colorArray) {
	for (let color of colorArray) {
		// create a new div
		const newDiv = document.createElement('div');

		// give it a class attribute for the value we are looping over
		newDiv.style.color = color;
		newDiv.classList.add('circle');
		if (colorArray.length === 10) {
			newDiv.classList.add('easy-circle');
		}
		if (colorArray.length === 20) {
			newDiv.classList.add('med-circle');
		}
		if (colorArray.length === 30) {
			newDiv.classList.add('hard-circle');
		}
		// call a function handleCardClick when a div is clicked on
		newDiv.addEventListener('click', handleCardClick);

		// append the div to the element with an id of game
		gameContainer.append(newDiv);
		numCards++;
	}
	scoreCounter = document.createElement('div');
	scoreCounter.id = 'score-counter';
	scoreTitle = document.createElement('h2');
	scoreTitle.innerText = 'Score:';
	score = document.createElement('h2');
	score.innerText = '0';
	score.id = 'score';

	gameContainer.appendChild(scoreCounter);
	scoreCounter.appendChild(scoreTitle);
	scoreCounter.appendChild(score);

	if (colorArray.length === 10 && localStorage.getItem('easyHighScore')) {
		let prevEasyHighScore = document.createElement('h2');
		prevEasyHighScore.className = 'high-score';
		prevEasyHighScore.innerText = 'Easy High Score: ' + localStorage.getItem('easyHighScore');
		gameContainer.appendChild(prevEasyHighScore);
	}
	if (colorArray.length === 20 && localStorage.getItem('medHighScore')) {
		let prevMedHighScore = document.createElement('h2');
		prevMedHighScore.className = 'high-score';
		prevMedHighScore.innerText = 'Medium High Score: ' + localStorage.getItem('medHighScore');
		gameContainer.appendChild(prevMedHighScore);
	}
	if (colorArray.length === 30 && localStorage.getItem('hardHighScore')) {
		let prevHardHighScore = document.createElement('h2');
		prevHardHighScore.className = 'high-score';
		prevHardHighScore.innerText = 'Hard High Score: ' + localStorage.getItem('hardHighScore');
		gameContainer.appendChild(prevHardHighScore);
	}
	resetEasyButton = document.createElement('input');
	resetEasyButton.type = 'button';
	resetEasyButton.value = 'Reset Easy';
	resetEasyButton.className = 'reset-button-class';
	resetEasyButton.id = 'reset-easy-button';
	resetMediumButton = document.createElement('input');
	resetMediumButton.type = 'button';
	resetMediumButton.value = 'Reset Medium';
	resetMediumButton.className = 'reset-button-class';
	resetMediumButton.id = 'reset-medium-button';
	resetHardButton = document.createElement('input');
	resetHardButton.type = 'button';
	resetHardButton.value = 'Reset Hard';
	resetHardButton.className = 'reset-button-class';
	resetHardButton.id = 'reset-hard-button';
	gameContainer.append(resetEasyButton);
	gameContainer.append(resetMediumButton);
	gameContainer.append(resetHardButton);
}

let arrayOfClicked = [];
let arrayOfMatched = [];
let resetButton;
let firstCard;
let secondCard;
let numMatched = 0;
let numAttempts = 0;
// TODO: Implement this function!
function handleCardClick (event) {
	if (
		event.target !== firstCard &&
		event.target !== secondCard &&
		event.target.classList.contains('clicked') === false &&
		arrayOfClicked.length < 2
	) {
		// you can use event.target to see which element was clicked
		if (arrayOfClicked.length <= 1) {
			let card = event.target;

			card.classList.add('clicked');
			card.style.backgroundColor = card.style.color;
			arrayOfClicked.push(card);
			for (i = 0; i < arrayOfClicked.length; i++) {
				if (i === 0 && arrayOfClicked.length === 1) {
					firstCard = arrayOfClicked[i];
				} else if (i === 1 && arrayOfClicked.length === 2) {
					secondCard = arrayOfClicked[i];
				}
			}
		}
		if (firstCard === secondCard) {
			arrayOfClicked.splice(arrayOfClicked.indexOf(secondCard), 1);
		} else if (arrayOfClicked.length === 2) {
			numAttempts++;
			score = document.querySelector('#score');
			score.innerText = '' + numAttempts;
			setTimeout(function () {
				if (firstCard.style.color !== secondCard.style.color) {
					for (i = 0; i < arrayOfClicked.length; i++) {
						let thisCard = arrayOfClicked[i];
						thisCard.style.backgroundColor = '';
						thisCard.classList.remove('clicked');
					}
					firstCard = null;
					secondCard = null;
				} else {
					numMatched += 2;
					firstCard.style.border = '2px solid lightgreen';
					secondCard.style.border = '2px solid lightgreen';
					arrayOfMatched.push(firstCard);
					arrayOfMatched.push(secondCard);
				}
				arrayOfClicked = [];
				if (numMatched === numCards) {
					clearTimeout();
					scoreCounter.className = 'new-high-score';
					let prevHighScore;
					let newHighScore;

					if (numCards === 10 && localStorage.getItem('easyHighScore')) {
						if (numAttempts < localStorage.getItem('easyHighScore')) {
							newHighScore = document.createElement('h2');
							newHighScore.className = 'new-high-score';
							newHighScore.innerText = 'NEW HIGH SCORE! ' + numAttempts;
							gameContainer.appendChild(newHighScore);
							localStorage.setItem('easyHighScore', numAttempts);
						}
					} else if (numCards === 10) {
						newHighScore = document.createElement('h2');
						newHighScore.className = 'new-high-score';
						newHighScore.innerText = 'NEW HIGH SCORE! ' + numAttempts;
						gameContainer.append(newHighScore);
						localStorage.setItem('easyHighScore', numAttempts);
					}
					if (numCards === 20 && localStorage.getItem('medHighScore')) {
						if (numAttempts < localStorage.getItem('medHighScore')) {
							newHighScore = document.createElement('h2');
							newHighScore.className = 'new-high-score';
							newHighScore.innerText = 'NEW HIGH SCORE! ' + numAttempts;
							gameContainer.appendChild(newHighScore);
							localStorage.setItem('medHighScore', numAttempts);
						}
					} else if (numCards === 20) {
						newHighScore = document.createElement('h2');
						newHighScore.className = 'new-high-score';
						newHighScore.innerText = 'NEW HIGH SCORE! ' + numAttempts;
						gameContainer.append(newHighScore);
						localStorage.setItem('medHighScore', numAttempts);
					}
					if (numCards === 30 && localStorage.getItem('hardHighScore')) {
						if (numAttempts < localStorage.getItem('hardHighScore')) {
							newHighScore = document.createElement('h2');
							newHighScore.className = 'new-high-score';
							newHighScore.innerText = 'NEW HIGH SCORE! ' + numAttempts;
							gameContainer.appendChild(newHighScore);
							localStorage.setItem('hardHighScore', numAttempts);
						}
					} else if (numCards === 30) {
						newHighScore = document.createElement('h2');
						newHighScore.className = 'new-high-score';
						newHighScore.innerText = 'NEW HIGH SCORE! ' + numAttempts;
						gameContainer.append(newHighScore);
						localStorage.setItem('hardHighScore', numAttempts);
					}
					document.querySelector('input[value="Reset Easy"]').remove();
					document.querySelector('input[value="Reset Medium"]').remove();
					document.querySelector('input[value="Reset Hard"]').remove();
					resetEasyButton = document.createElement('input');
					resetEasyButton.type = 'button';
					resetEasyButton.value = 'Reset Easy';
					resetEasyButton.className = 'reset-button-class';
					resetEasyButton.id = 'reset-easy-button';
					resetMediumButton = document.createElement('input');
					resetMediumButton.type = 'button';
					resetMediumButton.value = 'Reset Medium';
					resetMediumButton.className = 'reset-button-class';
					resetMediumButton.id = 'reset-medium-button';
					resetHardButton = document.createElement('input');
					resetHardButton.type = 'button';
					resetHardButton.value = 'Reset Hard';
					resetHardButton.className = 'reset-button-class';
					resetHardButton.id = 'reset-hard-button';
					gameContainer.append(resetEasyButton);
					gameContainer.append(resetMediumButton);
					gameContainer.append(resetHardButton);
					resetEasyButton.className = 'reset-button-end-class';
					resetMediumButton.className = 'reset-button-end-class';
					resetHardButton.className = 'reset-button-end-class';
				}
			}, 1000);
		}
	}
}

gameContainer.addEventListener('click', function (e) {
	if (e.target.tagName === 'INPUT') {
		e.preventDefault();
		if (arrayOfMatched.length !== 10 || arrayOfMatched.length !== 20 || arrayOfMatched.length !== 30) {
			for (i = 0; i < numCards; i++) {
				document.querySelector('.circle').remove();
			}
		} else {
			for (let div of arrayOfMatched) {
				div.remove();
			}
		}

		if (document.querySelector('#new-high-score')) {
			document.querySelector('#new-high-score').remove();
		}
		if (document.querySelector('#high-score')) {
			document.querySelector('#high-score').remove();
		}
		document.querySelector('#score-counter').remove();
		numAttempts = 0;
		numMatched = 0;
		numCards = 0;
		COLORS = [];

		if (e.target.value === 'Reset Easy') {
			counter = 10;
		} else if (e.target.value === 'Reset Medium') {
			counter = 20;
		} else {
			counter = 30;
		}
		COLORS = createColorArray(counter);
		if (document.querySelector('.high-score')) {
			document.querySelector('.high-score').remove();
		}
		let newShuffledColors = shuffle(COLORS, counter);
		createDivsForColors(newShuffledColors);
		document.querySelector('input[value="Reset Easy"]').remove();
		document.querySelector('input[value="Reset Medium"]').remove();
		document.querySelector('input[value="Reset Hard"]').remove();
		if (document.querySelector('.new-high-score')) {
			document.querySelector('.new-high-score').remove();
		}
	}
});

// when the DOM loads
let topSection = document.querySelector('#top-section');

topSection.addEventListener('click', function (e) {
	if (e.target.tagName === 'INPUT') {
		e.preventDefault();
		if (e.target.value === 'Easy') {
			counter = 10;
			if (localStorage.getItem('easyHighScore')) {
				easyHighScore = localStorage.getItem('easyHighScore');
			}
		} else if (e.target.value === 'Medium') {
			counter = 20;
			if (localStorage.getItem('medHighScore')) {
				medHighScore = localStorage.getItem('medHighScore');
			}
		} else {
			counter = 30;
			if (localStorage.getItem('hardHighScore')) {
				hardHighScore = localStorage.getItem('hardHighScore');
			}
		}
		COLORS = createColorArray(counter);
		shuffledColors = shuffle(COLORS, counter);
		createDivsForColors(shuffledColors);
		document.querySelector('input[value="Easy"]').remove();
		document.querySelector('input[value="Medium"]').remove();
		document.querySelector('input[value="Hard"]').remove();
	}
});
