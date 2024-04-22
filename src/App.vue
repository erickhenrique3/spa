<template>
  <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
  <!-- <Capa/> -->
  <!-- <Login/> -->
  <Cadastro/>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import Capa from './components/Capa.vue'
import Login from './components/Login.vue'
import Cadastro from './components/Cadastro.vue'
export default {
  name: 'App',
  components: {
   Capa,
   Login,
   Cadastro,
  }
}
</script>

<style>

</style>
