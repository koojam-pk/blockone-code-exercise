const User = require('./../models').User;
const uuidv4 = require('uuid/v4');

const addUser = async (req, res, next) => {
	const { username, password, firstname, lastname} = req.body;

	User.create({
		id: uuidv4(),
		userName: username,
		password,
		firstName: firstname,
		lastName: lastname
	})
	.then(() => {
		return res.status(200).json({ message: 'User signed up successfully'});
	})
	.catch(err => {
		console.log('[C: Add User]\n', err);
		return res.status(409).json({ message: 'User signed up failed'});
	});
}

module.exports = {
	addUser,
}