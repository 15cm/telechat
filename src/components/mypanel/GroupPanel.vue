<template>
  <div id="group-panel">
    <slot name="edit"></slot>
    <div class="clickable unselectable panel-inline" v-bind:class="{'panel-inline-edit': isEdit}" @click="toggleIsOpen">
          <icon class="inline-fa-icon" :name="isOpen ? 'caret-down' : 'caret-right'" scale="0.8" > </icon>
            <div class="panel-heading panel-inline">
              <h4 class="panel-title">
                {{ header }}
              </h4>
            </div>
    </div>
    <div class="panel-collapse" v-show="isOpen" transition="collapse">
      <div class="panel-body">
        <cell-list :items="members" :is-edit="isEdit">
        </cell-list>
      </div>
    </div>
  </div>
</template>

<script>
import Icon from 'vue-awesome/dist/vue-awesome'
import CellList from '../mylist/CellList'
export default {
  components: {
    Icon,
    CellList
  },
  props: {
    isOpen: {
      type: Boolean,
      default: false
    },
    header: String,
    members: Array,
    isEdit: Boolean
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
.inline-fa-icon {
  margin-left: 5px;
  margin-right: 5px;
}

.panel-inline {
  margin-left: 5px;
  display: inline-block;
  width: calc(100% - 33px);
  /*overflow: hidden;*/
}

.collapse-transition {
  transition: max-height .5s ease;
  overflow: hidden;
}

.collapse-enter, .collapse-leave {
  max-height: 0!important;
}
</style>
