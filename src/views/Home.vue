<template>
  <div class="home">
    <span v-for="item in content" :key="item.id">
      <ImageCont
        :imageUrl="imgPath+item._id"
        :url="'/art/'+ item._id"
        :title="item.title"
        :author="item.author.username"
        :authorUrl="'/user/' + item.author.username"
      />
    </span>
  </div>
</template>

<script>
import ImageCont from '@/components/ImageCont.vue'

export default {
  name: 'Home',
  components:{
    ImageCont
  },
  computed:{
    imgPath : (vue) => {
      return (vue.$store.getters.isLoggedIn) ? "/private/arts/" : "/public/arts/"
    }
  },
  mounted () {
    this.$http.get("/api/get/arts/latest")
    .then(res => {
      this.content = res.data
    })
  },
  data() {
    return {
      content: []
    };
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.home{
  text-align: center;
}
</style>
