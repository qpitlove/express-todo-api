var uuid = require('uuid');
var sendError = require('../../util/send-error');
// var status = require('../../util/status');

// Create a new todo
module.exports = function (options) {
	// Shorter reference to data store
	var store = options.store;

	return function (req, res) {
		if (!req.body || !req.body.title) {
			return sendError(res, 400, 'Missing or invalid todo');
		}

		req.body.completed = req.body.completed || false;

		// Verify that todos are enabled and exists
		// if (!status.valid(req.body.status)) {
		// 	return sendError(res, 400, 'Invalid status: ' + req.body.status);
		// }

		// Todo object
		var todo = {
			id: uuid.v4(),
			title: req.body.title,
			completed: req.body.completed,
			created: Date.now()
		};

		// Assigned to a user?
		// if (req.body.assignedTo) {
		// 	var exists = store.users.filter(function (u) {
		// 		return u.id === req.body.assignedTo;
		// 	}).length > 0;
        //
		// 	// Error if user doesnt exist
		// 	if (!exists) {
		// 		return sendError(res, 400, 'Assigned user does not exist');
		// 	}
        //
		// 	// Add user to todo
		// 	todo.assignedTo = req.body.assignedTo;
		// }

		// Add to list
		store.todos.push(todo);

		// Respond
		res.status(201).json(todo);
	};
};
