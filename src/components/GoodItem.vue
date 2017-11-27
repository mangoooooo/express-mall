<template>
  <div class="item-wrap">
    <div class="item-img pointer">
        <img v-lazy="'/static/images/01.jpg'" alt="">
    </div>
    <div class="item-price">￥{{info.salePrice}}</div>
    <div class="item-intro">{{info.productName}}</div>
    <div class="item-footer pointer" @click="addCart">加入购物车</div>
  </div>
</template>

<script>
export default {
    props: {
        info: {
            type: Object,
        }
    },
    methods: {
        addCart () {
            this.$axios.post('/goods/addCart', {
                productId: this.info.productId,
            }).then(res => {
                if (res.data.status == 0) {
                    alert('添加成功')
                } else {
                    alert(res.data.msg)
                }
            }).catch(err => {
                alert(err)
            })
        }
    }
}
</script>

<style scope>
.item-wrap {
    /* flex: 1; */
    width: 230px;
    margin: 0 15px 40px 15px;
    border: 1px solid #dedede;
    background-color: #ffffff;
    transition: border .3s ease-out;
}
.item-wrap:hover {
    border: 1px solid #f96464;
}
.item-img {
    position: relative;
    width: 228px;
    height: 228px;
    /* border-bottom: 1px solid #dedede; */
}
img[lazy=loading] {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 32px;
    height: 32px;
    transform: -50% -50%;
}
.item-price {
    padding: 5px 8px;
    font-size: 18px;
    color: #f96464;
}
.item-intro {
    padding: 0 8px;
    font-size: 14px;
    letter-spacing: 1px;
}
.item-footer {
    margin: 10px 20px;
    height: 35px;
    line-height: 35px;
    border: 1px solid #f96464;
    border-radius: 5px;
    text-align: center;
    color: #f96464;
}
</style>
