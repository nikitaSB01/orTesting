// game.test.js

const { setupCardValidation } = require('../app');

beforeEach(() => {
  document.body.innerHTML = `
    <div class="container">
      <div class="card-icons">
        <img class="card-icons-img" src="img/visa-curved.png" alt="Visa" style="display:none;" />
        <img class="card-icons-img" src="img/credit-card-mastercard.png" alt="MasterCard" style="display:none;" />
        <img class="card-icons-img" src="img/creditcard-american-express.png" alt="American Express" style="display:none;" />
        <img class="card-icons-img" src="img/discover-curved-128px.png" alt="Discover" style="display:none;" />
        <img class="card-icons-img" src="img/mir.svg" alt="Mir" style="display:none;" />
      </div>
      <div class="input-group">
        <input type="text" placeholder="Credit card number" />
        <button id="validate">Click to Validate</button>
      </div>
    </div>
  `;

  // Вызываем setupCardValidation только после того, как DOM-элементы были созданы
  setupCardValidation();
});

test('should validate card number', () => {
  const input = document.querySelector('.input-group input');
  input.value = '4111111111111111'; // Пример номера Visa

  // Имитируем клик на кнопку для валидации
  document.getElementById('validate').click();

  // Проверяем, что иконка Visa отображается
  const visaIcon = document.querySelector('img[alt="Visa"]');
  expect(visaIcon.style.display).toBe('block');
});
