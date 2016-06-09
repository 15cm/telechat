class Auth {
  constructor () {
    this.uid = null
  }
  login (uid) {
    // localStorage.setItem('uid', uid)
    this.uid = uid
  }
  logout () {
    this.uid = null
    // localStorage.setItem('uid', null)
  }
  isLogin () {
    // this.uid = localStorage.getItem('uid')
    return this.uid
  }
}
var auth = new Auth()
export default auth
