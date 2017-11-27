<template>
  <div id="app">
    <nav-header></nav-header>
    <router-view/>
    <nav-footer></nav-footer>
    <login-form></login-form>
  </div>
</template>

<script>
import NavHeader from '@/components/Header'
import NavFooter from '@/components/Footer'
import LoginForm from '@/components/LoginForm'

export default {
  name: 'app',
  components: {
    NavHeader,
    NavFooter,
    LoginForm
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  list-style: none;
}

body {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background: #f7f2f2;
}

a {
  color: inherit;
  text-decoration: none;
}
img {
  width: 100%;
}
.pointer {
  cursor: pointer;
}


#app {
  /* max-width: 1280px; */
  margin: 0 auto;
  
}
.container {
  max-width: 1280px;
  min-width: 960px;
  margin: 0 auto;
}
</style>
