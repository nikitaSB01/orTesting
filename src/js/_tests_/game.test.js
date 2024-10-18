const { setupCardValidation } = require('../app');

beforeEach(() => {
  document.body.innerHTML = `
    <div class="container">
      <div class="card-icons">
        <img class="card-icons-img" src="img/visa-curved.png" alt="Visa" class="hidden" />
        <img class="card-icons-img" src="img/credit-card-mastercard.png" alt="MasterCard" class="hidden" />
        <img class="card-icons-img" src="img/creditcard-american-express.png" alt="American Express" class="hidden" />
        <img class="card-icons-img" src="img/discover-curved-128px.png" alt="Discover" class="hidden" />
        <img class="card-icons-img" src="img/mir.svg" alt="Mir" class="hidden" />
      </div>
      <div class="input-group">
        <input type="text" placeholder="Credit card number" />
        <button id="validate">Click to Validate</button>
      </div>
    </div>
  `;

  setupCardValidation();
});

test('should validate card number', () => {
  const input = document.querySelector('.input-group input');
  input.value = '4111111111111111'; // Пример номера Visa

  document.getElementById('validate').click();

  const visaIcon = document.querySelector('img[alt="Visa"]');

  // Проверяем, что класс 'hidden' убран
  expect(visaIcon.classList.contains('hidden')).toBe(false);
});
