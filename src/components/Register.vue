<template>
  <div id="login">
    <div class="banner">
      <h2>Telechat</h2>
      <p>注册</p>
    </div>
    <div class="input_field">
      <x-input title="登录邮箱" placeholder="xxx@example.com" v-ref:iemail :value.sync="email" is-type="email"></x-input>
      <x-input title="昵称" placeholder="显示的昵称" v-ref:iname :value.sync="name"></x-input>
      <x-input title="密码" placeholder="密码(6-20位)" v-ref:ipassword :value.sync="password" :min="6" :max="20"></x-input>
      <x-button @click="submit" :disabled="!($refs.iemail.valid && $refs.iname.valid && $refs.ipassword.valid)" text="注册"></x-button>
    <div>
  </div>
</template>

<script>
import XInput from 'vux/components/x-input'
import XButton from 'vux/components/x-button'
export default {
  components: {
    XInput,
    XButton
  },
  methods: {
    submit () {
      this.$http.post(`${this.$mServerHost}/api/users`, {
        email: this.email,
        name: this.name,
        password: this.password
      }).then(res => {
        console.log(res)
        this.$router.go({ name: 'login' })
      }, res => {
        console.log('邮箱已被注册，换一个试试?')
      })
    }
  },
  data () {
    return {
      email: '',
      name: '',
      password: ''
    }
  }
}
</script>
