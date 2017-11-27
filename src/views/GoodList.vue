<template>
  <div>
      <bread><span class="current-page">商品列表</span></bread>   
      <div class="content">
          <div class="sort-content">
            <div class="container sort-wrap">
                <div class="sort-inner">
                    <span>排序：</span>
                    <span :class="{'current-sort': sortIndex == item.value}" 
                          v-for="(item, index) in sortList"
                          @click="sortIndex = item.value">{{item.name}}</span>
                </div>
            </div>
          </div>
          
          <div class="container box">
              <div class="box-left">
                  <div class="filter-wrap">
                      <div class="filter-title">价格：</div>
                        <ul class="filter-list">
                            <li :class="{active: filterIndex == 0}"
                                @click="filterIndex = 0">不限</li>
                            <li v-for="(item, index) in priceFilter" 
                                :key="index"
                                :class="{active: filterIndex == item.value}"
                                @click="filterIndex = item.value">{{item.from}} ~ {{item.to}}</li>
                        </ul>
                  </div>
              </div>
              <div class="box-right">
                  <div class="good-list">
                      <good-item v-for="(item, index) in goodsList" :key="item.id" :info="item"></good-item>
                  </div>
                  <div v-infinite-scroll="loadMore" 
                        infinite-scroll-disabled="busy" 
                        infinite-scroll-distance="10">
                      <div class="load-text" v-show="isLoading">加载中...</div>
                      <div class="load-text" v-show="isEnd">我是有底线的</div>
                  </div>
              </div>
          </div>
      </div>
  </div>
</template>

<script>

import Bread from '@/components/Bread'
import GoodItem from '@/components/GoodItem'

export default {
    data() {
        return {
            page: 1,
            pageSize: 10,
            filterIndex: 0,
            sortIndex: 0,
            sortList: [
                {
                    name: '默认',
                    value: '0',
                },
                {
                    name: '价格',
                    value: '1',
                },
                {
                    name: '最新',
                    value: '2',
                },
            ],
            priceFilter: [
                {
                    value: 1,
                    from: 0,
                    to: 100
                },
                {
                    value: 2,
                    from: 100,
                    to: 500
                },
                {
                    value: 3,
                    from: 500,
                    to: 800
                },
                {
                    value: 4,
                    from: 800,
                    to: 1200
                }
            ],
            goodsList: [],
            busy: true,
            isEnd: false,
            isLoading: false,
        }
        
    },
    components: {
        Bread,
        GoodItem
    },
    watch: {
        filterIndex () {
            this.loadFirstPage()
        },
        sortIndex () {
            this.loadFirstPage()
        }
    },
    methods: {
        loadMore () {
            this.busy = true 

            setTimeout(() => {
                this.page++;
                this.getGoodsList();
            }, 500);
        },
        loadFirstPage () {
            this.page = 1
            this.goodsList = []
            this.getGoodsList()
        },
        getSendParams () {
            let params = {
                sort: this.sortIndex,
                pageSize: this.pageSize,
                page: this.page,  
                priceFrom: '',
                priceTo: '',
            }

            if (this.filterIndex != 0) {
                let obj = this.priceFilter[this.filterIndex - 1]
                params.priceFrom = obj.from
                params.priceTo = obj.to
            }

            return params
        },
        getGoodsList () {
            this.isLoading = true 

            this.$axios.get('/goods/list', {
                params: this.getSendParams()

            }).then((res) => {
                this.isLoading = false

                let data = res.data

                if (data.status == 0) {
                    this.goodsList = this.goodsList.concat(data.result.list)

                    this.$nextTick(() => {
                        if (data.result.count < this.pageSize || data.result.count == 0) {
                            this.busy = true
                            this.isEnd = true
                        } else {
                            this.busy = false
                        }
                    })
                    
                } else {
                    this.busy = true
                }

            }).catch(err => {
                console.log(err)
                this.busy = true
                this.isLoading = false
            })
        }
    },
    mounted () {
        this.loadFirstPage()
    }
}
</script>

<style scoped>
.content {
    width: 100%;
    min-width: 960px;
    /* padding-top: 50px; */
    border-top: 1px solid transparent;
    background: #f7f2f2;
}
.load-text {
    text-align: center
}


.sort-content {
    border-bottom: 1px solid #dedede;
    background-color: #ffffff;
}
.sort-wrap {
    height: 50px;
    line-height: 50px;
    
    font-size: 14px;
    /* border-top: 1px solid #dedede; */
    
}
.sort-inner {
    float: right;
    padding: 0 15px;
}
.sort-inner span {
    margin-left: 5px;
    cursor: pointer;
}
.sort-inner span:first-child {
    cursor: initial;
}
.current-sort {
    color: #f96464;
}


.box {
    display: flex;
    padding: 60px 15px 30px 15px;
}
/* .box-left {
    
} */
.box-right {
    flex: 1;
    padding-left: 15px;
}


.filter-wrap {
    padding: 10px 15px 10px 0;
    border-right: 1px solid #dedede;
}
.filter-wrap .filter-title {
    font-weight: bold;
}
.filter-list {
    min-width: 150px;
    font-size: 14px;
    color: #878787;
}
.filter-list li {
    margin-top: 15px;
    transition: all .3s ease-out;
    cursor: pointer;
}
.filter-list li.active {
    color: #f96464;
}
.filter-list li.active::before {
    content: "";
    border-left: 3px solid #f96464;
    padding-right: 10px;
}
.filter-list li:hover {
    color: #f96464;
    padding-left: 13px;
}
.filter-list li.active:hover {
    padding-left: 0;
}


.good-list {
    display: flex;
    flex-wrap: wrap;
}

</style>
