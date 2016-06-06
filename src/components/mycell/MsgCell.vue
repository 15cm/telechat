<template>
  <div class="msg-cell">
    <div class="cell_box button_like msg_cell msg_left" v-if="msg.userId != uid">
      <div class="cell_hd">
        <img :src="msg.avatar">
      </div>
      <div class="cell_bd">
        <p>{{msg.content}}</p>
      </div>
    </div>
    <div class="cell_box button_like msg_cell msg_right" v-if="msg.userId == uid">
      <div class="cell_bd">
        <p>{{msg.content}}</p>
      </div>
      <div class="cell_hd">
        <img :src="msg.avatar">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  component: {
  },
  props: {
    msg: Object
  },
  data () {
    return {
      uid: '1'
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
