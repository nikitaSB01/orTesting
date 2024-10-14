// Функция для проверки валидности номера карты
function luhnCheck(cardNumber) {
  let sum = 0;
  let shouldDouble = false;

  // Перебираем номер карты с конца
  for (let i = cardNumber.length - 1; i >= 0; i -= 1) {
    // Используем radix 10 для парсинга
    let digit = parseInt(cardNumber[i], 10);

    // Если необходимо удвоить цифру
    if (shouldDouble) {
      digit *= 2;
      // Если удвоенная цифра больше 9, вычитаем 9
      if (digit > 9) {
        digit -= 9;
      }
    }

    // Добавляем цифру к сумме
    sum += digit;
    // Меняем состояние для удвоения следующей цифры
    shouldDouble = !shouldDouble;
  }

  // Возвращаем true, если сумма делится на 10 без остатка
  return sum % 10 === 0;
}

// Функция для определения платёжной системы
function getCardSystem(cardNumber) {
  if (/^4/.test(cardNumber)) return 'Visa';
  if (/^5[1-5]/.test(cardNumber) || /^2[2-7]/.test(cardNumber)) return 'MasterCard';
  if (/^3[47]/.test(cardNumber)) return 'American Express';
  if (/^220[0-4]/.test(cardNumber)) return 'Mir';
  if (/^6(?:011|5)/.test(cardNumber)) return 'Discover';
  return 'Unknown';
}

// Функция для обработки события нажатия кнопки
function setupCardValidation() {
  document.getElementById('validate').addEventListener('click', () => {
    const cardNumber = document.querySelector('.input-group input').value; // Получаем номер карты
    const system = getCardSystem(cardNumber); // Определяем платёжную систему
    const cardIcons = document.querySelectorAll('.card-icons-img'); // Получаем все изображения карт

    // Очищаем видимые иконки
    Array.from(cardIcons).forEach((icon) => {
      // Создаём отдельную переменную для хранения ссылки на иконку
      const cardIcon = icon;
      cardIcon.style.display = 'none'; // Скрываем все иконки
    });

    // Показываем иконку в зависимости от платёжной системы
    switch (system) {
      case 'Visa':
        document.querySelector('img[alt="Visa"]').style.display = 'block';
        break;
      case 'MasterCard':
        document.querySelector('img[alt="MasterCard"]').style.display = 'block';
        break;
      case 'American Express':
        document.querySelector('img[alt="American Express"]').style.display = 'block';
        break;
      case 'Mir':
        document.querySelector('img[alt="Mir"]').style.display = 'block';
        break;
      case 'Discover':
        document.querySelector('img[alt="Discover"]').style.display = 'block';
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
