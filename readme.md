**Multiplayer UNO game using Node.js and Vue.js**

Build Vue client 
``` 
npm run build
```
Run Node server on localhost:80 (might need to change some config to allow it to run on port 80, or change userd port to 3000 in server.js and clientApp.vue)
``` 
node server.js
``` 
To run dockerised Node.js app accessible in your local network
``` 
docker-compose up -d
```
Might need to set up port forwarding for docker containers on Ubuntu 
```
sudo iptabled -P FORWARD ACCEPT
sudo sysctl net.ipv4.conf.all.forwarding=1         
```
Find out my ip address for wireless connection
```
ip addr | grep wlp 
```

