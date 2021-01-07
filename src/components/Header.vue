<template>
  <div class="header">
    <b-navbar toggleable="xl" type="light" variant="light">
      <b-navbar-brand to="/">
        <img src="../../public/logo.png" />
        Vazy
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item to="/TL">Fil d'actualité</b-nav-item>
          <b-nav-item to="/GTL">Actualité global</b-nav-item>
          <b-nav-item to="/discover">Découverte</b-nav-item>
          <b-nav-item @click="toLiked">Aimés</b-nav-item>
          <b-nav-item to="/collection">Collection</b-nav-item>
          <b-nav-item @click="toUser">Galerie</b-nav-item>
          <b-nav-item to="/Dashboard">Tableau de bord</b-nav-item>
        </b-navbar-nav>


      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-form>
          <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
          <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
        </b-nav-form>

        <!--<b-nav-item-dropdown text="Lang" right>
          <b-dropdown-item href="#">EN</b-dropdown-item>
          <b-dropdown-item href="#">ES</b-dropdown-item>
          <b-dropdown-item href="#">RU</b-dropdown-item>
          <b-dropdown-item href="#">FA</b-dropdown-item>
        </b-nav-item-dropdown>-->

        <b-nav-item-dropdown right v-if="$store.getters.isLoggedIn">
          <!-- Using 'button-content' slot -->
          <template v-slot:button-content>
            <em>{{$store.getters.tokenInfo.username}}</em>
          </template>
          <b-dropdown-item href="#">Profile</b-dropdown-item>
          <b-dropdown-item @click="logout">Logout</b-dropdown-item>
        </b-nav-item-dropdown>
        <span v-if="!$store.getters.isLoggedIn" class="space-left">
          <b-button right size="sm" variant="light" to="/login">Login</b-button>
        </span>
      </b-navbar-nav>

      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: 'Header',
  methods: {
      logout() {
        this.$store.dispatch('logout')
      },
      toUser() {
        if (this.$store.getters.isLoggedIn) {
          this.$router.push(`/user/${this.$store.getters.tokenInfo.username}`).catch();
        }else{
          this.$router.push({ path: 'login', query: { from: 'user' } }).catch();
        }
      },
      toLiked() {
        if (this.$store.getters.isLoggedIn) {
          this.$router.push(`/liked`).catch();
        }else{
          this.$router.push({ path: 'login', query: { from: 'liked' } }).catch();
        }
      },
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.router-link-exact-active {
  color : lightseagreen !important;
}
.space-left{
  margin-left: 10px
}

img{
  height: 30px;
}
</style>
