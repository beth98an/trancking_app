/* const {getAllHabits, getHabit, addNewHabit} = require('./requests'); */

//is this where we do window hash endpoint per userID
let user_id
//HOW TO SEND USERID - its a hash??

//modal open and close

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



//submit form in modal

/* data we want to send = habitData.user_id, habitData.name, habitData.desription, habitData.frequency, habitData.color */
 

const addHabitForm = getElementById('addHabitForm');
addHabitForm.addEventListener('submit', addNewHabit);

//async POST? e.preventDefault? HOW TO SEND USERID??
function addNewHabit() {
    const formData = new FormData(addHabitForm)
    const formDataSerialised = Object.fromEntries(formData)

    const current = new Date().toLocaleString();

    const jsonObject = {...formDataSerialised, user_id: user_id, dateTime: current}

    //console.log(jsonObject) - use for testing endpoints
    
    try{
        const response = await fetch ("http://localhost:3000/", {
        method: 'POST', 
        body: JSON.stringify(jsonObject),
        headers: {
            'Content-Type': 'application/json'
        }
        })
        const json = await response.json();
        console.log(json)
    }catch(e){
        console.error(e);
        alert('There was an error')
    }
}




//load container below

// fetching all posts for this user
fetch(`http://localhost:${port}/#${user_id}`)
.then(resp => resp.json())
.then(resp => {
    //console.log(resp) - use this to test resp and endpoints
    resp.forEach(habit => {
        showCurrentlyTracking(habit)
    });
    
})

//should this be async?
function showCurrentlyTracking(habit) {

}






//NOTES
const navLinks = document.querySelectorAll('a.navlink');
const main = document.querySelector('main');

window.addEventListener('hashchange', updateContent);

function updateNav(hash) {
    const updateLink = link => {
        link.classList = (link.textContent == '+' && hash.includes('new') || hash.includes(link.textContent)) ? ['navlink', 'current'] : ['navlink']
    };
    navLinks.forEach(updateLink)
}

function updateMain(hash) {
    main.innerHTML = '';
    if (hash) {
        let [category, id] = hash.split('/');
        id ? loadModalFor(category, id) : loadIndexFor(category)
    } else {
        const header = document.createElement('h1');
        header.className = 'title';
        header.textContent = "Welcome to the Reading Room";
        main.appendChild(header);
    }
}

async function loadIndexFor(category){
    modal.style.display = 'none';
    const data = await getAll(category);
    data.forEach(a => renderCard(a, category));
}

function renderCard(data, category){
    let link = document.createElement('a');
    let card = document.createElement('div');
    card.className = 'card';
    link.href = `#${category}/${data.id}` 
    card.textContent = data.name || data.title;
    link.appendChild(card);
    main.appendChild(link);
}

function updateContent(){
    let hash = window.location.hash.substring(1);
    updateNav(hash);
    updateMain(hash);
}
