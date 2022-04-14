/**
 * @jest-environment jsdom
*/
const fs = require('fs');
const path = require('path');
const html = fs.readFileSync(path.resolve(__dirname,  '../userHome.html'),  'utf-8');

describe('login.html', () => {
    beforeEach(() => {
        document.documentElement.innerHTML = html.toString();
    })
    describe ('head', () => {
        test('it has a title', () => {
            let title = document.querySelector("title");
            expect(title).toBeTruthy();
            expect(title.textContent).toContain('Habitat')
        })
    })
    // describe('header', ()=>{
    //     test('it has a heading', ()=>{
    //         let heading = document.querySelector('#welcome')
    //         expect(heading).toBeTruthy()
    //         expect(heading.textContent).toEqual('HELLO AGAIN USER')
    //     })
    // })
    // describe('add new habit form', ()=>{
    //     test('form exists', ()=>{
    //         let form = document.querySelector('#addHabit')
    //         expect(form).toBeTruthy()
    //     })
    //     test('form has input for habit name', ()=>{
    //         let habitName = document.querySelector('#habitName')
    //         expect(habitName).toBeTruthy()
    //         expect(habitName.type).toEqual('text')
    //     })
    //     test('form has input for habit description', ()=>{
    //         let habitDesc = document.querySelector('#habitDesc')
    //         expect(habitDesc).toBeTruthy()
    //         expect(habitDesc.type).toEqual('text')
    //     })
    //     test('form has input for habit frequency', ()=>{
    //         let habitFreq = document.querySelector('#frequency')
    //         expect(habitFreq).toBeTruthy()
    //         expect(habitFreq.type).toEqual('text')
    //     })
    //     test('form has submit button', ()=>{
    //         let submit = document.querySelector('#sbutton')
    //         expect(submit).toBeTruthy()
    //         expect(submit.type).toEqual('submit')
    //     })
    // })
})
