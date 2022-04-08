const db = require('../dbLink');

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
                let  userData = await db.query('SELECT * FROM users;')
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

   
}    

module.exports = User
