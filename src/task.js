import uuid from 'uuid';

const task = (title, dueDate, isPriority = false, isCompleted = false) => {
	let id = uuid.v4();

	const togglePriority = function() {
		this.isPriority = !this.isPriority;
	};

	const toggleCompleted = function() {
		this.isCompleted = !this.isCompleted;
	};

	return {
		id,
		title,
		dueDate,
		isPriority,
		isCompleted,
		togglePriority,
		toggleCompleted,
	};
};

export { task };
