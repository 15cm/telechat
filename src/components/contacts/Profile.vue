<template>
    <x-header :left-options="leftOptions">
      <a v-link="{name: 'chatroom', params: {id: $route.params.id}}" class="button_like" slot="right">
        <icon name="paper-plane" ></icon>
      </a>
      Profile
    </x-header>
    <div class="main">
      <div class="cell_box ">
        <div class="cell_main">
          <div class="cell_hd">
            <img class="avatar" :src="user.avatar">
          </div>
          <div class="cell_bd">
            <h4 class="cell_title">{{ user.name }}</h4>
            <p class="cell_title_desc">{{ user.email }}</p>
          </div>
        </div>
      </div>
      <div class="cell_box">
          <div>
            <h4 class="profile_cell_title">个性签名</h3>
          </div>
          <div>
            <p class="cell_content " :class="{ unset: !user.sign }">{{ user.sign ? user.sign : '签名什么的才懒得设呢' }}</p>
          </div>
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
      leftOptions: {
        showBack: true,
        backText: '返回'
      },
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
.main {
  margin-top: 10px;
}
</style>
