let username = localStorage.getItem('username')


// function to retrieve all
async function getAllHabits(username) {
    try {
        const resp = await fetch(`http://localhost:3000/${username}/`);
        const data = await resp.json()
        return data;
    } catch (err) {
        console.warn(err);
    }
};

// function to retrieve a single habit post by its ID
async function getHabit(username) {
    try {
        const resp = await fetch(`http://localhost:3000/habits/${username}`);
        const data = await resp.json();
        return data;
    } catch (err) {
        console.warn(err);
    }
};

// function that sends the post to the server and then redirects to the route.
async function addNewHabit(data) {
    try {
        const options = {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({data})
        }

        const response = await fetch(`http://localhost:3000/${username}/`, options);
        const post = await response.json();
        /* window.location.hash = `#${habit.id}` */
    } catch (err) {
        console.warn(err)
    }
}

function habitUpdate(habit_id){
    const currentCount = habit.id.day_month.count //where day_Month == today
    const newcount = currenCount++
    fetch(`http://localhost:${port}/${username}/`, {
      method: 'PUT',
      body: JSON.stringify({count: newcount }),
      headers: { 'Content-Type': 'application/json' },
    })
    location.reload();
};

module.exports = {getAllHabits, getHabit, addNewHabit, habitUpdate}


//do we need crud functionality??

