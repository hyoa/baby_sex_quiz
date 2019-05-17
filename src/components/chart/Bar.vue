<script>
import { HorizontalBar } from 'vue-chartjs'

export default {
  extends: HorizontalBar,
  props: ['stats'],
  created () {
    const data = {
      datasets: [{ data: [], backgroundColor: [] }],
      labels: []
    }

    for (let stat of this.stats) {
      data.datasets[0].data.push(stat.number)
      data.labels.push(stat._id)
      data.datasets[0].backgroundColor.push(this.getRandomColor())
    }

    this.data = data
  },
  data () {
    return {
      data: {},
      options: {
        legend: { display: false },
        title: {
          display: false
        },
        scales: {
          xAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    }
  },
  mounted () {
    this.renderChart(this.data, this.options)
  },
  methods: {
    getRandomColor () {
      const letters = '0123456789ABCDEF'
      let color = '#'
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)]
      }
      return color
    }
  }
}
</script>

<style scoped>

</style>
