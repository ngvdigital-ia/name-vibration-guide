const app = document.querySelector('#app');
const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const years = Array.from({length:10}, (_, i) => String(2000 + i));
const decades = ['1910','1920','1930','1940','1950','1960','1970','1980','1990','2000','2010'];
const marital = ['Married','Dating','Engaged','Single','Separated','Widowed'];
const challenges = ['Love life','Finances','Health','Happiness'];
const state = { step: 'welcome', history: [], answers: {} };

function go(step) { state.history.push(state.step); state.step = step; render(); }
function back() { state.step = state.history.pop() || 'welcome'; render(); }
function nav(label, value, next) { state.answers[label] = value; go(next); }
function progressTop() { return '<div class="clone-progress"><i></i></div>'; }
function backButton() { return '<button class="clone-back" type="button" data-back>&lt; Back</button>'; }
function choices(items, key, next, klass='grid') {
  return `<div class="clone-choices ${klass}">${items.map(item => `<button type="button" data-choice="${item}" data-key="${key}" data-next="${next}">${item}</button>`).join('')}</div>`;
}
function question(title, items, key, next, klass) {
  return `<section class="clone-stage question-stage">${progressTop()}<div class="clone-body"><h1>${title}</h1>${choices(items,key,next,klass)}${backButton()}</div></section>`;
}
function render() {
  let html = '';
  if (state.step === 'welcome') {
    html = `<section class="clone-stage welcome-stage">${progressTop()}<div class="clone-body welcome-body"><h1>In just 30 seconds, discover how your name guides your energy and how to align it with <mark>prosperity!</mark></h1><p class="clone-alert">⚠️ <span><b>Attention:</b> If things start flowing after this test, you owe me a $5 coffee!</span></p><p class="clone-prompt">Select your gender to begin the test.</p><div class="clone-gender"><button type="button" data-choice="Woman" data-key="gender" data-next="month"><span class="female"></span><b>&gt;&nbsp; Woman</b></button><button type="button" data-choice="Man" data-key="gender" data-next="month"><span class="male"></span><b>&gt;&nbsp; Man</b></button></div><footer><p>🔒 <b>Privacy guaranteed:</b> Your answers are 100% anonymous and confidential.</p><p>More than 98,342 people have already discovered their blocks through this test.</p></footer></div></section>`;
  } else if (state.step === 'month') html = question('Click the month you were born:', months, 'month', 'day');
  else if (state.step === 'day') html = question('Enter the day of your birth:', Array.from({length:31},(_,i)=>String(i+1).padStart(2,'0')), 'day', 'decade', 'days');
  else if (state.step === 'decade') html = question('Which decade were you born in?', decades, 'decade', 'year', 'decades');
  else if (state.step === 'year') html = question('Which year were you born in?', years, 'year', 'marital', 'decades');
  else if (state.step === 'marital') html = question('WHAT IS YOUR MARITAL STATUS?', marital, 'marital', 'challenge', 'marital');
  else if (state.step === 'challenge') html = question('What is the greatest challenge in your life right now?', challenges, 'challenge', 'name', 'challenge');
  else if (state.step === 'name') {
    html = `<section class="clone-stage question-stage">${progressTop()}<div class="clone-body name-stage"><h1>What is your first name?</h1><label for="firstName">Enter your name</label><input id="firstName" autocomplete="given-name" maxlength="60" required><button type="button" class="clone-continue" data-name>Click here to continue!</button>${backButton()}</div></section>`;
  } else if (state.step === 'loading') {
    html = `<section class="clone-stage loading-stage">${progressTop()}<div class="clone-body"><div class="spinner"></div><h1>Preparing your reading...</h1></div></section>`;
    setTimeout(() => { if (state.step === 'loading') { state.step = 'vsl'; render(); } }, 1700);
  } else {
    html = `<section class="clone-stage vsl-stage">${progressTop()}<div class="clone-body"><h1>Your personalized reading is ready, ${escapeHtml(state.answers.name || '')}.</h1><p>Video access is being prepared for this translated version.</p></div></section>`;
  }
  app.innerHTML = html;
  window.scrollTo({top:0,behavior:'instant'});
  app.querySelectorAll('[data-choice]').forEach(b => b.addEventListener('click', () => nav(b.dataset.key, b.dataset.choice, b.dataset.next)));
  app.querySelector('[data-back]')?.addEventListener('click', back);
  app.querySelector('[data-name]')?.addEventListener('click', () => { const field = app.querySelector('#firstName'); if (!field.value.trim()) return field.focus(); state.answers.name = field.value.trim(); go('loading'); });
}
function escapeHtml(value) { const n=document.createElement('span'); n.textContent=value; return n.innerHTML; }
render();
