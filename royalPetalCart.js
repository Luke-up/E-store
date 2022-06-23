//Function to create the table of products and set the default values for shipping and discounts. 
window.onload = function () {
    let i = 0;
    let totalNoVat = 0;
    cart = JSON.parse(sessionStorage.getItem('customerCart'));
    cart.forEach(function () {
        let table = document.getElementById('table');
        let row = document.createElement('tr');
        //Create a td element to show the name of the item
        let cakeType = document.createElement('td');
        cakeType.innerHTML = cart[i].cake;
        //Create a td element to show the price per unit of the item
        let cakeCost = document.createElement('td');
        cakeCost.innerHTML = cart[i].price;
        //Create a td element to act as container for different elements related to quantity
        let cakeAmountHolder = document.createElement('td')
        cakeAmountHolder.setAttribute('id', 'cakeAmountHolder' + i)
        //Create a span element to show the quantity of this type of item
        let cakeQuantity = document.createElement('span');
        cakeQuantity.setAttribute('id', 'cakeQuantity' + i)
        cakeQuantity.innerHTML = cart[i].quantity;
        //Create a button element to allow the user to change the quantity of items by linking to another function 'changeQuantity()'
        let changeAmount = document.createElement('button');
        changeAmount.innerHTML = "Change";
        changeAmount.setAttribute('onclick', 'changeQuantity(' + i + ')');
        changeAmount.setAttribute('class', 'btn btn-info ms-2 p-0 fs-6');
        changeAmount.setAttribute('id', 'cakeChange' + i)
        //Create a td element to show the total price of all units of a type
        let priceTimesUnits = document.createElement('td')
        priceTimesUnits.setAttribute('class', 'cakeOrderPrice')
        priceTimesUnits.innerHTML = (Number(cart[i].price * cart[i].quantity));
        //Calculate total of all items in the cart, before VAT, shipping, and discounts
        totalNoVat += (Number(cart[i].price * cart[i].quantity));
        sessionStorage.setItem('customerTotal', JSON.stringify(totalNoVat));
        //Create a button element which will remove an object from the 'cart' array, linked to the function 'deleteCake()'
        let cakeDelete = document.createElement('button');
        cakeDelete.setAttribute('onclick', 'deleteCake(' + i + ')');
        cakeDelete.setAttribute('class', 'btn btn-danger p-0');
        cakeDelete.innerHTML = "Remove";
        //Change text in shipping options to reflect the price of the cart
        let xShippingCost = document.getElementById('expressDelivery');
        xShippingCost.innerHTML = "+ R " + Math.round(totalNoVat * 0.12);
        let rShippingCost = document.getElementById('regularDelivery');
        rShippingCost.innerHTML = "+ R " + Math.round(totalNoVat * 0.06);
        //Set a check for discounts so that only one can be added
        sessionStorage.setItem('appliedDiscount', false);
        sessionStorage.setItem('discountPercent', 0);
        sessionStorage.setItem('discountValue', 0)
        i += 1;
        //Update final price element with values
        let totalPayment = document.getElementById('totalPayment');
        totalPaymentWithVAT=Math.round(totalNoVat*0.14+totalNoVat)
        totalPayment.innerHTML = 'R'+totalPaymentWithVAT
        sessionStorage.setItem('customerTotalVat', JSON.stringify(totalPaymentWithVAT));
        //Set a value for the shipping cost
        sessionStorage.setItem('shippingCost',0)
        //append all created elements to the HTML
        cakeAmountHolder.appendChild(cakeQuantity)
        cakeAmountHolder.appendChild(changeAmount)
        row.appendChild(cakeType);
        row.appendChild(cakeCost);
        row.appendChild(cakeAmountHolder);
        row.appendChild(priceTimesUnits)
        row.appendChild(cakeDelete);
        table.appendChild(row);
    })
}
//Function to remove object from 'cart' array using splice() method
function deleteCake(i) {
    let cart = JSON.parse(sessionStorage.getItem('customerCart'));
    cart.splice(i, 1);
    sessionStorage.setItem('customerCart', JSON.stringify(cart));
    location.reload();
}
//function to alter the quantities of an item type in the array and set to sessionStorage
function changeQuantity(i) {
    //Hide function allows the buttons to disapear and make room for the input elements
    $('#cakeQuantity' + i).hide();
    $('#cakeChange' + i).hide();
    //New input elements are created
    let input = document.createElement('input');
    let submit = document.createElement('button');
    let cakeAmountHolder = document.getElementById('cakeAmountHolder' + i)
    submit.setAttribute('class', 'btn p-0 btn-success')
    input.setAttribute('id', 'newValue' + i)
    input.setAttribute('type', 'text')
    input.setAttribute('class', 'w-25')
    submit.innerHTML = 'Okay'
    //On click element calls function to change the quantity property of the specific index in the array
    submit.setAttribute('onclick', 'cakeAmountChange(' + i + ')')
    cakeAmountHolder.appendChild(input);
    cakeAmountHolder.appendChild(submit);
}
//Function will change the quantity property of the item at the specific index
function cakeAmountChange(i) {
    let cart = JSON.parse(sessionStorage.getItem('customerCart'));
    //Function finds the new user-given value in the input box that replaced the button
    cart[i].quantity = document.getElementById('newValue' + i).value;
    sessionStorage.setItem('customerCart', JSON.stringify(cart));
    location.reload();
}
//Function is called on radio button click to alter the total payment figure 
function shippingAdd(x){
    let total = JSON.parse(sessionStorage.getItem('customerTotal'));
    let ship = total*x
    let totalNoShip = JSON.parse(sessionStorage.getItem('customerTotalVat'));
    let totalPayment = totalNoShip+ship
    document.getElementById('totalPayment').innerHTML = Math.round(totalPayment);
    //Total shipping cost is set to sessionStorage to be used later in the final payment confirmation modal
    sessionStorage.setItem('shippingCost',JSON.stringify(Math.round(ship)));
}
//Function reveals an area to input a discount code '10PERCENTOFF' for this project
function discountOpen() {
    //Function hides the original title and creates the input elements to populate the box
    $('#discount').hide();
    let container = document.getElementById('discountContainer');
    let discountEntry = document.createElement('input');
    let submit = document.createElement('button');
    discountEntry.setAttribute('type', 'text');
    discountEntry.setAttribute('placeholder', '10PERCENTOFF');
    discountEntry.setAttribute('class', 'p-1');
    discountEntry.setAttribute('id', 'discountEntry');
    //Submit button will call the function setDiscount() which will check the input field for the correct 'discount code'
    submit.setAttribute('onclick', 'setDiscount()');
    submit.setAttribute('class', 'btn');
    submit.innerHTML = 'Activate Discount!'
    container.appendChild(discountEntry);
    container.appendChild(submit);
}
//Function to apply the discount to the total cost of the products
function setDiscount() {
    //If function to check that discount is only applied once and notify the user
    if (JSON.parse(sessionStorage.getItem('appliedDiscount')) === false) {
        //If function to check that the correct code has been input to the input field
        if (document.getElementById('discountEntry').value === "10PERCENTOFF") {
            sessionStorage.setItem('discountPercent', 10)
            sessionStorage.setItem('appliedDiscount', true)
            let customerTotal=JSON.parse(sessionStorage.getItem('customerTotalVat'));
            let customerShipping=JSON.parse(sessionStorage.getItem('shippingCost'));
            let discountAmount=((customerTotal+customerShipping)*0.10)
            //The current total amount is written to the HTML for the user to see
            let totalPayment= (customerTotal+customerShipping)-((customerTotal+customerShipping)*0.10);
            document.getElementById('totalPayment').innerHTML = Math.round(totalPayment);
            //Final discount value amount is set to sessionStorage to be used later in final payment modal
            sessionStorage.setItem('discountValue',Math.round(discountAmount));
            !alert("10% discount applied!")
        } else {
            !alert("Not a valid discount code")
        }
    } else {
        !alert("Discount has already been applied")
    }
}
//Function to reveal modal containing randomly generated reference code and show final payment figure using data from sessionStorage
function confirmOrder(){
    $('#modalBack').fadeIn(200);
    let totalCart = JSON.parse(sessionStorage.getItem('customerTotalVat'));
    let shipping = JSON.parse(sessionStorage.getItem('shippingCost'));
    let discount = JSON.parse(sessionStorage.getItem('discountValue'));
    let finalPayment = Math.round(totalCart+shipping-discount);
    document.getElementById("finalPayment").innerHTML=finalPayment;
    //Math.random() function used to get a random 5 digit number
    document.getElementById("referenceCode").innerHTML= "RP"+(Math.floor(Math.random()*100000)+9999);
    //All items in sessionStorage are reset to 0, empty or false
    sessionStorage.setItem('customerCart',JSON.stringify([]));
    sessionStorage.setItem('customerTotalVat',JSON.stringify(0));
    sessionStorage.setItem('customerTotal',JSON.stringify(0));
    sessionStorage.setItem('discountPercent',JSON.stringify(0));
    sessionStorage.setItem('discountValue',JSON.stringify(0));
    sessionStorage.setItem('shippingCost',JSON.stringify(0));
    sessionStorage.setItem('appliedDiscount',JSON.stringify(false));
}
//Function to close the final payment confirmation modal and refresh page
function closeModal() {
    $('#modalBack').fadeOut(200);
    location.reload();
}