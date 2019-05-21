<template>
  <div class="w-full px-12 py-5 md:w-1/2 lg:w-1/3 mx-auto">
    <H1>Les résultats du sondage</H1>
    <section v-if="data">
      <H2>Le sexe</H2>
      <Pie v-if="data.sex" :stats="data.sex" />
      <H2>Le prénom</H2>
      <Bar v-if="data.name" :stats="data.name"/>
      <H2>Le poids (kg)</H2>
      <Bar v-if="data.weight" :stats="data.weight"/>
      <H2>La taille (cm)</H2>
      <Bar v-if="data.length" :stats="data.length"/>
      <H2>Le jour de naissance</H2>
      <Bar v-if="data.birthDate" :stats="data.birthDate" />
    </section>
    <section v-else class="flex justify-around mt-24">
      <font-awesome-icon class="text-green-400" icon="spinner" size="6x" spin />
    </section>
  </div>
</template>
<script>
import axios from 'axios'
import H1 from '../components/ui/H1'
import H2 from '../components/ui/H2'
import Pie from '../components/chart/Pie'
import Bar from '../components/chart/Bar'
export default {
  components: { Bar, Pie, H2, H1 },
  data () {
    return {
      data: null
    }
  },
  async created () {
    const { data } = await axios.get('/.netlify/functions/stats')
    const weights = data[0].weight.map(({ _id, number }) => {
      if (_id >= 1000) {
        const idString = _id.toString()

        _id = `${idString[0]}kg${idString.slice(1)}`
      } else {
        _id = `${_id}g`
      }

      return {
        _id,
        number
      }
    })

    const dates = data[0].birthDate.map(({ _id, number }) => {
      const date = new Date(Date.parse(_id))

      return {
        _id: `${date.getUTCDate() > 9 ? date.getUTCDate() : `0${date.getUTCDate()}`}/${date.getUTCMonth() + 1 > 9 ? date.getUTCMonth() + 1 : `0${date.getUTCMonth() + 1}`}/${date.getUTCFullYear()}`,
        number
      }
    })

    const names = data[0].name.map(({ _id, number }) => {
      return {
        _id: _id.charAt(0).toUpperCase() + _id.slice(1),
        number
      }
    })

    data[0].weight = weights
    data[0].birthDate = dates
    data[0].name = names

    this.data = data[0]
  }
}
</script>
