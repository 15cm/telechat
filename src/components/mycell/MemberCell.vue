<template>
  <div class="cell_box">
      <slot name="edit"></slot>
      <div class="cell_box_md button_like" v-bind:class="{ 'edit': isEdit }">
        <div class="cell_hd">
          <img class="avatar" :src="mUser.avatar" >
        </div>
        <div class="cell_bd">
          <h4>{{ mUser.name }}</h4>
        </div>
      </div>
      <div class="cell_footer button_like">
      <a v-link="{ path: '/contacts/profile', params: {id: member.uid} }" v-show="!isEdit">
        <icon name="angle-right" ></icon>
      </a>
      <a v-show="isEdit" @click="onMoveClick(member)">
        <icon name="align-justify" ></icon>
      </a>
      </div>
  </div>
</template>

<script>
import Cell from 'vux/components/cell'
import Icon from 'vue-awesome/dist/vue-awesome'
export default {
  components: {
    Cell,
    Icon
  },
  methods: {
    onMoveClick (member) {
      this.$dispatch('on-move-member', member)
    }
  },
  props: {
    member: Object,
    isEdit: Boolean
  },
  ready () {
    this.$http.get(`${this.$mServerHost}/api/users/${this.member.uid}`)
    .then(res => {
      this.$set('mUser', res.data)
    }, res => {
      console.log(res)
    })
  },
  data () {
    return {
      mUser: {
        name: '',
        avatar: ''
      }
    }
  }
}
</script>
