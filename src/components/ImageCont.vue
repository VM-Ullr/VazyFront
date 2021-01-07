<template>
  <div class="image-cont shadow"
      @mouseover="hover = true"
      @mouseleave="hover = false"
    >
    <img :src="imageUrl"
      :class="[{ active: hover }, height]"
      @click="toPost"
    />
    <div v-if=hover>
		<div class="title" @click="toPost">
			{{title}}
		</div>
		<div v-if="author" class="author-line">
      de <span class="author" @click="toAuthor">{{author}}</span>
		</div>
	</div>
  </div>
</template>

<script>
export default {
  name: 'ImageCont',
  props:{
    imageUrl : String,
    url : String,
    title : String,
    author : {
      type : String,
      default : null
    },
    authorUrl: String,
    height : {
      type : String,
      default : "big"
    }
  },
  methods: {
    toPost() {
      this.$router.push(this.url);
    },
    toAuthor() {
      this.$router.push(this.authorUrl);
    }
  },
  data() {
    return {
      hover: false,
    };
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.active{  
  filter: brightness(50%);
}

.big{
  max-height: 264px;
}

.small{
  max-height: 132px;
}

.image-cont {
  position: relative;
  display: inline-block;
  color : white;
  margin:16px;
  cursor: pointer;
}

/* Bottom left text */
.author-line {
  position: absolute;
  bottom: 8px;
  left: 16px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;    

  max-width: 80%
}
.author {
  font-style: italic;
}

.author:hover {
  text-decoration: underline;
}

/* Bottom left text */
.title {
  position: absolute;
  bottom: 32px;
  left: 16px;
  font-weight : bold;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;    

  max-width: 60%

}

img{
  max-width: 100%
}

.shadow{
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2), 0 12px 40px 0 rgba(0, 0, 0, 0.19)
}
</style>