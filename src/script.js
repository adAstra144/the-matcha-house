/* ---------- Imports ---------- */

import { subscribe, getCount, reload } from './cart.js'
import cartIcon from './assets/icons/cart.svg'


/* ---------- Mobile Navigation ---------- */

// Get the hamburger button and navigation menu.
const burger = document.querySelector('.burger')
const nav = document.querySelector('#site-nav')

// Toggle the mobile navigation when the hamburger button is clicked.
burger.addEventListener('click', () => {
    burger.classList.toggle('open')
    nav.classList.toggle('open')

    // Keep the accessibility state synchronized with the menu.
    burger.setAttribute(
        'aria-expanded',
        burger.classList.contains('open')
    )
})


/* ---------- Header Cart Button ---------- */

// Get the header and create the cart link dynamically
// so every page using this script gets the same cart button.
const header = document.querySelector('header')
const cartLink = document.createElement('a')

cartLink.className = 'cart-btn'
cartLink.href = '/cart'

// Add the cart icon and quantity badge.
cartLink.innerHTML = `
    <span class="cart-icon" aria-hidden="true"></span>
    <span class="cart-badge" hidden></span>
`

// Use the imported SVG as the cart icon's CSS mask.
cartLink.querySelector('.cart-icon').style.setProperty(
    '--icon',
    `url("${cartIcon}")`
)

// Mark the cart link as the current page when viewing the cart.
if (location.pathname.startsWith('/cart')) {
    cartLink.setAttribute('aria-current', 'page')
}

// Insert the cart button before the hamburger button.
// This places it to the left of the hamburger on tablet and mobile.
header.insertBefore(cartLink, burger)


/* ---------- Cart Badge Elements and State ---------- */

// Get the badge used to display the cart's item count.
const badge = cartLink.querySelector('.cart-badge')

// Remember the previous count to detect when items are added.
let lastCount = getCount()


/* ---------- Render Cart Badge ---------- */

// Update the badge, accessibility label, and animation
// whenever the cart quantity changes.
function renderBadge() {
    const count = getCount()

    // Hide the badge when the cart is empty.
    badge.hidden = count === 0

    // Display a maximum of 99+ on the badge.
    badge.textContent = count > 99 ? '99+' : String(count)

    // Provide a descriptive accessible label for the cart link.
    cartLink.setAttribute(
        'aria-label',
        `Cart (${count} ${count === 1 ? 'item' : 'items'})`
    )

    // Animate the badge whenever the cart count increases.
    if (count > lastCount) {
        badge.classList.remove('bump')

        // Force a layout recalculation to restart the animation.
        void badge.offsetWidth

        badge.classList.add('bump')
    }

    // Save the current count for the next comparison.
    lastCount = count
}


/* ---------- Subscribe to Cart Updates ---------- */

// Automatically refresh the badge whenever the cart changes.
subscribe(renderBadge)

// Display the correct count when the page first loads.
renderBadge()


/* ---------- Restore Cart on Page Return ---------- */

// Re-read the cart when a page is restored from the browser's
// back/forward cache.
window.addEventListener('pageshow', (event) => {
    if (event.persisted) {
        reload()
    }
})