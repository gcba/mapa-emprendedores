forever start server.js
echo $(forever list | grep "/opt/meanstack" | awk '{print $8}')
