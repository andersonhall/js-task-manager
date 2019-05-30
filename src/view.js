import { model } from './model';
import * as moment from 'moment';

const view = (() => {
	const renderProjects = function(projects) {
		const element = document.querySelector('.projects');
		element.innerHTML = '';
		projects.forEach(project => {
			const card = document.createElement('div');
			card.classList.add('project-card');
			card.dataset.id = project.id;

			card.innerHTML = `${project.title}`;

			element.appendChild(card);

			card.addEventListener('click', function(e) {
				selectProject(e.target.dataset.id);
			});
		});
	};

	const renderTasks = function(tasks) {
		const element = document.querySelector('.tasks');
		element.innerHTML = '';
		const ul = document.createElement('ul');
		tasks.forEach(item => {
			const li = document.createElement('li');
			li.innerHTML = `${item.title} <span class="due"> due ${moment(
				item.dueDate
			).fromNow()}</span><i class="fas fa-pencil-alt"></i><i class="fas fa-star"></i> <i class="fas fa-trash-alt"></i>`;
			li.classList.add('task');
			if (item.isCompleted) {
				li.classList.add('complete');
			}
			if (item.isPriority) {
				li.classList.add('priority');
			}
			li.dataset.id = item.id;

			ul.appendChild(li);
			element.appendChild(ul);

			// Remove task
			const removeIcon = li.querySelector('.fa-trash-alt');
			removeIcon.addEventListener('click', e => {
				e.stopPropagation();
				const selectedItem = model.selectedProject.tasks.filter(
					task => task.id == e.target.parentElement.dataset.id
				)[0];

				model.removeTask(selectedItem.id);
			});

			// Toggle completed
			li.addEventListener('click', e => {
				const selectedItem = model.selectedProject.tasks.filter(
					task => task.id == e.target.dataset.id
				)[0];
				selectedItem.toggleCompleted();
				li.classList.toggle('complete');
			});

			// Edit task
			const editIcon = li.querySelector('.fa-pencil-alt');
			editIcon.addEventListener('click', e => {
				e.stopPropagation();
				const selectedItem = model.selectedProject.tasks.filter(
					task => task.id == e.target.parentElement.dataset.id
				)[0];

				const name = document.querySelector('#task-input');
				const date = document.querySelector('#task-date');

				console.log(selectedItem.dueDate);
				name.value = selectedItem.title;
				date.value = moment(selectedItem.dueDate).format('YYYY-MM-DD');
				name.select();
				model.removeTask(selectedItem.id);
			});

			// Toggle priority
			const priorityIcon = li.querySelector('.fa-star');
			priorityIcon.addEventListener('click', e => {
				e.stopPropagation();
				const selectedItem = model.selectedProject.tasks.filter(
					task => task.id == e.target.parentElement.dataset.id
				)[0];
				selectedItem.togglePriority();
				li.classList.toggle('priority');
			});
		});
	};

	const selectProject = function(projectId) {
		const cards = document.querySelectorAll('.project-card');
		cards.forEach(card => {
			card.classList.remove('active');
		});

		const element = document.querySelector(`[data-id='${projectId}']`);
		element.classList.add('active');

		const project = model.projects.filter(project => project.id == projectId);
		renderTasks(project[0].tasks);
		model.selectedProject = project[0];
	};

	return { renderProjects, renderTasks, selectProject };
})();

export { view };
