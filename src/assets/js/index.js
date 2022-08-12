import card from '../../components/card/card'
import headBar from '../../components/headBar/headBar.vue'
import { mapGetters } from 'vuex'
export default {
  components: {
    card,
    headBar
  },
  computed: {
    ...mapGetters(['getGoods'])
  },
  data() {
    return {
      data: {
        
      }
    }
  },
  created() {
    this.queryAll();
  },
  methods: {
    queryAll() {
      const data = {
        searchText: this.$route.query.search
      }
      this.$api.goods.queryAll(data).then(res => {
        if (res.code === 200) {
          this.$store.commit('setGoods', res.data);
          // this.data.goods=res.data;
        } else {
          this.$message.error(res.msg);
        }
      })
    },
  }
}