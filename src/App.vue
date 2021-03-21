<template>
  <div id="app">
    <header class="site-header sticky-top py-1 bg-white" v-if="isAuth()">
      <b-container>
        <b-navbar toggleable="lg">
          <b-navbar-brand :to="{ name: 'Home' }" active-class="active">Kaptilo</b-navbar-brand>

          <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

          <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav class="ml-auto">
              <b-button size="sm" class="my-2 my-sm-0" v-b-modal.sign-out-modal>Sign-Out</b-button>
            </b-navbar-nav>
          </b-collapse>
        </b-navbar>
      </b-container>
    </header>
    <notifications group="main" position="top right" />
    <router-view/>

    <b-modal ref="sign-out-modal" size="sm" hide-header id="sign-out-modal">
      <h4 align="center">Sign-Out</h4>

      <template #modal-footer>
        <b-button size="sm" variant="info" @click="this.$refs['sign-out-modal'].hide()">Cancel</b-button>
        <b-button size="sm" variant="danger" @click="signOut">Sign-Out</b-button>
      </template>
    </b-modal>
  </div>
</template>

<script>
import Notifications1 from 'vue-notification'
import * as axios from 'axios'

export default {
  components: {Notifications1},
  methods: {
    signOut() {
      axios.post('auth/token/logout', {})

      this.$refs['sign-out-modal'].hide()
      localStorage.removeItem('accessToken')
      this.$router.push({'name': 'Auth'})
    },
    isAuth() {
      return localStorage.getItem("accessToken") !== null
    },
  },
}
</script>

<style lang="scss">
html {
  position: relative;
  min-height: 100%;
}
body {
  margin-bottom: 60px;
}
.vue-notification-group {
  margin-top: 20px;
  margin-right: 30px;
}
</style>
