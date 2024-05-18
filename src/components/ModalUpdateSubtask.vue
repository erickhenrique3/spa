<template>
    <div class="modal" v-if="showUpdateModalSub && dataTaskToUpdateSub">
        <form class="modal-body">
            <input type="text" v-model="dataTaskToUpdateSub.title" name="title" id="title"
                placeholder="Nome da subtarefa">
            <p v-if="formSubtaskSubmitted && !dataTaskToUpdateSub.title" class="error-message">Por favor, preencha o
                título da subtarefa.</p>
            <input type="text" v-model="dataTaskToUpdateSub.description" name="description" id="Description"
                placeholder="Descrição">
            <p v-if="formSubtaskSubmitted && !dataTaskToUpdateSub.description" class="error-message">Por favor, preencha
                a descrição da subtarefa.</p>
            <hr>
            <div class="buttons">
                <button type="button" class="btn-save" @click="closeUpdateModalSub()">Cancelar</button>
                <button type="button" class="btn-close" @click="putSubtask()">Salvar</button>
            </div>
        </form>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    props: {
        showUpdateModalSub: {
            type: Boolean,
            required: true
        },
        taskToUpdateSub: {
            type: Object,
            required: true
        },
       
    },
    data() {
        return {
            dataTaskToUpdateSub: {
                title: '',
                description: '',
                id: this.taskToUpdateSub.id
            },
           
            formSubtaskSubmitted:  false
        };
    },
    methods: {
        closeUpdateModalSub() {
            this.$emit('close');
        },
        putSubtask() {

            if (!this.taskToUpdateSub.id) {
                
                console.error('O atributo id em taskToUpdateSub é indefinido.');
                return;
            }

            this.formSubtaskSubmitted = true;

            if (!this.dataTaskToUpdateSub.title || !this.dataTaskToUpdateSub.description) {
                return;
            }

            axios.put(`/subtasks/${this.taskToUpdateSub.id}`, {
                title: this.dataTaskToUpdateSub.title,
                description: this.dataTaskToUpdateSub.description
            })
                .then(response => {
                    console.log('Subtarefa atualizada com sucesso:', response.data);
                    this.closeUpdateModalSub();
                    this.$emit('refresh-tasks');
                })
                .catch(error => {
                    console.error('Erro ao atualizar a subtarefa:', error);

                });
        }
    },
    watch: {
        formSubtaskSubmitted(newValue) {
            this.formSubtaskSubmitted = newValue;
        }
    }
};
</script>