const inputs = document.querySelectorAll('.input-clearable');
const btnConvert = document.querySelector("#btnConvert");
const inputUsd = document.querySelector("#inputUsd");
const inputBrl = document.querySelector("#inputBrl");
const dateSpan = document.querySelector("#date");
let activeInput = inputBrl;

// Clear the value of all input elements with the class 'input-clearable'
function clearInputs() {
    inputs.forEach(input => {
        input.value = '';
    });
}

// Add a click event listener to each input element with the class 'input-clearable'
inputs.forEach(input => {
    input.addEventListener('click', clearInputs);
    input.addEventListener('input', async (e) => {
        activeInput = e.target; // set the active input to the one that triggered the event
        const exchangeRate = await fetchExchangeRate();
        if (activeInput === inputBrl) {
            updateValueUsd(exchangeRate);
        } else if (activeInput === inputUsd) {
            updateValueBrl(exchangeRate);
        }
    });
});

// Fetch the current USD to BRL exchange rate
async function fetchExchangeRate() {
    const response = await fetch('https://economia.awesomeapi.com.br/last/USD-BRL');
    const data = await response.json();
    const exchangeRate = data.USDBRL.bid;
    return exchangeRate;
}

// Format a currency value to BRL
function formatCurrencyBrl(value) {
    return value.toLocaleString('pt-BR', {
        maximumFractionDigits: 2
    });
}

// Format a currency value to USD
function formatCurrencyUsd(value) {
    return value.toLocaleString('en-US', {
        maximumFractionDigits: 2
    });
}

// Update the converted BRL value based on the current exchange rate
function updateValueBrl(exchangeRate) {
    const usdValue = Number(inputUsd.value);
    const brlValue = usdValue * exchangeRate;
    inputBrl.value = formatCurrencyBrl(brlValue);
}

// Update the converted USD value based on the current BRL input value
function updateValueUsd(exchangeRate) {
    const brlValue = Number(inputBrl.value);
    const usdValue = brlValue / exchangeRate;
    inputUsd.value = formatCurrencyUsd(usdValue);
}

// Refresh the current date and time display
function refreshTime() {
    const date = new Date();
    dateSpan.textContent = date.toUTCString();
    setInitialConversion();
}

// Calculate the value of 1 USD in BRL based on the current exchange rate
async function calculateUsdToBrlValue() {
    const exchangeRate = await fetchExchangeRate();
    return exchangeRate * 1;
}

// Set the initial value of the BRL input placeholder to the current exchange rate from 1 USD to BRL
async function setInitialConversion() {
    const brlValue = await calculateUsdToBrlValue();
    inputBrl.placeholder = formatCurrencyBrl(brlValue);
}

// Update the printed value of 1 USD in BRL
async function updatePrintedUsdToBrlValue() {
    const brlValue = await calculateUsdToBrlValue();
    const formattedValue = formatCurrencyBrl(brlValue);
    const printDollar = document.querySelector("#printDollar");
    printDollar.innerHTML = `1 USD = ${formattedValue} BRL`;
}

// Add an event listener to the Convert button that triggers the conversion and update functions
btnConvert.addEventListener('click', updatePrintedUsdToBrlValue);

// Call the refreshTime function once and then at one second intervals to update the displayed time
refreshTime();
setInterval(refreshTime, 1000);

setInitialConversion();