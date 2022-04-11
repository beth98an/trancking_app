const db = require('../dbLink');

class Habit {
    constructor(data){
        this.habit_id = data.habit_id
        this.user_id = data.user_id
        this.name = data.name
        this.question = data.question
        this.frequency = data.frequency
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
                    let habits = await db.query(`INSERT INTO habits (user_id, name, question, frequency, color) VALUES ($1, $2, $3, $4, $5) RETURNING *;`, [habitData.user_id, habitData.name, habitData.question, habitData.frequency, habitData.color])
                    let habit = new Habit(habits.rows[0])
                    resolve(habit)
            } catch (err) {
                reject('User could not be created')
            }
        })
    }


}    

module.exports = Habit
