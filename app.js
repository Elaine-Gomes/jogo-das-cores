const body = document.querySelector('body');
const divColors = document.querySelector('#colors');
const buttonPlay = document.querySelector('#btn-play');
const buttonPause = document.querySelector('#btn-pause');
const buttonRestart = document.querySelector('#btn-restart');
const buttonToggle = document.querySelector('#btn-toggle');
const toggleHard = document.querySelector('#toggle');
const closeGameOver = document.querySelector('#close-game-over');
const displayPoints = document.querySelector('#display-points');
const displayLevel = document.querySelector('#display-level');
const endOfGame = document.querySelector('#end-of-game');

const defineColors = document.querySelector('#define-colors');
const defineColorsText = document.querySelector('#define-colors-text');
const punctuation = document.querySelector('.punctuation span');
const remainingTime = document.querySelector('#remaining-time');
const normalLevel = document.querySelector('#level-normal');
const levelHard = document.querySelector('#level-hard');

const arrayNamesColors = ['vermelha', 'verde', 'azul', 'amarela', 'rosa'];
const arrayText = ["Clique no nome:" , "Clique na cor:"];

let score ='0'+ 0;
let countdown = 10;
let intervalId;
let intervalNumber;
let intervalText;
let elements = [];

buttonToggle.addEventListener('click', level);
buttonPause.addEventListener('click', stop);

closeGameOver.addEventListener('click',()=>{
   window.location.reload();
   document.getElementById('game-over').style.display = 'none';
 
})

function startGame(){

  buttonPlay.addEventListener('click', (e)=>{
    disableButtonToggle();

    if(buttonPlay.className !== 'btnPlayActive'){
      countTime();
      createArrayNumbers();
    }
    buttonPlay.classList.add('btnPlayActive');  

 });

}

startGame()

function createElement(arraynewArrayNumbers){
 
  for(let i = 0;i<arrayNamesColors.length;i++){
    divColors.innerHTML =
      `<div class="${arrayNamesColors[arraynewArrayNumbers[2]]}">${arrayNamesColors[arraynewArrayNumbers[0]]}</div>
       <div class="${arrayNamesColors[arraynewArrayNumbers[4]]}">${arrayNamesColors[arraynewArrayNumbers[1]]}</div>
       <div class="${arrayNamesColors[arraynewArrayNumbers[0]]}">${arrayNamesColors[arraynewArrayNumbers[2]]}</div>
       <div class="${arrayNamesColors[arraynewArrayNumbers[1]]}">${arrayNamesColors[arraynewArrayNumbers[3]]}</div>
       <div class="${arrayNamesColors[arraynewArrayNumbers[3]]}">${arrayNamesColors[arraynewArrayNumbers[4]]}</div>
      `
  }                                    
}

//Cria um array com numeros aleatórios, que não se repetem
function createArrayNumbers(){

  let newArrayNumbers = new Array(arrayNamesColors.length);

  for(let i=0; i<arrayNamesColors.length; i++) {
    newArrayNumbers[i] = i; 

  }
  newArrayNumbers.sort(function(a,b){ return (Math.round(Math.random())-0.5); });
  defineColors.innerHTML = arrayNamesColors[newArrayNumbers[Math.floor(Math.random()*arrayNamesColors.length)]]

  createElement(newArrayNumbers);
}

//Deixa o nivel normal ativo por padrão
function defaultNormalLevel(){

  normalLevel.classList.toggle('normal');
  toggleHard.classList.remove('active');

}
defaultNormalLevel();

function level(){

  normalLevel.classList.toggle('normal');
  levelHard.classList.toggle('hard');
  toggleHard.classList.toggle('active');
 
    for (let i = 0; i < arrayText.length; i++) {
      elements[i] = i;
    }
}
 //Define o número de segundos para a contagem regressiva
 
function countTime(){

  clearInterval(intervalText);
  buttonPause.classList.remove('disable');
  contarIntervalText();

  intervalId = setInterval(function() {
 
    if (countdown === 0) {
      score = parseInt(score);
      ativarButtonToggle();

      toggleHard.classList.remove('active');
      exibirendOfGame()
      stop();
      punctuation.innerHTML = '0'+ 0;
      remainingTime.innerHTML = '0'+ 0;
      countdown = 10;
      score = 0 ;

    }else {
      if(countdown < 10){
        remainingTime.innerHTML = "0"+ countdown--;
       
      }else{
        remainingTime.innerHTML = countdown--;
      }
    }
    countPoints();
  }, 1000); // Atualiza a contagem regressiva a cada 1 segundo (1000 milissegundos)
  
  intervalNumber = setInterval(createArrayNumbers, 2000);
}

//Faz a contagem dos pontos sob determinadas condições
function countPoints(){
  let colors = divColors.children;

  for(let i = 0;i<arrayNamesColors.length; i++){

    if(!buttonPause.className){
      colors[i].addEventListener('click', (e)=>{

        if(defineColors.innerText === e.target.innerText 
          && defineColorsText.innerText == "Clique no nome:"){
          e.target.classList.add('line-through');
          score = parseInt(score);
          score = score + 1 
          punctuation.innerHTML = score;
      
        }else{
              
          if(e.target.className === defineColors.innerHTML &&
            defineColorsText.innerText == "Clique na cor:"){
            e.target.classList.add('line-through');
            punctuation.innerHTML =  score++ ;

            if(score < 10){
              punctuation.innerHTML ="0" + score;
            
            }else{
              punctuation.innerHTML = score;

            }
          }else{
            punctuation.innerHTML = punctuation.innerHTML;
          
          }  
        }
      })
    }
  }
}
createArrayNumbers();
  
// Interrompe a execução de intervalos definidos anteriormente com o método "setInterval"
function stop(){

  if(buttonPlay.classList.value !== ""){

    buttonPause.classList.add('disable');
    buttonPlay.classList.remove('btnPlayActive');
    clearInterval(intervalId);
    clearInterval(intervalNumber); 
    clearInterval(intervalText);  
  } 

};

function displayEndGameLevel(){

    if(levelHard.classList.value === ""){
      displayLevel.innerHTML = "Nível : Normal"
    }else{
      displayLevel.innerHTML = "Nível : Hard"
  }

}

//Recarrega a página
const restart = ()=>buttonRestart.addEventListener('click',()=>{
  window.location.reload();
});
restart();

function displayGameOver() {
  document.getElementById('game-over').style.display = 'block';
}

function disableButtonToggle(){
  buttonToggle.style.pointerEvents = "none";
  buttonToggle.style.opacity = "0.5";
}

function ativarButtonToggle(){
  buttonToggle.style.pointerEvents = "auto";
  buttonToggle.style.opacity = "1";
}

function contarIntervalText(){

  if(toggleHard.classList.value === 'active'){
      
    intervalText = setInterval(()=>{
      elements.sort(function(a,b){ return (Math.round(Math.random())-0.5); });
      defineColorsText.innerText = arrayText[elements[0]]

    },2000)
       
  }else{
    defineColorsText.innerText = "Clique na cor:"
  }

}  

function exibirendOfGame(){
    displayGameOver();
    displayEndGameLevel();
    displayPoints.innerHTML = "0"+ score;

    if(score < 5 ){
  
      endOfGame.style.color = 'red';
      endOfGame.innerText = 'Game Over 😭';
    }else{
    
      endOfGame.style.color = 'green';
      endOfGame.innerText = 'Parabéns🎉';
    }

}




