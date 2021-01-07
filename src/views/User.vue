<template>
  <div class="user">
    <b-container fluid>
      <b-row>
        <b-col class="col1">

          <div class="roundContainer">
              <h4>Galerie</h4>
              <div class="gallerie">
                <span v-for="item in user.arts" :key="item.id" >
                  <ImageCont
                    :imageUrl="imgPath + item._id"
                    :url="'/art/' + item._id"
                    :title="item.title"
                    height="small"
                  />
                </span>
              </div>
          </div>

        </b-col>
        <b-col class="col2" xl="4">

          <div class="roundContainer">
            <div class="userHeader">
              <img src="../assets/user.png" />
              <h3>{{user.username}}</h3>
            </div>
            <div class="roundContainer">
              Description:
              <div class="margin">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores iste nam sequi optio quisquam, perferendis praesentium nostrum eius vitae ullam maxime repellat quos, rem, temporibus, enim itaque nesciunt. Animi, quod!
              </div>
            </div>
            <div class="roundContainer">
              Statistiques:
              <div class="margin">
                Statistiques temporairement indisponible <br/>
              </div>
            </div>
            <div class="roundContainer button" v-if="$store.getters.tokenInfo._id==user._id" @click="toUpload">
              Ajouter une oeuvre
            </div>
          </div>

        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import ImageCont from '@/components/ImageCont.vue'

export default {
  name: 'User',
  components:{
    ImageCont
  },
  computed:{
    imgPath : (vue) => {
      return (vue.$store.getters.isLoggedIn) ? "/private/arts/" : "/public/arts/"
    }
  },
  mounted () {
    this.$http.get(`/api/get/user/${this.$route.params.username}`)
    .then(res => {
      this.user = res.data
    })
  },
  methods: {
    toUpload() {
      this.$router.push("/UL");
    }
  },
  data() {
    return {
      ppUrl : "../assets/user.png",
      user : {}
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.author {
  font-style: italic;
  cursor: pointer;
}

.author:hover {
  text-decoration: underline;
}
.roundContainer{
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  margin: 20px;
  padding: 20px
}

.gallerie{
  text-align: center;
}

.margin{
  margin: 20px;
}

.userHeader{
  text-align: center;
}

.button{
  text-align: center;
  cursor: pointer;
}

.userHeader img{
  max-height: 200px;
  border-radius: 20px;
  margin: 20px;
  max-width: 80%
}
</style>
