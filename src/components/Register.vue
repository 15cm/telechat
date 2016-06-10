<template>
  <div id="login">
    <div class="banner">
      <h2>Telechat</h2>
      <p>注册</p>
    </div>
    <toast :show.sync="showWarn" :time="1000" type="warn">
      <p>邮箱已被注册<br/>换一个试试？</p>
    </toast>
    <div class="input_field">
      <x-input type="email" title="登录邮箱" placeholder="xxx@example.com" v-ref:iemail :value.sync="email" ></x-input>
      <x-input type="name" title="昵称" placeholder="显示的昵称" v-ref:iname :value.sync="name"></x-input>
      <x-input type="password" title="密码" placeholder="密码(6-20位)" v-ref:ipassword :value.sync="password" :min="6" :max="20"></x-input>
      <x-button @click="submit" :disabled="!($refs.iemail.valid && $refs.iname.valid && $refs.ipassword.valid)" text="注册"></x-button>
    </div>
    <div class="link_below_form">
      <a v-link="{ path: '/login' }">登录界面戳这里</a>
    </div>
  </div>
</template>

<script>
import XInput from 'vux/components/x-input'
import XButton from 'vux/components/x-button'
import Toast from 'vux/components/toast'
export default {
  components: {
    XInput,
    XButton,
    Toast
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
        this.showWarn = !this.showWarn
        console.log('邮箱已被注册，换一个试试?')
      })
    }
  },
  data () {
    return {
      email: '',
      name: '',
      password: '',
      showWarn: false
    }
  }
}
</script>
