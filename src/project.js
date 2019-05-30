import uuid from 'uuid';

const project = title => {
	let tasks = [];

	let id = uuid.v4();

	const addTask = function(task) {
		this.tasks.push(task);
	};

	const removeTask = function(taskIndex) {
		this.tasks.splice(taskIndex, 1);
	};

	return { id, title, tasks, addTask, removeTask };
};

export { project };
