// function to retrieve all
async function getAllHabits() {
    try {
        const resp = await fetch(`http://localhost:3000/habits`);
        const data = await resp.json()
        return data;
    } catch (err) {
        console.warn(err);
    }
};

// function to retrieve a single habit post by its ID
async function getHabit(id) {
    try {
        const resp = await fetch(`http://localhost:3000/habits/${id}`);
        const data = await resp.json();
        return data;
    } catch (err) {
        console.warn(err);
    }
};

// function that sends the post to the server and then redirects to the route.
async function addNewHabit(e) {
    e.preventDefault();
    try {
        const options = {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({SOMETHING: e.target.SOMETHING.value, })
        }

        const response = await fetch('http://localhost:3000/habits', options);
        const post = await response.json();
        window.location.hash = `#${habit.id}`
    } catch (err) {
        console.warn(err)
    }
}


function habitUpdate(user_id, habit, frequency){
    //habit.count+1
    /* for date enter count++ */
    fetch(`http://localhost:${port}/count/`, {
      method: 'PUT',
      body: JSON.stringify({ habit: habit, frequency: frequency }),
      headers: { 'Content-Type': 'application/json' },
    })
    location.reload();
};




//do we need crud functionality??

