
let cartIcon = document.querySelector("#cart-icon");
let cart = document.querySelector(".cart");
let closeCart = document.querySelector("#close-cart");


cartIcon.onclick = () => {
    cart.classList.toggle("active");
};
closeCart.onclick = () => {
    cart.classList.remove("active");
};


if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready);
} else {
    ready();
}

function ready() {
    clearCart();

    let removeCartButtons = document.getElementsByClassName("cart-remove");
    for (let button of removeCartButtons) {
        button.addEventListener("click", removeCartItem);
    }

    let quantityInputs = document.getElementsByClassName("cart-quantity");
    for (let input of quantityInputs) {
        input.addEventListener("change", quantityChanged);
    }

    let addCartButtons = document.getElementsByClassName("add-cart");
    for (let button of addCartButtons) {
        button.addEventListener("click", addToCartClicked);
    }
}

// Reset koszyka po odświeżeniu strony
function clearCart() {
    let cartContent = document.getElementsByClassName("cart-content")[0];
    cartContent.innerHTML = '';
    document.getElementsByClassName("total-price")[0].innerText = "Total Items: 0";
    cartIcon.setAttribute('data-quantity', '0');
}

// Obsługa dodawania produktu do koszyka
function addToCartClicked(event) {
    let button = event.target;
    let productBox = button.closest(".product-box");
    let title = productBox.getElementsByClassName("product-title")[0].innerText;
    let productImg = productBox.getElementsByClassName("product-img")[0].src;

    addProductToCart(title, productImg);
    updatetotal();
}

// Dodanie produktu do koszyka (bez ceny, tylko ilość)
function addProductToCart(title, productImg) {
    let cartContent = document.getElementsByClassName("cart-content")[0];
    let cartItems = cartContent.getElementsByClassName("cart-box");

    for (let cartItem of cartItems) {
        let cartItemTitle = cartItem.getElementsByClassName("cart-product-title")[0].innerText;
        if (cartItemTitle === title) {
            let quantityElement = cartItem.getElementsByClassName("cart-quantity")[0];
            quantityElement.value = parseInt(quantityElement.value) + 1;
            updatetotal();
            return;
        }
    }

    let cartBox = document.createElement("div");
    cartBox.classList.add("cart-box");

    cartBox.innerHTML = `
        <img src="${productImg}" class="cart-image">
        <div class="detail-box">
            <div class="cart-product-title">${title}</div>
            <input type="number" value="1" class="cart-quantity">
        </div>
        <i class="bx bxs-trash cart-remove"></i>
    `;

    cartContent.appendChild(cartBox);

    cartBox.getElementsByClassName("cart-remove")[0].addEventListener("click", removeCartItem);
    cartBox.getElementsByClassName("cart-quantity")[0].addEventListener("change", quantityChanged);
}

// Usunięcie przedmiotu z koszyka
function removeCartItem(event) {
    event.target.parentElement.remove();
    updatetotal();
}

// Zmiana ilości produktów
function quantityChanged(event) {
    let input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updatetotal();
}

// Aktualizacja liczby produktów w koszyku + ikona koszyka
function updatetotal() {
    let cartContent = document.getElementsByClassName("cart-content")[0];
    let cartBoxes = cartContent.getElementsByClassName("cart-box");
    let totalItems = 0;

    for (let cartBox of cartBoxes) {
        let quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
        totalItems += parseInt(quantityElement.value);
    }

    document.getElementsByClassName("total-price")[0].innerText = `Total Items: ${totalItems}`;

    
    cartIcon.setAttribute('data-quantity', totalItems);
}

(function() {
    emailjs.init("IIDSJsi83TuCv7hc1"); 
})();

document.getElementById("contact-form").addEventListener("submit", function(event) {
    event.preventDefault();

    emailjs.send("service_ot4m48r", "template_rsuun3c", {
        from_name: document.getElementById("name").value,
        from_email: document.getElementById("email").value,
        message: document.getElementById("message").value
    }).then(function(response) {
        alert("Wiadomość wysłana!");
    }, function(error) {
        alert("Błąd: " + JSON.stringify(error));
    });
});
