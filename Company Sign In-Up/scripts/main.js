let businessInput = document.querySelector('.registraion__input-business')
let businessText = document.querySelector('.business-name');

businessInput.addEventListener('input', function(event) {
    const text = event.target.value;
    businessText.textContent = text !== '' ? text : 'Your business name';
  });

  let createBtn = document.querySelector('.registraion__create-btn')
  let contBtn = document.querySelector('.registraion__cont-btn')
  let stepTwo = document.querySelector('.registraion__step-two')
  let stepOne = document.querySelector('.registration__step-one')
  let stepThree = document.querySelector('.registraion__step-three')
  let stepFour = document.querySelector('.registraion__step-four')
  let contTwoBtn = document.querySelector('.registraion__contTwo-btn')
  let contThreeBtn = document.querySelector('.registraion__contThree-btn')



  let stepTwoBack = document.querySelector('.step-two__back');
  let stepThreeBack = document.querySelector('.step-three__back');
  let stepFourBack = document.querySelector('.step-four__back');


  contThreeBtn.addEventListener('click', function(e){
    e.preventDefault();
    stepThree.classList.add('hidden')
    stepFour.classList.remove('hidden')
  })
  stepTwoBack.addEventListener('click', function(){
    stepTwo.classList.add('hidden')
    stepOne.classList.remove('hidden')
  })
  stepFourBack.addEventListener('click', function(){
    stepThree.classList.remove('hidden')
    stepFour.classList.add('hidden')
  })
  stepThreeBack.addEventListener('click', function(){
    stepThree.classList.add('hidden')
    stepTwo.classList.remove('hidden')
  })
  contBtn.addEventListener('click', function(){
    stepTwo.classList.add('hidden')
    stepThree.classList.remove('hidden')
  })
  createBtn.addEventListener('click', function(){
    stepOne.classList.add('hidden')
    stepTwo.classList.remove('hidden')
    stepTwo.classList.add('step-two-active')
  })