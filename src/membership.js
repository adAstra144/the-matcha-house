/* ---------- Imports ---------- */

import { showToast } from './toast.js'


/* ---------- DOM Elements ---------- */

const form = document.querySelector('#membership-form')
const successModal = document.querySelector('.success-modal')
const memberNameDisplay = document.querySelector('#member-name-display')
const memberIdDisplay = document.querySelector('#member-id-display')
const closeBtn = document.querySelector('.modal-close-btn')


/* ---------- Form Submission Handler ---------- */

form.addEventListener('submit', (event) => {
    event.preventDefault()

    const formData = new FormData(form)
    const fullName = formData.get('fullName').trim()
    const email = formData.get('email').trim()

    if (!fullName || !email) {
        showToast('Please fill in all required fields.')
        return
    }

    // Generate a simulated member ID
    const randomId = 'TMH-' + Math.floor(100000 + Math.random() * 900000)

    const memberData = {
        fullName,
        email,
        phone: formData.get('phone'),
        birthday: formData.get('birthday'),
        memberId: randomId,
        joinedAt: new Date().toISOString(),
    }

    try {
        sessionStorage.setItem('tmh-member', JSON.stringify(memberData))
    } catch {
        // Storage failure fallback
    }

    // Populate modal
    memberNameDisplay.textContent = fullName
    memberIdDisplay.textContent = randomId

    // Show success modal
    successModal.showModal()
    showToast('Application submitted successfully!')
})


/* ---------- Modal Close Handler ---------- */

closeBtn.addEventListener('click', () => {
    successModal.close()
    form.reset()
})

successModal.addEventListener('click', (event) => {
    if (event.target === successModal) {
        successModal.close()
        form.reset()
    }
})

successModal.addEventListener('cancel', (event) => {
    event.preventDefault()
    successModal.close()
    form.reset()
})