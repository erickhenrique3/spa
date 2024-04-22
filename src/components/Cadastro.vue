<template>
    <div class="container">
        <div class="box1">
            <form>
                <h1>Inscreva-se</h1>
                <label for="form-label">Nome completo</label>
                <input type="text" name="name" id="" placeholder="Digite seu nome" autocomplete="off">

                <label for="form-label">Endereço de e-mail</label>
                <input type="text" name="email" id="" placeholder="Digite seu e-mail" autocomplete="off">

                <label for="form-label">Senha de acesso:</label>
                <input type="password" name="password" id="" placeholder="Digite sua senha" autocomplete="off">

                <a href="#">Já tenho uma conta</a>
                <button>Cadastrar</button>
            </form>
        </div>
        <div class="box2">
            <div class="icon">
                🤘
            </div>
            <h3>A fortuna fica ao lado daquele que ousa.
            </h3>
            <p>Todo progresso ocorre fora da zona de conforto.</p>
        </div>
    </div>
</template>
<script>
export default {
    name: 'Cadastro'
} 
</script>

<style scoped>
.container {
    /* width: 100vw;
    height: 100vh;

    
    position: relative;
    background-color: #ffffff;
    box-sizing: border-box; */

    width: 100vw;
    height: 100vh;
    position: relative;
    background-color: #ffffff;
    box-sizing: border-box;


}

.box1,
.box2 {

    height: 100vh;
    position: absolute;
    box-sizing: border-box;
    width: calc(50% - 60px);
    height: calc(100vh - 60px);
    transition: background-color 0.3s ease;
}

.box2>h3 {
    text-align: center;
    position: absolute;
    top: 400px;
    left: 30px;
    font-size: 40px
}

.box2>p {
    font-size: 20px;
    color: #575757fb;
    text-align: center;
    justify-content: center;
    position: absolute;
    top: 500px;
    left: 200px;

}

.icon {
    font-size: 100px;
    position: absolute;
    top: 150px;
    left: 30px;
    border: none;
}

.box1 {


    background-color: rgba(255, 255, 255, 0.855);
    top: 50px;
    left: 50px;
    bottom: 50px;
    margin-right: 30px;

}

.box2 {


    background-color: rgb(243, 243, 243);
    top: 50px;
    right: 50px;
    bottom: 100px;


}

.box2:hover{
    background-color: #000000;
}
.box2:hover h3,.box2:hover p{
    color: #ffffff;
}


form {
    font-size: 20px;
    position: relative;
    top: 250px;
    left: 250px;
    right: 250px;
    bottom: 250px;
    width: 50%;
    height: 500px;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

form>input {
    border: 1px solid rgba(135, 135, 135, 0.917);
    width: 100%;
    height: 50px;

}

form>label {
    padding: 10px 0px;
}

form button {

    position: absolute;
    bottom: 0px;
    right: 0px;
    width: 150px;
    height: 50px;
    background-color: #000000;
    color: #ffffff;
    border: none;

    cursor: pointer;
}

form>a {
    position: absolute;
    bottom: 10px;
    left: 0px;
    text-decoration: none;
    color: gray;
}

form>a:hover {
    text-decoration: underline;

}
</style>