//need prevent default/empty form data submit etc

const { Http2ServerRequest } = require('http2');
const {getAllHabits, getHabit, addNewHabit} = require('./requests');

let port = 3000
let user_id = window.location.hash.substring(1);
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

/* data we want to send = habitData.name, habitData.desription, habitData.frequency, habitData.color */

//amount of tracking - stretch

const addHabitForm = getElementById('addHabitForm');
addHabitForm.addEventListener('submit', addNewHabit);


async function addNewHabit() {
    const formData = new FormData(addHabitForm)
    const formDataSerialised = Object.fromEntries(formData)

    try{
        const response = await fetch (`http://localhost:${port}/user/`, {
        method: 'POST', 
        body: JSON.stringify(formDataSerialised),
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
// put in main?
fetch(`http://localhost:${port}/`)
.then(resp => resp.json())
.then(resp => {
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
    habitFrequency.textContent = `${habit.frequency} times per ${habit.day_month}`
    
    const updateButton = document.createElement('input')
    updateButton.setAttribute('type', 'submit')
    updateButton.setAttribute('value', 'update') 
    updateButton.addEventListener('submit', habitUpdate) 
    
    //add a lil something that shows how many times today already
    const currentCount = document.createElement('p')
    currentCount.setAttribute('class', 'currentCount')
    currentCount.textContent = `${habit.count} times today` //habit.day_month.count?? where day_month === current

    const showChartButton = document.createElement('input')
    showChartButton.setAttribute('type', 'submit')
    showChartButton.setAttribute('value', 'Show tracking')
    showChartButton.addEventListener('click', openChartModal);

    const habitChart = new Chart(`${habit.name}`, {
        type: "bar",
        data: {
            labels: [habit.date, habit.date-1, habit.date-2, habit.date-3, habit.date-4, habit.date-5, habit.date-6]
            datasets: [{
            backgroundColor: habit.colour,
            data: [habit.date.count, habit.date-1.count, habit.date-2.count...] //count per day];
            }]
        },
        options: {...}
        });
    //create modal.display=none
    //modal.appendChild habitChart
    
    ahabit.appendChild(habitName)
    ahabit.appendChild(habitDesc)
    ahabit.appendChild(habitFrequency)
    ahabit.appendChild(updateButton)  
    ahabit.appendChild(currentCount)
    ahabit.appendChild(showChartButton) 

}

function openChartModal() {
    //modal display from none to block
}



function habitUpdate(user_id, habit, count){
    //access current count
    //habit.count+1
    /* for date enter count++ */
    fetch(`http://localhost:${port}/${user_id}/`, {
      method: 'PUT',
      body: JSON.stringify({ habit: habit, count: count }),
      headers: { 'Content-Type': 'application/json' },
    })
    location.reload();
};




