<template>
	<div class="container">
		<header>

			<div class="emoji">
				🤘
			</div>
			<div class="icons">
				<i class='bx bx-plus' style='color:#ffff' @click="ShowModal = true" @mouseover="showTooltip = true"
					@mouseout="showTooltip = false"></i>
				<div class="tooltip" v-show="showTooltip">Adicionar Tarefa</div>
				<i class='bx bx-help-circle' style='color:#ffff'></i>
				<i class='bx bx-bell' style='color:#ffff'></i>
				<i class='bx bx-user' style='color:#ffff'></i>
			</div>

		</header>
		<ModalCreateTask :showModal="ShowModal" @close="ShowModal = false" @task-created="getTasks" />



		<ModalCreateSubtask :ShowModalSub="ShowModalSub" :newSubtask="newSubtask" :selectedTask="selectedTask"
			:formSubtaskSubmitted="formSubtaskSubmitted" @close="ShowModalSub = false" @refresh-tasks="getTasks" />



		<ModalUpdateSubtask :showUpdateModalSub="showUpdateModalSub" :taskToUpdateSub="taskToUpdateSub"
			:formSubtaskSubmitted="formSubtaskSubmitted" @close="showUpdateModalSub = false" @refresh-tasks="getTasks" />





		<div class="modal-task" v-if="openTaskModal">
			<div class="modal-body-task">
				<div class="modal-header-task">
					Visualizar tarefa
					<div class="dropdown">
						<button class="dropbtn">
							<i class='bx bx-dots-horizontal-rounded'></i>
						</button>
						<div class="dropdown-content">
							<a @click="copyURL"> <i class='bx bx-link'></i>Copiar link </a>
							<a @click="printTask"><i class='bx bx-printer'></i> Imprmir tarefa</a>
							<a @click="deleteTask(selectedTask.id)" style="color: red;"><i class='bx bx-trash'></i>Deletar tarefa</a>
						</div>
					</div>
					<i @click="closeModalTaskClick" class='bx bx-x'></i>
				</div>
				<hr>
				<div class="box1-modal-task">

					<label class="custom-radio">
						<input @click="updateTaskStatus(selectedTask)" type="radio" :id="'task-status-' + selectedTask.id"
							v-model="selectedTask.status" value="completed">
						<span class="checkmark" :class="{ 'checked': selectedTask.status === 'completed' }"></span>
					</label>

					<h3>{{ selectedTask.title }} </h3>
					<p class="description-task"> {{ selectedTask.description }}</p>



					<h4>Subtarefas</h4>
					<div class="dropdown2">
						<button class="dropbtn2">
							<i class='bx bx-dots-horizontal-rounded'></i>
						</button>
						<div class="dropdown-content2">
							<a @click="openModalSub"> <i class='bx bx-plus'></i>Criar subtarefa </a>

						</div>
					</div>
					<hr class="hr_sub">

					<div class="fullSubtasks" v-if="selectedTask.subtasks && selectedTask.subtasks.length">
						<div class="allSubtasks" v-for="subtask in selectedTask.subtasks" :key="subtask.id">
							<label class="custom-checkbox">


								<input
									@click="updateSubtaskStatus(subtask.id, subtask.status, subtask.status === 'completed' ? 'pending' : 'completed')"
									type="checkbox" :id="'subtask-status-' + subtask.id" value="completed"
									:checked="subtask.status === 'completed'">


								<span class="checkmark checked" :class="{ 'checked': subtask.status === 'completed' }"></span>
							</label>

							<div class="subtasks" @mouseenter="showSubtaskIcons(subtask.id)"
								@mouseleave="hideSubtaskIcons(subtask.id)">
								<div class="content-subtask">
									<div class="subtask-title">
										<strong>{{ subtask.title }}</strong>
									</div>
									<div class="subtask-description">
										{{ subtask.description }}
									</div>
								</div>
								<div class="subtask-icons" v-show="subtask.showIcons">
									<i @click.stop="openUpdateSubtask(subtask)" class='bx bx-edit-alt'></i>
									<i @click.stop="deleteSubtask(subtask)" class='bx bx-trash' style="color: red;"></i>
								</div>
							</div>

						</div>
					</div>


				</div>
				<div class="box2-modal-task">
					<p class="p1">data de vencimento:</p>
					<p>Id da tarefa: <br>
						<strong>{{ selectedTask.id }}</strong>
					</p>
					<span :style="{ backgroundColor: BackgroundColorDate(selectedTask.due_date) }"><strong><i
								class='bx bx-notepad'></i>{{ formatDate(selectedTask.due_date) }}</strong></span>

					<p class="p2">Criado em: <br><strong>{{ formatDate(selectedTask.created_at) }}</strong></p>
					<p class="p3">Hora de criação: <br><strong>{{ formatTime(selectedTask.created_at) }}</strong></p>
				</div>

			</div>

		</div>



		<ModalUpdateTask :showUpdateTask="showUpdateTask" :taskToUpdate="taskToUpdate" @close="closeUpdateTask" />



		<ModalUpdateDate :showUpdateDate="showUpdateDate" :dataDueDate="taskToUpdateDate.due_date" @close="closeUpdateDate"
			:taskToUpdateDate="taskToUpdateDate" @update:dataDueDate="updateDataDueDate" @updateTasks="getTasks" />



		<div class="box1">
			<div>
				<button @click="showAllTasks()">
					<i class='bx bx-store-alt' style='color:rgba(32,32,32,0.92)'></i> Entrada
				</button>
				<button @click="showTodayTasks()">
					<i class='bx bx-notepad'></i> Tarefas de hoje
				</button>
				<button @click="showOverdueTasks()">
					<i class='bx bx-error-alt'></i> Vencidos
				</button>
			</div>
		</div>
		<div class="box2">
			<div class="conteudo">
				<h1>Entrada</h1>
				<div class="card-container">
					<div class="card" v-for="task in filteredTasks || []" :key="task.id" @click="openTaskModalClick(task)"
						@mouseover="task.ShowIcons = true" @mouseleave="task.ShowIcons = false">



						<label class="custom-radio" @click.stop="stopModal">
							<input @click="stopModal, updateTaskStatus(task)" type="radio" :id="'task-status-' + task.id"
								v-model="task.status" value="completed" :checked="task.status === 'completed'">
							<span class="checkmark" :class="{ 'checked': task.status === 'completed' }"></span>
						</label>

						<div class="icons-task">
							<div class="container-icons" v-show="task.ShowIcons">
								<i @click.stop="openUpdateTask(task)" class='bx bx-edit-alt'></i>
								<i @click.stop="selectTask(task); openUpdateDate(task)" class='bx bx-notepad'></i>
								<i class='bx bx-trash' @click.stop="deleteTask(task.id)"></i>
							</div>
						</div>
						<ul>
							<label for="comprar-pao">
								<h4>{{ task.title }}</h4>
							</label>
						</ul>
						<ul>
							<li>{{ task.description }}</li>
						</ul>
						<span class="data" :style="{ backgroundColor: BackgroundColorDate(task.due_date) }">
							<i class='bx bx-notepad'></i>{{ formatDate(task.due_date)
							}}</span>
						<hr>
						<div v-if="task.subtasks && Array.isArray(task.subtasks) && task.subtasks.length > 0">

							<div v-for="subtask in task.subtasks" :key="subtask.id" class="cardsSub">
								<label class="subtask-label" @click.stop="stopModal">
									<input type="checkbox" name="subtask" :value="subtask.id" :checked="subtask.status === 'completed'">
									<span
										@click.stop="updateSubtaskStatus(subtask.id, subtask.status, subtask.status === 'completed' ? 'pending' : 'completed')"
										class="subtasksub-title checkmarkTwo" :class="{ 'completed': subtask.status === 'completed' }">
										<h5>{{ subtask.title }}</h5>
									</span>
								</label>
							</div>
						</div>
						<hr v-if="task.subtasks && Array.isArray(task.subtasks) && task.subtasks.length > 0">
						<button @click.stop="ShowModal = true"><i class='bx bx-plus' style='color: #000;'></i> Criar
							tarefa
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import axios from 'axios';
import moment from 'moment';
import 'moment-timezone';
import ModalCreateTask from '../components/ModalCreateTask'
import ModalCreateSubtask from '../components/ModalCreateSubtask'
import ModalUpdateSubtask from '../components/ModalUpdateSubtask'
import ModalUpdateTask from '../components/ModalUpdateTask'
import ModalUpdateDate from '../components/ModalUpdateDate'

export default {

	components: {
		ModalCreateTask,
		ModalCreateSubtask,
		ModalUpdateSubtask,
		ModalUpdateTask,
		ModalUpdateDate
	},


	data() {
		return {
			// newStatus: '',
			ShowModal: false,
			ShowModalSub: false,
			showTooltip: false,
			openTaskModal: false,
			showUpdateTask: false,
			showUpdateDate: false,
			taskToUpdate: {},
			taskToUpdateDate: {
				id: '',
				due_date: ''
			},
			ShowIcons: false,
			// selectedColor: '',
			tasks: [],
			selectedTask: null,
			newTask: {
				title: '',
				description: '',
				due_date: '',
			},
			newSubtask: {
				title: '',
				description: '',
				task_id: ''
			},
			filteredTasks: [],

			showOverdue: false,
			showUpdateModalSub: false,
			taskToUpdateSub: {
				id: null,
				title: '',
				description: ''
			},
			formSubmitted: false,
			formSubtaskSubmitted: false,
			formTaskSubmitted: false,
			formDateSubmitted: false,
			// taskId: null



		};


	},
	methods: {
		closeModalsub() {
			this.newSubtask.title = '',
				this.newSubtask.description = '',
				this.ShowModalSub = false
		},

		closeUpdateModalSub() {

			this.taskToUpdateSub.title = '';
			this.taskToUpdateSub.description = '';
			this.showUpdateModalSub = false;
		},

		showSubtaskIcons(subtaskId) {
			const subtask = this.selectedTask.subtasks.find(subtask => subtask.id === subtaskId);
			if (subtask) {
				subtask.showIcons = true;
			}
		},
		hideSubtaskIcons(subtaskId) {
			const subtask = this.selectedTask.subtasks.find(subtask => subtask.id === subtaskId);
			if (subtask) {
				subtask.showIcons = false;
			}
		},






		selectTask(task) {
			this.selectedTask = task;
			this.taskToUpdateDate.due_date = task.due_date;
		},





		openUpdateSubtask(subtask) {


			if (this.selectedTask && this.selectedTask.id) {
				this.taskToUpdateSub.id = subtask.id;



				this.showUpdateModalSub = true;
				this.openTaskModal = false;

			}



		},
		copyURL() {
			let url = window.location.href;
			navigator.clipboard.writeText(url)
				.then(() => {
					alert('URL copiada com sucesso!');
				})
				.catch((err) => {
					alert('Erro ao copiar URL: ' + err);
				});
		},
		printTask() {
			window.print()
		},
		openModalSub() {
			this.ShowModalSub = true;
			this.openTaskModal = false;
		},
		formatTime(dateTime) {

			const formattedTime = new Date(dateTime).toLocaleTimeString();
			return formattedTime;
		},


		showTodayTasks() {
			axios.get('tasks/filter/today')
				.then(response => {

					if (response.data && response.data.length > 0) {
						this.filteredTasks = response.data;
						this.sortTasks();
					}
				});

		},

		showOverdueTasks() {
			axios.get('tasks/filter/overdue')

				.then((response) => {

					this.filteredTasks = response.data;
					this.sortTasks();
				});

		},

		showAllTasks() {
			axios.get('tasks')
				.then((response) => {

					this.filteredTasks = response.data;
					this.sortTasks();
				});

		},










		BackgroundColorDate(dueDate) {
			const today = moment().tz('America/Sao_Paulo');
			today.set({ hour: 0, minute: 0, second: 0, millisecond: 0 });

			const taskDueDate = moment.tz(dueDate, 'America/Sao_Paulo');
			taskDueDate.set({ hour: 0, minute: 0, second: 0, millisecond: 0 });


			return taskDueDate.isBefore(today, 'day') ? '#f11919cf' : ' rgba(40, 252, 160, 0.742)';


		},
		stopModal() {
			this.openTaskModal = false;
		},
		formatDate(date) {
			return moment(date).format('DD/MM/YYYY');
		},
		openUpdateDate(task) {

			this.taskToUpdateDate = { ...task };
			this.showUpdateDate = true;
		},

		updateDataDueDate(newValue) {
			this.taskToUpdateDate.due_date = newValue;
		},
		closeUpdateDate() {
			this.showUpdateDate = false
			this.taskToUpdate = null
			this.formDateSubmitted = false;

		},
		openUpdateTask(task) {
			this.taskToUpdate = task;

			this.showUpdateTask = true;
		},

		openTaskModalClick(task) {
			this.selectedTask = task
			this.selectedTaskId = task.id;
			this.openTaskModal = true
		},
		closeUpdateTask() {
			this.showUpdateTask = false
			this.taskToUpdate = null
			this.getTasks();
		},
		closeModalTaskClick() {
			this.openTaskModal = false
		},
		closeModal() {
			this.newTask.title = '';
			this.newTask.description = '';
			this.newTask.due_date = '';
			this.ShowModal = false
			this.formSubmitted = false
		},


		getTasks() {
			axios.get('tasks')
				.then((response) => {
					this.tasks = response.data

					this.filteredTasks = this.tasks;
					this.sortTasks();
				})

		},
		// postTasks() {
		//     this.formSubmitted = true;
		//     if (this.newTask.title && this.newTask.description && this.newTask.due_date) {

		//         const formattedDate = moment(this.newTask.due_date).format('DD/MM/YYYY');
		//         const taskToSend = { ...this.newTask, due_date: formattedDate };

		//         axios.post('tasks', taskToSend)
		//             .then(() => {

		//                 this.newTask = {
		//                     title: '',
		//                     description: '',
		//                     due_date: '',
		//                 };
		//                 this.getTasks();
		//                 this.filteredTasks = this.tasks;
		//                 this.closeModal();

		//             })
		//             .catch(error => {
		//                 console.error('Erro ao criar a tarefa', error);
		//             });
		//     } else {
		//         console.log('Por favor, preencha todos os campos obrigatórios.');
		//     }
		// },
		deleteTask(tasks) {
			axios.delete(`tasks/${tasks}`)
				.then(() => {
					this.tasks = this.tasks.filter(task => task.id !== tasks);

					this.filteredTasks = this.tasks;
					this.openTaskModal = false;

				})
				.catch(error => {
					console.error('Erro ao excluir a tarefa:', error);
				});

		},
		// putTask(id) {
		//     this.formTaskSubmitted = true;


		//     if (!this.taskToUpdate.title || !this.taskToUpdate.description || !this.taskToUpdate.due_date) {

		//         return;
		//     }

		//     axios.put(`tasks/${id}`, {
		//         title: this.taskToUpdate.title,
		//         description: this.taskToUpdate.description,
		//         due_date: this.taskToUpdate.due_date
		//     })
		//         .then(() => {


		//             this.getTasks();

		//             this.closeUpdateTask();
		//         })
		//         .catch(error => {
		//             console.error('Erro ao atualizar a tarefa:', error);
		//         });
		// },
		// patchUpdateDate(taskToUpdateDate) {
		//     this.formDateSubmitted = true;

		//     if (!this.taskToUpdateDate.due_date) {

		//         return;
		//     }

		//     const formattedDate = this.formatDate(taskToUpdateDate.due_date);
		//     axios.patch(`tasks/${this.selectedTask.id}/due_date/`, {
		//         due_date: formattedDate
		//     })
		//         .then(() => {

		//             this.getTasks();

		//             this.closeUpdateDate();
		//         });

		// },

		updateTaskStatus(task) {
			const newStatus = task.status === 'completed' ? 'pending' : 'completed';


			axios.patch(`tasks/${task.id}/status`, { status: newStatus })

				.then(() => {


					task.status = newStatus;

					this.sortTasks();
					this.getTasks();

				});


		},
		sortTasks() {
			this.filteredTasks.sort((a, b) => {
				if (a.status === 'completed' && b.status !== 'completed') return -1;
				if (a.status !== 'completed' && b.status === 'completed') return 1;

				return 0;
			});
		},
		////SUBTASK >>>>>>
		// postSubtask() {
		//     this.formSubtaskSubmitted = true;

		//     if (!this.newSubtask.title || !this.newSubtask.description) {

		//         return;
		//     }




		//     if (this.selectedTask) {

		//         this.newSubtask.task_id = this.selectedTask.id;


		//         axios.post('/subtasks', this.newSubtask)
		//             .then(() => {


		//                 this.newSubtask = {
		//                     title: '',
		//                     description: '',
		//                     task_id: '',

		//                 }
		//                 this.formSubtaskSubmitted = false;
		//                 this.ShowModalSub = false;
		//                 this.getTasks()

		//             });

		//     }
		// },
		// putSubtask() {

		//     this.formSubtaskSubmitted = true;

		//     if (!this.taskToUpdateSub.title || !this.taskToUpdateSub.description) {

		//         return;
		//     }


		//     if (this.taskToUpdateSub && this.taskToUpdateSub.id) {
		//         axios.put(`/subtasks/${this.taskToUpdateSub.id}`, {
		//             title: this.taskToUpdateSub.title,
		//             description: this.taskToUpdateSub.description,
		//         })
		//             .then(() => {


		//                 this.showUpdateModalSub = false;
		//                 this.getTasks();
		//             });


		//     }

		// },
		updateSubtaskStatus(subtaskId, _currentStatus, newStatus) {



			axios.patch(`/tasks/subtasks/${subtaskId}`, { status: newStatus })
				.then(() => {



					this.getTasks();


				});

		},

		deleteSubtask(subtask) {
			axios.delete(`/tasks/subtasks/${subtask.id}`)
				.then(() => {

					this.openTaskModal = false;
					this.getTasks();
				});

		}



	},
	mounted() {
		axios.defaults.baseURL = 'http://127.0.0.1:8000/api/'
		this.getTasks()

		this.data = moment(this.data).format('DD/MM/YYYY');
		this.tasks.forEach(task => {
			this.$set(task, 'showIcons', false);

		});
	},

}
</script>

<style scoped>
.subtask-title {
	position: relative;
	top: -5px;
}

.content-subtask {
	position: absolute;
	left: 40px;
	width: 100%;
}

.subtask-icons {
	position: absolute;
	left: 80%;
	top: 5px;
}

.subtask-icons>i {
	font-size: 20px;
	padding: 5px;
	cursor: pointer;
}

.subtask-label {
	display: flex;
	align-items: self-start;
	padding: 5px;

}

.subtasksub-title {
	margin-left: 5px;



}



.cardsSub>li {
	margin-left: 5%;
	margin-top: 1%;
}


.error-message {
	color: #e92626;
	cursor: pointer;
	text-decoration: underline;
}

.fullSubtasks {
	position: absolute;
	top: 40%;
	width: 100%;
}

.subtasks {

	display: flex;
	flex-direction: column;
	margin-bottom: 10%;

}

.allSubtasks {
	position: relative;
	left: 8%;
	width: 80%;

}

.radiotwo {

	top: 37%;
}

.dropbtn2 {
	background-color: #ffffff;

	padding: 16px;
	font-size: 30px;
	height: 30px;
	border: none;
	cursor: pointer;

}


.dropdown2 {
	position: absolute;
	left: 80%;
	top: 27%;
	display: inline-block;
}


.dropdown-content2 {
	display: none;
	position: absolute;
	background-color: #f9f9f9;
	min-width: 160px;
	box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
	z-index: 1;
}


.dropdown-content2 a {
	color: black;
	padding: 12px 16px;
	text-decoration: none;
	display: block;
	cursor: pointer;
}


.dropdown-content2 a:hover {
	background-color: #f1f1f1;
}


.dropdown2:hover .dropdown-content2 {
	display: block;
}


.dropbtn {
	background-color: #ffffff;

	padding: 16px;
	font-size: 30px;
	height: 30px;
	border: none;
	cursor: pointer;

}


.dropdown {
	position: absolute;
	left: 80%;
	top: 15%;
	display: inline-block;
}

.dropdown-content {
	display: none;
	position: absolute;
	background-color: #f9f9f9;
	min-width: 160px;
	box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
	z-index: 1;
}

.dropdown-content a {
	color: black;
	padding: 12px 16px;
	text-decoration: none;
	display: block;
	cursor: pointer;
}


.dropdown-content a:hover {
	background-color: #f1f1f1;
}


.dropdown:hover .dropdown-content {
	display: block;
}










.custom-radio {
	display: inline-block;
	position: relative;
	padding-left: 10px;
	margin-right: 10px;
	cursor: pointer;
	user-select: none;
}

.custom-radio input {
	position: absolute;
	opacity: 0;
	cursor: pointer;
}

.checkmark {
	position: absolute;
	top: 0;
	left: 0;
	height: 25px;
	width: 25px;

	background-color: #ffffff;
	border-radius: 50%;
	border: 1px solid #ccc;
}

.custom-radio:hover .checkmark {
	background-color: #ffffff;
}

.custom-radio input:checked~.checkmark {
	background-color: #050505;
	background-image: url("data:image/svg+xml,%0A%3Csvg xmlns='http://www.w3.org/2000/svg' width='19' height='19' viewBox='0 0 10 10'%3E%3Cg class='nc-icon-wrapper' stroke-width='1' fill='%23555555'%3E%3Cpath fill='none' stroke='%23FFFFFF' stroke-linecap='round' stroke-linejoin='round' stroke-miterlimit='10' data-cap='butt' d='M2.83 4.72l1.58 1.58 2.83-2.83'/%3E%3C/g%3E%3C/svg%3E");
	background-position: center;
}



.custom-checkbox {
	display: inline-block;
	position: relative;
	padding-left: 10px;
	margin-right: 10px;
	cursor: pointer;
	user-select: none;
}

.custom-checkbox input {
	position: absolute;
	opacity: 0;
	cursor: pointer;
}

.checkmark {
	position: absolute;
	top: 0;
	left: 0;
	height: 25px;
	width: 25px;

	background-color: #ffffff;
	border-radius: 50%;
	border: 1px solid #ccc;
}

.custom-checkbox:hover .checkmark {
	background-color: #ffffff;
}

.custom-checkbox input:checked~.checkmark {
	background-color: #050505;
}

.checkmark.checked {
	background-image: url("data:image/svg+xml,%0A%3Csvg xmlns='http://www.w3.org/2000/svg' width='19' height='19' viewBox='0 0 10 10'%3E%3Cg class='nc-icon-wrapper' stroke-width='1' fill='%23555555'%3E%3Cpath fill='none' stroke='%23FFFFFF' stroke-linecap='round' stroke-linejoin='round' stroke-miterlimit='10' data-cap='butt' d='M2.83 4.72l1.58 1.58 2.83-2.83'/%3E%3C/g%3E%3C/svg%3E");
	background-position: center;
}













.subtask-label {
	display: flex;
	align-items: self-start;
	padding: 5px;

}

.subtasksub-title>h5 {
	position: absolute;
	left: 100%;
	padding: 5px;
	width: 400px;
	margin-left: 30%;
}

.subtasksub-title {
	margin-left: 5px;
}

.subtask-label input[type="checkbox"] {
	display: none;
	position: absolute;
	left: 10%;

}

.subtask-label .checkmarkTwo {
	position: relative;

	height: 25px;
	width: 25px;
	background-color: #ffffff;
	border-radius: 50%;
	border: 1px solid #ccc;
	cursor: pointer;
}

.subtask-label .checkmarkTwo:hover {
	background-color: #ffffff;
}

.subtask-label input[type="checkbox"]:checked+.checkmarkTwo {
	background-color: #000000;
	background-image: url("data:image/svg+xml,%0A%3Csvg xmlns='http://www.w3.org/2000/svg' width='19' height='19' viewBox='0 0 10 10'%3E%3Cg class='nc-icon-wrapper' stroke-width='1' fill='%23555555'%3E%3Cpath fill='none' stroke='%23FFFFFF' stroke-linecap='round' stroke-linejoin='round' stroke-miterlimit='10' data-cap='butt' d='M2.83 4.72l1.58 1.58 2.83-2.83'/%3E%3C/g%3E%3C/svg%3E");
	background-position: center;
	background-repeat: no-repeat;
}

.subtask-label input[type="checkbox"]:checked.pending+.checkmarkTwo {
	background-color: #ffffff;
	background-image: none;
}








































.card-container {
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	max-height: calc(100vh - 202px);
	overflow-y: auto;

}

.datecolor-background {
	background-color: #f63535;
}




.modal-task {


	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);

	z-index: 10;
	width: 100vw;
	height: 100vh;

	background-color: rgba(0, 0, 0, 0.8);
	display: flex;
	justify-content: center;
	align-items: center;


	/* display: none; */
}

.modal-header-task {
	position: absolute;
	top: 0;
	width: 95%;
	height: 15%;
	background-color: #ffffffe7;
	color: #020202;
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.modal-header-task>i {
	margin-right: 10px;
	font-size: 2em;
	cursor: pointer;
}

.modal-header-task>.bx-dots-horizontal-rounded {
	position: absolute;
	left: 85%;
}


.modal-body-task {
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	background-color: #ffffff;
	height: 600px;
	width: 800px;
	padding: 20px;

	position: fixed;
}

.modal-body-task>hr {
	width: 100%;
	position: absolute;
	top: 13%;
}

.modal-menu-task {
	height: 100%;
	width: 20%;
	margin-top: 20px;
	background-color: #eb0303;
}

.box1-modal-task {

	position: absolute;
	top: 79px;
	flex: 1;
	left: 0;
	width: 70%;
	height: 87%;
	padding: 2%;
	background-color: #ffffff;
}

.box1-modal-task h3 {
	position: absolute;
	left: 10%;
}

.box1-modal-task>.description-task {
	position: absolute;
	left: 10%;
	top: 13%;
}

.box1-modal-task span {
	position: absolute;
	left: 10%;
	top: 15%;
}

.box1-modal-task h4 {
	position: absolute;
	left: 10%;
	top: 30%;

}

.box1-modal-task .hr_sub {
	position: absolute;
	left: 10%;
	top: 38%;
	width: 80%;
}

.box1-modal-task .sub {
	position: absolute;
	left: 15%;
	top: 38%;
	margin-top: 10px;
}

.box2-modal-task {
	position: absolute;
	top: 79px;
	right: 0;
	flex: 1;
	background-color: rgba(218, 217, 217, 0.986);
	width: 30%;
	height: 87%;
}

.box2-modal-task>.p1 {
	margin-left: 10%;
	position: absolute;
	top: 3%;
}

.box2-modal-task>.p2 {
	margin-left: 10%;
	position: absolute;
	top: 30%;
}

.box2-modal-task>.p3 {
	margin-left: 10%;
	position: absolute;
	top: 45%;
}

.box2-modal-task p {
	margin-left: 10%;
	position: absolute;
	top: 15%;
}

.box2-modal-task span {
	margin-left: 10%;
	position: absolute;
	top: 7%;
	background-color: rgba(40, 252, 160, 0.742);
}











.container {
	width: 100vw;
	height: 100vh;


	position: relative;
	background-color: #ffffff;
	box-sizing: border-box;
	display: flex;
	overflow: hidden;
}

header {
	display: flex;
	justify-content: space-between;
}

.container header {
	position: absolute;
	width: 100vw;
	height: 100px;
	background-color: rgb(0, 0, 0);
}

header .emoji {
	font-size: 50px;
	margin: 10px;

}

header .icons {
	align-self: flex-end;
	margin: 25px;
	font-size: 40px;



}

.icons i {
	margin-right: 40px;
	cursor: pointer;
}

.box1 {
	flex: 1;
	height: 100vh;
	display: flex;
	flex-direction: column;

	align-items: center;
	text-align: left;
	margin-top: 100px;
	padding: 20px 0;
	background-color: rgba(237, 237, 237, 0.901);

}

.box1 button {

	background-color: transparent;
	margin-bottom: 20px;
	height: 40px;
	width: 100%;
	font-size: 25px;
	text-align: left;
	border: none;
	padding-left: .8rem;

}

.box1 i {
	margin-left: 5px;
}

.box1 button:hover {
	cursor: pointer;
	background-color: #ffffff
}

.box2 {

	flex: 1;
	flex-basis: 60%;
	height: 100vh;
	background-color: rgb(255, 255, 255);

}

.conteudo {

	padding-top: 10%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	height: 100%;
	overflow-y: auto;

}

.conteudo h1 {
	position: absolute;
	margin-left: 0;
	top: 13%;
	left: 55%;
}

ul {
	list-style-type: none;
	padding: 0;
	margin: 0;
}

li {
	list-style: none;
	margin-bottom: 10px;
}



.card label {


	font-size: 25px;


}

.cardsSub>label {
	font-size: 15px;
}

.card input {
	width: 20px;
	height: 20px;
	border: 2px solid #ccc;
	margin-bottom: 10px;
	margin-top: 0;

	position: relative;


	cursor: pointer;
}



.card {
	/* margin: 0 auto; */
	top: 10%;
	margin-top: 4%;

	padding: 20px;
	width: 50%;
	border: 1px solid #ccc;

	position: relative;
	z-index: 9;
}

.card button {
	border: none;
	text-align: center;
	background-color: #ededede5;
	cursor: pointer;
	margin-top: 20px;
}

.card button:hover {
	background-color: #fffffffd;


}

.card:hover {
	background-color: #ededede5;
}

.card>.icons-task .container-icons {
	position: absolute;
	top: 30%;
	left: 75%;
	display: flex;
	width: 20%;
	gap: .8rem;
	cursor: pointer;
	font-size: 1.5rem;


}


.tooltip {
	position: absolute;
	top: 10px;
	left: 50%;
	transform: translateX(-50%);
	background-color: rgba(0, 0, 0, 0.8);
	color: #ffffff;
	padding: 5px 10px;
	border-radius: 5px;
	font-size: 10px;
	display: none;
}

.tooltip:hover {
	/* content: ''; */
	position: absolute;
	top: 10px;
	left: 50%;
	transform: translateX(-50%);
	border-width: 5px;


}

.description-subtask {
	position: absolute;
	top: 45%;
	left: 15%;
}
</style>