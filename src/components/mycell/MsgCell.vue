<template>
  <div class="msg-cell">
    <div class="cell_box msg_cell msg_left" v-if="msg.sid != $auth.uid">
      <div class="cell_hd">
        <img :src="msg.contactAvatar">
      </div>
      <textarea class="cell_bd" :readonly="true">
        {{msg.content}}
      </textarea>
    </div>
    <div class="cell_box msg_cell msg_right" v-else>
      <textarea class="cell_bd">
        {{msg.content}}
      </textarea>
      <div class="cell_hd">
        <img :src="msg.myAvatar">
      </div>
    </div>
  </div>
</template>

<script>
import XTextarea from 'vux/components/x-textarea'
export default {
  component: {
    XTextarea
  },
  props: {
    msg: Object
  },
  // asyncData () {
  //   return Promise.all([
  //     this.$http.get(`${this.$mServerHost}/api/users/${this.$auth.uid}`),
  //     this.$http.get(`${this.$mServerHost}/api/users/${this.$route.params.id}`)
  //   ]).then(([sRes, rRes]) => {
  //     return {
  //       sUser: sRes.data,
  //       rUser: rRes.data
  //     }
  //   })
  // },
  data () {
    return {
      sUser: null,
      rUser: null
    }
  }
}
</script>

<style scope>
.msg_cell {
  border-bottom: 1px solid #e5e5e5;
  width: 100%;
}
.msg_right {
  float: right;
  text-align: right;
}
</style>
