<template>
  <div class="app-container" />
</template>

<script>

export default {
  name: 'CardTable',
  data() {
    return {
      listQuery: {
        title: '',
        importance: '',
        sort: ''
      },
      sortOptions: [
        {
          key: 'id',
          label: 'ID'
        },
        {
          key: 'pageviews',
          label: 'Pageviews'
        }
      ],
      importanceOptions: ['1', '2', '3'],
      cardList: [],
      tableKey: 0
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    async fetchData() {
      // getCardList().then(res => {
      //     this.cardList = res.data.data;
      // }).catch(err => {
      //     console.log(err);
      // });
    },
    handleFilter() {
      console.log('filter')
    },
    handleCreate() {
      this.$router.push('/card/create')
    },
    handleUpdate(row) {
      console.log(row)
    },
    handleDelete(row, index) {
      console.log(row)
    }
  }
}

</script>

