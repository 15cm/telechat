<template>
  <div class="contacts">
    <add :is-show.sync="isAdd"></add>
    <x-header :left-options="leftOptions">
      <span slot=left>
        <a class="clickable" @click="toggleEdit" slot="left">
          Edit
        </a>
      </span>
      <span slot="right">
        <a class="clickable" @click="togglePopUp" >
          <icon name="plus-circle" scale="1.3"></icon>
        </a>
      </span>
      Contacts
    </x-header>
    <search placeholder="Search for groups or contacts"></search>
    <group-panel v-for="group in groups" :header="group.name">
      <cell-list :list="group.members"></cell-list>
    </group-panel>
  </div>
</template>

<script>
import Icon from 'vue-awesome/dist/vue-awesome'
import XHeader from 'vux/components/x-header'
import Search from 'vux/components/search'
// import { panel as Panel } from 'vue-strap'
import GroupPanel from '../mypanel/GroupPanel'
import CellList from '../mylist/CellList'
import Add from './Add'
export default {
  components: {
    Icon,
    Search,
    GroupPanel,
    CellList,
    XHeader,
    Add
  },
  methods: {
    togglePopUp () {
      this.isAdd = !this.isAdd
    },
    toggleEdit () {
      this.isEdit = !this.isEdit
    }
  },
  data () {
    return {
      // note: changing this line won't causes changes
      // with hot-reload because the reloaded component
      // preserves its current state and we are modifying
      // its initial state.
      leftOptions: {
        showBack: false
      },
      isEdit: false,
      isAdd: false,
      groups: [
        {
          name: 'default',
          members: [
            {
              name: 'Sinker'
            },
            {
              name: 'Sinkerine'
            }
          ]
        },
        {
          name: 'zju',
          members: [
            {
              name: 'Narcissu'
            }
          ]
        }
      ]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
