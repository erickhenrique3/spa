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

    /* display: grid; */
    /* grid-template-columns: 1fr 1fr; */
    position: relative;
    background-color: #f5f5f5;
    box-sizing: border-box;
}

.box1 {
    position: absolute;
    background-color: #ffffff;
    width: 50%;
    height: 100vh;
}

.box2 {
    position: absolute;
    width: 50%;
    height: 100%;
    left: 50%;
    background-color: rgb(237, 17, 17);
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

form > input {
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