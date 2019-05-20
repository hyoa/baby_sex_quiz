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

    this.stats = this.stats.sort(this.compareObject)

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
              beginAtZero: true,
              precision: 0
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
    },
    compareObject (a, b) {
      if (a.number < b.number) {
        return 1
      }
      if (a.number > b.number) {
        return -1
      }
      return 0
    }
  }
}
</script>
