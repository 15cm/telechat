<template>
  <div class="chat-window">
    <toast :show.sync="showWarn" :time="1000" type="warn">
      <p>网络错误</p>
    </toast>
    <x-header :left-options="leftOptions">
      正在和 {{ contact && contact.name ? `「${contact.name}」` : '...' }} 聊天
    </x-header>
    <!-- <spinner class="spinner-center" v-if="isSpinning"></spinner> -->
    <div class="main">
      <div class="m-message" v-scroll-bottom="msgs">
        <ul>
          <li v-for="item in msgs">
              <p class="time"><span>{{ item.time | moment "dddd, MMMM Do YYYY, h:mm:ss" }}</span></p>
              <div class="main" :class="{ self: item.sid === $auth.uid }">
                  <img class="avatar" width="30" height="30" :src="item | avatar" />
                  <div class="text">{{item.content}}</div>
              </div>
          </li>
        </ul>
      </div>
        <div class="m-text">
          <textarea @keyup="inputing"  v-scroll-bottom="msgs" :placeholder="'Enter 发送\nCtrl + Enter 换行'" v-model="textToSend" ></textarea>
        </div>
    </div>
  </div>
</template>

<script>
import CellList from '../mylist/CellList'
import XHeader from 'vux/components/x-header'
import XTextarea from 'vux/components/x-textarea'
import Icon from 'vue-awesome/dist/vue-awesome'
import Toast from 'vux/components/toast'
import Moment from 'moment'
import Spinner from 'vux/components/spinner'
export default {
  components: {
    CellList,
    XHeader,
    XTextarea,
    Icon,
    Toast,
    Spinner
  },
  route: {
    activate () {
      this.$socket.on('recvMsg', msg => {
        if (msg.rid === this.$auth.uid) {
          this.msgs.push(msg)
        }
      })
    },
    data () {
      this.isSpinning = true
      return Promise.all([
        this.$http.get(`${this.$mServerHost}/api/users/${this.$auth.uid}`),
        this.$http.get(`${this.$mServerHost}/api/users/${this.$route.params.id}` ),
        this.$http.get(`${this.$mServerHost}/api/msgs/or/${this.$auth.uid}/${this.$route.params.id}`),
      ]).then(([meRes, contactRes, msgRes]) => {
        this.isSpinning = false
        return {
          me: meRes.data,
          contact: contactRes.data,
          msgs: msgRes.data
        }
      })
    }
  },
  filters: {
    avatar (msg) {
      return msg.sid === this.$auth.uid ? this.me.avatar : this.contact.avatar
    },
    moment (date, arg) {
      if(date){
        return Moment(new Date(date), arg)
      }
    }
  },
  directives: {
    // 发送消息后滚动到底部
    'scroll-bottom' () {
      Vue.nextTick(() => {
        this.el.scrollTop = this.el.scrollHeight - this.el.clientHeight;
      });
    }
  },
  methods: {
    sendMsg () {
      var msg = {
        sid: this.$auth.uid,
        rid: this.$route.params.id,
        time: new Date,
        content: this.textToSend
      }
      this.$socket.emit('sendMsg', msg)
      this.msgs.push(msg)
      this.textToSend = ''
    },
    inputing (e) {
      if(!e.ctrlKey && e.keyCode === 13 && this.textToSend.length){
        // console.log(this.textToSend);
        this.sendMsg()
      }
    }
  },
  data () {
    return {
      leftOptions: {
        showBack: true,
        backText: '返回'
      },
      socket: {},
      msgs: [],
      me: {},
      contact: {},
      textToSend: '',
      showWarn: false,
      isSpinning: false
    }
  }
}
</script>

<style lang="less" scope>
.m-message {
    padding: 10px 15px;
    overflow-y: scroll;
    li {
        list-style-type: none;
        margin-bottom: 15px;
    }
    .time {
        margin: 7px 0;
        text-align: center;

        > span {
            display: inline-block;
            padding: 0 18px;
            font-size: 12px;
            color: #fff;
            border-radius: 2px;
            background-color: #dcdcdc;
        }
    }
    .avatar {
        float: left;
        margin: 0 10px 0 0;
        border-radius: 3px;
    }
    .text {
        display: inline-block;
        position: relative;
        padding: 0 10px;
        max-width: ~'calc(100% - 40px)';
        min-height: 30px;
        line-height: 2.5;
        font-size: 12px;
        text-align: left;
        word-break: break-all;
        background-color: #fafafa;
        border-radius: 4px;

        &:before {
            content: " ";
            position: absolute;
            top: 9px;
            right: 100%;
            border: 6px solid transparent;
            border-right-color: #fafafa;
        }
    }

    .self {
        text-align: right;

        .avatar {
            float: right;
            margin: 0 0 0 10px;
        }
        .text {
            background-color: #b2e281;

            &:before {
                right: inherit;
                left: 100%;
                border-right-color: transparent;
                border-left-color: #b2e281;
            }
        }
    }
}
.m-text {
    height: 160px;
    border-top: solid 1px #ddd;
    position: fixed;
    bottom: 0%;

    textarea {
        padding: 10px;
        height: 100%;
        width: 100%;
        border: none;
        outline: none;
        resize: none;
    }
}

.chat-window {
  height: 98%;
  .main {
      position: relative;
      overflow: hidden;
      background-color: #eee;
      height: 94%;
  }
  .m-text {
      position: absolute;
      width: 100%;
      bottom: 0;
      left: 0;
  }
  .m-message {
      height: ~'calc(100% - 150px)';
  }
}
</style>
