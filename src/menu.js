const menuItems = {
    "dirty-matcha-latte": {
        name: "Dirty Matcha Latte",
        prices: [
            { "label": "Regular", amount: "₱255" },
            { "label": "Grande", amount: "₱295" },
            { "label": "Venti", amount: "₱325" },
        ],
        description: "Creamy matcha balanced with a bold espresso finish.",
        image: "/src/assets/items/matcha/dirty-matcha-latte.png",
    },
    "earthday-matcha": {
        name: "Earthday Matcha",
        prices: [
            { "label": "Regular", amount: "₱255" },
            { "label": "Grande", amount: "₱295" },
            { "label": "Venti", amount: "₱315" },
        ],
        description: "A refreshing matcha drink inspired by bright, earthy flavors.",
        image: "/src/assets/items/matcha/earthday-matcha.png",
    },
    "egg-matcha": {
        name: "Egg Matcha",
        prices: [
            { "label": "Regular", amount: "₱235" },
            { "label": "Grande", amount: "₱275" },
        ],
        description: "Velvety matcha with a rich and indulgent twist.",
        image: "/src/assets/items/matcha/egg-matcha.png",
    },
    "iced-matcha-coco": {
        name: "Iced Matcha Coco",
        prices: [
            { "label": "Regular", amount: "₱245" },
            { "label": "Grande", amount: "₱265" },
            { "label": "Venti", amount: "₱295" },
        ],
        description: "Chilled matcha paired with smooth coconut flavor.",
        image: "/src/assets/items/matcha/iced-matcha-coco.png",
    },
    "london-fog-matcha": {
        name: "London Fog Matcha",
        prices: [
            { "label": "Regular", amount: "₱255" },
            { "label": "Grande", amount: "₱295" },
            { "label": "Venti", amount: "₱305" },
        ],
        description: "A fragrant, creamy matcha take on the classic London Fog.",
        image: "/src/assets/items/matcha/london-fog-matcha.png",
    },
    "matcha-latte": {
        name: "Matcha Latte",
        prices: [
            { "label": "Regular", amount: "₱235" },
            { "label": "Grande", amount: "₱275" },
            { "label": "Venti", amount: "₱315" },
        ],
        description: "A smooth, comforting blend of ceremonial-style matcha and milk.",
        image: "/src/assets/items/matcha/matcha-latte.png",
    },
    "matcha-lemonade": {
        name: "Matcha Lemonade",
        prices: [
            { "label": "Regular", amount: "₱235" },
            { "label": "Grande", amount: "₱255" },
            { "label": "Venti", amount: "₱275" },
        ],
        description: "A bright and tangy lemonade with an earthy matcha finish.",
        image: "/src/assets/items/matcha/matcha-lemonade.png",
    },
    "iced-coffee-latte": {
        name: "Iced Coffee Latte",
        prices: [
            { label: "Regular", amount: "₱155" },
            { label: "Grande", amount: "₱175" },
            { label: "Venti", amount: "₱195" },
        ],
        description: "A smooth espresso-and-milk classic served over ice.",
        image: "/src/assets/items/coffee/iced-coffee-latte.png",
    },
    "orange-espresso": {
        name: "Orange Espresso",
        prices: [
            { label: "Regular", amount: "₱185" },
            { label: "Grande", amount: "₱215" },
            { label: "Venti", amount: "₱225" },
        ],
        description: "Bright citrus meets a bold espresso shot for a refreshing coffee drink.",
        image: "/src/assets/items/coffee/orange-espresso.png",
    },
    "baristas-drink": {
        name: "Barista's Drink",
        prices: [
            { label: "Regular", amount: "₱220" },
            { label: "Grande", amount: "₱240" },
            { label: "Venti", amount: "₱280" },
        ],
        description: "A rotating coffee creation selected by the barista.",
        image: "/src/assets/items/coffee/baristas-drink.png",
    },
    "banana-latte": {
        name: "Banana Latte",
        prices: [
            { label: "Regular", amount: "₱175" },
            { label: "Grande", amount: "₱195" },
            { label: "Venti", amount: "₱225" },
        ],
        description: "Creamy banana flavor blended with smooth coffee and milk.",
        image: "/src/assets/items/coffee/banana-latte.png",
    },
    "iced-spanish-latte": {
        name: "Iced Spanish Latte",
        prices: [
            { label: "Regular", amount: "₱165" },
            { label: "Grande", amount: "₱185" },
            { label: "Venti", amount: "₱225" },
        ],
        description: "Espresso and milk sweetened with a rich, creamy finish over ice.",
        image: "/src/assets/items/coffee/iced-spanish-latte.png",
    },
    "einspanner-coffee-latte": {
        name: "Einspanner Coffee Latte",
        prices: [
            { label: "Regular", amount: "₱195" },
            { label: "Grande", amount: "₱215" },
            { label: "Venti", amount: "₱245" },
        ],
        description: "A coffee latte topped with a generous layer of soft cream.",
        image: "/src/assets/items/coffee/Einspanner-coffee-latte.png",
    },
    "iced-mocha": {
        name: "Iced Mocha",
        prices: [
            { label: "Regular", amount: "₱175" },
            { label: "Grande", amount: "₱195" },
            { label: "Venti", amount: "₱225" },
        ],
        description: "Chocolate, espresso, and milk served cold for a decadent pick-me-up.",
        image: "/src/assets/items/coffee/iced-mocha.png",
    },
    "iced-salted-coffee": {
        name: "Iced Salted Coffee",
        prices: [
            { label: "Regular", amount: "₱175" },
            { label: "Grande", amount: "₱195" },
            { label: "Venti", amount: "₱215" },
        ],
        description: "Chilled coffee with a lightly salted, creamy finish.",
        image: "/src/assets/items/coffee/iced-salted-coffee.png",
    },
    "iced-americano": {
        name: "Iced Americano",
        prices: [
            { label: "Regular", amount: "₱125" },
            { label: "Grande", amount: "₱155" },
            { label: "Venti", amount: "₱175" },
        ],
        description: "Bold espresso diluted with chilled water and ice.",
        image: "/src/assets/items/coffee/iced-americano.png",
    },
    "signature-tmh-matcha": {
        name: "Signature TMH Matcha",
        prices: [
            { label: "Regular", amount: "₱265" },
            { label: "Grande", amount: "₱295" },
            { label: "Venti", amount: "₱335" },
        ],
        description: "The Matcha House's signature creamy matcha creation.",
        image: "/src/assets/items/matcha-sig/signature-tmh-matcha.png",
    },
    "ube-matcha-latte": {
        name: "Ube Matcha Latte",
        prices: [
            { label: "Regular", amount: "₱255" },
            { label: "Grande", amount: "₱285" },
            { label: "Venti", amount: "₱305" },
        ],
        description: "Earthy matcha paired with the mellow sweetness of ube.",
        image: "/src/assets/items/matcha-sig/ube-matcha-latte.png",
    },
    "cheese-cloud-matcha": {
        name: "Cheese Cloud Matcha",
        prices: [
            { label: "Regular", amount: "₱275" },
            { label: "Grande", amount: "₱315" },
            { label: "Venti", amount: "₱335" },
        ],
        description: "Smooth matcha topped with a rich, airy cheese foam.",
        image: "/src/assets/items/matcha-sig/cheese-cloud-matcha.png",
    },
    "banana-pudding-matcha": {
        name: "Banana Pudding Matcha",
        prices: [
            { label: "Regular", amount: "₱295" },
            { label: "Grande", amount: "₱335" },
            { label: "Venti", amount: "₱355" },
        ],
        description: "Creamy matcha inspired by the comforting flavor of banana pudding.",
        image: "/src/assets/items/matcha-sig/banana-pudding-matcha.png",
    },
    "mango-matcha-latte": {
        name: "Mango Matcha Latte",
        prices: [
            { label: "Regular", amount: "₱255" },
            { label: "Grande", amount: "₱295" },
            { label: "Venti", amount: "₱305" },
        ],
        description: "A bright mango twist on a smooth iced matcha latte.",
        image: "/src/assets/items/matcha-sig/mango-matcha-latte.png",
    },
    "einspanner-matcha-latte": {
        name: "Einspanner Matcha Latte",
        prices: [
            { label: "Regular", amount: "₱275" },
            { label: "Grande", amount: "₱305" },
            { label: "Venti", amount: "₱335" },
        ],
        description: "A creamy matcha latte finished with a generous cloud of cream.",
        image: "/src/assets/items/matcha-sig/einspanner-matcha-latte.png",
    },
    "strawberry-matcha-latte": {
        name: "Strawberry Matcha Latte",
        prices: [
            { label: "Regular", amount: "₱255" },
            { label: "Grande", amount: "₱295" },
            { label: "Venti", amount: "₱325" },
        ],
        description: "Sweet strawberry and earthy matcha layered with milk.",
        image: "/src/assets/items/matcha-sig/strawberry-matcha-latte.png",
    },
    "coconut-matcha-cloud": {
        name: "Coconut Matcha Cloud",
        prices: [
            { label: "Regular", amount: "₱255" },
            { label: "Grande", amount: "₱275" },
            { label: "Venti", amount: "₱305" },
        ],
        description: "Refreshing matcha crowned with a light coconut cream cloud.",
        image: "/src/assets/items/matcha-sig/coconut-matcha-cloud.png",
    },
    "banana-matcha": {
        name: "Banana Matcha",
        prices: [
            { label: "Regular", amount: "₱255" },
            { label: "Grande", amount: "₱295" },
            { label: "Venti", amount: "₱325" },
        ],
        description: "A mellow, creamy banana-and-matcha blend.",
        image: "/src/assets/items/matcha-sig/banana-matcha.png",
    },
    usucha: {
        name: "Usucha",
        prices: [
            { "label": "Regular", amount: "₱180" },
            { "label": "Grande", amount: "₱190" },
            { "label": "Venti", amount: "₱230" },
        ],
        description: "Traditional thin matcha, whisked simply to highlight its flavor.",
        image: "/src/assets/items/matcha/usucha.png",
    },
};

const dialog = document.querySelector(".item-modal");
const closeButton = document.querySelector(".modal-close");
const modalImage = document.querySelector(".modal-image");
const modalName = document.querySelector("#modal-name");
const modalPrices = document.querySelector(".modal-prices");
const modalDescription = document.querySelector(".modal-description");

document.querySelectorAll(".item").forEach((button) => {
    button.addEventListener("click", () => {
        const item = menuItems[button.dataset.item];

        modalImage.src = item.image;
        modalImage.alt = item.name;
        modalName.textContent = item.name;
        modalPrices.innerHTML = item.prices
            .map((price) => `
                <div class="modal-price">
                    <span>${price.label}</span>
                    <strong>${price.amount}</strong>
                </div>
            `)
            .join("");
      modalDescription.textContent = item.description;

        dialog.showModal();
    });
});

closeButton.addEventListener("click", () => dialog.close());

dialog.addEventListener("click", (event) => {
    if (event.target === dialog) {
        dialog.close();
    }
});
