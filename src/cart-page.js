/* ---------- Imports ---------- */

import {
    DELIVERY_FEE,
    getState,
    getSubtotal,
    getDiscount,
    getDeliveryFee,
    getTotal,
    setQuantity,
    remove,
    setDelivery,
    clear,
    subscribe,
} from './cart.js'


/* ---------- DOM Elements ---------- */

// Main cart container and order confirmation modal.
const root = document.querySelector('#cart-root')
const orderModal = document.querySelector('.order-modal')

// Payment modal and its controls.
const paymentModal = document.querySelector('.payment-modal')
const paymentForm = paymentModal.querySelector('.payment-form')
const paymentSubmit = paymentModal.querySelector('.payment-submit')
const orderMethod = orderModal.querySelector('.order-method')


/* ---------- Constants and State ---------- */

// Delay used to simulate payment processing.
const PROCESSING_MS = 1200

// Prevents the payment form from being submitted multiple times.
let processing = false


/* ---------- Utility Functions ---------- */

// Formats numbers as Philippine pesos.
const peso = (n) => `₱${n.toLocaleString('en-PH')}`

// Escapes special HTML characters before inserting text into HTML templates.
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
}[c]))


/* ---------- Cart Item Template ---------- */

// Generates the HTML for one cart item.
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

            <button
                type="button"
                ${attrs}
                data-action="remove"
                class="cart-remove"
                aria-label="Remove ${name} from cart"
            >
                <svg
                    viewBox="0 0 24 24"
                    width="20"
                    height="20"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    aria-hidden="true"
                >
                    <path d="M3 6h18M8 6V4h8v2M6 6l1 14h10l1-14M10 10v6M14 10v6"/>
                </svg>
            </button>
        </li>
    `
}


/* ---------- Render Cart ---------- */

// Updates the cart interface whenever the cart state changes.
function render() {
    const { items, delivery } = getState()

    // Preserve the cart's scroll position across re-renders.
    const scrollTop = root.querySelector('.cart-list')?.scrollTop ?? 0

    // Remember the active cart control so re-rendering doesn't lose focus.
    const active = document.activeElement
    const focusKey = active?.dataset?.action
        && `${active.dataset.id}|${active.dataset.size}|${active.dataset.action}`

    // Display an empty state when there are no items.
    if (!items.length) {
        root.innerHTML = `
            <div class="cart-empty">
                <p>Your cart is empty.</p>
                <a class="btn-primary" href="/menu">Browse Menu</a>
            </div>
        `
        return
    }

    const discount= getDiscount()

    // Build the cart list, fulfilment options, totals, and checkout button.
    root.innerHTML = `
        <ul class="cart-list">${items.map(row).join('')}</ul>

        <fieldset class="cart-fulfilment">
            <legend>Order type</legend>

            <label>
                <input type="radio" name="fulfilment" value="pickup" ${delivery ? '' : 'checked'}>
                Pickup
            </label>

            <label>
                <input type="radio" name="fulfilment" value="delivery" ${delivery ? 'checked' : ''}>
                Delivery +${peso(DELIVERY_FEE)}
            </label>
        </fieldset>

        <dl class="cart-totals">
            <div>
                <dt>Subtotal</dt>
                <dd>${peso(getSubtotal())}</dd>
            </div>

            <div>
                <dt>Delivery</dt>
                <dd>${peso(getDeliveryFee())}</dd>
            </div>

            ${discount > 0 ? `
            <div class="cart-member-discount">
                <dt>Membership Discount (5%)</dt>
                <dd>−${peso(discount)}</dd>
            </div>
            ` : ''}

            <div class="cart-total">
                <dt>Total</dt>
                <dd>${peso(getTotal())}</dd>
            </div>
        </dl>

        <button type="button" class="btn-primary place-order">Place Order</button>
    `

    // Restore the cart list's previous scroll position.
    const list = root.querySelector('.cart-list')

    if (list) {
        list.scrollTop = scrollTop
    }

    // Restore focus to the previous control when possible.
    if (focusKey) {
        const [id, size, action] = focusKey.split('|')

        const target = [...root.querySelectorAll('button[data-action]')]
            .find((button) =>
                button.dataset.id === id
                && button.dataset.size === size
                && button.dataset.action === action
            )

        if (target) {
            target.focus()
        } else {
            // Return focus to the cart heading if the item was removed.
            document.querySelector('.cart-title').focus()
        }
    }
}


/* ---------- Cart Event Handlers ---------- */

// Handle quantity changes, item removal, and checkout clicks.
root.addEventListener('click', (event) => {
    // Open the payment dialog when the customer clicks Place Order.
    if (event.target.closest('.place-order')) {
        openPayment()
        return
    }

    // Find the cart action button that was clicked.
    const button = event.target.closest('button[data-action]')

    if (!button) {
        return
    }

    const { id, size, action } = button.dataset

    // Find the corresponding item in the current cart state.
    const current = getState().items.find(
        (item) => item.id === id && item.size === size
    )

    if (!current) {
        return
    }

    // Perform the requested cart action.
    if (action === 'inc') {
        setQuantity(id, size, current.quantity + 1)
    } else if (action === 'dec') {
        setQuantity(id, size, current.quantity - 1)
    } else if (action === 'remove') {
        remove(id, size)
    }
})

// Update the cart when the customer chooses pickup or delivery.
root.addEventListener('change', (event) => {
    if (event.target.name === 'fulfilment') {
        setDelivery(event.target.value === 'delivery')
    }
})

// Close the order confirmation dialog when clicking its backdrop.
orderModal.addEventListener('click', (event) => {
    if (event.target === orderModal) {
        orderModal.close()
    }
})


/* ---------- Payment Dialog ---------- */

// Populate and open the payment dialog using the current order details.
function openPayment() {
    const { delivery } = getState()
    const total = peso(getTotal())

    // Reset the payment form for the next checkout attempt.
    paymentForm.reset()

    paymentModal.querySelector('.payment-type').textContent =
        delivery ? 'Delivery order' : 'Pickup order'

    paymentModal.querySelector('.payment-total').textContent = total

    paymentModal.querySelector('.payment-cash-hint').textContent =
        delivery ? 'Pay when it arrives' : 'Pay when you pick up'

    paymentSubmit.textContent = `Pay ${total}`
    paymentSubmit.disabled = false

    paymentModal.showModal()
}


/* ---------- Process Payment ---------- */

// Handle payment submission.
// NOTE: This currently simulates processing; it does not charge a real payment.
paymentForm.addEventListener('submit', (event) => {
    event.preventDefault()

    // Prevent duplicate submissions while processing.
    if (processing) {
        return
    }

    // Get the selected payment method.
    const method = new FormData(paymentForm).get('payment')

    processing = true
    paymentSubmit.disabled = true
    paymentSubmit.textContent = 'Processing…'

    // Replace this timeout with a real payment-provider request when integrated.
    setTimeout(() => {
        processing = false

        // Clear the cart after the simulated successful order.
        clear()

        // Close payment and display the order confirmation.
        paymentModal.close()
        orderMethod.textContent = method
        orderModal.showModal()
    }, PROCESSING_MS)
})


/* ---------- Payment Dialog Controls ---------- */

// Allow the customer to cancel payment unless processing is underway.
paymentModal.querySelector('.payment-cancel').addEventListener('click', () => {
    if (!processing) {
        paymentModal.close()
    }
})

// Prevent Escape from closing the payment dialog during processing.
paymentModal.addEventListener('cancel', (event) => {
    if (processing) {
        event.preventDefault()
    }
})

// Close the payment dialog when clicking its backdrop, if not processing.
paymentModal.addEventListener('click', (event) => {
    if (event.target === paymentModal && !processing) {
        paymentModal.close()
    }
})


/* ---------- Initialize Cart ---------- */

// Re-render the cart whenever the cart state changes.
subscribe(render)

// Render the initial cart when this script loads.
render()