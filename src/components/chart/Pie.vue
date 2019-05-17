<script>
import { Pie } from 'vue-chartjs'

export default {
  extends: Pie,
  props: ['stats'],
  created () {
    const data = {
      datasets: [{ data: [], backgroundColor: [] }],
      labels: []
    }

    for (let stat of this.stats) {
      data.datasets[0].data.push(stat.number)
      data.labels.push(stat._id)

      if (stat._id === 'f') {
        data.datasets[0].backgroundColor.push('#ed65a6')
      } else {
        data.datasets[0].backgroundColor.push('#4298e1')
      }
    }

    this.data = data
  },
  data () {
    return {
      data: {}
    }
  },
  mounted () {
    this.renderChart(this.data, {})
  }
}
</script>

<style scoped>

</style>
