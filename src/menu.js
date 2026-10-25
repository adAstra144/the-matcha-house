/* ---------- Imports ---------- */

import { categories } from './data/menu.js'
import { add } from './cart.js'
import { showToast } from './toast.js'


/* ---------- Load Menu Images ---------- */

// Let Vite hash the item images for production builds.
// Maps each image filename (without extension) to its generated URL.
const imageModules = import.meta.glob(
    '/src/assets/items/**/*.png',
    { eager: true }
)

const imageMap = {}

for (const [path, module] of Object.entries(imageModules)) {
    const filename = path.split('/').pop().replace(/\.png$/, '')
    imageMap[filename] = module.default
}


/* ---------- Index Menu Items ---------- */

// Create a lookup table so menu items can be found by their ID.
const itemsById = Object.fromEntries(
    categories
        .flatMap((category) => category.items)
        .map((menuItem) => [menuItem.id, menuItem])
)


/* ---------- Render Menu Categories and Sidebar ---------- */

// Get the elements that hold the category links and menu content.
const sidebarList = document.querySelector('.sidebar-list')
const menuContent = document.querySelector('.menu-content')

// Generate the sidebar navigation links from the menu data.
sidebarList.innerHTML = categories
    .map((category) => `
        <li>
            <a href="#${category.id}" class="sidebar-link">
                ${category.title}
            </a>
        </li>
    `)
    .join('')

// Generate each category heading and its collection of items.
menuContent.innerHTML = categories
    .map((category) => `
        <h2 id="${category.id}">${category.title}</h2>

        <div class="item-container">
            ${category.items.map(renderItem).join('')}
        </div>
    `)
    .join('')


/* ---------- Render Individual Menu Items ---------- */

// Generates the HTML for one menu item and its quick-add button.
function renderItem(menuItem) {
    // Warn during development if an item's image is missing.
    if (!imageMap[menuItem.id]) {
        console.warn(`No image found for menu item "${menuItem.id}"`)
    }

    // The image has an empty alt attribute because the visible item name
    // already labels the button.
    return `
        <div class="item-card">
            <button
                type="button"
                data-item="${menuItem.id}"
                class="item"
                aria-label="View ${menuItem.name} details"
            >
                <img
                    loading="lazy"
                    src="${imageMap[menuItem.id] ?? ''}"
                    alt=""
                >

                <span>${menuItem.name}</span>
            </button>

            <button
                type="button"
                class="quick-add"
                data-item="${menuItem.id}"
                aria-label="Add ${menuItem.name} to cart"
            >
                +
            </button>
        </div>
    `
}


/* ---------- Modal Elements and State ---------- */

// Get references to the item details dialog and its controls.
const dialog = document.querySelector('.item-modal')
const closeButton = document.querySelector('.modal-close')

const modalImage = document.querySelector('.modal-image')
const modalName = document.querySelector('#modal-name')
const modalPrices = document.querySelector('.modal-prices')
const modalSizes = document.querySelector('.modal-sizes')
const modalDescription = document.querySelector('.modal-description')

const qtyValue = document.querySelector('.qty-value')
const addButton = document.querySelector('.modal-add')

// Track the selected menu item and its quantity.
let currentItem = null
let quantity = 1


/* ---------- Prepare Cart Items ---------- */

// Converts a menu item and selected size into the format
// expected by cart.js.
const toCartItem = (menuItem, size) => ({
    id: menuItem.id,
    name: menuItem.name,
    size,
    price: menuItem.prices[size],
    image: imageMap[menuItem.id] ?? '',
})


/* ---------- Quantity Controls ---------- */

// Keeps the quantity between 1 and 99 and updates the displayed value.
function setQuantity(n) {
    quantity = Math.min(99, Math.max(1, n))
    qtyValue.textContent = quantity
}


/* ---------- Open Item Details Modal ---------- */

// Populate the modal with the selected item's details and prices.
function openModal(menuItem) {
    currentItem = menuItem

    // Reset the quantity whenever a new item is opened.
    setQuantity(1)

    // Populate the item's image, name, and description.
    modalImage.src = imageMap[menuItem.id] ?? ''
    modalImage.alt = menuItem.name

    modalName.textContent = menuItem.name
    modalDescription.textContent = menuItem.description

    // Get all available size and price combinations.
    const entries = Object.entries(menuItem.prices)
    const multiple = entries.length > 1

    // Show a price display for single-price items.
    // Show a size picker when multiple prices are available.
    modalPrices.hidden = multiple
    modalSizes.hidden = !multiple

    // Build the price display.
    modalPrices.replaceChildren(
        ...entries.map(([label, amount]) => {
            const row = document.createElement('div')
            row.className = 'modal-price'

            const labelEl = document.createElement('span')
            labelEl.textContent = label

            const amountEl = document.createElement('strong')
            amountEl.textContent = `₱${amount}`

            row.append(labelEl, amountEl)

            return row
        })
    )

    // Build the size picker with the first option selected by default.
    modalSizes.replaceChildren(
        ...entries.map(([label, amount], index) => {
            const wrap = document.createElement('label')
            const input = document.createElement('input')

            input.type = 'radio'
            input.name = 'size'
            input.value = label
            input.checked = index === 0

            wrap.append(input, ` ${label} — ₱${amount}`)

            return wrap
        })
    )

    // Display the modal as a native HTML dialog.
    dialog.showModal()
}


/* ---------- Modal Quantity Buttons ---------- */

// Handle clicks on the increase and decrease quantity controls.
document.querySelector('.modal-qty').addEventListener('click', (event) => {
    const btn = event.target.closest('[data-action]')

    if (btn) {
        setQuantity(
            quantity + (btn.dataset.action === 'inc' ? 1 : -1)
        )
    }
})


/* ---------- Add Selected Item to Cart ---------- */

// Add the item using its selected size and quantity.
addButton.addEventListener('click', () => {
    // Use the checked size or fall back to the first available price.
    const size = modalSizes.querySelector('input:checked')?.value
        ?? Object.keys(currentItem.prices)[0]

    // Add the item to the shared cart store.
    add(toCartItem(currentItem, size), quantity)

    // Close the modal and notify the customer.
    dialog.close()
    showToast('Added to cart')
})


/* ---------- Quick Add to Cart ---------- */

// Adds one item immediately using its first listed size.
function quickAdd(button) {
    const menuItem = itemsById[button.dataset.item]

    // The first size is assumed to be the smallest size.
    const [size] = Object.keys(menuItem.prices)

    add(toCartItem(menuItem, size), 1)
    showToast('Added to cart')

    // Temporarily disable the button to prevent rapid repeat clicks.
    button.disabled = true

    setTimeout(() => {
        button.disabled = false
    }, 400)
}


/* ---------- Menu Click Handlers ---------- */

// Use event delegation to handle clicks on menu items and quick-add buttons.
menuContent.addEventListener('click', (event) => {
    // Handle quick-add clicks first.
    const quick = event.target.closest('.quick-add')

    if (quick) {
        return quickAdd(quick)
    }

    // Open the item details modal when an item card is clicked.
    const button = event.target.closest('.item')

    if (button) {
        openModal(itemsById[button.dataset.item])
    }
})


/* ---------- Close Item Details Modal ---------- */

// Close the dialog using its close button.
closeButton.addEventListener('click', () => dialog.close())

// Close the dialog when the backdrop is clicked.
dialog.addEventListener('click', (event) => {
    if (event.target === dialog) {
        dialog.close()
    }
})


/* ---------- Sidebar Drawer (Tablet) ---------- */

// Get the sidebar drawer, toggle button, backdrop, and breakpoint.
const sidebar = document.querySelector('.menu-sidebar')
const toggleBtn = document.querySelector('.sidebar-toggle')
const backdrop = document.querySelector('.sidebar-backdrop')

const drawerQuery = window.matchMedia('(max-width: 1023px)')

// Opens or closes the drawer and synchronizes its accessibility state.
function setDrawer(open) {
    sidebar.classList.toggle('open', open)
    backdrop.classList.toggle('open', open)

    toggleBtn.setAttribute('aria-expanded', String(open))
}

// Toggle the drawer when the Categories button is clicked.
toggleBtn.addEventListener('click', () => {
    setDrawer(!sidebar.classList.contains('open'))
})

// Close the drawer when the backdrop is clicked.
backdrop.addEventListener('click', () => setDrawer(false))

// Close the drawer when a category link is selected.
sidebarList.addEventListener('click', (event) => {
    if (event.target.closest('a')) {
        setDrawer(false)
    }
})

// Close the drawer when Escape is pressed.
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        setDrawer(false)
    }
})

// Close the drawer when switching to a viewport wider than the breakpoint.
drawerQuery.addEventListener('change', (event) => {
    if (!event.matches) {
        setDrawer(false)
    }
})


/* ---------- Scroll Spy: Highlight Current Category ---------- */

// Collect the sidebar links and category headings for scroll tracking.
const sidebarLinks = [...document.querySelectorAll('.sidebar-link')]
const headings = [...document.querySelectorAll('.menu-content h2[id]')]

// Track the active category and whether an animation-frame update is pending.
let activeId = null
let ticking = false


/* ---------- Update Active Category ---------- */

// Find the category currently nearest the top of the viewport
// and update the corresponding sidebar link.
function updateActive() {
    ticking = false

    // Use the heading's scroll offset, with a little extra space.
    const offset =
        parseInt(getComputedStyle(headings[0]).scrollMarginTop, 10) + 10

    // Detect when the page has reached its bottom.
    const atBottom =
        window.innerHeight + window.scrollY
        >= document.documentElement.scrollHeight - 2

    // Start with the first category.
    let current = headings[0]

    // Find the last heading that has passed the activation offset.
    for (const heading of headings) {
        if (heading.getBoundingClientRect().top <= offset) {
            current = heading
        }
    }

    // Ensure the last category activates at the bottom of the page.
    if (atBottom) {
        current = headings[headings.length - 1]
    }

    // Skip DOM updates if the active category hasn't changed.
    if (current.id === activeId) {
        return
    }

    activeId = current.id

    // Update the active styling and accessibility state of each link.
    for (const link of sidebarLinks) {
        const isActive = link.getAttribute('href') === `#${activeId}`

        link.classList.toggle('active', isActive)

        if (isActive) {
            link.setAttribute('aria-current', 'location')
        } else {
            link.removeAttribute('aria-current')
        }
    }
}


/* ---------- Scroll and Resize Listeners ---------- */

// Schedule scroll-spy updates through requestAnimationFrame
// to avoid performing repeated calculations for every scroll event.
window.addEventListener('scroll', () => {
    if (!ticking) {
        ticking = true
        requestAnimationFrame(updateActive)
    }
}, { passive: true })

// Recalculate the active category when the viewport changes size.
window.addEventListener('resize', updateActive)

// Set the correct active category on initial page load.
updateActive()