<template>
  <div class="w-full px-12 py-5 md:w-9/12 mx-auto">
    <H1>Les résultats du sondage</H1>
    <section v-if="data">
      <H2>Le sexe</H2>
      <Pie v-if="data.sex" :stats="data.sex" />
      <H2>Le prénom</H2>
      <Bar v-if="data.name" :stats="data.name"/>
      <H2>Le poids</H2>
      <Bar v-if="data.weight" :stats="data.weight"/>
      <H2>La taille</H2>
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
    this.data = data[0]
  }
}
</script>
