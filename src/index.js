import { task } from './task';
import { view } from './view';
import { model } from './model';

view.renderProjects(model.projects);
view.renderTasks(model.defaultProject.tasks);
view.selectProject(model.defaultProject.id);

const btnAddProject = document.querySelector('.add-project');
const modalAddProject = document.querySelector('#add-project-modal');
const modalAddProjectSpan = document.querySelector('#add-project-modal-span');
const modalAddProjectInput = document.querySelector('#add-project-input');
const btnDeleteProject = document.querySelector('.remove-project');
const btnResetTasks = document.querySelector('.reset-tasks');
const formAddProject = document.querySelector('.add-project-form');
const taskInput = document.querySelector('#task-input');
const taskForm = document.querySelector('.add-task-form');
const taskDate = document.querySelector('#task-date');

btnDeleteProject.onclick = () => model.removeProject();
btnResetTasks.onclick = () =>
	model.selectedProject.tasks.forEach(item => {
		if (item.isCompleted === true) {
			item.toggleCompleted();
		}
		if (item.isPriority === true) {
			item.togglePriority();
		}
		view.renderTasks(model.selectedProject.tasks);
	});

modalAddProjectSpan.onclick = () => {
	modalAddProject.style.display = 'none';
};

btnAddProject.onclick = () => {
	modalAddProject.style.display = 'block';
	modalAddProjectInput.focus();
};

taskForm.onsubmit = e => {
	e.preventDefault();
	console.log(taskDate.value);
	if (taskInput.value.trim() !== '') {
		const newTask = task(taskInput.value, new Date(taskDate.value), false, false);
		model.selectedProject.addTask(newTask);
		view.renderTasks(model.selectedProject.tasks);
		taskInput.value = '';
		taskInput.focus();
		view.renderTasks(model.selectedProject.tasks);
		console.log(newTask);
	}
};

formAddProject.onsubmit = e => {
	e.preventDefault();
	model.addProject();
	modalAddProject.style.display = 'none';
	modalAddProjectInput.value = '';
	taskInput.focus();
};

window.onclick = function(e) {
	if (e.target.classList.contains('modal')) {
		e.target.style.display = 'none';
	}
};

// TODO: hook up localStorage
