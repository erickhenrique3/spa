<template>
    <div class="container">
        <div class="box1">
            <div class="icon">
                🤘
            </div>
            <h3>A fortuna fica ao lado daquele que ousa.
            </h3>
            <p>Todo progresso ocorre fora da zona de conforto.</p>
        </div>
        <div class="box2">
            <h1>Login</h1>
            <form>

                <label for="form-label">Endereço de e-mail</label>
                <input type="text" name="email" id="" placeholder="Digite seu e-mail" autocomplete="off">

                <label for="form-label">Senha de acesso:</label>
                <input type="password" name="password" id="" placeholder="Digite sua senha" autocomplete="off">

                <router-link to="/cadastro">
                    <a class="a">Não tenho conta</a>
                </router-link>
                <router-link to="/principal">
                    <button>Acessar</button>
                </router-link>
            </form>

        </div>
    </div>
</template>

<script>
export default {

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

.box2>h1 {
    margin-top: 250px;
    font-size: 40px;
}

.box1 {
    position: absolute;
    background-color: rgba(229, 229, 229, 0.885);
    top: 27px;
    left: 27px;

}

.box1>h3 {
    text-align: center;
    position: absolute;
    top: 400px;
    left: 30px;
    font-size: 40px
}

.box1>p {
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

.box2 {

    position: absolute;
    top: 27px;
    right: 27px;

    background-color: rgb(255, 255, 255);

}

.box1:hover {
    background-color: #000000;
}

.box1:hover h3,
.box1:hover p {
    color: #ffffff;
}

.box1:hover .icon {
    transform: translateY(-20px);
}

form {

    position: absolute;
    top: 40%;
    font-size: 20px;


}


form>input {
    margin-top: 20px;
    margin-bottom: 20px;
    width: 100%;
    height: 50px;
    padding: 10px;
}

form>label {
    padding: 30px 0px;
}

form button {


    color: #ffffff;
    background-color: #000000;
    position: absolute;
    top: 300px;
    right: 0;
    width: 200px;
    height: 50px;
    cursor: pointer;
}

.a {
    position: absolute;
    top: 300px;
    left: 0;
    text-decoration: none;
    color: gray;
}

.a:hover {
    text-decoration: underline;

}
</style>