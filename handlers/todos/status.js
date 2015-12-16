var sendError = require('../../util/send-error');
var status = require('../../util/status');

// Create a new todo
module.exports = function(options) {
	// Shorter reference to data store
	var store = options.store;

	return function(req, res) {
		var todo = store.todos.get(req.params.id);

		// No todo with that id
		if (!todo) {
			return sendError(res, 404, 'Todo not found');
		}

		// Verify that status exists
		if (!status.valid(req.params.status)) {
			return sendError(res, 400, 'Invalid status: ' + req.body.status);
		}

		// Set values
		todo.status = req.body.status || todo.status;

		// Save data to store
		store.update(req.params.id, todo);

		// Respond
		res.status(200).json(todo);
	};
};
