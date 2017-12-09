<template>
    <div class="header-content">
        <div class="container header-wrap">
            <div class="header-left title">mangoooo滴商城</div>
            <div class="header-right">
                <div class="btn-login" v-if="user" @click="logout">退出登录</div>
                <div class="btn-login" v-if="!user" @click="showLogin">登录</div>
                <div><router-link :to="{name: 'cart'}">购物车</router-link></div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    computed: {
        ...mapState(['user']),
    },
    methods: {
        showLogin () {
            this.$store.commit("updateLoginForm", true)
        },
        logout () {
            this.$ajax.logout().then(res => {
                this.$store.commit("updateUserInfo", null)
                alert('已退出账号')
            }).catch(err => {
                this.$store.commit("updateUserInfo", null)
                alert('已退出账号')
            })
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
    .header-content {
        width: 100%;
        min-width: 960px;
        border-bottom: 1px solid #dedede;
        background-color: white;
    }

    .header-wrap {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 70px;
        padding: 10px 15px;
        font-size: 16px;
        background-color: inherit;
    }



    .title {
        color: #f96464;
        font-size: 20px;
    }
    .header-right {
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }



    .header-right div {
        cursor: pointer;
        transition: color .3s ease-out;
    }
    .header-right div:hover {
        color: #f96464;
    }
    .btn-login {
        margin-right: 15px;
    }
</style>
