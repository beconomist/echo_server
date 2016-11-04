var net = require('net'); // net module is another TCP-based communication module
var stringInput = "";

var server = net.createServer(function(socket) {
  // 只要有TCP connection進來時，function(socket){}就會被觸發
  console.log('server connected');

  socket.on('data', function(data) { // socket.on是一個event emitter，當有data進來時，就會觸發後面的callback
    stringInput = data.toString().trim() // 把data存到global variable
    socket.write(data); // echo 使用者打的東西回去


    // ***
    // 現在這邊是一個很簡單的字串紀錄
    // 但也可以寫成互動式資料輸入系統, 雖然 Telnet 很 low
    // 現在的目標是寫一個教室日記 Web App
    // ***

    MongoClient.connect(url, function(err, db) { // 連結到mongodb
      if(!err) { console.log("Mongodb connected!"); }
      insertDocument(db, function() { // 呼叫 insertDocument, 結束後關掉db
        console.log("Mongodb disconnected!");
        db.close();
      });
    });
  });
  socket.on('end', function() { // telnet 離線時
    console.log('server disconnected')
  });
});
server.listen(8888, function() {  // 啟動 TCP server
  console.log('server listening');
});

// 設定 Mongodb
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/stringDb";

var insertDocument = function(db, callback) {
  db.collection('strings').insertOne({  // 在strings這個collection裡插入 string: stringInput
    "string": stringInput
  }, function(err, result) {
    if (!err) {console.log("[DATA INSERTION]: " + stringInput);} //輸入無異常，log結果
    callback();
  });
};
