import { showToast } from './cart-ui.js'

/* ---------- Open-now status (same format as the home page) ---------- */

const time = new Intl.DateTimeFormat('en-PH', {
    hour: 'numeric', minute: '2-digit', timeZone: 'Asia/Manila',
}).format(new Date())

document.getElementById('open-now').textContent = `Open right now · ${time}`

/* ---------- Copy address ---------- */

document.querySelector('.copy-address').addEventListener('click', async () => {
    const address = document.getElementById('address').textContent.trim()
    try {
        await navigator.clipboard.writeText(address)
        showToast('Address copied')
    } catch {
        showToast("Couldn't copy the address")
    }
})