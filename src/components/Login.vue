<template>
  <div id="login">
    <div class="banner">
      <h2>Telechat</h2>
      <p>登录</p>
    </div>
    <spinner class="spinner-center" v-if="isSpinning"></spinner>
    <toast :show.sync="showSuccess" :time="1000" type="success">
      <p>登录成功</p>
    </toast>
    <toast :show.sync="showWarn" :time="1000" type="warn">
      <p>邮箱或密码错误</p>
    </toast>
    <div class="input_field">
      <x-input title="用户邮箱" placeholder="xxx@example.com" v-ref:iemail :value.sync="email" is-type="email"></x-input>
      <x-input title="密码" type="password" placeholder="请输入位密码(6-20位)" v-ref:ipassword :value.sync="password" :min="6" :max="20"></x-input>
      <x-button @click="submit" :disabled="!($refs.iemail.valid && $refs.ipassword.valid)" type="primary" text="登录"></x-button>
    </div>
    <div class="link_below_form">
      <a v-link="{ path: '/register' }">新用户注册</a>
    </div>
  </div>
</template>

<script>
import XInput from 'vux/components/x-input'
import XButton from 'vux/components/x-button'
import Toast from 'vux/components/toast'
import Spinner from 'vux/components/spinner'
export default {
  components: {
    XInput,
    XButton,
    Toast,
    Spinner
  },
  methods: {
    submit () {
      this.isSpinning = true
      this.$http.post(`${this.$mServerHost}/api/users/auth`, {
        email: this.email,
        password: this.password
      }).then(res => {
        this.$auth.login(res.data)
        this.isSpinning = false
        this.showSuccess = !this.showSuccess
        this.$socket.emit('login', {uid: this.$auth.uid})
        this.$router.go({ name: 'index' })
      }, res => {
        this.showWarn = !this.showWarn
        console.log('用户邮箱和密码不匹配')
        this.isSpinning = false
      })
    }
  },
  data () {
    return {
      email: '',
      password: '',
      showSuccess: false,
      showWarn: false,
      isSpinning: false
    }
  }
}
</script>
