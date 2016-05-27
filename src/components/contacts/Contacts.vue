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
    <group-panel v-for="group in groups" :header="group.name" :members="group.members"  :is-edit="isEdit">
    <span slot="edit" class="clickable" @click="deleteGroup(group)" v-show="isEdit">
      <icon class="inline-fa-icon" name="minus-circle"></icon>
    </span>
    </group-panel>
  </div>
</template>

<script>
import Icon from 'vue-awesome/dist/vue-awesome'
import XHeader from 'vux/components/x-header'
import Search from 'vux/components/search'
// import { panel as Panel } from 'vue-strap'
import GroupPanel from '../mypanel/GroupPanel'
import Add from './Add'
export default {
  components: {
    Icon,
    Search,
    GroupPanel,
    XHeader,
    Add
  },
  methods: {
    togglePopUp () {
      this.isAdd = !this.isAdd
    },
    toggleEdit () {
      this.isEdit = !this.isEdit
    },
    deleteGroup (group) {
      this.groups.$remove(group)
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
          id: '1',
          name: 'default',
          members: [
            {
              id: '1',
              name: 'Sinker'
            },
            {
              id: '2',
              name: 'Sinkerine'
            }
          ]
        },
        {
          id: '2',
          name: 'zju',
          members: [
            {
              id: '3',
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
