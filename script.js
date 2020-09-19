var programming_languages=[
    "python",
    "javascript",
    "mongodb",
    "json",
    "java",
    "html",
    "css",
    "c",
    "csharp",
    "golang",
    "kotlin",
    "php",
    "sql",
    "ruby"
]
let answer='';
let maxWrong=6;
let mistakes=0;
let guessed=[];
let wordStatus=null;
function removeElement() {
    // Removes an element from the document
    let start = document.getElementById("startPage");
    start.parentNode.removeChild(start);
    let container = document.getElementById("container");
    container.classList.remove("hidden");
}

// generates word from array that needs to be guessed
function randomWord(){
    answer = programming_languages[Math.floor(Math.random()*programming_languages.length)];
}
//keyboard 
function generateButtons(){
let buttonsHTML='abcdefghijklmnopqrstuvwxyz'.split('').map(letter=> 
    `
    <button class="btn btn-lg btn-custom m-2" id="`
    +letter+`"
    onClick="handleGuess('`+letter+`')"
    >
    `+letter+`
    </button>
    `).join(' ');
    document.getElementById('keyboard').innerHTML=buttonsHTML;
}

//puts right guesses about letter in the blanks
function handleGuess(chosenLetter) {
    guessed.indexOf(chosenLetter) === -1? guessed.push(chosenLetter):null;
    document.getElementById(chosenLetter).setAttribute('disabled',true);
    if(answer.indexOf(chosenLetter)>=0){
        guessedWord();
        checkIfGameWon();
    } else if(answer.indexOf(chosenLetter)===-1){
        mistakes++;
        updateMistakes();
        checkIfGameLost();
        updateHangmanPicture();
    }
}

function updateHangmanPicture(){
    document.getElementById('hangmanPic').src='images/'+mistakes+'.jpg';
}
function checkIfGameWon(){
    if(wordStatus===answer){
        document.getElementById('keyboard').innerHTML="You Won!";
    }
}
function checkIfGameLost(){
    if(mistakes===maxWrong){
        document.getElementById('wordSpotlight').innerHTML="The answer was: "+answer;
        document.getElementById('keyboard').innerHTML="You Lost!";
    }
}

function updateMistakes(){
    document.getElementById('mistakes').innerHTML=mistakes;
}
//produces _ _ _ _ .... depends upon the length of the word from array
function guessedWord(){
    wordStatus = answer.split('').map(letter=>
        (guessed.indexOf(letter)>=0?letter:" _ ")).join("");
        document.getElementById("wordSpotlight").innerHTML=wordStatus;
}

function reset(){
    mistakes=0;
    guessed=[];
    document.getElementById('hangmanPic').src="images/0.jpg";
    randomWord();//generate new random word
    guessedWord();//to generate all underscores again
    updateMistakes();//update mistakes count in the html
    generateButtons();//so that there isn't any disabled button on keyboard
}
document.getElementById("maxWrong").innerHTML=maxWrong;
randomWord();
generateButtons();
guessedWord();