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

            <form class="modal-body">

                <input type="text" name="Title" id="Title" placeholder="Nome da tarefa">
                <input type="text" name="Descripition" id="Description" placeholder="Descrição">
                <input type="datetime" id="date" placeholder=" Data de vencimento">
                <hr>
                <div class="buttons">
                    <button type="button" class="btn-save" @click="ShowModal = false">Salvar</button>
                    <button type="button" class="btn-close" @click="ShowModal = false">Cancelar</button>
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


        <div class="modal-task">
         <div class="modal-body-task">
            
         </div>
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
                <div class="card" @click="ShowTask">
                    <input type="checkbox" id="comprar-pao">
                    <div class="icons" >
                        <i class='bx bx-edit-alt'></i>
                        <i class='bx bx-notepad'></i>
                        <i class='bx bx-trash'></i>
                    </div>
                    <ul>


                        <label for="comprar-pao">Comprar pao</label>

                    </ul>
                    <ul>
                        <li>comprar ate as 10:00</li>

                    </ul>
                    <span class="data"><i class='bx bx-notepad'></i>12/09/2008</span>

                    <hr>
                    <button @click="ShowModal = true"><i class='bx bx-plus' style='color: #000;'></i> Criar tarefa
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'Principal',
    data() {
        return {
            ShowModal: false,
            ShowModalSub: false,
            showTooltip: false,
            ShowTask: false
            

        };


    },
    methods: {
        ShowIcons() {
            this.IconsVisible = true;
        },
        HideIcons() {
            this.IconsVisible = false;
        },
        ShowTask(){
            this.ShowTask = true
        }
    },
}
</script>

<style scoped>
.modal {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
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
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
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
    width: 120px;
    height: 40px;
    cursor: pointer;
    padding: 10px 20px;
    margin-top: 10px;
    margin-right: 50px;
    background-color: #ffffff;
    /* border: 1px solid rgba(210, 210, 210, 0.929); */



}

.modal button:hover {
    background-color: #000;
    color: #ffffff;
}

.buttons {
    font-size: 20px;

}
.modal-task{
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.modal-body-task{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-color: #ffffff;
    height: 200px;
    width: 600px;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
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
    margin-top: 100px;
    padding: 20px 0;
    background-color: rgba(237, 237, 237, 0.901);

}

.box1 button {

    background-color: rgba(237, 237, 237, 0.901);
    margin-bottom: 20px;
    height: 40px;
    width: 100%;
    font-size: 25px;
    border: none;

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
    margin: 5px;
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
    margin-top: 0;
    margin-left: -20px;
    position: relative;
    top: 15%;
    left: 100%;
    cursor: pointer;
}

/* input[type="checkbox"]:checked {
    background-color:  rgba(40, 252, 160, 0.742);
} */
.card {
    margin: 0 auto;
    padding: 20px;
    width: 50%;
    border: 1px solid #ccc;
    box-shadow: 2px 2px 5px #ccc;
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

.card>.icons {
    position: relative;
    top: 40%;
    left: 80%;
    margin-left: -30px;

    cursor: pointer;
}

.card>.icons>i {
    font-size: 20px;
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