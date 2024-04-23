<template>
   <div class="container">
    <header>

    </header>
    <div class="menu">
       
    </div>
    <div class="conteudo">

    </div>
   </div>
</template>
<script>
export default{
    name: 'Principal',
}
</script>

<style scoped>


.container{
    width: 100vw;
    height: 100vh;

    
    position: relative;
    background-color: #ffffff;
    box-sizing: border-box;
    display: flex;
}
.container header{
    position: absolute;
    width: 100vw;
    height: 100px;
    background-color: brown;
}
.menu{
    flex:  1;
    height: 100vh;
    width: 50%;
    background-color: black;
}
.conteudo{
    flex: 1;
    height: 100vh;
    background-color: blue;
    left: 50%;
}
</style>