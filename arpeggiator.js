var midi = require('midi');

var midiInput = new midi.input();
var midiOutput = new midi.output();

var input = [];
midiInput.getPortCount();
midiInput.getPortName(0);
midiInput.on("message", function(deltaTime,message) {
    if (message[0] != 144)
        return;

    if (message[2] == 0) {  // note release
        var removeIndex = -1;
        for (var i = 0; i < input.length; i++) {
            if (input[i][1] == message[1]) {
                removeIndex = i;
                break;
            }
        }
        input.splice(removeIndex,1);
    }
    else
        input.push(message);
    console.log(input);
});
midiInput.openPort(0);

midiOutput.openVirtualPort("Arpeggiator");


var Clock = function(tempo, tick) {
    var interval;

    this.run = function() { interval = setInterval(function() {tick()}, 60 * 1000 / tempo);
    }
}
var Arp = function(nextForMode) {
    var self = this; 
    var i = 0;

    this.note = function() {
        if (input.length > 0) {
            var note = nextForMode();
            if (typeof note != 'undefined')
                midiOutput.sendMessage(note) ;
        }
    }
}

var Up = function() {
    var i = 0;

    var next = function() {
        var j = i++;
        if (i > input.length - 1) i = 0;
        return input[j];
    }
    return next;
}

var UpDown = function() {
    var i = 0, mode = 0;

    var next = function() {
        var j = i;
        if (mode == 0) i++; else i--;
        if (i == input.length - 1) mode = 1;
        if (i == 0) mode = 0;
        return input[j];
    }
    return next;
}

var OneThree = function() {
    var i = 0, up = true;

    var next = function() {
        var j = i;
        if (up) i += 2; else i -= 1;
        if (i > input.length - 1) i = i - input.length;
        if (i < 0) i = input.length-1;
        up = !up;
        return input[j];
    }
    return next;
}

var arp1 = new Arp(OneThree());
var clock1 = new Clock(180,arp1.note);
clock1.run();
//setTimeout(function() { input = ["b2","d2","f2","a2"] }, 5000);
