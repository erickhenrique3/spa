<template>
	<div class="modal-date-task" v-if="showUpdateDate">
		<div class="modal-body-date-task">
			<h1>Alterar data</h1>
			<input type="date" :value="dataDueDate" @input="updateDueDate($event.target.value)">
			<p v-if="formDateSubmitted && !dataDueDate" class="error-message">Por favor, preencha a data de vencimento.
			</p>
			<hr>
			<div class="buttons-date">
				<button type="button" class="btn-close" @click="closeUpdateDate">Cancelar</button>
				<button type="button" class="btn-save" @click="patchUpdateDate">Salvar</button>
			</div>
		</div>
	</div>
</template>

<script>
import axios from 'axios';
import moment from 'moment';

export default {
	props: {
		showUpdateDate: {
			type: Boolean,
			required: true
		},
		dataDueDate: {
			type: String,
			required: true
		},
		taskToUpdateDate: {
			type: Object,
			required: true
		}
	},
	data() {
		return {
			formDateSubmitted: false
		};
	},
	methods: {
		formatDate(date) {
			return moment(date).format('DD/MM/YYYY');
		},
		updateDueDate(value) {
			this.$emit('update:dataDueDate', value);
		},

		closeUpdateDate() {
			this.$emit('close');
		},


		patchUpdateDate() {

			this.formDateSubmitted = true;


			if (this.dataDueDate) {

				const formattedDate = this.formatDate(this.dataDueDate);

				axios.patch(`/tasks/${this.taskToUpdateDate.id}/due_date`, { due_date: formattedDate })
					.then(() => {



						this.$emit('updateTasks');
						this.$emit('close');

					});

			}
		}
	}
};
</script>

<style scoped>
.modal-date-task {
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

.modal-body-date-task {
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	background-color: #ffffff;
	width: 600px;
	height: 200px;
	padding: 20px;


	z-index: 10;
	position: relative;
}

.modal-body-date-task h1 {
	position: absolute;
	top: 5%;

}

hr {
	width: 100%;
}

.modal-body-date-task>.buttons-date {
	position: absolute;
	bottom: 5%;
	left: 50%;
	display: flex;
}

.modal-body-date-task input {
	border: none;
	font-size: 15px;
	width: 100%;
	height: 40px;
	margin-top: 5px;
	margin-bottom: 5px;
	padding: 5px;
	background-color: #ffffff;
}

.modal-body-date-task button {
	border: none;
	font-size: 15px;
	cursor: pointer;
	padding: 10px 20px;
	margin-top: 10px;
	margin-right: 50px;
	background-color: rgba(237, 237, 237, 0.901);
}

.modal-body-date-task button:hover {
	background-color: #000;
	color: #ffffff;
}
</style>
