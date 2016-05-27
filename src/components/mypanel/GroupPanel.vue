<template>
  <div id="group-panel">
    <a class="clickable unselectable" @click="toggleIsOpen">
      <div class="panel-heading">
        <h4 class="panel-title">
          <span>
          <icon name="caret-right" scale="0.8" v-show="!isOpen"></icon>
          <icon name="caret-down" scale="0.8" v-show="isOpen"></icon>
          </span>
          {{ header }}
        </h4>
      </div>
    </a>
    <div class="panel-collapse" v-show="isOpen" transition="collapse">
      <div class="panel-body">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
import Icon from 'vue-awesome/dist/vue-awesome'
// require('src/assets/basic.css')
export default {
  components: {
    Icon
  },
  props: {
    isOpen: {
      type: Boolean,
      default: false
    },
    header: String
  },
  methods: {
    toggleIsOpen () {
      this.isOpen = !this.isOpen
      this.$dispatch('group-panel-open', this)
    }
  },
  transitions: {
    collapse: {
      afterEnter: function afterEnter (el) {
        el.style.maxHeight = ''
      },
      beforeLeave: function beforeLeave (el) {
        el.style.maxHeight = el.offsetHeight + 'px'
        // Recalculate DOM before the class gets added.
        return el.offsetHeight
      }
    }
  }
}
</script>

<style scope>

.collapse-transition {
  transition: max-height .5s ease;
  overflow: hidden;
}

.collapse-enter, .collapse-leave {
  max-height: 0!important;
}
</style>
