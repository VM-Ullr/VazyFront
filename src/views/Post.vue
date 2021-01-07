<template>
  <div class="post">
    <b-container fluid>
      <b-row>
        <b-col cols="12" class="col1" xl="8">

          <div class="roundContainer">
              <b-row>
                <b-col cols="9">
                  <div class ="title">
                    <h1>{{post.title}}</h1>
                  </div>
                  <div>
                    <h5>Par <span @click="toAuthor" class ="author">{{post.author.username}}</span></h5>
                  </div>
                </b-col>
                <b-col class ="centerCol">
                  <span class ="price" v-if="post.price">{{post.price}}€</span>
                </b-col>
              </b-row>
              <b-row>
                <b-col class="art">
                  <img :src="imgPath + id"/>
                </b-col>
              </b-row>
              <b-row>
                <b-col cols="8">
                  <div class="tags">
                    <div v-for="(item, index) in post.tags" :key="index" class="tag">{{item}}</div>
                  </div>
                </b-col>
                <b-col class ="centerCol">
                  <div @click="like">
                    <img v-if='!isLiked' src="../assets/like.png" />
                    <img v-if='isLiked' src="../assets/liked.png" />
                    {{likes}}
                  </div>
                </b-col>
              </b-row>
              <b-row>
                <div class="roundContainer widthMax">
                  <h3>Description:</h3>
                  <div class="desc">
                    {{post.description}}
                  </div>
                </div>
              </b-row>
              <b-row>
                <b-col class="date">
                  Posté le : {{this.date}}
                </b-col>
              </b-row>
          </div>

          <div class="roundContainer">
            <h3>Commentaires:</h3>
            <div v-for="(item,index) in post.comments" :key="index" class="roundContainer">
              <b-row>
                <b-col cols="1">
                  <img src="../assets/user.png" class="avatar" />
                </b-col>
                <b-col>
                  <h5>
                    {{item.username}} :
                  </h5>
                  <div class="comment">
                    {{item.comment}}
                  </div>
                </b-col>
              </b-row>
              <div>
                <div class="date">
                    {{new Date(item.date).toLocaleString()}}
                </div>
              </div>
            </div>

            <div class="roundContainer centerCol" v-if="$store.getters.isLoggedIn">
              <b-form-textarea
                id="textarea"
                v-model="comment"
                placeholder="Commentaire..."
                rows="1"
                max-rows="6"
              ></b-form-textarea>
              <br>
              <b-button @click="commentArt" variant="primary">Commenter</b-button>
            </div>

          </div>

        </b-col>
        <b-col class="col2">

          <div class="roundContainer">
            Autres oeuvres de <span @click="toAuthor" class ="author">{{post.author.username}}</span> :
            <div class="centerCol">
                <span v-for="item in othersBy" :key="item.id" >
                  <ImageCont
                    :imageUrl="imgPath + item._id"
                    :url="'/art/' + item._id"
                    :title="item.title"
                    height="small"
                  />
                </span>
              </div>
          </div>

          <div class="roundContainer">
            Oeuvres similaires:<br/>
          </div>

        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import ImageCont from '@/components/ImageCont.vue'

export default {
  name: 'Post',
    components:{
    ImageCont
  },
  mounted () {
    this.$http.get(`/api/get/art/${this.id}`)
    .then(res => {
      this.post = res.data
      this.likes = this.post.likedBy.length

      for (let i = 0; i<this.likes; i++) {
        if (this.post.likedBy[i]._id == this.$store.getters.tokenInfo._id){
          this.isLiked = true;
          break;
        }
      }
      
      this.date = new Date(parseInt(this.post._id.slice(0,8),16)*1000).toLocaleString();

      this.$http.get('/api/get/othersBy',{
        params: {
          _id : this.id,
          username: this.post.author.username
        }
      }).then( (res) => {
        this.othersBy = res.data;
      })

    })
  },
  computed:{
    imgPath : (vue) => {
      return (vue.$store.getters.isLoggedIn) ? "/private/arts/" : "/public/arts/"
    }
  },
  methods: {
    toAuthor() {
      this.$router.push(`/user/${this.post.author.username}`);
    },
    commentArt() {
      if (this.comment != '') {
        this.$http.post(`/api/comment/art/${this.id}`, {comment : this.comment}).then( () => {
          this.post.comments.push({_id : this.$store.getters.tokenInfo._id, username : this.$store.getters.tokenInfo.username, comment : this.comment, date : new Date()})
          this.comment = '';
        })
      }
    },
    async like() {
      await this.$http.post(`/api/like/art/${this.id}`)
      this.likes = (this.isLiked)? this.likes -1 : this.likes + 1;
      this.isLiked = !this.isLiked
    }
  },
  data() {
    return {
      likes : null,
      isLiked : false,
      id : this.$route.params.id,
      post : {
        author : {
          username :""
        },
        comments : []
      },
      date : '',
      comment :'',
      othersBy : []
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

.sim{
  background-color: seagreen;
  text-align: left;
  height: 650px;
}

.avatar{
  border-radius: 50%;
}

.otherby{
  background-color: aquamarine;
  height: 400px;
  text-align: left;
}

.roundContainer{
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  margin: 20px;
  padding: 20px;
}

.price{
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  font-size: 30px;
  padding-left: 5px;
  padding-right: 5px;
  padding-bottom: 5px;
}

.tag{
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  padding-left: 5px;
  padding-right: 5px;
  padding-bottom: 5px;
  margin: 5px;
  font-size: 20px;
  float:left;
}

.tags{
  display: inline;
}

.centerCol{
  text-align: center;
}

.art{
  text-align: center;
  margin: 20px;
}

img{
  max-width: 100%;
}

.widthMax{
  width: 100%
}

.comment{
  margin: 10px;
}

.desc{
  margin: 20px;
  text-align: justify
}

.date{
  text-align: right;
}
</style>
