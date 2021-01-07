<template>
  <div class="liked">
    <b-container fluid>
      <b-row>
        <b-col class="col1">
          <div class="roundContainer">
              <h4>Mes oeuvres aimées</h4>
              <div class="gallerie">
                <span v-for="item in user.artLiked" :key="item.id" >
                  <ImageCont
                    :imageUrl="'/private/arts/' + item._id"
                    :url="'/art/' + item._id"
                    :title="item.title"
                    :author="item.author.username"
                    :authorUrl="'/user/' + item.author.username"
                    height="small"
                  />
                </span>
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
  name: 'Liked',
  components:{
    ImageCont
  },
  mounted () {
    this.$http.get(`/api/get/user/${this.$store.getters.tokenInfo.username}`)
    .then(res => {
      this.user = res.data
    })
  },
  data() {
    return {
      user : {
        artLiked : []
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.roundContainer{
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  margin: 20px;
  padding: 20px
}

.gallerie{
  text-align: center;
}

</style>
