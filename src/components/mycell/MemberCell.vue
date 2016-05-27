<template>
  <div class="member-cell">
      <slot name="edit"></slot>
      <cell :title="member.name" class="unselectable clickable"></cell>
  </div>
</template>

<script>
import Cell from 'vux/components/cell'
export default {
  components: {
    Cell
  },
  props: {
    member: Object
  },
  data () {
    return {
    }
  }
}
</script>

<style>
</style>
