/* Translation layer only. The source application owns structure, dimensions and interaction. */
(() => {
  const copy = new Map([
    ['Em apenas 30 segundos, descubra como seu nome rege sua vibração e veja como alinhar sua energia com a prosperidade!', 'In just 30 seconds, discover how your name guides your energy and how to align it with prosperity!'],
    ['Atenção: Se tudo começar a fluir depois do teste, você me deve um PIX de R$ 5,00!', 'Attention: If things start flowing after this test, you owe me a $5 coffee!'],
    ['Selecione seu gênero para iniciar o teste.', 'Select your gender to begin the test.'],
    ['Mulher', 'Woman'], ['Homem', 'Man'], ['Privacidade Garantida:', 'Privacy guaranteed:'],
    ['Suas respostas são 100% anônimas e confidenciais.', 'Your answers are 100% anonymous and confidential.'],
    ['Mais de 98.342 pessoas já descobriram seus bloqueios através deste teste.', 'More than 98,342 people have already discovered their blocks through this test.'],
    ['Clique no mês em que você nasceu:', 'Click the month you were born:'],
    ['Janeiro', 'January'], ['Fevereiro', 'February'], ['Março', 'March'], ['Abril', 'April'], ['Maio', 'May'], ['Junho', 'June'],
    ['Julho', 'July'], ['Agosto', 'August'], ['Setembro', 'September'], ['Outubro', 'October'], ['Novembro', 'November'], ['Dezembro', 'December'],
    ['Informe o Dia do seu Nascimento:', 'Enter the day of your birth:'], ['Em qual Década você nasceu?', 'Which decade were you born in?'],
    ['Em que Ano você nasceu?', 'Which year were you born in?'], ['Qual é o seu Estado Civil?', 'What is your marital status?'],
    ['QUAL É O SEU ESTADO CIVIL?', 'WHAT IS YOUR MARITAL STATUS?'], ['Casado(a)', 'Married'], ['Namorando', 'Dating'],
    ['Noivo(a)', 'Engaged'], ['Solteiro(a)', 'Single'], ['Separado(a)', 'Separated'], ['Viúvo(a)', 'Widowed'],
    ['Qual o maior desafio da sua vida nesse momento?', 'What is the greatest challenge in your life right now?'],
    ['Vida Amorosa', 'Love life'], ['Finanças', 'Finances'], ['Saúde', 'Health'], ['Felicidade', 'Happiness'],
    ['Qual é o seu Primeiro Nome?', 'What is your first name?'], ['Digite seu nome', 'Enter your name'],
    ['Clique Aqui Para Continuar!', 'Click here to continue!'], ['< Voltar', '< Back'],
    ['Carregando a sua leitura...', 'Preparing your reading...'],
    ['Digite o seu e-mail para receber o restante da sua leitura personalizada...', 'Enter your email to receive the rest of your personalized reading...'],
    ['Clique para continuar', 'Click to continue'], ['Quero liberar meu nome', 'I want to unlock my name']
  ]);
  const translate = node => {
    if (node.nodeType === Node.TEXT_NODE) {
      const key = node.nodeValue.trim();
      if (copy.has(key)) node.nodeValue = node.nodeValue.replace(key, copy.get(key));
      return;
    }
    if (node.nodeType === Node.ELEMENT_NODE && node.tagName !== 'SCRIPT' && node.tagName !== 'STYLE') {
      node.childNodes.forEach(translate);
      if (node instanceof HTMLInputElement && copy.has(node.placeholder)) node.placeholder = copy.get(node.placeholder);
    }
  };
  const localize = () => {
    translate(document.body);
    const headline = document.querySelector('.main-title');
    if (headline && headline.textContent.includes('Em apenas 30 segundos')) {
      headline.innerHTML = 'In just 30 seconds, discover how your name guides your energy and how to align it with <span class="highlight-text">prosperity</span>!';
    }
  };
  new MutationObserver(records => { records.forEach(record => record.addedNodes.forEach(translate)); localize(); }).observe(document.documentElement, {childList:true,subtree:true});
  document.addEventListener('DOMContentLoaded', localize);
  setInterval(localize, 250);
})();
