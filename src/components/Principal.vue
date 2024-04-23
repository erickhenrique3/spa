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
                    <i class='bx bx-store-alt' style='color:rgba(32,32,32,0.92)'  ></i>  Entrada
                </button>
                <button>
                    <i class='bx bx-notepad'></i>  Tarefas de hoje
                </button>
                <button>
                    <i class='bx bx-error-alt'></i>   Vencidos
                </button>
            </div>
        </div>
        <div class="box2">

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
    padding:  20px 0;
    background-color: rgba(237, 237, 237, 0.901);
    
}

.box1 button {
    
    background-color:  rgba(237, 237, 237, 0.901);
    margin-bottom: 20px;
    height: 40px;
    width: 100%;
    font-size: 25px;
    border: none;
    
}

.box1  i{
   margin-left: 5px;
}

.box1 button:hover{
    cursor: pointer;
    background-color: #ffffff
}

.box2 {

    flex: 1;
    flex-basis: 60%;
    height: 100vh;
    background-color: rgb(255, 255, 255);

}
</style>