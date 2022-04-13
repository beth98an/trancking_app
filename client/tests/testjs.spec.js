/**
 * @jest-environment jsdom
*/
const fs = require('fs');
const path = require('path');
const html = fs.readFileSync(path.resolve(__dirname,  '../userHome.html'),  'utf-8');

const auth = require('../js/auth')
jest.mock('../js/auth')

global.fetch = require('jest-fetch-mock')

describe('fetch test', () => {
    beforeEach(() => {
        document.documentElement.innerHTML = html.toString();
        fetch.resetMocks()
    })
    test('it makes a fetch call to register a user', async()=> {
        await auth.registerUser
        expect(fetch).toBeTruthy()
    })
    test('it makes a fetch call to request a login', async()=> {
        await auth.requestLogin()
        expect(fetch).toBeTruthy()
    })
    test('it makes a fetch call to request a login', async()=> {
        let login = auth.login
        expect(login).toBeTruthy()
    })
    test('it makes a fetch call to request a login', async()=> {
        let currentUser = auth.currentUser
        expect(currentUser).toBeTruthy()
    })

})




// /**
//  * @jest-environment jsdom
// */

// describe('test event listener', () => {
//     let sut;
//     let events ={};
//     beforeEach(() => {
//         sut = new Dependency();
//         events = {}
//         document.addEventListener = jest.fn((event, callback) => {
//             events[event] = callback;
//       });
    
//       document.removeEventListener = jest.fn((event, callback) => {
//             delete events[event];
//       });
//     })
//     test("It should pass", () => {
//         const instanceMock = jest.spyOn(sut, "loaded");
//         document.addEventListener = jest
//             .fn()
//             .mockImplementationOnce((event, callback) => {
//             callback();
//             });
//         sut.setupEvents();
//         expect(document.addEventListener).toBeCalledWith(
//             "click",
//             expect.any(Function)
//         );
//         expect(instanceMock).toBeCalledTimes(1);
//     });
// });

// class Dependency {
//     setupEvents() {
//         document.addEventListener("click", () =>{
//             this.loaded()
//         });
//     }
  
//     loaded() {
//         console.log('loaded')
//     }
// }
