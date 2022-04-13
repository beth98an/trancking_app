/**
 * @jest-environment jsdom
*/

describe('test event listener', () => {
    let sut;
    let events ={};
    beforeEach(() => {
        sut = new Dependency();
        events = {}
        document.addEventListener = jest.fn((event, callback) => {
            events[event] = callback;
      });
    
      document.removeEventListener = jest.fn((event, callback) => {
            delete events[event];
      });
    })
    test("It should pass", () => {
        const instanceMock = jest.spyOn(sut, "loaded");
        document.addEventListener = jest
            .fn()
            .mockImplementationOnce((event, callback) => {
            callback();
            });
        sut.setupEvents();
        expect(document.addEventListener).toBeCalledWith(
            "click",
            expect.any(Function)
        );
        expect(instanceMock).toBeCalledTimes(1);
    });
});

class Dependency {
    setupEvents() {
        document.addEventListener("click", () =>{
            this.loaded()
        });
    }
  
    loaded() {
        console.log('loaded')
    }
}
