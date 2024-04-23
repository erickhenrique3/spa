<template>
    <div class="container">
        <header>
            <div class="emoji">
                🤘
            </div>
            <div class="icons">
                <i class='bx bx-plus' style='color:#ffff'></i>
                <i class='bx bx-help-circle' style='color:#ffff'></i>
                <i class='bx bx-bell' style='color:#ffff'></i>
                <i class='bx bx-user' style='color:#ffff'></i>
            </div>

        </header>
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
                <div class="card">
                    <input type="checkbox" id="comprar-pao">
                    <ul>


                        <label for="comprar-pao">Comprar pao</label>

                    </ul>
                    <ul>
                        <li>comprar ate as 10:00</li>

                    </ul>
                    <span class="data"><i class='bx bx-notepad'></i>12/09/2008</span>

                    <hr>
                    <button><i class='bx bx-plus' style='color: #000;'></i> Criar subtarefa </button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'Principal',
}
</script>

<style scoped>
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

    background-color: #ffffff;
    cursor: pointer;
    margin-top: 20px;
}
</style>