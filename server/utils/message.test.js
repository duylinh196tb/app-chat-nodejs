const expect = require('expect')

var {generateMessage, generateLocationMessage} = require('./message')

describe('GENERATE MESSAGE', () => {
    it('should generate message', () => {
        var from = 'abc';
        var text = 'xyz';
        var message = generateMessage(from, text)

        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({from, text})
    })
})

describe('GENERATE LOCATION MESSAGE', () => {
    it('should generate location message', () => {
        var from = 'abc';
        var lat = 15;
        var lng = 19;
        var url = 'https://www.google.com/maps?q=15,19';
        var message = generateLocationMessage(from, lat, lng);

        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({from, url})


    })
})