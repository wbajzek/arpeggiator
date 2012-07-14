# arpeggiator.js

A midi arpeggiator written with node.js. Currently very crude.
It takes midi input, arpeggiates it, and sends it out through 
a virtual port called "Arpeggiator." Only tested on OSX so far.

Requires node.js and justinlatimer's midi module.
git://github.com/justinlatimer/node-midi.git

## Usage
    node arpeggiator.js


You can tweak the code at the end to specify tempo and which kind of arpeggio.
