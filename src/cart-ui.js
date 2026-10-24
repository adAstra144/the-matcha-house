import { subscribe, getCount, reload } from './cart.js'
import cartIcon from './assets/icons/cart.svg'

/* ---------- Header cart link (injected so every page gets it) ---------- */

const header = document.querySelector('header')
const cartLink = document.createElement('a')
cartLink.className = 'cart-btn'
cartLink.href = '/cart'
cartLink.innerHTML = `
    <span class="cart-icon" aria-hidden="true"></span>
    <span class="cart-badge" hidden></span>
`
cartLink.querySelector('.cart-icon').style.setProperty('--icon', `url("${cartIcon}")`)
if (location.pathname.startsWith('/cart')) cartLink.setAttribute('aria-current', 'page')

// Sits before the burger so it is left of it on tablet/mobile
header.insertBefore(cartLink, header.querySelector('.burger'))

const badge = cartLink.querySelector('.cart-badge')
let lastCount = getCount()

function renderBadge() {
    const count = getCount()
    badge.hidden = count === 0
    badge.textContent = count > 99 ? '99+' : String(count)
    cartLink.setAttribute('aria-label', `Cart (${count} ${count === 1 ? 'item' : 'items'})`)

    if (count > lastCount) {
        badge.classList.remove('bump')
        void badge.offsetWidth // restart the animation
        badge.classList.add('bump')
    }
    lastCount = count
}

subscribe(renderBadge)
renderBadge()
window.addEventListener('pageshow', (event) => {
    if (event.persisted) reload()
})

/* ---------- Toasts ---------- */

const region = document.createElement('div')
region.className = 'toast-region'
region.setAttribute('aria-live', 'polite')
document.body.append(region)

export function showToast(message) {
    const toast = document.createElement('div')
    toast.className = 'toast'
    toast.textContent = message
    region.replaceChildren(toast)
    setTimeout(() => toast.remove(), 2200)
}