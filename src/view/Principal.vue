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
                <input type="text" v-model="newTask.description" name="Descripition" id="Description" placeholder="Descrição">
                <input type="datetime" v-model="newTask.due_date" id="date" placeholder=" Data de vencimento">
                <hr>
                <div class="buttons">
                    <button type="button" class="btn-save" @click="ShowModal = false">Cancelar</button>
                    <button type="button" class="btn-close" @click="postTasks" >Criar Tarefa</button>
                </div>
            </form>

        </div>
        <div class="modal" v-if="ShowModalSub">



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
                    <i class='bx bx-dots-horizontal-rounded'></i>
                    <i @click="closeModal" class='bx bx-x'></i>
                </div>
                <hr>
                <div class="box1-modal-task">

                    <h3>Comprar pão </h3>
                    <p> Lorem ipsum dolor sit amet consectetur,.</p>
                    <span>12/09/2008</span>

                    <h4>Subtarefas</h4>
                    <hr class="hr_sub">
                    <p class="sub">Comprar remedio</p>

                </div>
                <div class="box2-modal-task">
                    <h4>data de vencimento:</h4>
                    <p>Id da tarefa:</p>
                </div>

            </div>
            <!-- <div class="modal-body-task" >
                <div class="modal-header-task">
                    Visualizar tarefa
                    <i class='bx bx-dots-horizontal-rounded'></i>
                    <i @click="closeModal" class='bx bx-x'></i>
                </div>
                <hr>
                <h1>title </h1>
                <p>description</p>
                <p>12/09/2008</p>
                
                <h1>Criar subtarefa</h1>
                <div class="modal-menu-task">

                </div>
            </div> -->
        </div>



        <div class="box1">
            <div>
                <button>
                    <i class='bx bx-store-alt' style='color:rgba(32,32,32,0.92)'></i> Entrada
                </button>
                <button>
                    <i class='bx bx-notepad'></i> Tarefas de hoje
                </button>
                <button>
                    <i class='bx bx-error-alt'></i> Vencidos
                </button>
            </div>
        </div>
        <div class="box2">
            <div class="conteudo">
                <h1>Entrada</h1>
                <div class="card" v-for="task in tasks" :key="task.id"
                 @click="openTaskModal" @mouseover="ShowIcons = true" @mouseleave="ShowIcons = false">
                    <input type="radio" id="comprar-pao">
                    <div class="icons-task">
                        <div class="container-icons" v-show="ShowIcons">
                            <i class='bx bx-edit-alt'></i>
                            <i class='bx bx-notepad'></i>
                            <i class='bx bx-trash'></i>
                        </div>
                    </div>
                    <ul>

                        <label for="comprar-pao">{{ task.title }}</label>

                    </ul>
                    <ul>
                        <li>{{ task.description }}</li>

                    </ul>
                    <span class="data"><i class='bx bx-notepad'></i>{{ task.due_date }}</span>

                    <hr>
                    <button @click="ShowModal = true"><i class='bx bx-plus' style='color: #000;'></i> Criar tarefa
                    </button>
                    
                </div>
            </div>
        </div>
    </div>





</template>
<script>
import axios from 'axios';

export default {

    name: 'Principal',


    data() {
        return {
            ShowModal: false,
            ShowModalSub: false,
            showTooltip: false,
            openTaskModal: false,
            ShowIcons: false,
            selectedColor: '',
            tasks: [],
            newTask: {
                title: '',
                description: '',
                due_date: '',
            }

        };


    },
    methods: {
        // ShowIcons() {
        //     this.IconsVisible = true;
        // },

        openTaskModal() {
            this.openTaskModal = true
        },
        closeModal() {
            this.ShowModal = false
        },


        getTasks() {
            axios.get('tasks')
                .then((response) => {
                    this.tasks = response.data.data
                    console.log(this.tasks)
                })
                .catch((error) => {
                    console.log(error)
                })
                .finally(() => {
                    console.log('A requisição acabou!');
                })
        },
        postTasks(){
            axios.post('tasks', this.newTask)
            .then(response =>{
                console.log('Tarefa criada com sucesso: ', response.data);
                this.newTask ={
                    title: '',
                    description: '',
                    due_date: '',
                };
                this.getTasks();
                this.closeModal();

            })
            .catch(error => {
                console.error('Erro ao criar a tarefa', error);
            });
        }


    },
    mounted() {
        axios.defaults.baseURL = 'http://127.0.0.1:8000/api/'
        this.getTasks()
    }
}
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

.box1-modal-task p {
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
    left: 10%;
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

.box2-modal-task h4 {
    margin-left: 10%;
    position: absolute;
    top: 3%;
}

.box2-modal-task p {
    margin-left: 10%;
    position: absolute;
    top: 15%;
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
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 80%;

}

.conteudo h1 {
    position: absolute;
    margin-left: 0;
    top: 20%;
    left: 40%;
}

ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
}

li {
    margin-bottom: 10px;
}

.data {

    background-color: rgba(40, 252, 160, 0.742);
    
}

.card label {
    margin-bottom: 10px;

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
    margin: 0 auto;
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
</style>