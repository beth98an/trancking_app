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
            //expect(title.textContent).toContain('Welcome');
        })
    })
})
