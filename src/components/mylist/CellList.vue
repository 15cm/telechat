<template>
  <div class="cell-list">
    <member-cell v-for="item in items" :member="item" :is-edit="isEdit" v-if="type == '1'">
        <div slot="edit" class="icon_before_cell button_like" @click="deleteItem(item)" v-show="isEdit">
          <icon name="minus-circle"></icon>
        </div>
    </member-cell>
    <chat-cell v-for="item in items" :chat="item" v-if="type == '2'">
        <span slot="edit" class="icon_before_cell button_like" @click="deleteItem(item)" v-show="isEdit">
          <icon name="minus-circle"></icon>
        </span>
    </chat-cell>
    <msg-cell v-for="item in items" :msg="item" v-if="type == '3'">
    </msg-cell>
    <contact-cell v-for="item in items" :contact="item" v-if="type == '4'"></contact-cell>
  </div>
</template>

<script>
import Icon from 'vue-awesome/dist/vue-awesome'
import MemberCell from '../mycell/MemberCell'
import ChatCell from '../mycell/ChatCell'
import MsgCell from '../mycell/MsgCell'
import ContactCell from '../mycell/ContactCell'
export default {
  components: {
    Icon,
    MemberCell,
    ChatCell,
    MsgCell,
    ContactCell
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
  events: {
    'on-move-member': function (item) {
      return true
    }
  },
  data () {
    return {
    }
  }
}
</script>
