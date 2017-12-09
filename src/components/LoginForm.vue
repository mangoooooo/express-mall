<template>
    <div class="login-content" v-if="showLoginForm">
        <div class="login-box">
            <form action="" @submit.prevent="login">
                <div class="form-header">登录商城</div>
                <div class="form-body">
                    <div class="form-group">
                        <input type="text" placeholder="请输入用户名" v-model="username">
                    </div>
                    <div class="form-group">
                        <input type="password" placeholder="请输入密码" v-model="password">
                    </div>
                </div>
                <div class="form-tips" v-show="errMsg">{{errMsg}}</div>
                <div class="form-footer">
                    <button type="submit" 
                            :class="{disabled: !canSend}" 
                            @click="login">{{btnText}}</button>
                </div>
            </form>
        </div>
        <div class="md-mask" @click="hide"></div>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    data () {
        return {
            username: '',
            password: '',
            isRequsting: false,
            errMsg: '',
        }
    },
    computed: {
        ...mapState(['showLoginForm']),
        btnText () {
            return this.isRequsting ? '登录中...': '登录'
        },
        canSend () {
            if (this.username == '' || this.password == '' || this.isRequsting) {
                return false
            } 

            return true
        }
    },
    watch : {
    },
    methods: {
        login () {
            if (!this.canSend) {
                return false
            }
            this.isRequsting = true
            this.errMsg = ''

            let params = {
                username: this.username,
                password: this.password
            }

            this.$ajax.login(params).then(res => {
                this.isRequsting = false
                this.$store.commit("updateUserInfo", res)
                this.hide()

            }).catch(err => {
                this.isRequsting = false
                this.errMsg = err.msg ? err.msg : '登录失败'
            })

        },
        hide () {
            this.$store.commit("updateLoginForm", false)
        }
    }
}
</script>

<style scoped>
    /**
        border-color: #dedede
        theme-color: #f96464
        font-color: #2c3e50
    **/
    .md-mask {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        z-index: 200;
    }

    .login-box {
        position: fixed;
        top: 50%;
        left: 50%;
        width: 350px;
        height: auto;
        padding: 15px;
        border-radius: 5px;
        transform: translate(-50%, -50%);
        background: white;
        z-index: 201;
    }

    .form-header {
        padding-left: 10px;
        font-size: 18px;
        color: #f96464;
    }

    .form-body {
        margin: 25px 0;
    }
    .form-group {
        height: 40px;
        
    }
    .form-group:last-child {
        margin-top: 15px;
    }
    .form-group input {
        width: 100%;
        height: 100%;
        padding: 0 10px;
        border: 1px solid #dedede;
        border-radius: 4px;
        outline: none;
        transition: border .5s ease-out;
    }
    .form-group input:focus{
        border: 1px solid rgba(249, 100, 100, .5);
        border-radius: 4px;
        
    }

    
    .form-footer button {
        width: 100%;
        padding: 10px;
        font-size: 16px;
        border-radius: 4px;
        background: none;
        outline: none;
        border: 1px solid #f96464;
        color: #f96464;
        cursor: pointer;
    }
    button.disabled {
        border: 1px solid #dedede;
        color: #aaaaaa;
    }

    .form-tips {
        color: #f96464;
        margin-bottom: 5px;
        padding-left: 5px;
        font-size: 12px;
    }
    
</style>
