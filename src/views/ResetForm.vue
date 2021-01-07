<template>
  <div class="resetForm">
    <b-container fluid>
      <b-row>
        <b-col cols="8" offset="2" lg="6" offset-lg="3">
          <b-card>
            <b-form @submit="reset">

              <b-form-group
                id="input-group-2"
                label="Password:"
                label-for="inputPassword"
                label-align="left"
              >
                <b-form-input @change='clear'
                  id="inputPassword"
                  v-model="form.password"
                  type="password"
                  required
                  placeholder="Enter password"
                />
              </b-form-group>

              <b-form-group
                id="input-group-3"
                label="Re-type password:"
                label-for="inputReTypePassword"
                label-align="left"
              >
                <b-form-input @change="verify"
                  id="inputReTypePassword"
                  v-model="reTypedPassword"
                  type="password"
                  :state="passState"
                  required
                  placeholder="Re-type password"
                />
                <div v-if="!match">
                  Passwords don't match
                </div>
              </b-form-group>

              <b-button type="submit" variant="primary">Change password</b-button>
            </b-form>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  name: 'ResetForm',
  data() {
      return {
        form: {
          password : '',
          jwt : this.$route.params.jwt
        },
        reTypedPassword : "",
        match : true,
        passSate : null,
      }
    },
    created(){
      this.passState = null;
    },
    methods: {
      reset(evt) {
        evt.preventDefault()
        if(!this.match) return;
        this.$http({url: 'api/reset', data: this.form, method: 'POST' })
        .then(() => this.$router.push('/'))
        .catch()
      },
      verify() {
        if (this.form.password == this.reTypedPassword){
          this.match = true;
          this.passState = null;
        }else{
          this.match = false;
          this.passState = false;
        }
      },
      clear() {
        this.reTypedPassword = "";
      }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.resetForm{
  text-align: center;
}
</style>
