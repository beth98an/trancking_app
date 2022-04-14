/**
 * @jest-environment jsdom
*/
const requests = require('../js/requests')

jest.mock('../js/requests')

global.fetch = require('jest-fetch-mock')

describe('getAllHabits', ()=>{
    test('getAllHabits exists', async()=>{
        let allHabits = await requests.getAllHabits
        expect(allHabits).toBeTruthy()
    })
})

describe('getHabit', ()=>{
    test('getHabit exists', async()=>{
        let habit = await requests.getHabit
        expect(habit).toBeTruthy()
    })
})

describe('newHabit', ()=>{
    test('newHabit exists', async()=>{
        let newHabit = await requests.addNewHabit
        expect(newHabit).toBeTruthy()
    })
})

describe('habitUpdate', ()=>{
    test('habitUpdate exists', async()=>{
        let habitUpdate = await requests.habitUpdate
        expect(habitUpdate).toBeTruthy()
    })
})
