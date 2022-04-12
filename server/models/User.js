const db = require('../dbLink');
// const { propfind } = require('../routes/users');

class User {
    constructor(data){
        this.user_id = data.user_id
        this.username = data.username
        this.password = data.password
        this.email = data.email
        this.name = data.name
    }

    static get all(){
        return new Promise (async (resolve, reject) => {
            try {
                let userData = await db.query('SELECT * FROM users;')
                let users = userData.rows.map(u => new User(u))
                resolve (users)
            } catch (err) {
                reject('Book not found')
            }
        })
    }

    static async create(userData) {
        return new Promise (async (resolve, reject) => {
            try {
                    let users = await db.query(`INSERT INTO users (username, password, email, name) VALUES ($1, $2, $3, $4) RETURNING *;`, [userData.username, userData.password, userData.email, userData.name])
                    let user = new User(users.rows[0])
                    resolve(user)

            } catch (err) {
                reject('User could not be created')
            }
        })
    }

    static async show(user_id) {
        return new Promise (async (resolve, reject) => {
            try {
                let userData = await db.query(`SELECT * FROM users WHERE user_id = $1;`, [user_id])
                let user = new User(userData.rows[0])
                resolve(user)
            } catch (err) {
                reject('User not found!')
            }
        })
    }

    destroy() {
        return new Promise (async (resolve, reject) => {
            try {
                const result = await db.query(`DELETE FROM users WHERE user_id = $1 RETURNING user_id;`, [this.user_id])
                resolve(`User ${result.user_id} was successfully deleted.`)
            } catch (err) {
                reject('User could not be deleted.')
            }
        })
    }
   
}    

module.exports = User
