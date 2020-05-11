**Multiplayer UNO game using Node.js and Vue.js**

To run dockerised Node.js app accessible in your local network
``` 
docker-compose up -d
```
Set up port forwarding for docker containers on Ubuntu 
```
sudo iptabled -P FORWARD ACCEPT
sudo sysctl net.ipv4.conf.all.forwarding=1         
ip addr | grep wlp

```