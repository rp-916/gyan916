var expect = require('expect');

var {generateMessage, generateLocMsg} = require('./message.js');

describe("GenerateMessage", ()=>{
    it("Should generate correct msg obj",()=>{
        var from = "Rupesh Purushotham";
        var text = "Hi Gyan 916";

        expect(generateMessage(from,text).from).toBe(from);
        expect(generateMessage(from,text).text).toBe(text);

    });
});

describe("GenerateLocationMessage", ()=>{
    it("Should generate correct Loc url",()=>{
        var from = "Rupesh Purushotham";
        var lat = 91.6;
        var long = 61.9;
        var url = `https://www.google.com/maps?q=${lat},${long}`;

        var locMsg = generateLocMsg(from, lat, long);

        expect(locMsg.from).toBe(from);
        expect(locMsg.url).toBe(url);

    });
});