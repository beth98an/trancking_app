const db = require('../dbLink')
const User = require('./User')

class Habit {
    constructor(data){
        this.habit_id = data.habit_id
        this.user_id = data.user_id
        this.name = data.name
        this.description = data.description
        this.frequency = data.frequency
        this.day_month = data.day_month
        this.color = data.color
        this.creation_date = data.creation_date
        
    }

    static get all(){
        return new Promise (async (resolve, reject) => {
            try {
                let habitData = await db.query('SELECT * FROM habits;')
                let habits = habitData.rows.map(h => new Habit(h))
                resolve (habits)
            } catch (err) {
                reject('Habit not found')
            }
        })
    }

    static async create(habitData) {
        return new Promise (async (resolve, reject) => {
            try {
                let habits = await db.query(`INSERT INTO habits (user_id, name, description, frequency, day_month, color) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;`,[habitData.user_id, habitData.name, habitData.description, habitData.frequency, habitData.day_month, habitData.color])
                let habit = new Habit(habits.rows[0])
                resolve(habit)
            } catch (err) {
                reject('User could not be created')
            }
        })
    }

    static async show(habit_id) {
        return new Promise (async (resolve, reject) => {
                try {
                    let habitData = await db.query(`SELECT * FROM habits WHERE habit_id = $1;`, [habit_id])
                    let habit = new Habit (habitData.rows[0])
                    resolve(habit)
                } catch (err) {
                    reject('Habit not found!')
                }
            }  
        )
    }

    static async showHabits(username) {
        return new Promise (async (resolve, reject) => {
            try {
                let habitData = await db.query(`SELECT habits.* FROM habits INNER JOIN users ON users.user_id = habits.user_id WHERE users.username = $1;`, [username])
                let habits = habitData.rows
                resolve(habits)
            } catch (err) {
                reject('Habbits by user not found.')
            }
        })
    }
  
    destroy() {
        return new Promise (async (resolve, reject) => {
            try {
                const result = await db.query(`DELETE FROM habits WHERE habit_id = $1 RETURNING habit_id;`, [this.habit_id])
                resolve(`Habit ${result.habit_id} was successfully deleted!`)
            } catch (err) {
                reject('Habit could not be deleted.')
            }
        })
    }
}    

module.exports = Habit
 