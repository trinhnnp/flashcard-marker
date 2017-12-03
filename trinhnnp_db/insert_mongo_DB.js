var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/flashcardMakerDB";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  getNextSequence(db, 'userid', function(err, result) {
	  var myobj = {
	  	_id: result,
	  	username: "trinhtrinh",
	  	password: "trinhtrinh",
	  	role: "1",
	  	screen_name: "trinh trinh",
	  	date: '2017-12-02:13:41:23'
	  };
	  db.collection("users").insertOne(myobj, function(err, res) {
	    if (err) throw err;
	    console.log("1 document inserted");
	    db.close();
	  });
  });
});

function getNextSequence(db, name, callback) {
   db.collection("counters").findAndModify(
    { _id: name },
    null,
    { $inc: { "seq": 1 } },
    { new: true, upsert: true},
    function(err, result){
        if (err) callback(err, result);
        callback(err, result.value.seq);
    }
  );
}