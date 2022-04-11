//need prevent default/empty form data submit etc

const { Http2ServerRequest } = require('http2');
const {getAllHabits, getHabit, addNewHabit} = require('./requests');

//is this where we do window hash endpoint per userID
//let user_id = window.location.hash.substring(1);
//HOW TO Define USERID and redirect to there

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

//amount of tracking - stretch

const addHabitForm = getElementById('addHabitForm');
addHabitForm.addEventListener('submit', addNewHabit);

//async POST? e.preventDefault? HOW TO SEND USERID??
function addNewHabit() {
    const formData = new FormData(addHabitForm)
    const formDataSerialised = Object.fromEntries(formData)

    const current = new Date().toLocaleString();

    const jsonObject = {...formDataSerialised, user_id: user_id, dateTime: current}

    try{
        const response = await fetch (`http://localhost:${port}/${user_id}/`, {
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

/* ???
async function loadHabit(user_id){
    const data = await getAllHabits(user_id);
    data.forEach(habit => renderCard(habit));
} */

// fetching all posts for this user
fetch(`http://localhost:${port}/${user_id}/`)
.then(resp => resp.json())
.then(resp => {
    //console.log(resp) - use this to test resp and endpoints
    resp.forEach(habit => {
        showCurrentlyTracking(habit)
    });
    
})

//should this be async?
function showCurrentlyTracking(habit) {
    const ahabit = document.createElement('div')
    ahabit.setAttribute('class', 'habitContainer');
    
    const habitName = document.createElement('h3')
    habitName.textContent = habit.name
    const habitDesc = document.createElement('p')
    habitName.textContent = habit.description
    const habitFrequency = document.createElement('p')
    habitFrequency.textContent = habit.frequency
    
    const updateButton = document.createElement('input')
    //see pseudocode - 
    updateButton.setAttribute('type', 'submit')
    updateButton.setAttribute('value', 'done') //or update
    updateButton.addEventListener('submit', habitUpdate) //change func depending on type?

    ahabit.appendChild(habitName)
    ahabit.appendChild(habitDesc)
    ahabit.appendChild(habitFrequency)

    /* if frequency = yes/no
    load a tick box that submits a date to backend
    updateButton.setAttribute('class', 'updateYesNo')
    should we add limit to number of times this can be pressed?
    
    else
    load some level of quantity to send to backend
    const formQuantity = document.createElement('form')
    const enterQuantity = document.createElement('input')
    enterQuantity.setAttribute('class', 'updateQuantity')
    enterQuantity.setAttribute('name', 'frequency')
    enterQuantity.setAttribute('type', 'text')
    formQuanity.appendChild(enterQuantity)
    formQuanity.appendChild(updateButton)

    */

    //open modal to a graph - if statement for custom day/every mon/tues/sat etc know if ahead or behind goals?
    
    
}


//check box - did you do this today? sends form data of current time to backend
//add event listener


function habitUpdate(user_id, habit, frequency){
    //definee frequency
    /* if class = yes/no or quantity empty - get current time 
    else quantity */
    fetch(`http://localhost:${port}/${user_id}/`, {
      method: 'PUT',
      body: JSON.stringify({ habit: habit, frequency: frequency }),
      headers: { 'Content-Type': 'application/json' },
    })
    location.reload();
};





//NOTES

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

