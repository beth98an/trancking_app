/**
 * @jest-environment jsdom
*/
const fs = require('fs');
const path = require('path');
const html = fs.readFileSync(path.resolve(__dirname,  '../login.html'),  'utf-8');

describe('login.html', () => {
    beforeEach(() => {
        document.documentElement.innerHTML = html.toString();
    })
    describe ('head', () => {
        test('it has a title', () => {
            let title = document.querySelector("title");
            expect(title).toBeTruthy();
        })
    })
    describe('header', ()=>{
        test('it has a heading', ()=>{
            let heading = document.querySelector('#heading')
            expect(heading).toBeTruthy()
            expect(heading.textContent).toEqual('Welcome to Our App')
        })
    })
    describe('login form', ()=>{
        test('form exists', ()=>{
            let form = document.querySelector('form')
            expect(form).toBeTruthy()
        })
        test('form has input for name', ()=>{
            let inputName = document.querySelector('#name')
            expect(inputName).toBeTruthy()
            expect(inputName.type).toEqual('text')
        })
        test('form has input for password', ()=>{
            let inputPass = document.querySelector('#password')
            expect(inputPass).toBeTruthy()
            expect(inputPass.type).toEqual('text')
        })
        test('form has submit button', ()=>{
            let submit = document.querySelector('#submit')
            expect(submit).toBeTruthy()
            expect(submit.type).toEqual('submit')
            expect(submit.classList).toContain('login-btn')
        })
    })
})
