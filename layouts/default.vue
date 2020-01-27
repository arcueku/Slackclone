<template>
  <div class="app-layout">
    <div class="sidebar">
      <p>チャンネル一覧</p>
      <p v-for="channel in channels" :key="channel.name">
        <nuxt-link :to="`/channels/${channel.id}`" class="link">{{ channel.name }}</nuxt-link>
      </p>
      <p v-if="isAuthenticated" class="logout" v-on:click="logout">ログアウト</p>
    </div>
    <div class="main-content">
      <nuxt />
    </div>
  </div>
</template>

<script>
import { db, firebase } from '~/plugins/firebase'
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      channels: []
    }
  },
  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated
    }
  },
  methods: {
    ...mapActions(['setUser']),
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          //ログアウト時はユーザー情報をnullにする
          this.setUser(null)
          window.alert('ログアウトに成功！（＾Ｏ＾☆♪')
        })
        .catch(e => {
          window.alert('ログアウトに失敗しました(´・ω・｀)')
        })
    }
  },
  mounted() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setUser(user)
      }
    })
    db.collection('channels')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          this.channels.push({ id: doc.id, ...doc.data() })
        })
      })
  }
}
</script>

<style>
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

.app-layout {
  display: flex;
}

.sidebar {
  width: 300px;
  background: #4a4141;
  height: 100vh;
  padding: 20px;
}

.sidebar p {
  color: #dddddd;
  padding-top: 4px;
}

/* リンク付き文字を白色に変更 */
.link {
  color: #dddddd;
  text-decoration: none;
}

.logout {
  position: absolute;
  bottom: 10px;
  cursor: pointer;
}

.main-content {
  width: 100%;
  background: #f1f1f1;
  height: 100vh;
}
</style>
