//The inventory array for all products in the virtual shop
let cakeList = [{
        cake: 'Berry Sponge',
        price: 230,
        flavour: 'Strawberry and blackberry',
        allergens: 'milk and eggs',
        vegan: false,
        new: false,
        imageSrc: 'images/berrySponge.jpg',
        quantity:1
    },
    {
        cake: 'Vanilla forest Cake',
        price: 400,
        flavour: 'Vanilla and raspberry',
        allergens: 'milk, eggs, and gluten',
        vegan: false,
        new: false,
        imageSrc: 'images/berryVanilla.jpg',
        quantity:1
    },
    {
        cake: 'Caramel Bee',
        price: 250,
        flavour: 'Caramel and toffee',
        allergens: 'milk, eggs and nuts',
        vegan: false,
        new: false,
        imageSrc: 'images/caramelBee.jpg',
        quantity:1
    },
    {
        cake: 'Caramel Berry',
        price: 350,
        flavour: 'Caramel and berry mix',
        allergens: 'nuts, and gluten',
        vegan: true,
        new: true,
        imageSrc: 'images/caramelBerry.jpg',
        quantity:1
    },
    {
        cake: 'Cherry Chocolate',
        price: 60,
        flavour: 'Vanilla and cocoa',
        allergens: 'nuts',
        vegan: true,
        new: false,
        imageSrc: 'images/cherryCream.jpg',
        quantity:1
    },
    {
        cake: 'Chocolate Brownie',
        price: 70,
        flavour: 'Chocolate and rum',
        allergens: 'eggs',
        vegan: false,
        new: true,
        imageSrc: 'images/chocolateBrownie.jpg',
        quantity: 0
    },
    {
        cake: 'Chocolate cheesecake',
        price: 60,
        flavour: 'Chocolate and orange',
        allergens: 'milk and eggs',
        vegan: false,
        new: false,
        imageSrc: 'images/chocolatePudding.jpg',
        quantity: 0
    },
    {
        cake: 'Fruit Sponge',
        price: 280,
        flavour: 'Apple and cinnamon',
        allergens: 'gluten',
        vegan: true,
        new: false,
        imageSrc: 'images/fruitCake.jpg',
        quantity: 0
    },
    {
        cake: 'Raspberry Muffin',
        price: 50,
        flavour: 'Raspberry and raisin',
        allergens: 'nuts',
        vegan: true,
        new: false,
        imageSrc: 'images/raspberryCupcake.jpg',
        quantity: 0
    },
    {
        cake: 'Strawberry Tart',
        price: 320,
        flavour: 'Strawberry and Condensed milk',
        allergens: 'milk and eggs',
        vegan: false,
        new: true,
        imageSrc: 'images/strawberryTart.jpg',
        quantity: 0
    }
]
//Declaration of the cart variable as an empty array
let Cart = [];
//Function called when body element loads on catalogue page
function loadItems() {
    let i = 0;
    //function itterates through the complete inventory array and creates elements which are appended to the html which show properties of each index in the array
    cakeList.forEach(function () {
        let container = document.createElement("div");
        let name = document.createElement("h2");
        let image = document.createElement("img")
        let add = document.createElement("button")
        let link = document.createElement("a")
        //property: name is set for each index
        name.innerHTML = cakeList[i].cake;
        name.setAttribute('class', 'fs-5 fancy my-2')
        //innerHTML for the button element is set
        add.innerHTML = 'Add to cart'
        //src for the image element is set for each index in the array
        image.setAttribute('src', cakeList[i].imageSrc);
        image.setAttribute('class', 'img-thumbnail catalogueImage');
        link.setAttribute('type', 'button');
        //Button elements are set attributes which correspond to their index values 
        link.setAttribute('onclick', 'openModal(' + i + ')');
        add.setAttribute('onclick', 'addToCart(' + i + ')');
        add.setAttribute('class', 'btn my-2');
        container.setAttribute('class', 'col-md-6 col-lg-4 col-xl-3 card')
        //The variable showing the index value is incremented for the next itteration
        i += 1;
        link.appendChild(image);
        container.appendChild(name);
        container.appendChild(link);
        container.appendChild(add);
        //Element is appended to the html
        document.getElementById('catalogue').appendChild(container);
    })
}
//Function will show() modal and change the innerHTML of the elements to reflect the properties of the corresponding index in the inventory array
function openModal(i) {
    $('#modalBack').fadeIn(200);
    let cake = document.getElementById('modalTitle');
    let image = document.getElementById('modalImage');
    let info = document.getElementById('modalInfo');
    let flavour = document.getElementById('modalFlavour');
    let button = document.getElementById('modalBtnAddToCart');
    let cost = document.getElementById('modalPrice');
    //value of the name element is set to the index of the item in the array
    cake.setAttribute("value",i);
    //Button element references the index of the array in the function name, this will find the index and push it to the customer cart array
    button.setAttribute("onclick",'addToCartModal('+i+')');
    cost.innerHTML = (cakeList[i].price);
    flavour.innerHTML = (cakeList[i].flavour);
    info.innerHTML = (cakeList[i].allergens);
    image.src = (cakeList[i].imageSrc);
    cake.innerHTML = (cakeList[i].cake);
}
//Function will hide the modal on close
function closeModal() {
    $('#modalBack').fadeOut(200);
}
//Function will run once html has loaded and will check if there is a customerCart in sessionStorage and will create one if not
$(function () {
    if (sessionStorage.getItem('hasCustomerCart')===null){
        sessionStorage.setItem('customerCart',JSON.stringify(Cart));
        sessionStorage.setItem('hasCustomerCart', true);
    }
    }) 
    //Function will push a new object to the customer cart array, and set it to sessionStorage, it will also itterate through all objects in the array and add together, and increase by 14%, all the 'cost' properties of the objects to show in an alert
function addToCart(i) {
    let cart = JSON.parse(sessionStorage.getItem('customerCart'));
    let item = cakeList[i];
    item.quantity=1;
    cart.push(item);
    sessionStorage.setItem('customerCart',JSON.stringify(cart));
    let totalCostOfCart=0;
    let j=0;
    cart.forEach(function (){
        let numberOfType=cart[j].quantity;
        let pricing=Number(cart[j].price);
        j+=1
        let totalCostOfType=pricing*numberOfType;
        totalCostOfCart+=totalCostOfType;
        console.log(pricing)
    });
    let totalCostPlusVat = totalCostOfCart*0.14+totalCostOfCart;
    !alert("You have added "+item.quantity+' '+item.cake+' to your cart! '+
    "Your total is now R"+totalCostPlusVat+"(vat included)")
}
//Function will fetch the number value of the input element, change the object 'quantity' property and push a new object to the customer cart array. Set it to sessionStorage, it will then itterate through all objects in the array and add them together taking into account the different quantities. Then increase by 14%, all the 'cost' properties of the objects to show in an alert.
function addToCartModal(i){
    let cart = JSON.parse(sessionStorage.getItem('customerCart'));
    let item = cakeList[i];
    item.quantity=Number(document.getElementById('modalCakeQuantity').value);
    cart.push(item);
    sessionStorage.setItem('customerCart',JSON.stringify(cart));
    let totalCostOfCart=0;
    let j=0;
    cart.forEach(function (){
        let numberOfType=cart[j].quantity;
        let pricing=Number(cart[j].price);
        j+=1
        let totalCostOfType=pricing*numberOfType;
        totalCostOfCart+=totalCostOfType;
    });
    let totalCostPlusVat = totalCostOfCart*0.14+totalCostOfCart;
    !alert("You have added "+item.quantity+' '+item.cake+' to your cart! '+
    "Your total is now R"+totalCostPlusVat+"(vat included)")
    location.reload()
}