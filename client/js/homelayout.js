let port = 3000
let username = localStorage.getItem('username')

fetch(`http://localhost:${port}/users/${username}`) //change 
.then(resp => resp.json())
.then(resp => setuserid(resp))

function setuserid(resp) {
    user_id = resp.user_id
    localStorage.setItem('user_id', resp.user_id);
}

let user_id = localStorage.getItem('user_id')

//submit form in modal
const addHabitForm = document.getElementById('addHabitForm');
addHabitForm.addEventListener('submit', addHabit);


async function addHabit(e) {
    e.preventDefault();
    const formData = new FormData(addHabitForm)
    const formDataSerialised = Object.fromEntries(formData)
    const jsonObject = {...formDataSerialised, user_id: user_id}
    console.log(jsonObject)

    try{
        const response = await fetch (`http://localhost:${port}/habits/${username}`, {
        method: 'POST', 
        body: JSON.stringify(jsonObject),
        headers: {
            'Content-Type': 'application/json'
        }
        })
        const json = await response.json();
        console.log(json)
        window.location.reload()
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
    habitName.setAttribute('class', 'hab_title');
    habitName.textContent = habit.name
    const habitDesc = document.createElement('p')
    habitDesc.setAttribute('class', 'habit_Desc');
    habitDesc.textContent = habit.description
    const habitFrequency = document.createElement('p')
    habitFrequency.setAttribute('class', 'hab_Descript');
    habitFrequency.textContent = `${habit.frequency} times per ${habit.day_month}`
    
    const updateButton = document.createElement('input')
    updateButton.setAttribute('class', 'btn_update');
    updateButton.setAttribute('type', 'submit')
    updateButton.setAttribute('value', 'update') 
    updateButton.addEventListener('click', function(){
        habitUpdate(habit.habit_id)
    }) 
    
    //add a lil something that shows how many times today already
    const currentCount = document.createElement('p')
    currentCount.setAttribute('class', 'hab_count');
    currentCount.setAttribute('class', 'currentCount')
    currentCount.textContent = `${habit.count} times today` //habit.day_month.count?? where day_month === current

    const showChartButton = document.createElement('input')
    showChartButton.setAttribute('class', 'btn_chart');
    showChartButton.setAttribute('type', 'submit')
    showChartButton.setAttribute('value', 'Show tracking')
    /* showChartButton.addEventListener('click', openChartModal); */
//modal here that opens to chart
    
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

/* function openChartModal() {
    //create modal
    
    const habitChart = new Chart(`${habit.name}`, {
        type: "bar",
        data: {
            labels: [habit.date, habit.date-1, habit.date-2, habit.date-3, habit.date-4, habit.date-5, habit.date-6]
            datasets: [{
            backgroundColor: habit.colour,
            data: [habit.date.count, habit.date-1.] //count per day];
            }]
        },
        options: {...}
        }); 
    }

    //modal.appendchild chart
    //create closebutton
    //modal appendchild(closebutton)
 */


function closeChartModal() {
    openChartModal.display = none
}


function habitUpdate(habit_id){
    console.log(habit_id)
    
    fetch(`http://localhost:${port}/habits/count/${habit_id}`, {
      method: 'POST',
      body: JSON.stringify({habit_id: habit_id}),
      headers: { 'Content-Type': 'application/json' },
    })
    /* location.reload(); */
    console.log('++')
};


const logoutUser = document.getElementById('logout')
logoutUser.addEventListener('click', logUserOut)

function logUserOut(){
    localStorage.clear();
    location.href = 'login.html';
}

