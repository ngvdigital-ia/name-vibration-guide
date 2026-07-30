const screens=[...document.querySelectorAll('.screen')];
const questions=[
  ['Which area of life feels most ready for a reset?',['Confidence and self-expression','Relationships and connection','Purpose and direction']],
  ['When do you feel most like yourself?',['When I trust my intuition','When I create something new','When I help people around me']],
  ['What would you like more of right now?',['Clarity','Courage','Calm energy']]
];
let answer=0,gender='',selectedCard='';
const show=name=>{screens.forEach(screen=>screen.classList.toggle('active',screen.dataset.screen===name));window.scrollTo({top:0,behavior:'instant'});};
const render=()=>{document.querySelector('#stepText').textContent=`QUESTION ${answer+1} OF 3`;document.querySelector('#questionTitle').textContent=questions[answer][0];document.querySelector('#choices').innerHTML=questions[answer][1].map(choice=>`<button class="choice" type="button">${choice}</button>`).join('');document.querySelector('#progress').style.width=`${(answer+1)*33.333}%`;document.querySelectorAll('.choice').forEach(button=>button.addEventListener('click',()=>{if(answer<questions.length-1){answer+=1;render();}else{document.querySelector('#readingTitle').textContent=`${gender}, your name carries a quiet intuitive frequency.`;show('reading');}}));};
document.querySelectorAll('.gender-card').forEach(button=>button.addEventListener('click',()=>{gender=button.dataset.gender;answer=0;render();show('questions');}));
document.querySelector('#backQuestion').addEventListener('click',()=>answer===0?show('welcome'):(answer-=1,render()));
document.querySelectorAll('.reading-card').forEach(card=>card.addEventListener('click',()=>{selectedCard=card.dataset.card;document.querySelector('#chosenCard').textContent=selectedCard;show('vsl1');}));
document.querySelector('#continueVsl').addEventListener('click',()=>{const email=document.querySelector('#email');if(!email.validity.valid){email.focus();email.reportValidity();return;}show('vsl2');});
document.querySelectorAll('.offer').forEach(offer=>offer.addEventListener('click',()=>{document.querySelectorAll('.offer').forEach(item=>item.classList.remove('selected'));offer.classList.add('selected');document.querySelector('#checkout').textContent=`Unlock my complete guide — $${offer.dataset.price}`;}));
