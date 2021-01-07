<template>
  <div class="login">
    <b-container fluid>
      <b-row>
        <b-col cols="8" offset="2" lg="6" offset-lg="3">
          <b-card>
            <b-form @submit="login">
              <b-form-group
                id="input-group-1"
                label="Email:"
                label-for="inputEmail"
                label-align="left"
              >
                <b-form-input
                  id="inputEmail"
                  v-model="form.email"
                  type="email"
                  :state="loginState"
                  required
                  placeholder="Enter email"
                  @change='onChange'
                />
              </b-form-group>

              <b-form-group
                id="input-group-2"
                label="Password:"
                label-for="inputPassword"
                label-align="left"
              >
                <b-form-input
                  id="inputPassword"
                  v-model="form.password"
                  type="password"
                  :state="loginState"
                  required
                  placeholder="Enter password"
                  @change='onChange'
                />

              </b-form-group>

              <div v-if='loginState == false'>
                Email ou mot de passe incorrect
              </div>

              <div class='reset'>
                <span class='link' @click="toReset">Forgot password  ?</span>
              </div>

              <b-button type="submit" variant="primary">Login</b-button>
              
              <div>
                <span class='link' @click="toRegister">No account yet ?</span>
              </div>
            </b-form>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
      return {
        form: {
          email: '',
          password : ''
        },
        loginState : null
      }
    },
    methods: {
      login(evt) {
        evt.preventDefault()
        this.$store.dispatch('login', this.form)
        .then(() => {
          if (this.$route.query.from == 'user'){
            this.$router.push(`/user/${this.$store.getters.tokenInfo.username}`)
          } else if (this.$route.query.from){
            this.$router.push('/' + this.$route.query.from)
          }
          else{
            this.$router.push('/')
          }
        })
        .catch(() => {
          this.loginState = false;
        })
      },
      toRegister() {
        this.$router.push("/register")
      },
      toReset() {
        this.$router.push("/reset")
      },
      onChange() {
        this.loginState = null;
      }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login{
  text-align: center;
}

.link{
  cursor: pointer;
  text-decoration : underline;
}

.reset{
  font-size: 12px;
  padding-bottom: 20px;
}
</style>
