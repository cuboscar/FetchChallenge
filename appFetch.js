document.getElementById("getText").addEventListener('click', getText);
function getText(e) {
    fetch('textdata.txt')
        .then(function (response) {

            return response.text()//stream .then .catch
        }).then(function (text) {
            console.log(text);
            document.getElementById('output').innerHTML = `Fetch Text "${text}"`;
        })
        .catch(function (error) {
            console.log(new Error("something went wrong"));
        })
}
document.getElementById("getJson").addEventListener('click', getJson);
function getJson(e) {
    fetch("JSONdata.json")
        .then(function (response) {
            return response.json();
        }).then(function (data) {
            console.log(data)
            let output = "";
            data.forEach(function (person) {
                output += `<li>${person.firstName} works for ${person.company} </li>`
            });
            document.getElementById('output').innerHTML = output;
        }).catch(function (error) { console.log('something went wrong') })
}
document.getElementById("getAPI").addEventListener('click', getApi);

function getApi(e) {
    const symbol = prompt("Insert Cryptocurrency Symbol")
    fetch(`https://api.coinmarketcap.com/v2/listings/`)
        .then(function (response) {

            return (response.json());
        }).then(function (data) {
            data.data.forEach(element => {
                if (element["symbol"] === symbol) {
                    const id = element["id"];
                    const sym = element["symbol"]
                    console.log(element)
                    //console.log(id)
                    fetch(`https://api.coinmarketcap.com/v2/ticker/${id}/`)
                        .then(function (response) {
                            return (response.json());
                        }).then(function (coin) {
                            btc = coin.data
                            console.log(btc);
                            console.log(id);
                            console.log(sym)
                            output = `<li>ID ${id} : ${sym} ${btc.name} Rank ${btc.rank} </li>
                            <li>${btc.symbol} ${btc.name} Value(USD):$${btc.quotes.USD.price} </li>
        <li>Percentage of Change in: 1 hr: ${btc.quotes.USD.percent_change_1h} <br> 24hr: ${btc.quotes.USD.percent_change_24h}  </li>`
                            document.getElementById("output").innerHTML = output;
                        }).catch(function (error) { console.log('something went wrong') })
                }
            });
        }).catch(function (error) { console.log('something went wrong') })
    // fetch(`https://api.coinmarketcap.com/v2/ticker/1027/`)
    //     .then(function (response) {
    //         return (response.json());
    //     }).then(function (coin) {
    //         btc = coin.data
    //         console.log(btc);
    //         output = `<li>${btc.symbol} ${btc.name} Value:$${btc.quotes.USD.price} </li>
    //     <li>Value Change in 1 hr: ${btc.quotes.USD.percent_change_1h} </li>`
    //         document.getElementById("output").innerHTML = output;
    //     }).catch(function (error) { console.log('something went wrong') })
}