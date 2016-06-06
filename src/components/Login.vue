<template>
  <div id="login">
    <div class="banner">
      <h2>Telechat</h2>
      <p>登录</p>
    </div>
    <div class="input_field">
      <x-input title="用户邮箱" placeholder="xxx@example.com" v-ref:iemail :value.sync="email" is-type="email"></x-input>
      <x-input title="密码" placeholder="请输入位密码(6-20位)" v-ref:ipassword :value.sync="password" :min="6" :max="20"></x-input>
      <x-button @click="submit" :disabled="!($refs.iemail.valid && $refs.ipassword.valid)" text="登录"></x-button>
    </div>
    <a class="below_form" v-link="{ path: '/register' }">新用户注册</a>
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
      this.$http.post(`${this.$mServerHost}/api/users/auth`, {
        email: this.email,
        password: this.password
      }).then(res => {
        this.$auth.uid = res.data
        console.log(this.$auth.uid)
        this.$router.go({ name: 'index' })
      }, res => {
        console.log('用户邮箱和密码不匹配')
      })
    }
  },
  data () {
    return {
      email: '',
      password: ''
    }
  }
}
</script>
