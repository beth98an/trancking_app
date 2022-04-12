const loginForm = document.querySelector('#login')
loginForm.addEventListener('submit', requestLogin)

async function requestLogin(e){
    e.preventDefault();

    try {
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(Object.fromEntries(new FormData(e.target)))
        }
        const r = await fetch(`http://localhost:3000/users/login/`, options)
        const data = await r.json()
        if (data.err){ throw Error(data.err); }
        login(data);
    } catch (err) {
        console.warn(`Error: ${err}`);
    }
}

function login(data){
    localStorage.setItem('username', data.username);
    location.hash = `#${data.username}/`;
}

function logout(){
    localStorage.clear();
    location.hash = '#login/';
}

function currentUser(){
    const username = localStorage.getItem('username')
    return username;
}
