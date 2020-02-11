var redis = require("redis");
var client = redis.createClient();

client.on("connect", function() {
  console.log("connected");
});

function wait (tempo){
    return new Promise((resolve)=>{
        setTimeout(resolve,tempo)
    });
}

setImmediate(async () =>{
    for (i = 1; i <= 15; i++) {
        client.set(`JWT${[i]}`, `SESSION_TOKEN${[i]}`);
        client.expire(`JWT${[i]}`, 15);
        client.get(`JWT${[i]}`, function(err, reply) {
          if (reply) {
            console.log(reply);
          } else {
            console.log(err);
          }
        });
        await wait(1000)
      }
})

