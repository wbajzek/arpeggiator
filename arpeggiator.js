//var midi = require('midi');
//
//var midiInput = new midi.input();
//
//input.getPortCount();
//input.getPortName(0);
//input.on("message", function(deltaTime,message) {
//    console.log('m:'+message+' d:'+deltaTime);
//});
//input.openPort(0);




var Clock = function(tempo, tick) {
    var interval;

    this.run = function() {
        interval = setInterval(function() {tick()}, 60 * 1000 / tempo);
    }
}
var Arp = function(nextForMode) {
    var self = this; 
    var i = 0;

    this.note = function() {
        console.log(nextForMode()) ;
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

var input = ["a1","c1","e1","f1"];
var arp1 = new Arp(OneThree());
var clock1 = new Clock(180,arp1.note);
clock1.run();
//setTimeout(function() { input = ["b2","d2","f2","a2"] }, 5000);
