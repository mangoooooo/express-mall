<template>
    <div class="break-content">
        <div class="container break-wrap">
            <nav class="break">
                <router-link to="/">主页</router-link>
                <slot></slot>
            </nav>
        </div>
    </div>
</template>

<script>
export default {
  
}
</script>

<style scoped>

    .break-content {
        width: 100%;
        min-width: 960px;
        border-bottom: 1px solid #dedede;
        background-color: whitesmoke;
    }

    .break-wrap {
        height: 50px;
        line-height: 50px;
        padding: 0 15px;
        font-size: 14px;
        color: #858585;
    }


    .break a {
        position: relative;
        margin-right: 5px;
        padding-right: 10px;
    }
    .break a::after {
        position: absolute;
        content: '/';
        right: 0;
    }

    .current-page {
        color: #2c3e50;
    }

</style>
