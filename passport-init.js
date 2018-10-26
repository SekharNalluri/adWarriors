var Advertiser = require('./models/advertisers');
var Promoter = require('./models/promoters');
var LocalStrategy = require('passport-local').Strategy;
var bCrypt = require('bcrypt-nodejs');

module.exports = function (passport) {

	// Passport needs to be able to serialize and deserialize users to support persistent login sessions
	passport.serializeUser(function (user, done) {
		console.log('serializing user:', user._id);
		//return the unique id for the user
		done(null, user);
	});

	//Desieralize user will call with the unique id provided by serializeuser
	passport.deserializeUser(function (user, done) {

		return done(null, user);

	});

	passport.use('login', new LocalStrategy({
		passReqToCallback: true
	},
		function (req, username, password, done) {

			var usernames = [];
			var users = {};

			Advertiser.find(function (err, advertisers) {
				if (err) {
					console.log('Database error');
					return done(null, false);
				}
				advertisers.forEach((val) => { val.type = 'Advertiser'});
				advertisers.forEach((val) => { usernames.push(val.username); users[val.username] = val; });

				Promoter.find(function (err, promoters) {
					if (err) {
						console.log('Database error');
						return done(null, false);
					}
					promoters.forEach((val) => { val.type = 'Promoter'});
					promoters.forEach((val) => { usernames.push(val.username); users[val.username] = val; });

					if (usernames.indexOf(username) < 0) {
						console.log('User Not Found with username ' + username);
						return done(null, false);
					}

					if (isValidPassword(users[username], password)) {
						console.log('sucessfully authenticated', users[username]);
						return done(null, users[username]);
					}
					else {
						console.log('Invalid password ' + username);
						return done(null, false)
					}
				});
			});
		}
	));

	passport.use('signup', new LocalStrategy({
		passReqToCallback: true // allows us to pass back the entire request to the callback
	},

		function (req, username, password, done) {
			var usernames = [];
			Advertiser.find({}, 'username', function (err, advertisers) {
				if (err) {
					console.log('Database error');
					return done(null, false);
				}
				advertisers.forEach((val) => { usernames.push(val.username) });

				Promoter.find({}, 'username', function (err, promoters) {
					if (err) {
						console.log('Database error');
						return done(null, false);
					}
					promoters.forEach((val) => { usernames.push(val.username) });

					console.log(usernames.indexOf(username) > -1);
					console.log(usernames);
					console.log(username);

					if (usernames.indexOf(username) > -1) {
						console.log('User already exists with username: ' + username);
						return done(null, false);
					}else

					if (req.body.type && req.body.type === 'Advertiser') {

						var advertiser = new Advertiser();
						advertiser.username = username;
						advertiser.first_name = req.body.firstName;
						advertiser.last_name = req.body.lastName;
						advertiser.password = createHash(password);

						advertiser.save(function (err, advertiser) {
							if (err) {
								return done(null, false);
							}
							return done(null, advertiser);
						});

					} else if (req.body.type && req.body.type === 'Promoter') {

						var promoter = new Promoter();
						promoter.username = username;
						promoter.first_name = req.body.firstName;
						promoter.last_name = req.body.lastName;
						promoter.password = createHash(password);

						promoter.save(function (err, promoter) {
							if (err) {
								console.log('database error', err)
								return done(null, false);
							}
							return done(null, promoter);
						});

					} else {
						return done(null, false);
					}

				});

			});

		})
	);

	var isValidPassword = function (user, password) {
		return bCrypt.compareSync(password, user.password);
	};
	// Generates hash using bCrypt
	var createHash = function (password) {
		return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
	};
}