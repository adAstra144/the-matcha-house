import {
    DELIVERY_FEE, getState, getSubtotal, getDeliveryFee, getTotal,
    setQuantity, remove, setDelivery, clear, subscribe, reload,
} from './cart.js'
import './cart-ui.js'

const root = document.querySelector('#cart-root')
const orderModal = document.querySelector('.order-modal')

const peso = (n) => `₱${n.toLocaleString('en-PH')}`
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]))

const paymentModal = document.querySelector('.payment-modal')
const paymentForm = paymentModal.querySelector('.payment-form')
const paymentSubmit = paymentModal.querySelector('.payment-submit')
const orderMethod = orderModal.querySelector('.order-method')

const PROCESSING_MS = 1200
let processing = false

function row(item) {
    const label = item.size === 'Price' ? '' : item.size
    const attrs = `data-id="${esc(item.id)}" data-size="${esc(item.size)}"`
    const name = esc(item.name)
    return `
        <li class="cart-row">
            <img src="${esc(item.image)}" alt="" width="64" height="64">
            <div class="cart-row-info">
                <p class="cart-row-name">${name}</p>
                ${label ? `<p class="cart-row-size">${esc(label)}</p>` : ''}
                <p class="cart-row-price">${peso(item.price)} each</p>
            </div>
            <div class="qty" role="group" aria-label="Quantity for ${name}">
                <button type="button" ${attrs} data-action="dec" aria-label="Decrease quantity of ${name}">−</button>
                <span aria-live="polite">${item.quantity}</span>
                <button type="button" ${attrs} data-action="inc" aria-label="Increase quantity of ${name}">+</button>
            </div>
            <p class="cart-row-total">${peso(item.price * item.quantity)}</p>
            <button type="button" ${attrs} data-action="remove" class="cart-remove" aria-label="Remove ${name} from cart">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"
                     stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <path d="M3 6h18M8 6V4h8v2M6 6l1 14h10l1-14M10 10v6M14 10v6"/>
                </svg>
            </button>
        </li>`
}

function render() {
    const { items, delivery } = getState()

    // Keep the list's scroll position across re-renders
    const scrollTop = root.querySelector('.cart-list')?.scrollTop ?? 0

    // Remember which control had focus so re-rendering doesn't drop it
    const active = document.activeElement
    const focusKey = active?.dataset?.action && `${active.dataset.id}|${active.dataset.size}|${active.dataset.action}`

    if (!items.length) {
        root.innerHTML = `
            <div class="cart-empty">
                <p>Your cart is empty.</p>
                <a class="btn-primary" href="/menu">Browse Menu</a>
            </div>`
        return
    }

    root.innerHTML = `
        <ul class="cart-list">${items.map(row).join('')}</ul>

        <fieldset class="cart-fulfilment">
            <legend>Order type</legend>
            <label><input type="radio" name="fulfilment" value="pickup" ${delivery ? '' : 'checked'}> Pickup</label>
            <label><input type="radio" name="fulfilment" value="delivery" ${delivery ? 'checked' : ''}> Delivery +${peso(DELIVERY_FEE)}</label>
        </fieldset>

        <dl class="cart-totals">
            <div><dt>Subtotal</dt><dd>${peso(getSubtotal())}</dd></div>
            <div><dt>Delivery</dt><dd>${peso(getDeliveryFee())}</dd></div>
            <div class="cart-total"><dt>Total</dt><dd>${peso(getTotal())}</dd></div>
        </dl>

        <button type="button" class="btn-primary place-order">Place Order</button>`

    const list = root.querySelector('.cart-list')
    if (list) list.scrollTop = scrollTop

    if (focusKey) {
        const [id, size, action] = focusKey.split('|')
        const target = [...root.querySelectorAll('button[data-action]')]
            .find((b) => b.dataset.id === id && b.dataset.size === size && b.dataset.action === action)
        if (target) target.focus()
        else document.querySelector('.cart-title').focus() // the row was removed
    }
}

root.addEventListener('click', (event) => {
    if (event.target.closest('.place-order')) {
        openPayment()
        return
    }

    const button = event.target.closest('button[data-action]')
    if (!button) return
    const { id, size, action } = button.dataset
    const current = getState().items.find((i) => i.id === id && i.size === size)
    if (!current) return

    if (action === 'inc') setQuantity(id, size, current.quantity + 1)
    else if (action === 'dec') setQuantity(id, size, current.quantity - 1)
    else if (action === 'remove') remove(id, size)
})

root.addEventListener('change', (event) => {
    if (event.target.name === 'fulfilment') setDelivery(event.target.value === 'delivery')
})

orderModal.addEventListener('click', (event) => {
    if (event.target === orderModal) orderModal.close()
})


function openPayment() {
    const { delivery } = getState()
    const total = peso(getTotal())

    paymentForm.reset()
    paymentModal.querySelector('.payment-type').textContent = delivery ? 'Delivery order' : 'Pickup order'
    paymentModal.querySelector('.payment-total').textContent = total
    paymentModal.querySelector('.payment-cash-hint').textContent =
        delivery ? 'Pay when it arrives' : 'Pay when you pick up'
    paymentSubmit.textContent = `Pay ${total}`
    paymentSubmit.disabled = false
    paymentModal.showModal()
}

paymentForm.addEventListener('submit', (event) => {
    event.preventDefault()
    if (processing) return

    const method = new FormData(paymentForm).get('payment')
    processing = true
    paymentSubmit.disabled = true
    paymentSubmit.textContent = 'Processing…'

    // Swap this timeout for a real payment request when you add a provider
    setTimeout(() => {
        processing = false
        clear()
        paymentModal.close()
        orderMethod.textContent = method
        orderModal.showModal()
    }, PROCESSING_MS)
})

paymentModal.querySelector('.payment-cancel').addEventListener('click', () => {
    if (!processing) paymentModal.close()
})

// Block Escape while "processing" so the order can't be half-completed
paymentModal.addEventListener('cancel', (event) => {
    if (processing) event.preventDefault()
})

paymentModal.addEventListener('click', (event) => {
    if (event.target === paymentModal && !processing) paymentModal.close()
})

subscribe(render)
window.addEventListener('pageshow', (event) => {
    if (event.persisted) reload()
})
render()