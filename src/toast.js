/* ---------- Toast Region ---------- */

// Create a shared container for toast notifications.
const region = document.createElement('div')

region.className = 'toast-region'

// Announce toast messages to screen readers politely.
region.setAttribute('aria-live', 'polite')

// Add the toast container to the page.
document.body.append(region)


/* ---------- Show Toast Notification ---------- */

// Displays a temporary notification with the provided message.
export function showToast(message) {
    // Create the toast element.
    const toast = document.createElement('div')

    toast.className = 'toast'
    toast.textContent = message

    // Replace any existing toast with the new notification.
    region.replaceChildren(toast)

    // Automatically remove the toast after 2.2 seconds.
    setTimeout(() => toast.remove(), 2200)
}