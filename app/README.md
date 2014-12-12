INSTALAR DEPENDENCIAS DE LA APP

npm install
bower install

=====
DEBUG

SERVER
DEBUG=* node server.js

SOCKET.IO SIDE CLIENT
localStorage.debug="socket.io-client:socket"

MONGODB
mongoose.set('debug', true)

====
DAR DE ALTA UN USUARIO

cd app/models/
editar las variables del archivo "generar-usuario.js"
var EMAIL = "tusuario@tuemail.net"
var PASSWORD = "password"
node generar-usuario.js

====

INGRESO A LA CARPETA DONDE ESTA LA APP
cd /home/luis/mapacucc/datos-luminarias/app

REVISO SI ESTA CORRIENDO Y CUAL ES LA RUTA DEL LOG
forever list

EJEMPLOS
INFORMA QUE NO ESTA LA APP ONLINE CON FOREVER
"info:    No forever processes running"

INFORMA QUE LA APP ESTA ONLINE, DISPONE DEL UID, COMMAND, NOMBRE SCRIPT, PID y PATH LOGFILE CON UPTIME.
info:    Forever processes running
data:        uid  command         script    forever pid   id logfile                      uptime        
data:    [0] Cin4 /usr/bin/nodejs server.js 31013   31015    /home/luis/.forever/Cin4.log 0:6:16:21.506

EN LA FILA "logfile" ESTA LA UBICACION DEL LOG
tail -f /home/luis/.forever/"nombre-archivo".log 

PARA HACER UN STOP A LA APLICACION
forever stop 0

EJEMPLO SI NO ESTA ONLINE, INFORMA LO SIGUIENTE
"error:   Forever cannot find process with index: 0"

====

ARRANCAR LA APLICACION DENTRO DEL DIRECTORIO /app
forever start server.js

START SERVER CON MAXIMO DE ESPACIO EN MEMORIA QUE EJECUTARA EL MOTOR V8
forever start -max-old-space-size=8192 server.js

TENDREMOS UNA SALIDA COMO LA SIGUIENTE
warn:    --minUptime not set. Defaulting to: 1000ms
warn:    --spinSleepTime not set. Your script will exit if it does not stay up for at least 1000ms
info:    Forever processing file: server.js

ASEGURARNOS QUE TODO FUNCIONE BIEN, BUSCAMOS EL NOMBRE DEL LOG Y LO CORREMOS CORREMOS CON TAIL
forever list
tail -f /root/.forever/NOMBRE.log

POSIBLES ESCENARIOS DE ERRORES:
	warn: error raised: Error: listen EADDRINUSE "SOCKET.IO YA ESTA CORRIENDO, MATAR APP CON KILL -9 $NUMERO_PROCESO"

PARA ELIMINAR EL PROCESSO DE LA APP
AVERIGUAMOS CUAL ES SU "PID" CON EL SIGUIENTE COMANDO
ps aux | grep -i "node"

MATAMOS LA APP CON KILL
kill -9 "numero pid"