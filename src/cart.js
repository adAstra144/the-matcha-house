/* Cart store: single source of truth, persisted in sessionStorage */

const KEY = 'tmh-cart'
export const DELIVERY_FEE = 50
const MAX_QTY = 99

let state = { items: [], delivery: false }
const subscribers = new Set()

function load() {
    try {
        const saved = JSON.parse(sessionStorage.getItem(KEY))
        if (saved && Array.isArray(saved.items)) {
            state = { items: saved.items, delivery: Boolean(saved.delivery) }
        }
    } catch {
        state = { items: [], delivery: false }
    }
}

function commit() {
    try {
        sessionStorage.setItem(KEY, JSON.stringify(state))
    } catch {
        /* storage unavailable (private mode, quota): cart still works in memory */
    }
    subscribers.forEach((fn) => fn(state))
}

load()

/* ---------- Reads ---------- */

export const getState = () => state
export const getCount = () => state.items.reduce((n, i) => n + i.quantity, 0)
export const getSubtotal = () => state.items.reduce((sum, i) => sum + i.price * i.quantity, 0)
export const getDeliveryFee = () => (state.delivery && state.items.length ? DELIVERY_FEE : 0)
export const getTotal = () => getSubtotal() + getDeliveryFee()

export function subscribe(fn) {
    subscribers.add(fn)
    return () => subscribers.delete(fn)
}

/* ---------- Mutations ---------- */

// item: { id, name, price, size, image }
export function add(item, quantity = 1) {
    const existing = state.items.find((i) => i.id === item.id && i.size === item.size)
    if (existing) existing.quantity = Math.min(MAX_QTY, existing.quantity + quantity)
    else state.items.push({ ...item, quantity: Math.min(MAX_QTY, quantity) })
    commit()
}

export function setQuantity(id, size, quantity) {
    if (quantity < 1) return remove(id, size)
    const existing = state.items.find((i) => i.id === id && i.size === size)
    if (!existing) return
    existing.quantity = Math.min(MAX_QTY, quantity)
    commit()
}

export function remove(id, size) {
    state.items = state.items.filter((i) => !(i.id === id && i.size === size))
    commit()
}

export function setDelivery(delivery) {
    state.delivery = Boolean(delivery)
    commit()
}

export function clear() {
    state = { items: [], delivery: false }
    commit()
}

// Re-read storage (used when a page is restored from the back/forward cache)
export function reload() {
    load()
    subscribers.forEach((fn) => fn(state))
}