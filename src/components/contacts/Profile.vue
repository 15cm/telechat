<template>
    <x-header>
      <a v-link="{name: 'chatroom', params: {id: $route.params.id}}" class="button_like" slot="right">
        <icon name="paper-plane" ></icon>
      </a>
      Profile
    </x-header>
    <div class="below_header">
    <div class="cell_box ">
      <div class="cell_hd">
        <img class="avatar" :src="user.avatar">
      </div>
      <div class="cell_bd">
        <h4 class="cell_title">{{ user.name }}</h4>
        <p class="cell_title_desc">{{ user.email }}</p>
      </div>
    </div>
    <div class="cell_box">
        <div>
          <h4 class="profile_cell_title">个性签名</h3>
        </div>
        <div>
          <p class="cell_content">{{ user.sign ? user.sign : '签名什么的才懒得设呢' }}</p>
        </div>
    </div>
</template>

<script>
import XHeader from 'vux/components/x-header'
import Icon from 'vue-awesome/dist/vue-awesome'
export default {
  components: {
    XHeader,
    Icon
  },
  route: {
    activate () {
      this.$http.get(`${this.$mServerHost}/api/users/${this.$route.params.id}`)
      .then(res => {
        this.$set('user', res.data)
      }, res => {
        console.log(res)
      })
    }
  },
  data () {
    return {
      user: {
        name: '',
        avatar: '',
        sign: ''
      }
    }
  }
}
</script>

<style scope>
</style>
