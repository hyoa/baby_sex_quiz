<template>
  <div class="w-full px-12 py-5 md:w-9/12 mx-auto">
    <H1>Fille ou garçon ?</H1>
    <form @submit.stop="onSubmit">
      <div class="flex justify-around">
        <div
          :class="{ 'opacity-50' : sex === 'f', 'shadow-lg' : sex === 'm' }"
          class="border rounded-full bg-blue-500 w-20 h-20 flex justify-center items-center text-white cursor-pointer hover:bg-blue-700 hover:shadow-md"
          @click="sex = 'm'"
        >
          <font-awesome-icon class="text-3xl" icon="mars" />
        </div>
        <div
          :class="{ 'opacity-50' : sex === 'm', 'shadow-lg' : sex === 'f' }"
          class="border rounded-full w-20 h-20 flex justify-center items-center bg-pink-500 text-white cursor-pointer hover:bg-pink-700 hover:shadow-md"
          @click="sex = 'f'"
        >
          <font-awesome-icon class="text-3xl" icon="venus" />
        </div>
      </div>
      <div class="mt-4">
        <Input name="name" type="text" label="Prénom" v-model="name"/>
      </div>
      <div class="mt-4">
        <label for="weight" class="block uppercase tracking-wide text-gray-800 text-xs font-bold mb-2">Poids</label>
        <div class="flex">
          <div class="flex items-center w-1/3">
            <input v-model="weight.kg" placeholder="3" id="weight" class="mr-2 appearance-none block w-full bg-gray-200 text-gray-800 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray" type="number"><span>kg</span>
          </div>
          <div class="flex items-center w-1/3 ml-3">
            <input v-model="weight.g" placeholder="245" class="mr-2 appearance-none block w-full bg-gray-200 text-gray-800 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray" type="number"><span>g</span>
          </div>
        </div>
      </div>
      <div class="mt-4">
        <Input name="length" type="number" label="Taille (en cm)" v-model="length" placeholder="54"/>
      </div>
      <div class="mt-4">
        <Input name="birthdate" type="date" label="Jour de la naissance" v-model="birthDate" />
      </div>
      <div class="mt-4">
        <Input name="email" type="email" label="Email" v-model="email"/>
      </div>
      <div class="mt-4 text-center">
        <button class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" type="submit">Enregistrer</button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios'
import Input from '../components/form/Input'
import H1 from '../components/ui/H1'

export default {
  name: 'home',
  components: { H1, Input },
  data () {
    return {
      name: '',
      weight: {
        kg: '',
        g: ''
      },
      length: '',
      email: '',
      birthDate: null,
      sex: null
    }
  },
  methods: {
    async onSubmit () {
      const kg = !isNaN(parseInt(this.weight.kg)) ? parseInt(this.weight.kg) * 1000 : 0
      const g = !isNaN(parseInt(this.weight.g)) ? parseInt(this.weight.g) : 0
      const weight = kg + g

      const answer = {
        name: this.name,
        weight,
        length: parseInt(this.length),
        email: this.email,
        birthDate: this.birthDate,
        sex: this.sex
      }

      const { status } = await axios.post('/.netlify/functions/submit', answer)

      if (status === 200) {
        this.$router.push('/resultat')
      }
    }
  }
}
</script>
