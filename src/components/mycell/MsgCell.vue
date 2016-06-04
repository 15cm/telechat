<template>
  <div class="msg-cell">
    <div class="cell_box button_like">
      <div class="cell_hd">
      </div>
      <div class="cell_bd">
        <p>{{msg.content}}</p>
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
  }
}
</script>
