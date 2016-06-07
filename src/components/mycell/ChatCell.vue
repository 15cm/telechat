<template>
  <div class="cell_box">
    <slot name="edit"></slot>
    <div class="cell_box button_like"
      v-link="{ name: 'chatting', params: { id: chat.contact.id }}">
      <div class="cell_hd">
        <img class="avatar" :src="cUser.avatar">
      </div>
      <div class="cell_bd">
        <h4 class="cell_title">{{ cUser.name }}</h4>
        <p class="cell_title_desc">{{ chat.lastMsg }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {
  },
  props: {
    chat: Object
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
