/**
 * @jest-environment jsdom
*/
const requests = require('../js/requests')

describe('getAllHabits', ()=>{
    test('getAllHabits exists', ()=>{
        let allHabits = requests.getAllHabits
        expect(allHabits).toBeTruthy()
    })
})

describe('getHabit', ()=>{
    test('getHabit exists', ()=>{
        let habit = requests.getHabit
        expect(habit).toBeTruthy()
    })
})

describe('newHabit', ()=>{
    test('newHabit exists', ()=>{
        let newHabit = requests.newHabit
        expect(newHabit).toBeTruthy()
    })
})
