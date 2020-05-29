import gsap from "gsap";

export default {
  data: function () {
    return {
        config:{
        initialized:false,
        playersInitialized:false,
        drawPos:{x:200,y:170},
        discardPos:{x:400,y:170},
        players:{},
        timeline:null,
        specialCard:false,
      }
    }
  },
  methods:{
    namePosition:function(clientName){
      if(typeof this.config.players[clientName] !== 'undefined'){  
          let pos = this.config.players[clientName];              
          if(clientName === this.self){
              return {
                  x:pos.x,
                  y:pos.y + 155
              };
          }else{
              return {
                  x:pos.x,
                  y:pos.y + 120
              };
          }
      }
    },  
    initClientsConfig:function(clients){                
      this.config.players = {};
      let count = clients.length - 1;
      let marg = 800 / count;
      let index = 0;
      for(let i=0; i<clients.length; i++){
          if(clients[i].name == this.self){
              this.config.players[clients[i].name] = {
                  x:400,
                  y:340,
                  scale:1
              };
          }else{
             this.config.players[clients[i].name] = {
                  x:((marg / 2) + (index * marg)),
                  y:-20,
                  scale:0.6
              };
              index++;
          }
      }
    },     
  },
  mounted:function(){
    this.config.timeline = gsap.timeline();
  }
}