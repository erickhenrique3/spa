<template>
   <div class="container">
    <header>

    </header>
    <div class="box1">
       
    </div>
    <div class="box2">

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
.box1{
    flex:  1;
    height: 100vh;
    width: 50%;
    background-color: black;
}
.box2{
    flex: 1;
    height: 100vh;
    background-color: blue;
    left: 50%;
}
</style>