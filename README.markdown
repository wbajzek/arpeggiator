# arpeggiator.js

A midi arpeggiator written with node.js. Currently very crude.
It takes midi input, arpeggiates it, and sends it out through 
a virtual port called "Arpeggiator." Only tested on OSX so far.

Requires node.js and justinlatimer's midi module.
git://github.com/justinlatimer/node-midi.git

## Usage
    node arpeggiator.js 180


First command-line argument is the song tempo.
You can tweak the code at the end to which kind of arpeggio.
