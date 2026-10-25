/* ---------- Price Helpers ---------- */

// Creates a price object for drinks with Regular, Grande, and optional Venti sizes.
// The keys become the size labels displayed in the item details modal.
const sized = (regular, grande, venti) => ({
    Regular: regular,
    Grande: grande,
    ...(venti && { Venti: venti }),
})

// Creates a price object for items available only in Grande.
const grandeOnly = (amount) => ({
    Grande: amount,
})

// Creates a price object for items with a single price and no size selection.
const single = (amount) => ({
    Price: amount,
})


/* ---------- Menu Item Factory ---------- */

// Creates a standardized menu item object.
// The ID must match the item's image filename, without the .png extension.
const item = (id, name, prices, description) => ({
    id,
    name,
    prices,
    description,
})


/* ---------- Menu Categories ---------- */

// Each category contains an ID, a display title, and an array of menu items.
// The category ID is also used for sidebar navigation and section headings.

export const categories = [
    /* ---------- Matcha Series Drinks ---------- */

    {
        id: 'matcha-series',
        title: 'Matcha Series Drinks',
        items: [
            item(
                'dirty-matcha-latte',
                'Dirty Matcha Latte',
                sized(255, 295, 325),
                'Creamy matcha balanced with a bold espresso finish.'
            ),
            item(
                'earthday-matcha',
                'Earthday Matcha',
                sized(255, 295, 315),
                'A refreshing matcha drink inspired by bright, earthy flavors.'
            ),
            item(
                'egg-matcha',
                'Egg Matcha',
                sized(235, 275),
                'Velvety matcha with a rich and indulgent twist.'
            ),
            item(
                'iced-matcha-coco',
                'Iced Matcha Coco',
                sized(245, 265, 295),
                'Chilled matcha paired with smooth coconut flavor.'
            ),
            item(
                'london-fog-matcha',
                'London Fog Matcha',
                sized(255, 295, 305),
                'A fragrant, creamy matcha take on the classic London Fog.'
            ),
            item(
                'matcha-latte',
                'Matcha Latte',
                sized(235, 275, 315),
                'A smooth, comforting blend of ceremonial-style matcha and milk.'
            ),
            item(
                'matcha-lemonade',
                'Matcha Lemonade',
                sized(235, 255, 275),
                'A bright and tangy lemonade with an earthy matcha finish.'
            ),
            item(
                'usucha',
                'Usucha',
                sized(180, 190, 230),
                'Traditional thin matcha, whisked simply to highlight its flavor.'
            ),
        ],
    },


    /* ---------- Signature Coffee Series ---------- */

    {
        id: 'signature-coffee',
        title: 'Signature Coffee Series',
        items: [
            item(
                'iced-coffee-latte',
                'Iced Coffee Latte',
                sized(155, 175, 195),
                'A smooth espresso-and-milk classic served over ice.'
            ),
            item(
                'orange-espresso',
                'Orange Espresso',
                sized(185, 215, 225),
                'Bright citrus meets a bold espresso shot for a refreshing coffee drink.'
            ),
            item(
                'baristas-drink',
                "Barista's Drink",
                sized(220, 240, 280),
                'A rotating coffee creation selected by the barista.'
            ),
            item(
                'banana-latte',
                'Banana Latte',
                sized(175, 195, 225),
                'Creamy banana flavor blended with smooth coffee and milk.'
            ),
            item(
                'iced-spanish-latte',
                'Iced Spanish Latte',
                sized(165, 185, 225),
                'Espresso and milk sweetened with a rich, creamy finish over ice.'
            ),
            item(
                'einspanner-coffee-latte',
                'Einspanner Coffee Latte',
                sized(195, 215, 245),
                'A coffee latte topped with a generous layer of soft cream.'
            ),
            item(
                'iced-mocha',
                'Iced Mocha',
                sized(175, 195, 225),
                'Chocolate, espresso, and milk served cold for a decadent pick-me-up.'
            ),
            item(
                'iced-salted-coffee',
                'Iced Salted Coffee',
                sized(175, 195, 215),
                'Chilled coffee with a lightly salted, creamy finish.'
            ),
            item(
                'iced-americano',
                'Iced Americano',
                sized(125, 155, 175),
                'Bold espresso diluted with chilled water and ice.'
            ),
        ],
    },


    /* ---------- Signature Matcha Drinks ---------- */

    {
        id: 'signature-matcha',
        title: 'Signature Matcha Drinks',
        items: [
            item(
                'signature-tmh-matcha',
                'Signature TMH Matcha',
                sized(265, 295, 335),
                "The Matcha House's signature creamy matcha creation."
            ),
            item(
                'ube-matcha-latte',
                'Ube Matcha Latte',
                sized(255, 285, 305),
                'Earthy matcha paired with the mellow sweetness of ube.'
            ),
            item(
                'cheese-cloud-matcha',
                'Cheese Cloud Matcha',
                sized(275, 315, 335),
                'Smooth matcha topped with a rich, airy cheese foam.'
            ),
            item(
                'banana-pudding-matcha',
                'Banana Pudding Matcha',
                sized(295, 335, 355),
                'Creamy matcha inspired by the comforting flavor of banana pudding.'
            ),
            item(
                'mango-matcha-latte',
                'Mango Matcha Latte',
                sized(255, 295, 305),
                'A bright mango twist on a smooth iced matcha latte.'
            ),
            item(
                'einspanner-matcha-latte',
                'Einspanner Matcha Latte',
                sized(275, 305, 335),
                'A creamy matcha latte finished with a generous cloud of cream.'
            ),
            item(
                'strawberry-matcha-latte',
                'Strawberry Matcha Latte',
                sized(255, 295, 325),
                'Sweet strawberry and earthy matcha layered with milk.'
            ),
            item(
                'banana-matcha',
                'Banana Matcha',
                sized(255, 295, 325),
                'A mellow, creamy banana-and-matcha blend.'
            ),
        ],
    },


    /* ---------- Cloud Series ---------- */

    {
        id: 'cloud-series',
        title: 'Cloud Series',
        items: [
            item(
                'chocolate-coconut-cloud',
                'Chocolate Coconut Cloud',
                sized(155, 185, 205),
                'Chocolate and coconut layered into a rich, creamy cloud drink.'
            ),
            item(
                'coconut-matcha-cloud',
                'Coconut Matcha Cloud',
                sized(255, 275, 305),
                'Earthy matcha topped with a refreshing coconut cream cloud.'
            ),
            item(
                'espresso-cloud-tiramisu-latte',
                'Espresso Cloud Tiramisu Latte',
                sized(205, 235, 265),
                'Espresso and tiramisu-inspired flavors finished with a soft cloud topping.'
            ),
            item(
                'espresso-coconut-cloud',
                'Espresso Coconut Cloud',
                sized(195, 205, 225),
                'Bold espresso balanced by a smooth coconut cream cloud.'
            ),
            item(
                'espresso-cold-foam',
                'Espresso Cold Foam',
                sized(155, 175, 205),
                'Iced espresso finished with a silky layer of cold foam.'
            ),
            item(
                'hojicha-coconut-cloud',
                'Hojicha Coconut Cloud',
                sized(255, 275, 305),
                'Roasty hojicha paired with a light, creamy coconut cloud.'
            ),
            item(
                'jasmine-matcha-cloud',
                'Jasmine Matcha Cloud',
                sized(255, 275, 305),
                'Floral jasmine notes and matcha under a delicate cream cloud.'
            ),
            item(
                'matcha-cloud-tiramisu-latte',
                'Matcha Cloud Tiramisu Latte',
                sized(295, 335, 355),
                'A creamy matcha latte with tiramisu-inspired layers and a cloud topping.'
            ),
            item(
                'strawberry-matcha-coconut-cloud',
                'Strawberry Matcha Coconut Cloud',
                sized(265, 295, 315),
                'Strawberry and matcha brought together with a coconut cream cloud.'
            ),
        ],
    },


    /* ---------- Vietnam Series ---------- */

    {
        id: 'vietnam-series',
        title: 'Vietnam Series',
        items: [
            item(
                'coconut-coffee',
                'Coconut Coffee',
                sized(185, 205, 235),
                'Vietnamese-style coffee with sweet coconut cream and condensed milk.'
            ),
            item(
                'dragon-glow-smoothie',
                'Dragon Glow Smoothie',
                grandeOnly(335),
                'A vibrant dragon fruit smoothie with a tropical glow.'
            ),
            item(
                'egg-coffee',
                'Egg Coffee',
                sized(195, 215),
                'Classic Vietnamese egg coffee with a rich, velvety egg cream topping.'
            ),
            item(
                'iced-tmh-chocolate',
                'Iced TMH Chocolate',
                sized(145, 155, 175),
                'Rich chocolate drink served over ice, TMH style.'
            ),
            item(
                'tmh-pink-drink',
                'TMH Pink Drink',
                sized(155, 175, 185),
                'A refreshing pink fruit blend with a creamy finish.'
            ),
            item(
                'tmh-triple-chocolate-frappe',
                'TMH Triple Chocolate Frappe',
                grandeOnly(265),
                'Triple-layered chocolate frappe blended to perfection.'
            ),
            item(
                'tra-tac',
                'Trà Tắc',
                sized(155, 185, 205),
                'Vietnamese kumquat tea — tart, sweet, and refreshing.'
            ),
        ],
    },


    /* ---------- Comfort Food ---------- */

    {
        id: 'comfort-food',
        title: 'Your Comfort on a Plate',
        items: [
            item(
                'beef-enoki',
                'Beef Enoki',
                single(285),
                'Tender beef slices with enoki mushrooms in a savory glaze.'
            ),
            item(
                'cheesey-garlic-sourdough',
                'Cheesey Garlic Sourdough',
                single(135),
                'Toasted sourdough loaded with garlic butter and melted cheese.'
            ),
            item(
                'chicken-karaage',
                'Chicken Karaage',
                single(235),
                'Japanese-style fried chicken — crispy outside, juicy inside.'
            ),
            item(
                'chizu-bacon-fries',
                'Chizu Bacon Fries',
                single(185),
                'Crispy fries topped with cheese sauce and crispy bacon bits.'
            ),
            item(
                'cream-cheese-bagel',
                'Cream Cheese Bagel',
                single(195),
                'Freshly toasted bagel with smooth, creamy cream cheese spread.'
            ),
            item(
                'fluffy-egg-sourdough-melt',
                'Fluffy Egg Sourdough Melt',
                single(175),
                'Fluffy scrambled eggs with cheese on toasted sourdough.'
            ),
            item(
                'gokujo-spicy-burger-fries',
                'Gokujo Spicy Burger w/ Fries',
                single(395),
                'Juicy spicy burger patty with bold seasoning, served with crispy fries.'
            ),
            item(
                'gyudon',
                'Gyudon',
                single(265),
                'Japanese beef bowl with sweet-savory onions over steamed rice.'
            ),
            item(
                'pizza-bagel',
                'Pizza Bagel',
                single(225),
                'Bagel topped with marinara, melted mozzarella, and pepperoni.'
            ),
            item(
                'steak-garlic-soy-rice',
                'Steak Garlic Soy Rice',
                single(890),
                'Sear-grilled steak with garlic soy glaze over Japanese rice.'
            ),
        ],
    },


    /* ---------- Pasta and Salad ---------- */

    {
        id: 'pasta-salad',
        title: 'Pasta and Salad',
        items: [
            item(
                'bacon-alfredo-pasta-steak',
                'Bacon Alfredo Pasta w/ Steak',
                single(990),
                'Creamy bacon alfredo pasta topped with a perfectly seared steak.'
            ),
            item(
                'bacon-alfredo-pasta',
                'Bacon Alfredo Pasta',
                single(225),
                'Rich alfredo sauce tossed with penne pasta and smoky bacon bits.'
            ),
            item(
                'chicken-cobb-salad-wrap',
                'Chicken Cobb Salad Wrap',
                single(195),
                'Grilled chicken, bacon, egg, and fresh greens wrapped in a soft tortilla.'
            ),
            item(
                'penne-pasta-al-telefono',
                'Penne Pasta Al Telefono',
                single(225),
                'Classic penne in a vibrant tomato-basil sauce, finished with melted mozzarella.'
            ),
            item(
                'penne-pasta-steak',
                'Penne Pasta w/ Steak',
                single(990),
                'Hearty penne pasta in savory sauce crowned with a tender grilled steak.'
            ),
            item(
                'tuna-pasta-steak',
                'Tuna Pasta w/ Steak',
                single(970),
                'Flavorful tuna pasta paired with a succulent grilled steak.'
            ),
            item(
                'tuna-pasta',
                'Tuna Pasta',
                single(195),
                'Tender tuna tossed with pasta in a light, savory sauce.'
            ),
        ],
    },
]