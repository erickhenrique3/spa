<template>
	<div class="modal" v-if="ShowModalSub">
		<form class="modal-body">
			<input type="text" v-model="dataSubtask.title" name="title" id="title" placeholder="Nome da subtarefa">
			<p v-if="formSubtaskSubmitted && !dataSubtask.title" class="error-message">Por favor, preencha o título da
				subtarefa.</p>
			<input type="text" v-model="dataSubtask.description" name="description" id="Description" placeholder="Descrição">
			<p v-if="formSubtaskSubmitted && !dataSubtask.description" class="error-message">Por favor, preencha a descrição
				da subtarefa.</p>
			<hr>
			<div class="buttons">
				<button type="button" class="btn-save" @click="closeModalSub">Cancelar</button>
				<button type="button" class="btn-close" @click="postSubtask">Salvar</button>
			</div>
		</form>
	</div>
</template>

<script>
import axios from 'axios';

export default {
	props: {
		ShowModalSub: {
			type: Boolean,
			required: true
		},
		newSubtask: Object,
		selectedTask: Object
	},
	data() {
		return {
			dataSubtask: { ...this.newSubtask },
			formSubtaskSubmitted: false
		};
	},
	methods: {
		closeModalSub() {
			this.dataSubtask.title = '';
			this.dataSubtask.description = '';
			this.formSubtaskSubmitted = false;
			this.$emit('close');
		},

		postSubtask() {
			this.formSubtaskSubmitted = true;

			if (!this.dataSubtask.title || !this.dataSubtask.description) {
				return;
			}

			if (!this.selectedTask || !this.selectedTask.id) {
				return;
			}

			this.dataSubtask.task_id = this.selectedTask.id;

			axios.post('/tasks/subtasks', this.dataSubtask)
				.then(() => {
					this.dataSubtask = {
						title: '',
						description: '',
						task_id: '',
					};
					this.formSubtaskSubmitted = false;
					this.$emit('refresh-tasks');
					this.$emit('close');
				});
		}
	}
};
</script>

<style>
.modal {
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
}

.modal-body {
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	background-color: #ffffff;
	height: 200px;
	width: 600px;
	padding: 20px;
	z-index: 10;
	position: relative;
}

.modal-body input {
	border: none;
	font-size: 15px;
	width: 100%;
	height: 40px;
	margin-top: 5px;
	margin-bottom: 5px;
	padding: 5px;
	background-color: #ffffff;
}

.modal-body input:focus {
	outline: none;
}

.modal button {
	border: none;
	font-size: 15px;
	cursor: pointer;
	padding: 10px 20px;
	margin-top: 10px;
	margin-right: 50px;
	background-color: rgba(237, 237, 237, 0.901);
}

.modal button:hover {
	background-color: #000;
	color: #ffffff;
}

.buttons {
	font-size: 20px;
	display: flex;
	gap: .8rem;
	align-items: flex-end;
	justify-content: flex-end;
	border-top: 2px solid rgba(237, 237, 237, 0.901);
	width: 100%;
	position: relative;
}

.btn-save {
	position: relative;
	right: 5%;
}

.error-message {
	color: #e92626;
	font-size: 15px;
	cursor: pointer;
	text-decoration: underline;
}
</style>