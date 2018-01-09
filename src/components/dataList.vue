<template>
  <div class="dataListWrap">
    <ul class="dataList" v-loading.fullscreen="loading">
      <li v-for="data in dataList">
        <a target="_blank" :href="data.url">
          <img :src="data.room_src" width="320" height="180" />
          <p>{{data.room_name}}
            <span class="hn">
              <i class="el-icon-view"></i>{{data.hn}}</span>
          </p>
        </a>
      </li>
    </ul>
    <h3 v-show="loadingFinsh">已经没有更多的数据了</h3>
  </div>
</template>

<script>
export default {
  name: 'index',
  data() {
    return {
      dataList: [],
      pageIndex: 0,
      loading: true,
      loadingFinsh: false
    };
  },
  created() {
    this.getRoomData();
  },
  mounted() {
    window.addEventListener('scroll', this._.debounce(this.scrollMethod, 300));
  },
  methods: {
    scrollMethod() {
      const sumH = document.body.scrollHeight;
      const viewH = document.documentElement.clientHeight;
      const scrollH = document.documentElement.scrollTop || document.body.scrollTop;
      if (viewH + scrollH >= sumH) {
        !this.loading && this.getRoomData();
      }
    },
    handleCurrentChange(val) {
      this.pageIndex = val;
      this.getRoomData();
    },
    getRoomData() {
      this.loading = true;
      if (this.pageIndex < 7) {
        const roomUrl = '/room/';
        const url = roomUrl + this.pageIndex;
        this.$ajax.get(url).then(d => {
          this.dataList = [...this.dataList, ...d.data.data];
          console.log(this.dataList);
          setTimeout(() => {
            this.loading = false;
          }, 500);
        });
        this.pageIndex++;
      } else {
        this.loadingFinsh = true;
        this.loading = false;
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
.el-loading-parent--hidden {
  /* overflow:auto!important */
}
</style>

<style scoped lang="scss">
.dataListWrap {
  padding: 30px 0px;
}
.dataList {
  padding-bottom: 30px;
  li {
    > a {
      display: block;
      font-size: 0;
      border-radius: 6px;
      overflow: hidden;
      text-decoration: none;
    }
  }
  p {
    height: 30px;
    background: #f2f2f2;
    padding: 0 10px;
    font-size: 14px;
    color: #456;
    line-height: 30px;
    text-align: left;
  }
  .hn {
    float: right;
  }
  .el-icon-view {
    margin-right: 5px;
  }
}
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 10px 10px;
}
.el-loading-mask {
  position: fixed !important;
}
</style>
