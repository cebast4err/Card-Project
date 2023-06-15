const cardNumber = document.getElementById('input-card-number');
const cardName = document.getElementById('input-card-name');
const cardDate = document.getElementById('input-card-date');
const cardCVC = document.getElementById('input-card-cvc');
const button = document.querySelector('.custom-button');
const buttonThanks = document.querySelector('.button-thanks');
const thanksSection = document.querySelector('.thanks');

const span = document.querySelector('#card-number');
const card_name = document.getElementById('card-name')
const card_date = document.getElementById('card-date')
const card_CVC = document.querySelector('#back-card p')
const formRow = document.querySelector('.cadastro');
const valueNew = span.textContent;
const ValueNew_name = card_name.textContent
const ValueNew_date = card_date.textContent
const ValueNew_CVC = card_CVC.textContent

const erroName = document.querySelector('.date-error1')
const erroName2 = document.querySelector('.date-error2')
const erroName3 = document.querySelector('.date-error3')
const erroName4 = document.querySelector('.date-error4')

const valueOfCard2 = document.getElementById('input-card-number');
//para dar espaços nos numeros no input
valueOfCard2.addEventListener('input', function() {
  let value = valueOfCard2.value.replace(/\s/g, '');
  
  value = value.replace(/(\d{4})(?=\d)/g, '$1 ');

  valueOfCard2.value = value;
});
//para dar um / entre os numeros no input da Data
cardDate.addEventListener('input', function() {
  let value = cardDate.value.replace(/\s/g, '')
  value = value.replace(/(\d{2})(?=\d)/g, '$1/')

  cardDate.value = value
})

//listener de pegar o valor do numero do cartao
cardNumber.addEventListener('input', function () {
  
  const valueOFNum = cardNumber.value.replace(/\s/g, '').match(/.{1,4}/g)
  if (valueOFNum) {
    const formattedNum = valueOFNum.join(" ");
    let acu = '';

    for (let i = 0; i < valueNew.length; i++) {
      if (i < formattedNum.length) {
        acu += formattedNum[i].replace(/[a-zA-Z]/g, function (match) {
          return valueNew[i];
        });
      } else {
        acu += valueNew[i];
      }
    }

    span.textContent = acu;
  }
  else {
    span.textContent = valueNew;
  }
});

//listener de pegar o nome no cartao
cardName.addEventListener('input', function () {
  const valueOfName = cardName.value.replace(/[^a-zA-Z\s]/g, '');
  const limitedString = valueOfName.trim().split(/\s+/)
  const newString = limitedString.slice(0, 2).join(' ');

  if (newString) {
    card_name.textContent = newString
  }
  else if (cardName.value === '') {
    card_name.textContent = ValueNew_name
  }
  
});
//listener de pegar a data de vencimento do cartao
cardDate.addEventListener('input', function () {
  const valueOfDate = cardDate.value.trim();
  
  if (valueOfDate.length >= 1) {
    const formattedDate = valueOfDate.replace(/[^0-9]/g, '').match(/.{1,2}/g).join('/');

    const limitedString = formattedDate.substring(0, 6).replace(/\/[^\/]*\//g, '/');
    let acu = '';
  
    for (let i = 0; i < limitedString.length; i++) {
      acu += limitedString[i];
    }
  
    card_date.textContent = acu;
  } else {
    card_date.textContent = ValueNew_date;
  }
  
});
//listener de pegar o CVC do cartao
cardCVC.addEventListener('input', function() {
  const valueOfCVC = cardCVC.value.replace(/^\D+/g, '')

  if (valueOfCVC) {
    card_CVC.textContent = valueOfCVC
  }
  else if (valueOfCVC === '') {
    card_CVC.textContent = '---'
  }
})
//listener para concluir, e mostrar a logo de concluido
button.addEventListener('click', function(event) {
  event.preventDefault();

  const cardNameText = cardName.value;
  const wordsName = cardNameText.trim();
  const manyWordsName = wordsName.length;

  const cardNumberText = cardNumber.value
  const manyWordsNumber = cardNumberText.length;

  const cardDateText = cardDate.value
  const wordsDate = cardDateText.trim()
  const manyWordsDate = wordsDate.length

  const cardCVCText = cardCVC.value
  const wordsCVC = cardCVCText.trim()
  const manyWordsCVC = wordsCVC.length

let hasErrorName = false;
let hasErrorNumber = false;
let hasErrorDate = false;
let hasErrorCVC = false;

// Verificação de Erro do Nome
if (cardNameText === '') {
  erroName.textContent = 'Obrigatório';
  erroName.style.display = 'flex';
  cardName.style.border = '1px solid red';
  hasErrorName = true;
} else if (manyWordsName < 8) {
  erroName.textContent = 'Nome completo';
  erroName.style.display = 'flex';
  erroName.style.marginLeft = '4px'; 
  cardName.style.border = '1px solid red';
  hasErrorName = true;
  
} else {
  erroName.style.display = 'none';
  cardName.style.borderColor = 'white'
  hasErrorName = false;
}

// Verificação de Erro do Número
if (cardNumberText === '') {
  erroName2.textContent = 'Obrigatório';
  erroName2.style.display = 'flex';
  cardNumber.style.border = '1px solid red';
  hasErrorNumber = true;
} else if (manyWordsNumber < 19) {
  erroName2.textContent = 'Números insuficientes';
  erroName2.style.display = 'flex';
  erroName2.style.marginLeft = 'px';
  cardNumber.style.border = '1px solid red';
  hasErrorNumber = true;
} else if (manyWordsNumber === 19) {
  erroName2.style.display = 'none';
  cardNumber.style.borderColor = 'white'
  hasErrorNumber = false;
}

// Verificação de Erro da Data
if (manyWordsDate >= 5) {
  erroName3.style.display = 'none';
  cardDate.style.borderColor = 'white'
} else {
  erroName3.style.display = 'flex';
  cardDate.style.border = '1px solid red';
  hasErrorDate = true;
}
// Verificação de Erro do CVC
if (manyWordsCVC >= 3) {
  erroName4.style.display = 'none';
  cardCVC.style.borderColor = 'white'
} else {
  erroName4.style.display = 'flex';
  cardCVC.style.border = '1px solid red';
  hasErrorCVC = true;
}

// Exibir as mensagens de erro correspondentes
if (hasErrorName || hasErrorNumber || hasErrorDate || hasErrorCVC) {
  return
} else {
  // Se todas as condições forem atendidas, o código continuará a partir deste ponto
  thanksSection.style.display = 'flex';
  formRow.style.display = 'none';
}

//listener para redefinir tudo de novo após apertar o botao continue
buttonThanks.addEventListener('click', function (event) {
  event.preventDefault()
  formRow.style.display = 'flex';
  thanksSection.style.display = 'none';

  span.textContent = valueNew
  cardNumber.value = ''
  card_name.textContent = ValueNew_name
  cardName.value = ''
  card_date.textContent = ValueNew_date;
  cardDate.value = ''
  card_CVC.textContent = ValueNew_CVC
  cardCVC.value = ''
})
});