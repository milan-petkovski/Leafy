function openModal(event) {
    const modal = document.getElementById('downloadModal');
    const modalContent = modal.querySelector('.modal-content');
    const button = event.target;

    const rect = button.getBoundingClientRect();
    const buttonX = rect.left + rect.width / 2;
    const buttonY = rect.top + rect.height / 2;

    modalContent.style.left = `${buttonX}px`;
    modalContent.style.top = `${buttonY}px`;
    modalContent.style.transform = 'translate(-50%, -50%) scale(0)';
    modalContent.style.opacity = '0';

    modal.style.display = 'block';

    setTimeout(() => {
        modal.classList.add('show');
        modalContent.style.left = '50%';
        modalContent.style.top = '50%';
        modalContent.style.transform = 'translate(-50%, -50%) scale(1)';
        modalContent.style.opacity = '1';
    }, 10);

    modal.addEventListener('click', function closeOnClickOutside(e) {
        if (!modalContent.contains(e.target)) {
            closeModal();
            modal.removeEventListener('click', closeOnClickOutside);
        }
    });
}

function closeModal() {
    const modal = document.getElementById('downloadModal');
    const modalContent = modal.querySelector('.modal-content');

    modal.classList.remove('show');
    modalContent.style.transform = 'translate(-50%, -50%) scale(0)';
    modalContent.style.opacity = '0';

    setTimeout(() => {
        modal.style.display = 'none';
    }, 400);
}

document.getElementById('downloadForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const name = encodeURIComponent(document.getElementById('name').value);
    const email = encodeURIComponent(document.getElementById('email').value);
    const url = `https://script.google.com/macros/s/AKfycbz-FQU37VEM1IWu8cEUMPYtxkuksGSgR_gBpmYNRRlQ_K13gpqFmdal-P3vulc0Em78/exec?name=${name}&email=${email}`;

    try {
        const response = await fetch(url);
        const result = await response.json();
        if (result.status === 'success') {
            alert('Thank you! The download link has been sent to your email.');
            closeModal();
        } else {
            alert(result.message || 'An error occurred. Please try again.');
        }
    } catch (error) {
        alert('Connection error. Please try again.');
    }
});