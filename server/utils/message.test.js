var expect = require('expect');

var {generateMessage} = require('./message.js');

describe("GenerateMessage", ()=>{
    it("Should generate correct msg obj",()=>{
        var from = "Rupesh Purushotham";
        var text = "Hi Gyan 916";

        expect(generateMessage(from,text).from).toBe(from);
        expect(generateMessage(from,text).text).toBe(text);

    });
});