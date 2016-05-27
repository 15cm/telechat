<template>
  <div class="cell-list">
    <member-cell v-for="item in items" :member="item" :is-edit="isEdit" v-if="type == '1'">
        <span slot="edit" class="clickable" @click="deleteItem(item)" v-show="isEdit">
          <icon class="inline-fa-icon" name="minus-circle"></icon>
        </span>
    </member-cell>
    <chat-cell v-for="item in items" :chat="item" v-if="type == '2'">
        <span slot="edit" class="clickable" @click="deleteItem(item)" v-show="isEdit">
          <icon class="inline-fa-icon" name="minus-circle"></icon>
        </span>
    </chat-cell>
  </div>
</template>

<script>
import Icon from 'vue-awesome/dist/vue-awesome'
import MemberCell from '../mycell/MemberCell'
import ChatCell from '../mycell/ChatCell'
export default {
  components: {
    Icon,
    MemberCell,
    ChatCell
  },
  props: {
    type: {
      type: String,
      default: '1'
    },
    items: Array,
    isEdit: Boolean
  },
  methods: {
    deleteItem (item) {
      this.items.$remove(item)
    }
  },
  data () {
    return {
    }
  }
}
</script>
