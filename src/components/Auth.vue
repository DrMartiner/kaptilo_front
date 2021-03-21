<template>
  <div>
    <b-container class="mt-5">
      <b-row>
        <b-col lg="6" offset-lg="3" sm="12">
          <h1 align="center">Sign-In</h1>
          <b-form @submit="login($event)">
            <b-form-group label="Username:" label-for="id_username">
              <b-form-input id="id_username" v-model="username"  type="text" required></b-form-input>
            </b-form-group>
            <b-form-group label="Password:" label-for="id_password">
              <b-form-input id="id_password" v-model="password"  type="password" required></b-form-input>
            </b-form-group>
            <b-button type="submit" variant="primary">Sign-In</b-button>
          </b-form>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
  import * as axios from 'axios'

  export default {
    name: 'Sign-In',
    data: () => {
      return {
        username: "",
        password: "",
      }
    },
    created() {
      this.uuid = this.genUUID4()
    },
    methods: {
      login(e) {
        e.preventDefault()

        axios
          .post('auth/token/login', {"username": this.username, "password": this.password})
          .then(response => {
            localStorage.setItem("accessToken", response.data.auth_token)
            axios.defaults.headers.common['Authorization'] = `Token ${response.data.auth_token}`
            this.$router.push({'name': 'Home'})
          })
          .catch(error => {
            if (error.response.status === 400)
              if (error.response.data.non_field_errors[0] === "Unable to log in with provided credentials.")
                this.$notify({
                  group: 'main',
                  type: 'warn',
                  title: 'Auth was failure',
                  text: `Wrong username or password`,
                  duration: 10000,
                  speed: 1000,
                })
          })
      },
    },
  }
</script>
