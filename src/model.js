import { task } from './task';
import { project } from './project';
import { view } from './view';

import moment from 'moment';

const model = (() => {
	const projects = [];

	const taskOne = task('Add tasks using the form above', moment().format(), false, false);

	const taskTwo = task('Prioritize items with the star!', moment().format(), true, false);

	const taskThree = task('Edit or remove with the other icons', moment().format(), false, false);

	const taskFour = task('Click items to toggle completed status', moment().format(), false, true);

	const defaultProject = project('Default Project');
	projects.push(defaultProject);
	defaultProject.addTask(taskOne);
	defaultProject.addTask(taskTwo);
	defaultProject.addTask(taskThree);
	defaultProject.addTask(taskFour);

	let selectedProject = defaultProject;

	const removeTask = function(taskId) {
		for (let i = 0; i < projects.length; i++) {
			for (let j = 0; j < projects[i].tasks.length; j++) {
				if (projects[i].tasks[j].id === taskId) {
					projects[i].removeTask(j);
				}
			}
		}
		view.renderTasks(model.selectedProject.tasks);
	};

	const removeProject = function() {
		for (let i = 0; i < projects.length; i++) {
			if (projects[i].id === model.selectedProject.id) {
				projects.splice(i, 1);
			}
		}
		model.selectedProject = model.projects[0] || { id: null, tasks: [] };
		view.renderProjects(model.projects);
		if (model.selectedProject.id !== null) {
			view.selectProject(model.selectedProject.id);
		}
		view.renderTasks(model.selectedProject.tasks);
	};

	const addProject = function() {
		const input = document.querySelector('#add-project-input');
		const newProject = project(input.value);
		model.projects.push(newProject);
		view.renderProjects(model.projects);
		view.selectProject(newProject.id);
	};

	return {
		projects,
		defaultProject,
		selectedProject,
		removeTask,
		addProject,
		removeProject,
	};
})();

export { model };
