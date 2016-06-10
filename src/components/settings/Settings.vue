<template>
  <div id="settings">
    <toast :show.sync="showSuccess" :time="1000" type="success">
      <p>{{ successInfo }}</p>
    </toast>
    <toast :show.sync="showWarn" :time="1000" type="warn">
      <p>{{ warnInfo }}</p>
    </toast>
    <x-header :left-options="leftOptions">
        <span slot="right"><a v-show="isEdit"class="button_like" @click ="editCancel">Cancel</a></span>
        <span slot="left"><a class="button_like" @click="!isEdit ? toggleEdit() : editDone()">
          {{ !isEdit ? '编辑' : '确认' }}
        </a></span>
    </x-header>
    <div class="main">
    <div class="cell_box ">
      <div class="cell_hd">
        <img class="avatar" :src="user.avatar">
      </div>
      <div v-show="!isEdit" class="cell_bd">
        <h4 class="cell_title">{{ user.name }}</h4>
        <a :href="`mailto:${user.email}`" class="cell_title_desc button_like">{{ user.email }}</a>
      </div>
      <div v-show="isEdit" class="info_edit_box">
        <x-input v-ref:iname :value.sync="newName" placeholder="修改昵称"></x-input>
        <x-input v-ref:ipassword type="password" :value.sync="newPassword" placeholder="修改密码(6-20位)" :min="6" :max="20"></x-input>
      </div>
    </div>
    <div v-show="isEdit" id="container" class="cell_box">
            <a class="btn btn-default " id="pickfiles" href="javascript: void(0)" >
                <i class="glyphicon glyphicon-plus"></i>
                <span>上传头像</span>
                <span>(2MB 以内)</span>
            </a>
    </div>
    <div class="cell_box">
        <div>
          <h4 class="profile_cell_title">个性签名</h3>
        </div>
        <div v-show="!isEdit">
          <p class="cell_content" :class="{ unset: !user.sign }">{{ user.sign ? user.sign : '尚未设置签名'
           }}</p>
        </div>
        <div v-show="isEdit">
          <x-input type="text" :value.sync="newSign" placeholder="修改签名"></x-input>
        </div>
    </div>
    <div class="bottom">
      <x-button @click="logout" type="warn">注销
      </x-button>
    </div>
  </div>
</template>

<script>
import XHeader from 'vux/components/x-header'
import Toast from 'vux/components/toast'
import XInput from 'vux/components/x-input'
import XButton from 'vux/components/x-button'
export default {
  components: {
    XHeader,
    Toast,
    XInput,
    XButton
  },
  ready () {
    var mServerHost = this.$mServerHost
    var uploader = Qiniu.uploader({
              runtimes: 'html5,flash,html4',
              browse_button: 'pickfiles',
              container: 'container',
              drop_element: 'container',
              max_file_size: '2mb',
              flash_swf_url: 'bower_components/plupload/js/Moxie.swf',
              dragdrop: true,
              uptoken_url: `${mServerHost}/api/qiniu/token`,
              domain: 'http://o8idiuwvl.bkt.clouddn.com',
              unique_names: true,
              get_new_uptoken: false,
              auto_start: true,
              filters: {
                mime_types: [
                  {title: 'Image files', extensions: 'jpg,jpeg,png'}
                ]
              },
              init: {
                  'FilesAdded': (up, files) => {
                  },
                  'BeforeUpload': (up, file) => {
                  },
                  'UploadProgress': (up, file) => {
                  },
                  'UploadComplete': () => {
                  },
                  'FileUploaded': (up, file, info) => {
                    var key = JSON.parse(info).key
                    var imgLink = Qiniu.imageView2({
                      mode: 3,
                      w: 64,
                      h: 64,
                      q: 100,
                      format: 'png'
                    }, key)
                    this.successType = 2
                    this.toggleSuccess()
                    this.$set('user.avatar', imgLink)
                  },
                  'Error': function(up, err, errTip) {
                  }
              }
          });
    // require('script!static/qiniu-upload.js')
  },
  route: {
    deactivate (transition) {
        if(transition.to.path == '/login'){
          this.$auth.uid = null
        }
      transition.next()
    },
    data (transition) {
      this.refreshUser().then(() => {
        transition.next()
      })
    }
  },
  methods: {
    refreshUser () {
      return this.$http.get(`${this.$mServerHost}/api/users/${this.$auth.uid}`).then(res => {
        this.$set('user', res.data)
        this.$set('newName',this.user.name)
        this.$set('newSign',this.user.sign)
        this.$set('newPassword', this.user.password)
      })
    },
    updateUser () {
      return this.$http.put(`${this.$mServerHost}/api/users/${this.$auth.uid}`,this.user)
    },
    toggleEdit () {
      this.isEdit = !this.isEdit
    },
    toggleSuccess () {
      this.showSuccess = !this.showSuccess
    },
    toggleWarn () {
      this.showWarn = !this.showWarn
    },
    editCancel () {
      this.refreshUser().then(() => {
        this.warnType = 1
        this.toggleWarn()
        this.toggleEdit()
      })
    },
    editDone () {
      if(!this.$refs.iname.valid || !this.$refs.ipassword.valid){
        this.warnType = 2
        this.toggleWarn()
        return
      }
      this.successType = 1
      this.$set('user.name', this.newName)
      this.$set('user.password', this.newPassword)
      this.$set('user.sign', this.newSign)
      this.updateUser().then(res => {
        this.toggleSuccess()
        this.toggleEdit()
      })
    },
    logout () {
      this.$router.go({name: 'login'})
    }
  },
  computed: {
    warnInfo () {
      if(this.warnType == 1){
        return '取消修改'
      } else if(this.warnType == 2) {
        return '名称或密码无效'
      }
    },
    successInfo () {
      if(this.successType == 1){
        return '修改成功'
      } else if (this.successType == 2) {
        return '上传成功'
      }
    }
  },
  data () {
    return {
      leftOptions: {
        showBack: false
      },
      isEdit: false,
      user: {},
      showSuccess: false,
      showWarn: false,
      newName: '',
      newPassword: '',
      newSign: '',
      warnType: 1,
      successType: 1
    }
  }
}
</script>

<style lang="less" scoped>
.main {
  .bottom {
    bottom: 8%;
    width: 100%;
    position: absolute;
  }
}
</style>
