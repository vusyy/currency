document.addEventListener("DOMContentLoaded", function () {
    let defaultCurrency = document.querySelector(".currency .selected");
    let handleCurrencyClick = (event) => {
        document.querySelectorAll(".currency button").forEach((button) => {
            button.classList.remove("selected");
        });
        event.target.classList.add("selected");
    };
    document.querySelectorAll(".currency button").forEach((button) => {
        button.addEventListener("click", handleCurrencyClick);
    });
    defaultCurrency.click();
});

document.addEventListener("DOMContentLoaded", function () {
    let defaultCurrencyButton = document.querySelector(".currency2 button:nth-child(2)");
    defaultCurrencyButton.classList.add("selected");
    let currencyButtons = document.querySelectorAll(".currency2 button");
    currencyButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            defaultCurrencyButton.classList.remove("selected");
            button.classList.add("selected");
            defaultCurrencyButton = button;
        });
    });
});
let from = 'RUB'
let toUser = 'USD'
let amo = document.querySelector('.amo')
let oma = document.querySelector('.oma')
let pFrom = document.querySelector('.textfrom')
let pTo = document.querySelector('.texto')
const apiKey = '11d60eac28f897bc35e745b5'
const apiUrlMain = `https://v6.exchangerate-api.com/v6`

async function Converter(type) {
    let amount;
    if (type == 'amo') {
        amount = Number(document.querySelector('.amo').value)
        console.log('input' + amount)
    }
    else if (type == 'oma') {
        amount = Number(document.querySelector('.oma').value)
        console.log('input' + amount)
    }

    if (toUser != from) {
        if (amount >= 0) {
            let apiUrl
            if (type == 'amo') {
                apiUrl = `${apiUrlMain}/${apiKey}/pair/${from}/${toUser}/${amount}`

            }
            else if (type == 'oma') {
                apiUrl = `${apiUrlMain}/${apiKey}/pair/${toUser}/${from}/${amount}`

            }

try {
            let response = await fetch(apiUrl);
            let data = await response.json();


            if (type == 'amo') {
                if (data.conversion_result == undefined) {
                    oma.value = '0'
                }
                else {
                    oma.value = data.conversion_result
                }

            }
            else if (type == 'oma') {
                if (data.conversion_result == undefined) {
                    amo.value = '0'
                }
                else {
                    amo.value = data.conversion_result

                }
            }
            
            let apiUrlp = `${apiUrlMain}/${apiKey}/pair/${from}/${toUser}/1`
            let response2 = await fetch(apiUrlp);
            let data2 = await response2.json();
            pFrom.innerText = `1 ${from} = ${data2.conversion_result} ${toUser}`

            console.log(data2.conversion_result)

            let apiUrlp2 = `${apiUrlMain}/${apiKey}/pair/${toUser}/${from}/1`
            let response3 = await fetch(apiUrlp2);
            let data3 = await response3.json();
            pTo.innerText = `1 ${toUser} = ${data3.conversion_result} ${from}`

            console.log(data3.conversion_result)
        }
        catch {
            alert("Internet bağlantınızı yoxlayın")
        }
      
        }
    }
    else {
        if (type == 'amo') {
            oma.value = amount
        }
        else if (type == 'oma') {
            amo.value = amount
        }
        pFrom.innerText = '1' + from + '=' + '1' + toUser
        pTo.innerText = '1' + toUser + '=' + '1' + from
    }
}



function fromBtn(e) {
    from = e.target.id
    console.log('from' + from)
    Converter('amo')
}
function toBtn(e) {
    toUser = e.target.id
    console.log('to' + toUser)
    Converter('amo')
}

let btns = document.querySelectorAll('button')
btns.forEach(btn => {
    if ((btn.classList == 'from')||(btn.classList == 'from selected')) {
        btn.addEventListener('click', fromBtn)
    }
    else {
        btn.addEventListener('click', toBtn)
    }
})

amo.addEventListener('input', () => {
    Converter('amo')
})

oma.addEventListener('input', () => {
    Converter('oma')
})
Converter('amo')