<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import APIHandler, { type Config } from './utils/APIhandler'

let loadAPI = ref('');

const APIHandlerconfig = {
  baseURL: window.location.origin + "/api"
} as Config

onMounted(async ()=>{
  const APIHandlerInstance = new APIHandler(APIHandlerconfig)
  await APIHandlerInstance.check();
  APIHandlerInstance.requestJSON('/ingredientgroups')
  .then((response)=>{
    console.log("response", response);
    loadAPI.value="done!";
  })
  .catch((err)=>{
    loadAPI.value = "error: " + err;
  })

  APIHandlerInstance.multiRequestJSON(['/DRI_energy', '/DRI_prot', '/DRI_water'])
  // APIHandlerInstance.multiRequestJSON([{endpoint: '/DRI_energy'}, {endpoint: '/DRI_prot'}, {endpoint: '/DRI_water'}])
  .then((responses)=>{
    console.log("multi", responses);
  })  

})

loadAPI.value += 'loading...';

</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>



    </div>
  </header>
  <div class="loadingCard">
    {{ loadAPI }}
  </div>
  <RouterView :API="loadAPI"/>
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
