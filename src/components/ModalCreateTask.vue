<template>
    <div class="modal" v-if="showModal">
        <form class="modal-body" @submit.prevent="postTask">
            <input type="text" v-model="newTask.title" name="Title" id="Title" placeholder="Nome da tarefa" />
            <p v-if="formSubmitted && !newTask.title" class="error-message">Por favor, preencha o título da tarefa.</p>

            <input type="text" v-model="newTask.description" name="Description" id="Description"
                placeholder="Descrição" />
            <p v-if="formSubmitted && !newTask.description" class="error-message">Por favor, preencha a descrição da
                tarefa.</p>

            <input type="date" v-model="newTask.due_date" id="date" placeholder="Data de vencimento" />
            <p v-if="formSubmitted && !newTask.due_date" class="error-message">Por favor, preencha a data de vencimento
                da tarefa.</p>
            <hr />
            <div class="buttons">
                <button type="button" class="btn-save" @click="closeModal">Cancelar</button>
                <button type="submit" class="btn-close">Criar Tarefa</button>
            </div>
        </form>
    </div>
</template>

<script>
import moment from 'moment';
import axios from 'axios';
import 'moment-timezone';
export default {
    props: {
        showModal: {
            type: Boolean,
            required: true
        }
    },
    data() {
        return {
            newTask: {
                title: '',
                description: '',
                due_date: ''
            },
            formSubmitted: false
        };
    },
    methods: {
        closeModal() {
            this.$emit('close');
            this.newTask = {
                title: '',
                description: '',
                due_date: ''
            };
            this.formSubmitted = false;
        },
        postTask() {
            this.formSubmitted = true;
            if (this.newTask.title && this.newTask.description && this.newTask.due_date) {
                const formattedDate = moment(this.newTask.due_date).format('DD/MM/YYYY');
                const taskToSend = { ...this.newTask, due_date: formattedDate };

                axios.post('tasks', taskToSend)
                    .then(response => {
                        this.$emit('task-created', response.data);
                        this.closeModal();
                    })
                    .catch(error => {
                        console.error('Erro ao criar a tarefa', error);
                    });
            } else {
                console.log('Por favor, preencha todos os campos obrigatórios.');
            }
        }
    }
};
</script>

<style scoped>
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
    /* display:none; */

}

.modal-body {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-color: #ffffff;
    height: 250px;
    width: 600px;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    z-index: 10;
    position: relative;

}

.modal-body input {
    border: none;
    font-size: 20px;
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
    font-size: 20px;
    cursor: pointer;
    padding: 10px 20px;
    margin-top: 10px;
    margin-right: 50px;
    background-color: rgba(237, 237, 237, 0.901);
    /* border: 1px solid rgba(210, 210, 210, 0.929); */



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
    position: relative
}

.btn-save {
    position: relative;
    right: 5%;
}
.error-message {
    color: #e92626;
    cursor: pointer;
    text-decoration: underline;
}
</style>