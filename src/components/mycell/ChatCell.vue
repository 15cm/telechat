<template>
  <div class="chat-cell">
    <cell :title="chat.user"></cell>
  </div>
</template>

<script>
import Cell from 'vux/components/cell'
export default {
  components: {
    Cell
  },
  props: {
    chat: Object
  },
  data () {
    return {
    }
  }
}
</script>
