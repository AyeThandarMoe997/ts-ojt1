<template>
  <div id="app">
    <button class="router-btn" @click="addUser()">Register New User</button>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { Vue } from 'vue-property-decorator'

export default class App extends Vue {
  public addUser() {
    this.$router.push({name: 'user-register'});
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.router-btn {
  padding: 5px 10px;
  text-decoration: none;
  color: #fff;
  margin: 5px 2px;
  display: inline-block;
  background-color: rgb(93, 99, 207);
  border-radius: 4px;
  font-family: Roboto,Helvetica Neue Light,Helvetica Neue,Helvetica,Arial,Lucida Grande,sans-serif;
  font-weight: 400;
  letter-spacing: .5px;
  font-size: 15px;
  cursor: pointer;
}
</style>
