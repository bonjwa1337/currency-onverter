const BASE_URL = 'https://api.exchangerate.host/latest';
let currentRate = undefined;

const getNewCurrency = (symbols, base) => {
    const leftCurrency = leftConverter.querySelector('.selected').textContent,
        rightCurrency = rightConverter.querySelector('.selected').textContent;

    if (leftCurrency == rightCurrency) {
        leftCurrencyText.textContent = `${leftInput.value} ${leftCurrency} = 1 ${rightCurrency}`;
        rightCurrencyText.textContent = `${leftInput.value} ${rightCurrency} = 1 ${leftCurrency}`;
        rightInput.value = leftInput.value * 1;
        return;
    }
    fetch(`${BASE_URL}?base=${base}&symbols=${symbols}`)
        .then(res => res.json())
        .then(data => {
            currentRate = Object.values(data.rates);
            leftCurrencyText.textContent = `1 ${leftCurrency} = ${(1 / Object.values(data.rates)).toFixed(4)} ${rightCurrency}`;
            rightCurrencyText.textContent = `1 ${rightCurrency} = ${Object.values(data.rates)} ${leftCurrency}`;
            rightInput.value = leftInput.value * Object.values(data.rates);

        });
}

const leftConverter = document.querySelector('.left-converter'),
    rightConverter = document.querySelector('.right-converter'),
    leftInput = leftConverter.querySelector('.digits'),
    rightInput = rightConverter.querySelector('.digits'),
    leftCurrencyButtons = leftConverter.querySelectorAll('.currency-button'),
    rightCurrencyButtons = rightConverter.querySelectorAll('.currency-button'),
    leftCurrencyText = leftConverter.querySelector('.currency-text'),
    rightCurrencyText = rightConverter.querySelector('.currency-text');


leftInput.value = '1';
leftCurrencyButtons.forEach(item => {
    item.textContent == 'USD' ? item.classList.add('selected') : null
})
rightCurrencyButtons.forEach(item => {
    item.textContent == 'RUB' ? item.classList.add('selected') : null
})

getNewCurrency(rightConverter.querySelector('.selected').textContent, leftConverter.querySelector('.selected').textContent);



leftCurrencyButtons.forEach(item => {
    item.addEventListener('click', (e) => {
        leftConverter.querySelector('.selected').classList.remove('selected')
        item.classList.add('selected');
        getNewCurrency(rightConverter.querySelector('.selected').textContent, leftConverter.querySelector('.selected').textContent);
    })
})

rightCurrencyButtons.forEach(item => {
    item.addEventListener('click', (e) => {
        rightConverter.querySelector('.selected').classList.remove('selected')
        item.classList.add('selected');
        getNewCurrency(rightConverter.querySelector('.selected').textContent, leftConverter.querySelector('.selected').textContent);
    })
})


const addKey = () => {
    document.addEventListener('change', (e) => {
        rightInput.value = leftInput.value * currentRate;
    })
}

document.querySelectorAll('.digits').forEach(item => {
    item.addEventListener('change', addKey())
})