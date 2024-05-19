<template>
    <div class="modal-update-task" v-if="showUpdateTask">
        <div class="modal-body-update-task">
           
          
            <input type="text" placeholder="Digite um novo titulo!" v-model="dataTask.title">
            <p v-if="formTaskSubmitted && !dataTask.title" class="error-message">Por favor, preencha o título da tarefa.
            </p>

            <input type="text" placeholder="Digite uma nova descrição!" v-model="dataTask.description">
            <p v-if="formTaskSubmitted && !dataTask.description" class="error-message">Por favor, preencha a descrição
                da tarefa.</p>

            <input type="date" placeholder="Digite uma nova data!" v-model="dataTask.due_date">
            <p v-if="formTaskSubmitted && !dataTask.due_date" class="error-message">Por favor, preencha a data da
                tarefa.</p>
             <hr>
            <div class="buttons-update">
                <button type="button" class="btn-close" @click="closeUpdateTask">Cancelar</button>
                <button type="button" class="btn-save" @click="putTask">Salvar</button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    props: {
        showUpdateTask: {
            type: Boolean,
            required: true
        },
        taskToUpdate: {
            type: Object,

            required: true
        }
    },
    data() {
        return {
            dataTask: {
                title: '',
                description: '',
                due_date: ''
            },
            formTaskSubmitted: false
        };
    },

    methods: {
        closeUpdateTask() {
            this.dataTask = { title: '', description: '', due_date: '' };
            this.$emit('close');
            this.formTaskSubmitted = false;


        },
        putTask() {
            this.formTaskSubmitted = true;

            if (!this.dataTask.title || !this.dataTask.description || !this.dataTask.due_date) {
                return;
            }

            axios.put(`/tasks/${this.taskToUpdate.id}`, {
                title: this.dataTask.title,
                description: this.dataTask.description,
                due_date: this.dataTask.due_date
            })
                .then(() => {
                    
                    this.$emit('task-updated');
                    this.closeUpdateTask();
                })
                .catch(error => {
                    console.error('Erro ao atualizar a tarefa:', error);
                });
        }
    }
};
</script>

<style scoped>
.modal-update-task {
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

.modal-body-update-task {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-color: #ffffff;

    width: 600px;
    padding: 20px;
   
   
    z-index: 10;
    position: relative;
}

hr{
    width: 100%;
}



.modal-body-update-task>input {
    border: none;
    font-size: 15px;
    width: 100%;
    height: 40px;
    margin-top: 5px;
    margin-bottom: 5px;
    padding: 5px;
    background-color: #ffffff;
}

.modal-body-update-task>button {
    font-size: 15px;
    display: flex;
    gap: .8rem;
    align-items: flex-end;
    justify-content: flex-end;
    border-top: 2px solid rgba(237, 237, 237, 0.901);
    width: 100%;
    position: relative
}

.modal-body-update-task button {
    border: none;
    font-size: 15px;
    cursor: pointer;
    padding: 10px 20px;
    margin-top: 10px;
    margin-right: 50px;
    background-color: rgba(237, 237, 237, 0.901);
}

.modal-body-update-task button:hover {
    background-color: #000;
    color: #ffffff;
}

.buttons-update {
    
    position: relative;
    left: 45%;
    width: 70%;
   
}
.error-message {
    color: #e92626;
    cursor: pointer;
    font-size: 15px;
    text-decoration: underline;
}
</style>