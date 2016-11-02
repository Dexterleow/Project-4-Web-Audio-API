var express = require('express');
var router = express.Router();
var RecordingTape = require('../models/recordingtape');

// Get Homepage
router.get('/', ensureAuthenticated, function(req, res){
	RecordingTape.find().exec(function(err, tapes) {
		console.log(tapes);
		res.render('index', {tapes: tapes});
	})
	// res.render('index');
});

// Post record new
router.post('/recordnew', ensureAuthenticated, function(req,res){
	console.log(req.body);
	RecordingTape.create({
		username: res.locals.user.username,
		recording: req.body
		// recording: recording
	}, function(err, record) {
		if (err) console.log(err);
		console.log("recorded", record);
		res.render('index', {record: record})
	});
	// res.redirect('/');
})

// Get Records
// router.get('/get-records', ensureAuthenticated, function(req,res,next){
	// console.log("GET REC");
	// RecordingTape.find().exec(function(err, tapes) {
	// 	console.log(tapes)
	// })
// 	var resultArray = [];
// 	var db = req.db;
// 	var collection = db.collection('recordingtapes').find();
// 	collection.forEach(function(recordingtapes, err){
// 	resultArray.push(recordingtapes);
// }), function() {
// 	res.render('index',{users_mixtapes: resultArray});
// };
// })

	// {},function(err, recordingtapes){
	// 	if(err) res.json(err);
	// 	else res.render('index',{
	// 		users: recordingtapes});
	// 	});
	// })

	// Delete Records
	// router.post('/delete-records', ensureAuthenticated, function(req,res,next){
	//
	//
	// })



	function ensureAuthenticated(req, res, next){
		if(req.isAuthenticated()){
			return next();
		} else {
			req.flash('error_msg','You are not logged in');
			res.redirect('/users/login');
		}
	}

	module.exports = router;
