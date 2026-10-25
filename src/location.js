/* ---------- Imports ---------- */

import { showToast } from './toast.js'


/* ---------- Open-Now Status ---------- */

// Get the current time using Philippine time (Asia/Manila).
const time = new Intl.DateTimeFormat('en-PH', {
    hour: 'numeric',
    minute: '2-digit',
    timeZone: 'Asia/Manila',
}).format(new Date())

// Display the current Philippine time on the page.
document.getElementById('open-now').textContent =
    `Open right now · ${time}`


/* ---------- Copy Address ---------- */

// Copy the store address to the clipboard when the button is clicked.
document.querySelector('.copy-address').addEventListener('click', async () => {
    // Get the address text and remove surrounding whitespace.
    const address = document.getElementById('address').textContent.trim()

    try {
        // Copy the address to the clipboard.
        await navigator.clipboard.writeText(address)

        // Notify the user that copying succeeded.
        showToast('Address copied')
    } catch {
        // Notify the user if clipboard access fails.
        showToast("Couldn't copy the address")
    }
})