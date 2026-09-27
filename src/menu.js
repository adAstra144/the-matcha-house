// Dynamically import all item images so Vite handles hashing in production
const imageModules = import.meta.glob('/src/assets/items/**/*.png', { eager: true })

// Build a map of image path -> hashed URL
const imageMap = {}
for (const [path, module] of Object.entries(imageModules)) {
  // Extract filename without extension as key (e.g., "dirty-matcha-latte")
  const fileName = path.split('/').pop().replace(/\.png$/, '')
  imageMap[fileName] = module.default
}

const menuItems = {
    "dirty-matcha-latte": {
        name: "Dirty Matcha Latte",
        prices: [
            { "label": "Regular", amount: "₱255" },
            { "label": "Grande", amount: "₱295" },
            { "label": "Venti", amount: "₱325" },
        ],
        description: "Creamy matcha balanced with a bold espresso finish.",
        image: imageMap["dirty-matcha-latte"],
    },
    "earthday-matcha": {
        name: "Earthday Matcha",
        prices: [
            { "label": "Regular", amount: "₱255" },
            { "label": "Grande", amount: "₱295" },
            { "label": "Venti", amount: "₱315" },
        ],
        description: "A refreshing matcha drink inspired by bright, earthy flavors.",
        image: imageMap["earthday-matcha"],
    },
    "egg-matcha": {
        name: "Egg Matcha",
        prices: [
            { "label": "Regular", amount: "₱235" },
            { "label": "Grande", amount: "₱275" },
        ],
        description: "Velvety matcha with a rich and indulgent twist.",
        image: imageMap["egg-matcha"],
    },
    "iced-matcha-coco": {
        name: "Iced Matcha Coco",
        prices: [
            { "label": "Regular", amount: "₱245" },
            { "label": "Grande", amount: "₱265" },
            { "label": "Venti", amount: "₱295" },
        ],
        description: "Chilled matcha paired with smooth coconut flavor.",
        image: imageMap["iced-matcha-coco"],
    },
    "london-fog-matcha": {
        name: "London Fog Matcha",
        prices: [
            { "label": "Regular", amount: "₱255" },
            { "label": "Grande", amount: "₱295" },
            { "label": "Venti", amount: "₱305" },
        ],
        description: "A fragrant, creamy matcha take on the classic London Fog.",
        image: imageMap["london-fog-matcha"],
    },
    "matcha-latte": {
        name: "Matcha Latte",
        prices: [
            { "label": "Regular", amount: "₱235" },
            { "label": "Grande", amount: "₱275" },
            { "label": "Venti", amount: "₱315" },
        ],
        description: "A smooth, comforting blend of ceremonial-style matcha and milk.",
        image: imageMap["matcha-latte"],
    },
    "matcha-lemonade": {
        name: "Matcha Lemonade",
        prices: [
            { "label": "Regular", amount: "₱235" },
            { "label": "Grande", amount: "₱255" },
            { "label": "Venti", amount: "₱275" },
        ],
        description: "A bright and tangy lemonade with an earthy matcha finish.",
        image: imageMap["matcha-lemonade"],
    },
    usucha: {
        name: "Usucha",
        prices: [
            { "label": "Regular", amount: "₱180" },
            { "label": "Grande", amount: "₱190" },
            { "label": "Venti", amount: "₱230" },
        ],
        description: "Traditional thin matcha, whisked simply to highlight its flavor.",
        image: imageMap["usucha"],
    },
    "iced-coffee-latte": {
        name: "Iced Coffee Latte",
        prices: [
            { label: "Regular", amount: "₱155" },
            { label: "Grande", amount: "₱175" },
            { label: "Venti", amount: "₱195" },
        ],
        description: "A smooth espresso-and-milk classic served over ice.",
        image: imageMap["iced-coffee-latte"],
    },
    "orange-espresso": {
        name: "Orange Espresso",
        prices: [
            { label: "Regular", amount: "₱185" },
            { label: "Grande", amount: "₱215" },
            { label: "Venti", amount: "₱225" },
        ],
        description: "Bright citrus meets a bold espresso shot for a refreshing coffee drink.",
        image: imageMap["orange-espresso"],
    },
    "baristas-drink": {
        name: "Barista's Drink",
        prices: [
            { label: "Regular", amount: "₱220" },
            { label: "Grande", amount: "₱240" },
            { label: "Venti", amount: "₱280" },
        ],
        description: "A rotating coffee creation selected by the barista.",
        image: imageMap["baristas-drink"],
    },
    "banana-latte": {
        name: "Banana Latte",
        prices: [
            { label: "Regular", amount: "₱175" },
            { label: "Grande", amount: "₱195" },
            { label: "Venti", amount: "₱225" },
        ],
        description: "Creamy banana flavor blended with smooth coffee and milk.",
        image: imageMap["banana-latte"],
    },
    "iced-spanish-latte": {
        name: "Iced Spanish Latte",
        prices: [
            { label: "Regular", amount: "₱165" },
            { label: "Grande", amount: "₱185" },
            { label: "Venti", amount: "₱225" },
        ],
        description: "Espresso and milk sweetened with a rich, creamy finish over ice.",
        image: imageMap["iced-spanish-latte"],
    },
    "einspanner-coffee-latte": {
        name: "Einspanner Coffee Latte",
        prices: [
            { label: "Regular", amount: "₱195" },
            { label: "Grande", amount: "₱215" },
            { label: "Venti", amount: "₱245" },
        ],
        description: "A coffee latte topped with a generous layer of soft cream.",
        image: imageMap["einspanner-coffee-latte"],
    },
    "iced-mocha": {
        name: "Iced Mocha",
        prices: [
            { label: "Regular", amount: "₱175" },
            { label: "Grande", amount: "₱195" },
            { label: "Venti", amount: "₱225" },
        ],
        description: "Chocolate, espresso, and milk served cold for a decadent pick-me-up.",
        image: imageMap["iced-mocha"],
    },
    "iced-salted-coffee": {
        name: "Iced Salted Coffee",
        prices: [
            { label: "Regular", amount: "₱175" },
            { label: "Grande", amount: "₱195" },
            { "label": "Venti", amount: "₱215" },
        ],
        description: "Chilled coffee with a lightly salted, creamy finish.",
        image: imageMap["iced-salted-coffee"],
    },
    "iced-americano": {
        name: "Iced Americano",
        prices: [
            { label: "Regular", amount: "₱125" },
            { label: "Grande", amount: "₱155" },
            { label: "Venti", amount: "₱175" },
        ],
        description: "Bold espresso diluted with chilled water and ice.",
        image: imageMap["iced-americano"],
    },
    "signature-tmh-matcha": {
        name: "Signature TMH Matcha",
        prices: [
            { label: "Regular", amount: "₱265" },
            { label: "Grande", amount: "₱295" },
            { label: "Venti", amount: "₱335" },
        ],
        description: "The Matcha House's signature creamy matcha creation.",
        image: imageMap["signature-tmh-matcha"],
    },
    "ube-matcha-latte": {
        name: "Ube Matcha Latte",
        prices: [
            { label: "Regular", amount: "₱255" },
            { label: "Grande", amount: "₱285" },
            { label: "Venti", amount: "₱305" },
        ],
        description: "Earthy matcha paired with the mellow sweetness of ube.",
        image: imageMap["ube-matcha-latte"],
    },
    "cheese-cloud-matcha": {
        name: "Cheese Cloud Matcha",
        prices: [
            { label: "Regular", amount: "₱275" },
            { label: "Grande", amount: "₱315" },
            { label: "Venti", amount: "₱335" },
        ],
        description: "Smooth matcha topped with a rich, airy cheese foam.",
        image: imageMap["cheese-cloud-matcha"],
    },
    "banana-pudding-matcha": {
        name: "Banana Pudding Matcha",
        prices: [
            { label: "Regular", amount: "₱295" },
            { label: "Grande", amount: "₱335" },
            { label: "Venti", amount: "₱355" },
        ],
        description: "Creamy matcha inspired by the comforting flavor of banana pudding.",
        image: imageMap["banana-pudding-matcha"],
    },
    "mango-matcha-latte": {
        name: "Mango Matcha Latte",
        prices: [
            { label: "Regular", amount: "₱255" },
            { label: "Grande", amount: "₱295" },
            { label: "Venti", amount: "₱305" },
        ],
        description: "A bright mango twist on a smooth iced matcha latte.",
        image: imageMap["mango-matcha-latte"],
    },
    "einspanner-matcha-latte": {
        name: "Einspanner Matcha Latte",
        prices: [
            { label: "Regular", amount: "₱275" },
            { label: "Grande", amount: "₱305" },
            { label: "Venti", amount: "₱335" },
        ],
        description: "A creamy matcha latte finished with a generous cloud of cream.",
        image: imageMap["einspanner-matcha-latte"],
    },
    "strawberry-matcha-latte": {
        name: "Strawberry Matcha Latte",
        prices: [
            { label: "Regular", amount: "₱255" },
            { label: "Grande", amount: "₱295" },
            { label: "Venti", amount: "₱325" },
        ],
        description: "Sweet strawberry and earthy matcha layered with milk.",
        image: imageMap["strawberry-matcha-latte"],
    },
    "banana-matcha": {
        name: "Banana Matcha",
        prices: [
            { label: "Regular", amount: "₱255" },
            { label: "Grande", amount: "₱295" },
            { label: "Venti", amount: "₱325" },
        ],
        description: "A mellow, creamy banana-and-matcha blend.",
        image: imageMap["banana-matcha"],
    },
    "chocolate-coconut-cloud": {
        name: "Chocolate Coconut Cloud",
        prices: [
            { label: "Regular", amount: "₱155" },
            { label: "Grande", amount: "₱185" },
            { label: "Venti", amount: "₱205" },
        ],
        description: "Chocolate and coconut layered into a rich, creamy cloud drink.",
        image: imageMap["chocolate-coconut-cloud"],
    },
    "coconut-matcha-cloud": {
        name: "Coconut Matcha Cloud",
        prices: [
            { label: "Regular", amount: "₱255" },
            { label: "Grande", amount: "₱275" },
            { label: "Venti", amount: "₱305" },
        ],
        description: "Earthy matcha topped with a refreshing coconut cream cloud.",
        image: imageMap["coconut-matcha-cloud"],
    },
    "espresso-cloud-tiramisu-latte": {
        name: "Espresso Cloud Tiramisu Latte",
        prices: [
            { label: "Regular", amount: "₱205" },
            { label: "Grande", amount: "₱235" },
            { label: "Venti", amount: "₱265" },
        ],
        description: "Espresso and tiramisu-inspired flavors finished with a soft cloud topping.",
        image: imageMap["espresso-cloud-tiramisu-latte"],
    },
    "espresso-coconut-cloud": {
        name: "Espresso Coconut Cloud",
        prices: [
            { label: "Regular", amount: "₱195" },
            { label: "Grande", amount: "₱205" },
            { label: "Venti", amount: "₱225" },
        ],
        description: "Bold espresso balanced by a smooth coconut cream cloud.",
        image: imageMap["espresso-coconut-cloud"],
    },
    "espresso-cold-foam": {
        name: "Espresso Cold Foam",
        prices: [
            { label: "Regular", amount: "₱155" },
            { label: "Grande", amount: "₱175" },
            { label: "Venti", amount: "₱205" },
        ],
        description: "Iced espresso finished with a silky layer of cold foam.",
        image: imageMap["espresso-cold-foam"],
    },
    "hojicha-coconut-cloud": {
        name: "Hojicha Coconut Cloud",
        prices: [
            { label: "Regular", amount: "₱255" },
            { label: "Grande", amount: "₱275" },
            { label: "Venti", amount: "₱305" },
        ],
        description: "Roasty hojicha paired with a light, creamy coconut cloud.",
        image: imageMap["hojicha-coconut-cloud"],
    },
    "jasmine-matcha-cloud": {
        name: "Jasmine Matcha Cloud",
        prices: [
            { label: "Regular", amount: "₱255" },
            { label: "Grande", amount: "₱275" },
            { label: "Venti", amount: "₱305" },
        ],
        description: "Floral jasmine notes and matcha under a delicate cream cloud.",
        image: imageMap["jasmine-matcha-cloud"],
    },
    "matcha-cloud-tiramisu-latte": {
        name: "Matcha Cloud Tiramisu Latte",
        prices: [
            { label: "Regular", amount: "₱295" },
            { label: "Grande", amount: "₱335" },
            { label: "Venti", amount: "₱355" },
        ],
        description: "A creamy matcha latte with tiramisu-inspired layers and a cloud topping.",
        image: imageMap["matcha-cloud-tiramisu-latte"],
    },
    "strawberry-matcha-coconut-cloud": {
        name: "Strawberry Matcha Coconut Cloud",
        prices: [
            { label: "Regular", amount: "₱265" },
            { label: "Grande", amount: "₱295" },
            { label: "Venti", amount: "₱315" },
        ],
        description: "Strawberry and matcha brought together with a coconut cream cloud.",
        image: imageMap["strawberry-matcha-coconut-cloud"],
    },
    "coconut-coffee": {
        name: "Coconut Coffee",
        prices: [
            { label: "Regular", amount: "₱185" },
            { label: "Grande", amount: "₱205" },
            { label: "Venti", amount: "₱235" },
        ],
        description: "Vietnamese-style coffee with sweet coconut cream and condensed milk.",
        image: imageMap["coconut-coffee"],
    },
    "dragon-glow-smoothie": {
        name: "Dragon Glow Smoothie",
        prices: [
            { label: "Grande", amount: "₱335" },
        ],
        description: "A vibrant dragon fruit smoothie with a tropical glow.",
        image: imageMap["dragon-glow-smoothie"],
    },
    "egg-coffee": {
        name: "Egg Coffee",
        prices: [
            { label: "Regular", amount: "₱195" },
            { label: "Grande", amount: "₱215" },
        ],
        description: "Classic Vietnamese egg coffee with a rich, velvety egg cream topping.",
        image: imageMap["egg-coffee"],
    },
    "iced-tmh-chocolate": {
        name: "Iced TMH Chocolate",
        prices: [
            { label: "Regular", amount: "₱145" },
            { label: "Grande", amount: "₱155" },
            { label: "Venti", amount: "₱175" },
        ],
        description: "Rich chocolate drink served over ice, TMH style.",
        image: imageMap["iced-tmh-chocolate"],
    },
    "tmh-pink-drink": {
        name: "TMH Pink Drink",
        prices: [
            { label: "Regular", amount: "₱155" },
            { label: "Grande", amount: "₱175" },
            { label: "Venti", amount: "₱185" },
        ],
        description: "A refreshing pink fruit blend with a creamy finish.",
        image: imageMap["tmh-pink-drink"],
    },
    "tmh-triple-chocolate-frappe": {
        name: "TMH Triple Chocolate Frappe",
        prices: [
            { label: "Grande", amount: "₱265" },
        ],
        description: "Triple-layered chocolate frappe blended to perfection.",
        image: imageMap["tmh-triple-chocolate-frappe"],
    },
    "tra-tac": {
        name: "Trà Tắc",
        prices: [
            { label: "Regular", amount: "₱155" },
            { label: "Grande", amount: "₱185" },
            { label: "Venti", amount: "₱205" },
        ],
        description: "Vietnamese kumquat tea — tart, sweet, and refreshing.",
        image: imageMap["tra-tac"],
    },
    "beef-enoki": {
        name: "Beef Enoki",
        prices: [
            { label: "Price", amount: "₱285" },
        ],
        description: "Tender beef slices with enoki mushrooms in a savory glaze.",
        image: imageMap["beef-enoki"],
    },
    "cheesey-garlic-sourdough": {
        name: "Cheesey Garlic Sourdough",
        prices: [
            { label: "Price", amount: "₱135" },
        ],
        description: "Toasted sourdough loaded with garlic butter and melted cheese.",
        image: imageMap["cheesey-garlic-sourdough"],
    },
    "chicken-karaage": {
        name: "Chicken Karaage",
        prices: [
            { label: "Price", amount: "₱235" },
        ],
        description: "Japanese-style fried chicken — crispy outside, juicy inside.",
        image: imageMap["chicken-karaage"],
    },
    "chizu-bacon-fries": {
        name: "Chizu Bacon Fries",
        prices: [
            { label: "Price", amount: "₱185" },
        ],
        description: "Crispy fries topped with cheese sauce and crispy bacon bits.",
        image: imageMap["chizu-bacon-fries"],
    },
    "cream-cheese-bagel": {
        name: "Cream Cheese Bagel",
        prices: [
            { label: "Price", amount: "₱195" },
        ],
        description: "Freshly toasted bagel with smooth, creamy cream cheese spread.",
        image: imageMap["cream-cheese-bagel"],
    },
    "fluffy-egg-sourdough-melt": {
        name: "Fluffy Egg Sourdough Melt",
        prices: [
            { label: "Price", amount: "₱175" },
        ],
        description: "Fluffy scrambled eggs with cheese on toasted sourdough.",
        image: imageMap["fluffy-egg-sourdough-melt"],
    },
    "gokujo-spicy-burger-fries": {
        name: "Gokujo Spicy Burger With Fries",
        prices: [
            { label: "Price", amount: "₱395"},
        ],
        description: "Juicy spicy burger patty with bold seasoning, served with crispy fries.",
        image: imageMap["gokujo-spicy-burger-fries"],
    },
    "gyudon": {
        name: "Gyudon",
        prices: [
            { label: "Price", amount: "₱265" },
        ],
        description: "Japanese beef bowl with sweet-savory onions over steamed rice.",
        image: imageMap["gyudon"],
    },
    "pizza-bagel": {
        name: "Pizza Bagel",
        prices: [
            { label: "Price", amount: "₱225" },
        ],
        description: "Bagel topped with marinara, melted mozzarella, and pepperoni.",
        image: imageMap["pizza-bagel"],
    },
    "steak-garlic-soy-rice": {
        name: "Steak Garlic Soy Rice",
        prices: [
            { label: "Price", amount: "₱890" },
        ],
        description: "Sear-grilled steak with garlic soy glaze over Japanese rice.",
        image: imageMap["steak-garlic-soy-rice"],
    },
    "bacon-alfredo-pasta-steak": {
        name: "Bacon Alfredo Pasta Steak",
        prices: [
            { label: "Price", amount: "₱990" },
        ],
        description: "Creamy bacon alfredo pasta topped with a perfectly seared steak.",
        image: imageMap["bacon-alfredo-pasta-steak"],
    },
    "bacon-alfredo-pasta": {
        name: "Bacon Alfredo Pasta",
        prices: [
          { label: "Price", amount: "₱225" },
        ],
        description: "Rich alfredo sauce tossed with penne pasta and smoky bacon bits.",
        image: imageMap["bacon-alfredo-pasta"],
    },
    "chicken-cobb-salad-wrap": {
        name: "Chicken Cobb Salad Wrap",
        prices: [
            { label: "Price", amount: "₱195" },
        ],
        description: "Grilled chicken, bacon, egg, and fresh greens wrapped in a soft tortilla.",
        image: imageMap["chicken-cobb-salad-wrap"],
    },
    "penne-pasta-al-telefono": {
        name: "Penne Pasta Al Telefono",
        prices: [
            { label: "Price", amount: "₱225" },
        ],
        description: "Classic penne in a vibrant tomato-basil sauce, finished with melted mozzarella.",
        image: imageMap["penne-pasta-al-telefono"],
    },
    "penne-pasta-steak": {
        name: "Penne Pasta Steak",
        prices: [
            { label: "Price", amount: "₱990" },
        ],
        description: "Hearty penne pasta in savory sauce crowned with a tender grilled steak.",
        image: imageMap["penne-pasta-steak"],
    },
    "tuna-pasta-steak": {
        name: "Tuna Pasta Steak",
        prices: [
            { label: "Price", amount: "₱970" },
        ],
        description: "Flavorful tuna pasta paired with a succulent grilled steak.",
        image: imageMap["tuna-pasta-steak"],
    },
    "tuna-pasta": {
        name: "Tuna Pasta",
        prices: [
            { label: "Price", amount: "₱195" },
        ],
        description: "Tender tuna tossed with pasta in a light, savory sauce.",
        image: imageMap["tuna-pasta"],
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
