<template>
  <div class="upload">
    <b-container fluid>
      <b-row>
        <b-col cols="8" offset="2" lg="6" offset-lg="3">
          <b-card>
            <b-form @submit="submit" @change="changed" v-if="show">
              <b-form-group
                id="input-group-1"
                label="Title:"
                label-for="inputTitle"
                label-align="left"
              >
                <b-form-input
                  id="inputTitle"
                  v-model="form.title"
                  required
                  placeholder="Enter title"
                />
              </b-form-group>

              <b-form-group
                id="input-group-2"
                label="File:"
                label-for="inputFile"
                label-align="left"
              >
                
                <input type="file" required id="file" ref="file" v-on:change="handleFileUpload()"/>
              </b-form-group>


              <b-form-group
                id="input-group-3"
                label="Description:"
                label-for="inputDescription"
                label-align="left"
              >
                <b-form-textarea
                  id="inputDescription"
                  v-model="form.description"
                  required
                  placeholder="Enter description"
                />
              </b-form-group>

              <b-form-group
                id="input-group-4"
                label="Price:"
                label-for="inputPrice"
                label-align="left"
              >
                <b-form-input
                  id="inputPrice"
                  v-model.number="form.price"
                  required
                  type='number'
                  min="0"
                />
              </b-form-group>

              
              <b-form-group
                id="input-group-5"
                label="Tags:"
                label-for="inputTags"
                label-align="left"
              >
                <vue-tags-input 
                  class="fullWidth"
                  id="inputTags"
                  v-model="tag"
                  :tags="form.tags"
                  @tags-changed="newTags => form.tags = newTags"
                />
              </b-form-group>

              <div class="align">
                <div v-if="error == true">
                  Oops, something went wrong.
                </div>

                <div v-if="error == false">
                  Sucessfully uploaded
                </div>

                <b-button v-if="!loading" type="submit" variant="primary">Submit</b-button>
                <b-button v-if="loading"  variant="primary"> <b-spinner small type="grow"></b-spinner> loading ...</b-button>
              </div>
              

            </b-form>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import VueTagsInput from '@johmun/vue-tags-input';

export default {
  name: 'Upload',
  components: {
    VueTagsInput
  },
  data() {
      return {
        tag :'',
        file :'',
        form: {
          title : "",
          description : "",
          price : 0,
          tags: []
        },
        error : null,
        loading: false,
        show: true
      }
    },
    created(){
      this.passState = null;
    },
    methods: {
      handleFileUpload(){
        this.file = this.$refs.file.files[0];
      },
      changed(){
        this.error = null;
      },
      submit(evt){
        evt.preventDefault()
        this.loading = true;
        let formData = new FormData();
        formData.append('file', this.file);
        formData.append('title', this.form.title);
        formData.append('description', this.form.description);
        formData.append('price', this.form.price);
        this.form.tags.forEach(function(element) {
          formData.append('tags[]', element.text);
        }, this);
        

        this.$http.post('/api/import/art', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
        }).then( () => {
          this.error = false;
          this.file = ''
          this.form = {
            title : "",
            description : "",
            price : 0,
            tags: []
          }
          this.show = false
          this.$nextTick(() => {
            this.show = true
            this.loading = false;
          })
        }).catch( () => {
          this.error = true;
          this.loading = false;          
        })
      }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.register{
  text-align: center;
}

.fullWidth{
  width: 100%;
  max-width: none !important;
}
.align{
  text-align: center;
}
</style>
