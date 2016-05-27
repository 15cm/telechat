<template>
  <div class="chat-cell">
    <slot name="edit"></slot>
    <cell :title="chat.user" class="unselectable"></cell>
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
