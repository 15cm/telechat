<template>
  <div class="cell_box">
      <slot name="edit"></slot>
      <div class="cell_box_md unselectable">
        <icon name="check-circle" ></icon>
        <div class="cell_hd">
          <img class="avatar" :src="contact.avatar" >
        </div>
        <div class="cell_bd">
          <h4>{{ contact.name }}</h4>
        </div>
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
  props: {
    contact: Object
  },
  data () {
    return {
    }
  }
}
</script>
