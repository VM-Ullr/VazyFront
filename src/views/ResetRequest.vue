<template>
  <div class="resetRequest">
    <b-container fluid>
      <b-row>
        <b-col cols="8" offset="2" lg="6" offset-lg="3">
          <b-card>
            <b-form @submit="reset">
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
                  required
                  placeholder="Enter email"
                />
              </b-form-group>
              
              <div v-if="error == true">
                Cette adresse email n'est pas utilisée.
              </div>

              <b-button v-if="error != false" type="submit" variant="primary">Send email</b-button>

              <div v-if="error == false">
                Nous vous avons envoyé un email avec les instructions afin de changer de mot de passe.
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
  name: 'ResetRequest',
  data() {
      return {
        form: {
          email: '',
        },
        error : null
      }
    },
    methods: {
      reset(evt) {
        evt.preventDefault()
        //if(!this.match) return;
        this.$http({url: 'api/reset/request', data: this.form, method: 'POST' }).then(() => {
          this.error = false;
        }).catch(()=>{
          this.error = true;
        })
      }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.resetRequest{
  text-align: center;
}
</style>
