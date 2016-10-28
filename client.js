var net = require('net');
var client = net.connect({port: 8888}, function() {
  console.log('client connected');
  client.write('hello world');
});
client.on('data', function(data) {
  console.log(data.toString());
})
// client.on('end', function() {
//   console.log('client disconnected');
// });
