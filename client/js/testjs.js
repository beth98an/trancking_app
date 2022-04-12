const newHabitButton = document.getElementById('newHabitButton')
newHabitButton.addEventListener('click', openModal)

const newHabitModal = document.getElementById('newHabitModal')

const closeBtn = document.getElementById('closeBtn')
closeBtn.addEventListener('click', closeModal);

function openModal() {
    newHabitModal.style.display = 'block';
}

function closeModal() {
    newHabitModal.display = 'none';
}
