<template>
  <div>
      <bread><span class="current-page">购物车列表</span></bread>   
      <div class="content">
          <!-- <div class="container box"> -->
              <table cellpadding="0" cellspacing="0">
                  <thead>
                      <tr>
                            <th style="min-width: 50px"></th>
                            <th style="min-width: 300px">商品信息</th>
                            <th style="min-width: 150px">单价</th>
                            <th style="min-width: 150px">数量</th>
                            <th style="min-width: 150px">金额</th>
                            <th style="min-width: 80px">操作</th>
                      </tr>
                  </thead>
                  <tbody class="table-body">
                      <tr v-for="(item, index) in cartList" :key="item._id">
                          <td>
                              <input type="checkbox" 
                                     v-model="selectGoods" 
                                     :value="item.productId"
                                     @change="change($event, index)">
                          </td>
                          <td>
                              <img src="/static/images/01.jpg" alt="">
                              <span>{{item.productName}}</span>
                          </td>
                          <td>￥{{item.salePrice}}</td>
                          <td class="num-select-wrap">
                              <span class="btn" @click="editNum('minus', item)">-</span>
                              <span>{{item.productNum}}</span>
                              <span class="btn" @click="editNum('add', item)">+</span>
                          </td>
                          <td>￥{{item.productNum * item.salePrice}}</td>
                          <td @click="deleteGoods(item, index)">移除</td>
                      </tr>
                  </tbody>
                  <tfoot>
                      <tr>
                          <td>
                              <input type="checkbox" v-model="selectAll">
                          </td>
                          <td colspan=5>
                              <div class="cart-footer">
                                  <div class="left">
                                    <label @click="selectAll = true">全选</label>
                                    <label @click="delSeletced">删除所选</label>
                                </div>
                                <div class="right">
                                    <span>总金额：{{sum}}</span>
                                    <span class="btn" @click="order">结算</span>
                                </div>
                              </div>    
                          </td>
                      </tr>
                  </tfoot>
              </table>
          <!-- </div> -->
      </div>
  </div>
</template>

<script>
import Bread from '@/components/Bread'

export default {
    data() {
        return {
            tbody: null,
            cartList: [],
            selectGoods: [],
            selectAll: false,
            isdeleting: false,
        }
        
    },
    components: {
        Bread,
    },
    watch: {
        selectGoods (newVal) {
            if (newVal.length == this.cartList.length) {
                this.selectAll = true
            } else {
                this.selectAll = false
            }
        },
        selectAll (newVal) {
            if (newVal && this.selectGoods != this.cartList.length) {
                this.cartList.forEach(item => {
                    if (this.selectGoods.indexOf(item.productId) == -1) {
                        this.selectGoods.push(item.productId)
                    }
                })
            } else if (!newVal && this.selectGoods.length == this.cartList.length) {
                this.selectGoods = []
            }
        }
    },
    computed: {
        sum () {
            var rs = 0

            if (this.selectGoods.length == 0) {
                return rs
            }

            this.cartList.forEach(item => {
                if (this.selectGoods.indexOf(item.productId) > -1) {
                    rs += (item.productNum * item.salePrice)
                }
            })

            return rs
        }
    },
    methods: {
        editNum (type, item) {
            if (type == 'minus' && item.productNum > 1) {
                item.productNum--
            }else if (type == 'add' && item.productNum < 10) {
                item.productNum++
            } else {
                return
            }

            this.$ajax.cartEdit({
                productId: item.productId,
                num: item.productNum
            })
            
        },
        deleteGoods (item, index) {
            if (this.isdeleting) {
                return 
            }
            this.isdeleting = true

            this.$ajax.cartDel({productId: item.productId}).then(res => {
                this.isdeleting = false
                this.cartList.splice(index, 1)
                alert('删除成功')
            }).catch(err => {
                alert(err.msg || '删除失败')
            })
            
        },
        loadData () {
            this.$ajax.cartList().then(res => {
                this.cartList = res
            })
        },
        change(e, index) {
            var checked = e.target.checked
            var tr = this.tbody.childNodes[index]

            if (checked) {
                tr.style.backgroundColor = '#fff8e1'
            } else {
                tr.style.backgroundColor = '#ffffff'
            }
        },
        delSeletced () {

        },
        order () {
            if (!this.selectGoods.length) {
                return 
            }

            this.$router.push({
                name: 'address'
            })
        }
    },
    mounted () {
        this.loadData();
        this.tbody = document.getElementsByClassName("table-body")[0]
    }
}
</script>

<style scoped>
.content {
    width: 100%;
    min-width: 960px;
    border-top: 1px solid transparent;
    background: #f7f2f2;
}

.box {
    padding: 0 15px;
}

table {
    width: 100%;
}
table thead th{
    padding: 10px 0;
}
table tbody {
    background: white;
}
table tbody tr td:nth-child(2) {
    padding: 10px 0;
    text-align: left;
}
table tbody tr td:nth-child(5) {
    color: #f96464;
}
table tbody td {
    border-top: 1px solid #dedede;
    text-align: center;
}
table img {
    width: 120px;
    margin-right: 10px;
    vertical-align: middle;
}

.num-select-wrap span {
    display: inline-block;
}
.num-select-wrap span:nth-child(2) {
    min-width: 40px;
}
.num-select-wrap .btn {
    padding: 3px 10px;
    border: 1px solid #dedede;
    background: rgb(247, 242, 242);
    cursor: pointer;
}


.cart-footer {
    display: flex;
    justify-content: space-between;
    height: 60px;
    line-height: 60px;
}
table tfoot td:first-child {
    text-align: center;
}
.cart-footer .left label {
    margin-right: 10px;
    cursor: pointer;
}
.cart-footer .right span{
    margin-left: 15px;
}
.cart-footer .right span:first-child {
    color: #f96464;
}
.cart-footer .right .btn {
    display: inline-block;
    height: 100%;
    padding: 0 50px;
    background-color: #f96464;
    color: #ffffff;
    letter-spacing: 1px;
}

</style>
