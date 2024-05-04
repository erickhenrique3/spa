<template>
    <div class="container">
        <div class="box1">
            <h1>Inscreva-se</h1>
            <form>
                
                <label for="form-label">Nome completo</label>
                <input type="text" name="name" id="" placeholder="Digite seu nome" autocomplete="off">

                <label for="form-label">Endereço de e-mail</label>
                <input type="text" name="email" id="" placeholder="Digite seu e-mail" autocomplete="off">

                <label for="form-label">Senha de acesso:</label>
                <input type="password" name="password" id="" placeholder="Digite sua senha" autocomplete="off">

                <router-link to="/login">
                    <a class="a">Já tenho uma conta</a>
                </router-link>
                <router-link to="/login">
                    <button>Cadastrar</button>
                </router-link>
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
    transition: transform 0.3s ease;
}

.box1 {


    background-color: rgba(255, 255, 255, 0.855);
    top: 50px;
    left: 50px;
    bottom: 50px;
    margin-right: 30px;

}

.box1 h1{
    font-size: 40px;
    margin-top: 150px;
    margin-left: 90px;
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
.box2:hover .icon{
    transform: translateY(-20px);
}


form {
    
    position: absolute;
    left: 10%;
    top: 30%;
    font-size: 20px;
    width: 70%;
}

form>input {
   
    margin-top: 20px;
    margin-bottom: 20px;
    width: 100%;
    height: 50px;

}

form>label {
    padding: 30px 0px;
}

form button {

   
    color: #ffffff;
    background-color: #000000;
    position: absolute;
    top: 400px;
    right: 0;
    width: 200px;
    height: 50px;
    cursor: pointer;
}
.a {
    position: absolute;
    top: 400px;
    left: 0;
    text-decoration: none;
    color: gray;
}

.a:hover {
    text-decoration: underline;

}
</style>