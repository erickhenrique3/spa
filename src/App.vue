<template>
  <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
  <RouterLink to="/"></RouterLink>
  <RouterLink to="/login"></RouterLink>
  <RouterLink to="/cadastro"></RouterLink>
  <RouterLink to="/principal"></RouterLink>

  <!-- <Capa/> -->
  <!-- <Login/> -->
  <!-- <Cadastro/> -->
  <!-- <Principal/> -->
  <RouterView/>
</template>

<script>

// import HelloWorld from './components/HelloWorld.vue'
// import Capa from './components/Capa.vue'
// import Login from './components/Login.vue'
// import Cadastro from './components/Cadastro.vue'
// import Principal from './components/Principal.vue'
export default {
  name: 'App',
  components: {
  //  Capa,
  //  Login,
  // Cadastro,
  //  Principal
  }
}
</script>

<style>

</style>
