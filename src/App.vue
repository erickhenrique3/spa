<template>
  <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
  <RouterLink to="/"></RouterLink>
  <RouterLink to="/login"></RouterLink>
  <RouterLink to="/cadastro"></RouterLink>
  <RouterLink to="/principal"></RouterLink>

  
  <RouterView/>
</template>

<script>


export default {
  name: 'App',
  
}
</script>

<style>

</style>
