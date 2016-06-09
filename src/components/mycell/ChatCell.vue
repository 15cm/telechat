<template>
  <div class="cell_box">
    <slot name="edit"></slot>
    <div class="cell_box button_like"
      v-link="{ name: 'chatroom', params: { id: chat.uid }}">
      <div class="cell_hd">
        <img class="avatar" :src="cUser.avatar">
      </div>
      <div class="cell_bd">
        <h4 class="cell_title">{{ cUser.name }}</h4>
        <p class="cell_title_desc">{{ chat.lastMsg ? chat.lastMsg : '暂时没有新消息哟'}}</p>
      </div>
      <div class="cell_footer button_like">
        <a v-link="{name: 'chatroom', params: {id: chat.uid}}">
          <icon name="paper-plane"></icon>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import Icon from 'vue-awesome/dist/vue-awesome'
export default {
  components: {
    Icon
  },
  props: {
    chat: Object
  },
  ready () {
    this.$http.get(`${this.$mServerHost}/api/users/${this.chat.uid}`)
    .then(res => {
      this.$set('cUser', res.data)
    }, res => {
      console.log(res)
    })
  },
  data () {
    return {
      cUser: {
        name: '',
        avatar: ''
      }
    }
  }
}
</script>

<style scoped>
</style>
