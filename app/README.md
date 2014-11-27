npm install
bower install

RUN MODO DEBUG

server side
DEBUG=* node server.js

or

client side
localStorage.debug="socket.io-client:socket"

====
damos de alta usuario para ingresar

cd models/
node test-db.js
