const p = require('portscanner');

p.findAPortNotInUse(9000, 9999, (e, port) =>
  process.stdout.write(port.toString())
);
