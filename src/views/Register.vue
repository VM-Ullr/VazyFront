<template>
  <div class="register">
    <b-container fluid>
      <b-row>
        <b-col cols="8" offset="2" lg="6" offset-lg="3">
          <b-card>
            <b-form @submit="register">
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

              <b-form-group
                id="input-group-2"
                label="Password:"
                label-for="inputPassword"
                label-align="left"
              >
                <b-form-input @change="clear"
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
 
              <b-form-group
                id="input-group-8"
                label="Username"
                label-for="inputUsername"
                label-align="left"
              >
                <b-input-group prepend="@">
                  <b-form-input
                    id="inputUsername"
                    v-model="form.username"
                    placeholder="Username"
                    required
                  />
                </b-input-group>
              </b-form-group>

              <b-form-group
                id="input-group-7"
                label="Sex"
                label-for="inputSex"
                label-align="left"
              >
                <b-form-select id="inputSex" v-model="form.sex" required>
                  <option value="" hidden>Choose one</option>
                  <option value="M">Male</option>
                  <option value="F">Female</option>
                </b-form-select>
              </b-form-group>
              
              
              <b-form-group
                id="input-group-4"
                label="Name"
                label-align="left"
              >
                
                <b-form-row>
                  <b-col>
                    <b-form-input
                      id="inputFirstname"
                      v-model="form.firstname"
                      placeholder="First name"
                      required
                    />
                  </b-col>
                  <b-col>
                    <b-form-input
                      id="inputLastname"
                      v-model="form.lastname"
                      placeholder="Last name"
                      required
                    />
                  </b-col>
                </b-form-row>

              </b-form-group>

              <b-form-group
                id="input-group-5"
                label="Birth date"
                label-for="inputBirthDate"
                label-align="left"
              >
                <b-form-input
                  id="inputBirthDate"
                  v-model="form.birthdate"
                  type="date"
                  min="1900-01-01"
                  required
                />
              </b-form-group>

              <b-form-group
                id="input-group-6"
                label="Address"
                label-for="inputAddress"
                label-align="left"
              >
                <b-form-select id="inputAddress" v-model="form.address" required>
                  <option value="" hidden>Choose one</option>
                  <optgroup label="France Métropolitaine">
                    <option :value="item.value" :key='index' v-for="(item, index) in metro">{{ item.text }}</option>
                  </optgroup>
                  <optgroup label="Outre-Mer">
                    <option :value="item.value" :key='index' v-for="(item, index) in outre">{{ item.text }}</option>
                  </optgroup>
                </b-form-select>
              </b-form-group>

              <b-form-checkbox
                id="terms"
                v-model="condition"
                name="checkbox-1"
              >
                I accept the <Terms/>
              </b-form-checkbox>

              <div v-if='error'>
                Something went wrong!
              </div>

              <b-button type="submit" variant="primary">Register</b-button>
            </b-form>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import Terms from '@/components/Terms.vue'

export default {
  name: 'Register',
  components: {
    Terms
  },
  data() {
      return {
        form: {
          email: '',
          password : '',
          firstname : '',
          lastname: '',
          birthdate : '',
          address : '',
          sex : '',
          username : ''
        },
        reTypedPassword : "",
        match : true,
        passSate : null,
        condition : false,
        error : false,
        metro: [
          { value: 'Alsace', text: 'Alsace' },
          { value: 'Aquitaine', text: 'Aquitaine' },
          { value: 'Auvergne', text: 'Auvergne' },
          { value: 'Basse-Normandie', text: 'Basse-Normandie' },
          { value: 'Bourgogne', text: 'Bourgogne' },
          { value: 'Bretagne', text: 'Bretagne' },
          { value: 'Centre', text: 'Centre' },
          { value: 'Champagne-Ardenne', text: 'Champagne-Ardenne' },
          { value: 'Corse', text: 'Corse' },
          { value: 'Franche-Comté', text: 'Franche-Comté' },
          { value: 'Haute-Normandie', text: 'Haute-Normandie' },
          { value: 'Île-de-France', text: 'Île-de-France' },
          { value: 'Languedoc-Roussillon', text: 'Languedoc-Roussillon' },
          { value: 'Limousin', text: 'Limousin' },
          { value: 'Lorraine', text: 'Lorraine' },
          { value: 'Midi-Pyrénées', text: 'Midi-Pyrénées' },
          { value: 'Nord-Pas-de-Calais', text: 'Nord-Pas-de-Calais' },
          { value: 'Pays de la Loire', text: 'Pays de la Loire' },
          { value: 'Picardie', text: 'Picardie' },
          { value: 'Poitou-Charentes', text: 'Poitou-Charentes' },
          { value: "Provence-Alpes-Côte d'Azur", text: "Provence-Alpes-Côte d'Azur" },
          { value: 'Rhône-Alpes', text: 'Rhône-Alpes' }
        ],
        outre : [
          { value: 'Guadeloupe', text: 'Guadeloupe' },
          { value: 'Guyane', text: 'Guyane' },
          { value: 'Martinique', text: 'Martinique' },
          { value: 'Réunion', text: 'Réunion' },
          { value: 'Mayotte', text: 'Mayotte' }
        ]
      }
    },
    created(){
      this.passState = null;
    },
    methods: {
      register(evt) {
        evt.preventDefault()
        if(!this.condition) return;
        if(!this.match) return;
        this.$store.dispatch('register', this.form)
        .then(() => this.$router.push('/'))
        .catch(()=>{
          this.error = true;
        })
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
.register{
  text-align: center;
}
</style>
