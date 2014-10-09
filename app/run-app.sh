forever start app.js
echo $(forever list | grep "/opt/meanstack" | awk '{print $8}')
