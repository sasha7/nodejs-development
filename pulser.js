/* Using EventEmitter */

const events = require('events');
const util = require('util');

// Pulser class inherits from EventEmitter class using util.inherits.
// Enables sending timed events to any listeners.
function Pulser() {
  events.EventEmitter.call(this);
}

util.inherits(Pulser, events.EventEmitter);

Pulser.prototype.start = function start() {
  setInterval(() => {
    util.log('>>>> pulse');
    this.emit('pulse');
    util.log('<<<< pulse');
  }, 1000);
};

// Instantiate new Pulser object
const pulser = new Pulser();

// Handler function
pulser.on('pulse', () => {
  util.log('pulser received');
});

// Start EventEmitter
pulser.start();
