process.on('message',function(msg){
  process.send(msg)
})
console.log('我是子进程')