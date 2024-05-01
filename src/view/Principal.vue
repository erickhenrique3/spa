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
        <div class="modal" v-if="ShowModal">

            <form class="modal-body" @submit.prevent="postTasks">

                <input type="text" v-model="newTask.title" name="Title" id="Title" placeholder="Nome da tarefa">
                <input type="text" v-model="newTask.description" name="Descripition" id="Description"
                    placeholder="Descrição">
                <input type="datetime" v-model="newTask.due_date" id="date" placeholder=" Data de vencimento">
                <hr>
                <div class="buttons">
                    <button type="button" class="btn-save" @click="ShowModal = false">Cancelar</button>
                    <button type="button" class="btn-close" @click="postTasks">Criar Tarefa</button>
                </div>
            </form>

        </div>
        <div class="modal" v-if="ShowModalSub" >



            <form class="modal-body">

                <input type="text" name="Title" id="Title" placeholder="Nome da subtarefa">
                <input type="text" name="Descripition" id="Description" placeholder="Descrição">

                <hr>
                <div class="buttons">
                    <button type="button" class="btn-save" @click="ShowModalSub = false">Salvar</button>
                    <button type="button" class="btn-close" @click="ShowModalSub = false">Cancelar</button>
                </div>
            </form>



        </div>


        <div class="modal-task" v-if="openTaskModal">
            <div class="modal-body-task">
                <div class="modal-header-task">
                    Visualizar tarefa
                    <div class="dropdown">
                        <button class="dropbtn">
                            <i class='bx bx-dots-horizontal-rounded'></i>
                        </button>
                        <div class="dropdown-content">
                            <a href="#"> <i class='bx bx-link'></i>Copiar link </a>
                            <a ><i class='bx bx-printer' ></i> Imprmir tarefa</a>
                            <a href="#" style="color: red;"><i class='bx bx-trash' ></i>Deletar tarefa</a>
                        </div>
                    </div>
                    <i @click="closeModalTaskClick" class='bx bx-x'></i>
                </div>
                <hr>
                <div class="box1-modal-task">

                    <h3>{{ selectedTask.title }} </h3>
                    <p class="description-task"> {{ selectedTask.description }}</p>


                    <h4>Subtarefas</h4>

                    <hr class="hr_sub">
                    <ul v-if="selectedTask.subtarefas && selectedTask.subtarefas.length">
                        <li v-for="subtask in selectedTask.subtarefas" :key="subtask.id">
                            <p class="sub"><strong>{{ subtask.title }}</strong></p>
                            <p class="description-subtask">{{ subtask.description }}</p>
                        </li>

                    </ul>



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


        <div class="modal-update-task" v-if="showUpdateTask">
            <div class="modal-body-update-task">
                <h1>Editar tarefa</h1>
                <hr>
                <input type="text" placeholder="Digite um novo titulo!" v-model="taskToUpdate.title">
                <input type="text" placeholder="Digite uma nova descrição!" v-model="taskToUpdate.description">
                <input type="date" placeholder="Digite uma nova data!" v-model="taskToUpdate.due_date">

                <div class="buttons-update">
                    <button type="button" class="btn-close" @click.stop="closeUpdateTask">Cancelar</button>
                    <button type="button" class="btn-save" @click.stop="putTask(taskToUpdate.id)">Salvar</button>
                </div>
            </div>
        </div>


        <div class="modal-date-task" v-if="showUpdateDate">
            <div class="modal-body-date-task">
                <h1>Alterar data</h1>
                <input type="date" v-model="taskToUpdateDate.due_date">
                <div class="buttons-date">
                    <button type="button" class="btn-close" @click="closeUpdateDate">Cancelar</button>
                    <button type="button" class="btn-save"
                        @click="patchUpdateDate(taskToUpdateDate, taskToUpdate.id)">Salvar</button>
                    {{ taskToUpdate.id }}
                </div>
            </div>
        </div>



        <div class="box1">
            <div>
                <button @click="showAllTasks">
                    <i class='bx bx-store-alt' style='color:rgba(32,32,32,0.92)'></i> Entrada
                </button>
                <button @click="showTodayTasks">
                    <i class='bx bx-notepad'></i> Tarefas de hoje
                </button>
                <button @click="showOverdueTasks">
                    <i class='bx bx-error-alt'></i> Vencidos
                </button>
            </div>
        </div>
        <div class="box2">
            <div class="conteudo">
                <h1>Entrada</h1>
                <div class="card-container">
                    <div class="card" v-for="task in filteredTasks" :key="task.id" @click="openTaskModalClick(task)"
                        @mouseover="task.ShowIcons = true" @mouseleave="task.ShowIcons = false">


                        <label class="custom-radio" @click="stopModal">
                            <input @click="stopModal" type="radio" :id="'task-status-' + task.id" v-model="task.status"
                                value="completed" @change="updateTaskStatus(task)">
                            <span class="checkmark"></span>
                        </label>


                        <div class="icons-task">
                            <div class="container-icons" v-show="task.ShowIcons">
                                <i @click.stop="openUpdateTask(task)" class='bx bx-edit-alt'></i>
                                <i @click.stop="openUpdateDate(task)" class='bx bx-notepad'></i>
                                <i class='bx bx-trash' @click.stop="deleteTask(task.id)"></i>
                            </div>
                        </div>
                        <ul>
                            <label for="comprar-pao">{{ task.title }}</label>
                        </ul>
                        <ul>
                            <li>{{ task.description }}</li>
                        </ul>
                        <span class="data" :style="{ backgroundColor: BackgroundColorDate(task.due_date) }">
                            <i class='bx bx-notepad'></i>{{ formatDate(task.due_date)
                            }}</span>
                        <hr>
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

export default {

    name: 'Principal',


    data() {
        return {
            ShowModal: false,
            ShowModalSub: false,
            showTooltip: false,
            openTaskModal: false,
            showUpdateTask: false,
            showUpdateDate: false,
            taskToUpdate: null,
            taskToUpdateDate: {
                due_date: ''
            },
            ShowIcons: false,
            selectedColor: '',
            tasks: [],
            selectedTask: null,
            newTask: {
                title: '',
                description: '',
                due_date: '',
            },
            filteredTasks: [],
            currentDate: new Date(),
            showOverdue: false,
            // selectedTaskStatus: ''


        };


    },
    methods: {
        ModalSub(){
           this.ShowModalSub = true
        },
        formatTime(dateTime) {

            const formattedTime = new Date(dateTime).toLocaleTimeString();
            return formattedTime;
        },
        showTodayTasks() {
            const today = moment().tz('America/Sao_Paulo').startOf('day');
            this.filteredTasks = this.tasks.filter(task => {
                const taskDueDate = moment.tz(task.due_date, 'America/Sao_Paulo');
                return taskDueDate.isSame(today, 'day');

                // const getToday = () => Intl.DateTimeFormat("pt-BR").format(new Date());
                // this.filteredTasks = this.tasks.filter(task => {
                //     const today = getToday();
                //     const taskDueDate = new Date(task.due_date);
                //     const taskDate = Intl.DateTimeFormat("pt-BR").format(taskDueDate);
                //     return taskDate === today;
            });
            // const todayWithoutTime = new Date();
            // todayWithoutTime.setHours(0, 0, 0, 0); 
            // this.filteredTasks = this.tasks.filter(task => {
            //     const taskDueDate = new Date(task.due_date);
            //     taskDueDate.setHours(0, 0, 0, 0); 
            //     return taskDueDate.getTime() === todayWithoutTime.getTime();
            // console.log(getToday);

        },

        showOverdueTasks() {
            const today = moment().tz('America/Sao_Paulo').startOf('day');
            this.filteredTasks = this.tasks.filter(task => {
                const taskDueDate = moment.tz(task.due_date, 'America/Sao_Paulo');
                return taskDueDate.isBefore(today, 'day');
                // const todayWithoutTime = new Date();
                // todayWithoutTime.setHours(0, 0, 0, 0);
                // this.filteredTasks = this.tasks.filter(task => {
                //     const taskDueDate = new Date(task.due_date);
                //     taskDueDate.setHours(0, 0, 0, 0);
                //     return taskDueDate < todayWithoutTime;
            });
        },


        showAllTasks() {
            this.filteredTasks = this.tasks;
        },
        // ShowIcons() {
        //     this.IconsVisible = true;
        // },
        // isOverdue(due_Date) {
        //     const today = moment();
        //     const taskDueDate = moment(due_Date, 'YYYY/MM/DD');
        //     return taskDueDate.isBefore(today, 'day');
        // },

        BackgroundColorDate(dueDate) {
            const today = moment().tz('America/Sao_Paulo');
            today.set({ hour: 0, minute: 0, second: 0, millisecond: 0 });

            const taskDueDate = moment.tz(dueDate, 'America/Sao_Paulo');
            taskDueDate.set({ hour: 0, minute: 0, second: 0, millisecond: 0 });


            return taskDueDate.isBefore(today, 'day') ? '#f11919cf' : ' rgba(40, 252, 160, 0.742)';


        },
        stopModal(event) {
            event.stopPropagation();
        },
        formatDate(date) {
            return moment(date).format('DD/MM/YYYY');
        },
        openUpdateDate(task) {
            // this.taskToUpdate = { id: task, due_date: '' };

            // this.showUpdateDate = true
            if (task && task.id) {
                this.taskToUpdate = { id: task.id, due_date: task.due_date };
                this.showUpdateDate = true;
            } else {
                console.error("A tarefa está ausente ou não tem um ID válido.");
            }
        },
        closeUpdateDate() {
            this.showUpdateDate = false
            this.taskToUpdate = null

        },
        openUpdateTask(task) {
            this.taskToUpdate = task
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
            // this.showUpdateTask = false
        },
        closeModalTaskClick() {
            this.openTaskModal = false
        },
        closeModal() {
            this.ShowModal = false
        },


        getTasks() {
            axios.get('tasks')
                .then((response) => {
                    this.tasks = response.data
                    console.log(this.tasks)
                    this.filteredTasks = this.tasks;
                    this.sortTasks();
                })
                .catch((error) => {
                    console.log(error)
                })
                .finally(() => {
                    console.log('A requisição acabou!');
                })
        },
        postTasks() {
            axios.post('tasks', this.newTask)
                .then(response => {
                    console.log('Tarefa criada com sucesso: ', response.data);
                    this.newTask = {
                        title: '',
                        description: '',
                        due_date: '',
                    };
                    this.getTasks();
                    this.filteredTasks = this.tasks;
                    this.closeModal();

                })
                .catch(error => {
                    console.error('Erro ao criar a tarefa', error);
                });
        },
        deleteTask(tasks) {
            axios.delete(`tasks/${tasks}`)
                .then(response => {
                    this.tasks = this.tasks.filter(task => task.id !== tasks);
                    console.log('Tarefa excluída com sucesso:', response.data);
                    this.filteredTasks = this.tasks;
                })
                .catch(error => {
                    console.error('Erro ao excluir a tarefa:', error);
                });

        },
        putTask(id) {
            axios.put(`tasks/${id}`, {
                title: this.taskToUpdate.title,
                description: this.taskToUpdate.description,
                due_date: this.taskToUpdate.due_date
            })
                .then(response => {

                    console.log('Tarefa atualizada com sucesso:', response.data);
                    this.getTasks();

                    this.closeUpdateTask();
                })
                .catch(error => {
                    console.error('Erro ao atualizar a tarefa:', error);
                });
        },
        patchUpdateDate(tasks, taskToUpdateDate) {
            const formattedDate = moment(taskToUpdateDate.due_date, 'DD-MM-YY').format('DD-MM-YY');

            axios.patch(`tasks/${tasks}/due_date/`, {
                due_date: formattedDate
            })
                .then(response => {
                    console.log('Data da tarefa atualizada com sucesso:', response.data);
                    this.getTasks();
                    this.closeUpdateDate();
                })
                .catch(error => {
                    console.error('Erro ao atualizar a data da tarefa:', error);
                });
        },
        updateTaskStatus(task) {
            axios.patch(`tasks/${task.id}/status`, { status: task.status })

                .then(response => {
                    console.log('Status da tarefa atualizado com sucesso:', response.data);
                    task.status = task.status === 'completed' ? 'pending' : 'completed';

                    this.sortTasks();

                })
                .catch(error => {
                    console.error('Erro ao atualizar o status da tarefa:', error);
                });

        },
        sortTasks() {
            this.filteredTasks.sort((a, b) => {
                if (a.status === 'completed' && b.status !== 'completed') return -1;
                if (a.status !== 'completed' && b.status === 'completed') return 1;

                return 0;
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
/* Estilize o botão do dropdown */
.dropbtn {
    background-color: #ffffff;

    padding: 16px;
    font-size: 30px;
    height: 30px;
    border: none;
    cursor: pointer;
   
}

/* Estilize o contêiner do dropdown (esconde o dropdown por padrão) */
.dropdown {
    position: absolute;
    left: 80%;
    top: 15%;
    display: inline-block;
}

/* Estilize o conteúdo do dropdown (escondido por padrão) */
.dropdown-content {
    display: none;
    position: absolute;
    background-color: #f9f9f9;
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    z-index: 1;
}

/* Estilize os links do dropdown */
.dropdown-content a {
    color: black;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
}

/* Mudar a cor do link quando passar o mouse */
.dropdown-content a:hover {
    background-color: #f1f1f1;
}

/* Exibir o dropdown quando o mouse passar sobre o botão */
.dropdown:hover .dropdown-content {
    display: block;
}

/* Alterar a cor do botão quando passar o mouse */
/* .dropdown:hover .dropbtn {
    background-color: #939493;
} */








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

.modal-task {
    /* position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%); */

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
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    /* display: none; */
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
    top: 10%;
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
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    z-index: 10;
    position: relative;
}

.modal-body-update-task h1 {
    text-align: center;
}

.modal-body-update-task>input {
    border: none;
    font-size: 20px;
    width: 100%;
    height: 40px;
    margin-top: 5px;
    margin-bottom: 5px;
    padding: 5px;
    background-color: #ffffff;
}

.modal-body-update-task>button {
    font-size: 20px;
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
    font-size: 20px;
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
    display: flex;
    justify-content: space-between;
    width: 70%;
    padding: 5px;
}



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
    height: 20%;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    z-index: 10;
    position: relative;
}

.modal-body-date-task h1 {
    position: absolute;
    top: 5%;

}

.modal-body-date-task>.buttons-date {
    position: absolute;
    bottom: 5%;
}

.modal-body-date-task input {
    border: none;
    font-size: 20px;
    width: 100%;
    height: 40px;
    margin-top: 5px;
    margin-bottom: 5px;
    padding: 5px;
    background-color: #ffffff;
}

.modal-body-date-task button {
    border: none;
    font-size: 20px;
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





/* .btn-close{
    position: absolute;
    top: 58%;
    left: 20%;
}
.btn-save{
    position: absolute;
    top: 58%;
    left: 10%;
} */

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
    /* justify-content: center; */
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
    /* position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    /* flex-wrap: wrap; */
    /* height: 80%;
    width: 100%;
    margin-top: 3rem; */
    /* overflow-y: scroll; */
    /* flex-direction: column; */
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
    margin-bottom: 10px;
}



.card label {
    /* margin-bottom: 10px; */

    font-size: 25px;
    font-style: italic;

}

.card input {
    width: 20px;
    height: 20px;
    border: 2px solid #ccc;
    margin-bottom: 10px;
    margin-top: 0;
    /* margin-left: 20px; */
    position: relative;
    /* top: 15%; */
    /* left: 5%; */
    cursor: pointer;
}


/* input[type="checkbox"]:checked {
    background-color:  rgba(40, 252, 160, 0.742);
} */
.card {
    /* margin: 0 auto; */
    top: 10%;
    margin-top: 4%;

    padding: 20px;
    width: 50%;
    border: 1px solid #ccc;
    box-shadow: 2px 2px 5px #ccc;
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
    left: 80%;
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