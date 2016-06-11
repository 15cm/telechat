<template>
  <div class="cell_box_md">
    <slot name="edit"></slot>
    <div class="cell_bd">
      <input class="form-control" type="text" v-model="value">
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: '',
      twoWay: true
    }
  }
}
</script>

<style scope>
.cell_box_md {
  border: none
}
</style>
