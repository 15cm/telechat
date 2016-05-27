<template>
  <div class="group-member-list">
    <member-cell v-for="item in list" :member="item" v-if="type === '1'"></member-cell>
    <chat-cell v-for="item in list" :chat="item" v-if="type === '2'"></chat-cell>
  </div>
</template>

<script>
import MemberCell from '../mycell/MemberCell'
import ChatCell from '../mycell/ChatCell'
export default {
  components: {
    MemberCell,
    ChatCell
  },
  props: {
    type: {
      type: String,
      default: '1'
    },
    list: Array
  },
  data () {
    return {
    }
  }
}
</script>
