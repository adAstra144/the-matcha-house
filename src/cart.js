/* ---------- Constants ---------- */

// Key used to save and retrieve the cart from sessionStorage.
const KEY = 'tmh-cart'

// Fixed delivery fee in Philippine pesos.
export const DELIVERY_FEE = 50

// Maximum quantity allowed for a single cart item.
const MAX_QTY = 99


/* ---------- State and Subscribers ---------- */

// The cart's single source of truth.
let state = {
    items: [],
    delivery: false,
}

// Stores functions that should run whenever the cart changes.
const subscribers = new Set()


/* ---------- Load Cart from Storage ---------- */

// Restores the previously saved cart from sessionStorage.
function load() {
    try {
        const saved = JSON.parse(sessionStorage.getItem(KEY))

        // Restore the cart if saved item data exists.
        if (saved && Array.isArray(saved.items)) {
            state = {
                items: saved.items,
                delivery: Boolean(saved.delivery),
            }
        }
    } catch {
        // Use an empty cart if storage is unavailable or invalid.
        state = {
            items: [],
            delivery: false,
        }
    }
}


/* ---------- Save and Notify Subscribers ---------- */

// Persists the current state and notifies subscribed functions.
function commit() {
    try {
        sessionStorage.setItem(KEY, JSON.stringify(state))
    } catch {
        // Storage unavailable (private mode, quota): the cart still works in memory.
    }

    // Notify every subscriber that the cart has changed.
    subscribers.forEach((fn) => fn(state))
}

// Load the saved cart when this module is initialized.
load()


/* ---------- Member Discount Helpers ---------- */

// Checks if the user has completed a membership application in session storage
export const hasMembership = () => {
    try {
        return Boolean(sessionStorage.getItem('tmh-member'))
    } catch {
        return false
    }
}

// Calculates a 5% discount if the user is a member
export const getDiscount = () => {
    if (!hasMembership() || state.items.length === 0) {
        return 0
    }
    // Round to the nearest peso for clean pricing
    return Math.round(getSubtotal() * 0.05)
}


/* ---------- Read Cart State ---------- */

// Returns the complete cart state.
export const getState = () => state

// Returns the total quantity of all items in the cart.
export const getCount = () =>
    state.items.reduce((count, item) => count + item.quantity, 0)

// Calculates the subtotal before delivery fees.
export const getSubtotal = () =>
    state.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    )

// Returns the delivery fee only when delivery is selected and the cart isn't empty.
export const getDeliveryFee = () =>
    state.delivery && state.items.length ? DELIVERY_FEE : 0

// Calculates the final total, including discount and any delivery fee.
export const getTotal = () =>
    getSubtotal() - getDiscount() + getDeliveryFee()


/* ---------- Subscribe to Cart Updates ---------- */

// Registers a function to run whenever the cart changes.
// Returns a function that can unsubscribe it later.
export function subscribe(fn) {
    subscribers.add(fn)

    return () => subscribers.delete(fn)
}


/* ---------- Add Items ---------- */

// Adds an item to the cart or increases the quantity if it already exists.
// Expected item format: { id, name, price, size, image }.
export function add(item, quantity = 1) {
    // Match items using both their ID and size.
    const existing = state.items.find(
        (i) => i.id === item.id && i.size === item.size
    )

    if (existing) {
        // Increase the existing item's quantity without exceeding the limit.
        existing.quantity = Math.min(
            MAX_QTY,
            existing.quantity + quantity
        )
    } else {
        // Add a new item with its quantity capped at the maximum.
        state.items.push({
            ...item,
            quantity: Math.min(MAX_QTY, quantity),
        })
    }

    // Save the updated state and notify subscribers.
    commit()
}


/* ---------- Update Item Quantity ---------- */

// Sets an item's quantity using its ID and size.
export function setQuantity(id, size, quantity) {
    // Remove the item if its quantity drops below one.
    if (quantity < 1) {
        return remove(id, size)
    }

    // Find the matching cart item.
    const existing = state.items.find(
        (i) => i.id === id && i.size === size
    )

    // Stop if the item doesn't exist.
    if (!existing) {
        return
    }

    // Apply the new quantity without exceeding the limit.
    existing.quantity = Math.min(MAX_QTY, quantity)

    // Save the updated state and notify subscribers.
    commit()
}


/* ---------- Remove Items ---------- */

// Removes an item matching the given ID and size.
export function remove(id, size) {
    state.items = state.items.filter(
        (i) => !(i.id === id && i.size === size)
    )

    // Save the updated state and notify subscribers.
    commit()
}


/* ---------- Set Delivery Preference ---------- */

// Enables or disables delivery for the current order.
export function setDelivery(delivery) {
    state.delivery = Boolean(delivery)

    // Save the updated state and notify subscribers.
    commit()
}


/* ---------- Clear Cart ---------- */

// Empties the cart and resets the delivery preference.
export function clear() {
    state = {
        items: [],
        delivery: false,
    }

    // Save the empty cart and notify subscribers.
    commit()
}


/* ---------- Reload Cart ---------- */

// Re-reads sessionStorage and notifies subscribers.
// Useful when a page is restored from the back/forward cache.
export function reload() {
    load()

    subscribers.forEach((fn) => fn(state))
}
