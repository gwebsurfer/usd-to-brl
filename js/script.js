/*

fetch(
    "https://free.currconv.com/api/v7/convert?q=USD_BRL,BRL_USD&compact=ultra&apiKey=38f5cc2783a36077be6b"
  ).then((resposta) => console.log(resposta));

*/

const btnConvert = document.querySelector("#btnConvert");

btnConvert.onclick = fetchDollar;

function parseJson(response) {
    return response.json();
}

async function fetchDollar() {

    const inputUsd = document.querySelector("#inputDollar").value;
    const valueBrl = document.querySelector("#inputBrl");
    
    const data = await fetch('https://economia.awesomeapi.com.br/last/USD-BRL')
        .then(parseJson);

    const valueDollar = data.USDBRL.ask;

    valueBrl.value = (valueDollar * inputUsd).toLocaleString('pt-BR', {
        maximumFractionDigits: '2'
    });

}

function refreshTime() {
    
    const showDate = document.querySelector("#date");
    const date = new Date();

    showDate.innerHTML = date.toUTCString();
}

refreshTime()

setInterval(function() {
    refreshTime()
}, 1000);