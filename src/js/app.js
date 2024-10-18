console.log('hell');

// Функция для проверки валидности номера карты (алгоритм Луна)
function luhnCheck(cardNumber) {
  let sum = 0;
  let shouldDouble = false;

  for (let i = cardNumber.length - 1; i >= 0; i -= 1) {
    let digit = parseInt(cardNumber[i], 10);

    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }
    sum += digit;
    shouldDouble = !shouldDouble;
  }

  return sum % 10 === 0;
}

// Функция для определения платёжной системы
function getCardSystem(cardNumber) {
  if (/^4/.test(cardNumber)) return 'Visa';
  if (/^5[1-5]/.test(cardNumber) || /^2[2-7]/.test(cardNumber)) return 'MasterCard';
  if (/^3[47]/.test(cardNumber)) return 'American Express';
  if (/^220[0-4]/.test(cardNumber)) return 'Mir';
  if (/^6(?:011|5)/.test(cardNumber)) return 'Discover';
  if (/^35/.test(cardNumber)) return 'JCB';
  if (/^30[0-5]|^36|^38/.test(cardNumber)) return 'Diners Club';
  return 'Unknown';
}

function setupCardValidation() {
  const validateButton = document.getElementById('validate');

  if (!validateButton) {
    console.error('Кнопка "validate" не найдена');
    return;
  }

  validateButton.addEventListener('click', () => {
    const cardNumber = document.querySelector('.input-group input').value; // Получаем номер карты
    const system = getCardSystem(cardNumber); // Определяем платёжную систему
    const cardIcons = document.querySelectorAll('.card-icons-img'); // Получаем все изображения карт

    // Делаем все иконки полупрозрачными (скрываем)
    cardIcons.forEach((icon) => {
      icon.classList.add('hidden');
    });

    // Показываем только иконку нужной карты, убирая у неё класс `hidden`
    switch (system) {
      case 'Visa':
        document.querySelector('img[alt="Visa"]').classList.remove('hidden');
        break;
      case 'MasterCard':
        document
          .querySelector('img[alt="MasterCard"]')
          .classList.remove('hidden');
        break;
      case 'American Express':
        document
          .querySelector('img[alt="American Express"]')
          .classList.remove('hidden');
        break;
      case 'Discover':
        document
          .querySelector('img[alt="Discover"]')
          .classList.remove('hidden');
        break;
      case 'JCB':
        document.querySelector('img[alt="JCB"]').classList.remove('hidden');
        break;
      case 'Diners Club':
        document
          .querySelector('img[alt="Diners Club"]')
          .classList.remove('hidden');
        break;
      case 'Mir':
        document.querySelector('img[alt="Mir"]').classList.remove('hidden');
        break;
      default:
        console.log('Платёжная система не распознана');
        break;
    }

    // Проверка валидности номера карты
    if (luhnCheck(cardNumber)) {
      console.log('Номер карты валиден');
    } else {
      console.log('Номер карты невалиден');
    }
  });
}

// Вызываем функцию для установки обработчика событий
setupCardValidation();

module.exports = {
  luhnCheck,
  getCardSystem,
  setupCardValidation,
};
