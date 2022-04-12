//need prevent default/empty form data submit etc

const { Http2ServerRequest } = require('http2');
const {getAllHabits, getHabit, addNewHabit} = require('./requests');

let port
let user_id
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


async function addNewHabit() {
    const formData = new FormData(addHabitForm)
    const formDataSerialised = Object.fromEntries(formData)

    const jsonObject = {...formDataSerialised, user_id: user_id}

    try{
        const response = await fetch (`http://localhost:${port}/`, {
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
    currentCount.textContent = `${habit.count} times today`

    const showChartButton = document.createElement('input')
    showChartButton.setAttribute('type', 'submit')//could be type button
    showChartButton.setAttribute('value', 'Show tracking')
    showChartButton.addEventListener('click', function() { 
        showChart(habit)
    });
    
    ahabit.appendChild(habitName)
    ahabit.appendChild(habitDesc)
    ahabit.appendChild(habitFrequency)
    ahabit.appendChild(updateButton)  
    ahabit.appendChild(currentCount)
    ahabit.appendChild(showChartButton) 

}


function showChart(habit) {
    var xValues = []//today's date - [-7]];
    //could do a switch func for days of the week
    var yValues = []//count per day];
    var barColors = []//colour chosen];

    const habitChart = new Chart(`${habit.name}`, {
    type: "bar",
    data: {
        labels: xValues,
        datasets: [{
        backgroundColor: barColors,
        data: yValues
        }]
    },
    options: {...}
    });

    //modal
}


function habitUpdate(user_id, habit, frequency){
    //habit.count+1
    /* for date enter count++ */
    fetch(`http://localhost:${port}/${user_id}/`, {
      method: 'PUT',
      body: JSON.stringify({ habit: habit, frequency: frequency }),
      headers: { 'Content-Type': 'application/json' },
    })
    location.reload();
};




