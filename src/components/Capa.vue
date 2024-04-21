<template>
    <div class="container">
        <div class="box1">
            <h1>Crud <br>
                G School</h1>
        </div>
        <div class="box2">
            <h3>bora <br> crescer 🤘</h3>
            <footer>Densevolvido por: <br>
                <strong>Erick Henrique</strong>😎
            </footer>
            <div class="icon">
            <i @mouseenter="proximo" class='bx bx-chevrons-right'></i>
        </div>
        </div>
        
    </div>
    
</template>

<script>
export default {
    name: 'Capa',
    methods: {
    proximo() {
        console.log('ok');
    }
}
}


</script>

<style scoped>
.container {
    width: 100vw;
    height: 100vh;
    /* display: grid; */
    /* grid-template-columns: 1fr 1fr; */
    position: relative;
    background-color: #000;
}

.box1 {
    position: absolute;

    top: 0;
    left: 0;


    background-color: #000;
    width: 50%;
    height: 100%;
    gap: 0px;
    opacity: 0px;
    border: none;

}

.box1 h1 {
    margin: 0;
    color: #fff;
    font-size: 100px;
    position: absolute;
    top: 300px;
    left: 200px;
   
    
}

.box2 {
    position: absolute;
    right: 0;
    top: 0;
    width: 30%;
    height: 100%;
    border-radius: 50px 0px 0px 0px;

    background-color: #fff;
}
.box2 h3{
    position: absolute;
    top: 200px;
    left: 100px;
    font-size: 64px;
    font-weight: 800;
    line-height: 60px;
   
    
}

footer{
    position: absolute;
    top: 834px;
    left: 100px;
    
}
.icon{
    position: absolute;
    top: 600px;
    left: 90px;
    font-size: 100px;
    transition: transform 0.8s ease-in-out;
}
.icon:hover{
    transform: translateY(-10px);
}
</style>
