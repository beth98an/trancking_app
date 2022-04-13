let port = 3000
let username = localStorage.getItem('username')


//submit form in modal
const addHabitForm = document.getElementById('addHabitForm');
addHabitForm.addEventListener('submit', addHabit);


async function addHabit(e) {
    e.preventDefault();
    const formData = new FormData(addHabitForm)
    const formDataSerialised = Object.fromEntries(formData)
    console.log(formDataSerialised)

    /* addNewHabit(formDataSerialised) */

    try{
        const response = await fetch (`http://localhost:${port}/habits/${username}`, {
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

fetch(`http://localhost:${port}/habits/find/${username}`) //change endpoint
.then(resp => resp.json())
/* .then(resp => console.log(resp)) */
.then(resp => showTracking(resp))


//should this be async?
function showTracking(habits) {
    habits.forEach(habit => {
    const main = document.querySelector('main')

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
    /* updateButton.addEventListener('submit', habitUpdate(habit.habit_id))  */
    
    //add a lil something that shows how many times today already
    const currentCount = document.createElement('p')
    currentCount.setAttribute('class', 'currentCount')
    currentCount.textContent = `${habit.count} times today` //habit.day_month.count?? where day_month === current

    const showChartButton = document.createElement('input')
    showChartButton.setAttribute('type', 'submit')
    showChartButton.setAttribute('value', 'Show tracking')
    showChartButton.addEventListener('click', openChartModal);

    /* const habitChart = new Chart(`${habit.name}`, {
        type: "bar",
        data: {
            labels: [habit.date, habit.date-1, habit.date-2, habit.date-3, habit.date-4, habit.date-5, habit.date-6]
            datasets: [{
            backgroundColor: habit.colour,
            data: [habit.date.count, habit.date-1.] //count per day];
            }]
        },
        options: {...}
        }); */
    //create modal.display=none
    //modal.appendChild habitChart
    
    ahabit.appendChild(habitName)
    ahabit.appendChild(habitDesc)
    ahabit.appendChild(habitFrequency)
    ahabit.appendChild(updateButton)  
    ahabit.appendChild(currentCount)
    ahabit.appendChild(showChartButton) 

    
    main.appendChild(ahabit)
    console.log('habitlisted')
    
    })
}

function openChartModal() {
    //modal display from none to block
}








