
//query selectors
const dropDown = document.querySelectorAll("form select");
fromCurrency = document.querySelector(".from select");
toCurrency = document.querySelector(".to select");
clickButton = document.querySelector("form button");
const amount = document.querySelector("form input");
const resultText = document.querySelector("form .result");
const exchangeIcon = document.querySelector("form .icon");

//retrieve dropdown list of countries codes
for (let i = 0; i < dropDown.length; i++) {
    for(let currency_code in country_list){
        // default cases for select boxes
        let selected = i == 0 ? currency_code == "USD" ? "selected" : "" : currency_code == "GBP" ? "selected" : "";
        // option tag
        let optionTag = `<option value="${currency_code}" ${selected}>${currency_code}</option>`;
        // inserts option tag into dropdown menu through each iteration
        dropDown[i].insertAdjacentHTML("beforeend", optionTag);
    }
    //when user changes currency code, we change the flag
    dropDown[i].addEventListener("change", e =>{
        loadFlag(e.target);
    });
}
function loadFlag(element){
    for(let code in country_list){
        if(code == element.value){
            // 
            let flag = element.parentElement.querySelector("img");
            flag.src = `https://flagcdn.com/w160/${country_list[code].toLowerCase()}.jpg`;
        }
    }
}
window.addEventListener("load", ()=>{
    convert();
});
clickButton.addEventListener("click", e =>{
    //prevent form from submition
    e.preventDefault();
    //converting exchange rate when button is clicked
    convert();
});

exchangeIcon.addEventListener("click", ()=>{
    let tempCode = fromCurrency.value;
    fromCurrency.value = toCurrency.value;
    toCurrency.value = tempCode;
    loadFlag(fromCurrency);
    loadFlag(toCurrency);
    convert();
})
//main function for getting exchange Rate
function convert(){
    // getting amount from user
    
    
    let value = amount.value; 
    resultText.innerText = "Working...";
   
    let url = `https://v6.exchangerate-api.com/v6/833d19b7687c6910a7dcaaff/latest/${fromCurrency.value}`;
   
    /* fetching live exchange rate data from exchangerate-api
    then we parse the response into a js object and then recieve our result*/
    
    fetch(url).then(response => response.json()).then(result =>{
        
        let exchangeRate = result.conversion_rates[toCurrency.value];
        let total = (value * exchangeRate)
        // changing result text to display our conversion
        resultText.innerText = `${value} ${fromCurrency.value}\r\n`;
        resultText.innerText += `=\r\n`;
        resultText.innerText += `${total} ${toCurrency.value}`;
    }).catch(() =>{
        resultText.innerText = "Rate not available";
    });
}