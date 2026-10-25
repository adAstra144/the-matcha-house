/* ---------- Hero Video ---------- */

// Wait until the page and its resources have finished loading.
window.addEventListener('load', () => {
    const v = document.querySelector('.hero-video')

    // Stop if the page doesn't contain a hero video.
    if (!v) {
        return
    }

    // Skip video playback when the user prefers reduced motion
    // or has enabled the browser's data-saving option.
    const skip =
        navigator.connection?.saveData ||
        window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (skip) {
        // Remove the video and leave the background image and gradient visible.
        v.remove()
        return
    }

    // Add the WebM and MP4 sources from the video's data attributes.
    // The browser can choose the format it supports.
    v.innerHTML =
        `<source src="${v.dataset.webm}" type="video/webm">` +
        `<source src="${v.dataset.mp4}" type="video/mp4">`

    // Reload the video with the newly added sources.
    v.load()

    // Attempt playback without producing an error if autoplay is blocked.
    v.play().catch(() => {})
})


/* ---------- Store Opening Status ---------- */

// Get the current time using Philippine time (Asia/Manila).
const t = new Intl.DateTimeFormat('en-PH', {
    hour: 'numeric',
    minute: '2-digit',
    timeZone: 'Asia/Manila',
}).format(new Date())

// Display the status text and current Philippine time.
document.getElementById('open-now').textContent =
    `Open right now · ${t}`