var express = require('express');
var router = express.Router();
var RecordingTape = require('../models/recordingtape');
var test = "Hello";

function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
		req.flash('error_msg','You are not logged in');
		res.redirect('/users/login');
	}
}

// Get Homepage
router.get('/', ensureAuthenticated, function(req, res){
	RecordingTape.find().exec(function(err, tapes) {
		//console.log(tapes);
		// tapes = tapes;
		console.log(tapes);
		var mixtapes = JSON.stringify(tapes)
		res.render('index', {tapes: tapes, mixtapes: mixtapes, user: req.user,helpers:{
			isOwner: function(conditional, options) {
				if (req.user.username === conditional) {
					return options.fn(this)
				} else {
					return options.inverse(this);
				}
			}
		}});

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




// Check if user is real
function isUsersReal (req, project4webaudio) {
	console.log("checking user");

	if (req.user.name !== project4webaudio.username) {

		console.log("Invalid User");
		res.json({ message: 'FAILED' });
		return false
	}
	return true
}
//



// Delete a record
router.delete('/record/:id', ensureAuthenticated, function(req, res) {
	console.log("Is this working?");
	RecordingTape.findById(req.params.id).then(function (webaudio) {
		if (webaudio) {
			if (!isUsersReal(req,webaudio)) return
			console.log("server delete post");
			RecordingTape.remove({
				_id: req.params.id //mongoose way of selecting the id
			}, function(err, tape) {
				if (err)
				res.send(err);
				res.json({ message: 'Successfully deleted' });
				console.log("Post has been successfully deleted");
			});
		} else {
			console.log("Invalid Record");
			res.json({ message: 'Record FAILED' });
		}
	});
});


module.exports = router;
