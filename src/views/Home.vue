<template>
  <div class="w-full px-12 py-5 md:w-9/12 mx-auto">
    <H1>Fille ou garçon ?</H1>
    <form @submit.stop.prevent="onSubmit">
      <div>
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
        <p v-if="errors.sex" class="text-red-500 text-xs italic text-center mt-4">{{ errors.sex }}</p>
      </div>
      <div class="mt-4">
        <Input name="name" type="text" label="Prénom" v-model="name" :error="errors.name"/>
      </div>
      <div class="mt-4">
        <label for="weight" class="block uppercase tracking-wide text-gray-800 text-xs font-bold mb-2">Poids</label>
        <div class="flex">
          <div class="flex items-center w-1/3">
            <input
              v-model="weight.kg" placeholder="3"
              id="weight"
              class="mr-2 appearance-none block w-full bg-gray-200 text-gray-800 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray" type="number"
              :class="{ 'border-red-500' : errors.weight }"
            >
            <span>kg</span>
          </div>
          <div class="flex items-center w-1/3 ml-3">
            <input
              v-model="weight.g"
              placeholder="245"
              class="mr-2 appearance-none block w-full bg-gray-200 text-gray-800 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray"
              type="number"
              :class="{ 'border-red-500' : errors.weight }"
            >
            <span>g</span>
          </div>
        </div>
        <p v-if="errors.weight" class="text-red-500 text-xs italic">{{ errors.weight }}</p>
      </div>
      <div class="mt-4">
        <Input name="length" type="number" label="Taille (en cm)" v-model="length" placeholder="54" :error="errors.length"/>
      </div>
      <div class="mt-4">
        <Input name="birthdate" type="date" label="Jour de la naissance" v-model="birthDate" :error="errors.birthDate" />
      </div>
      <div class="mt-4">
        <Input name="email" type="email" label="Email" v-model="email" :error="errors.email"/>
      </div>
      <div class="mt-4 text-center">
        <button class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" type="submit">Enregistrer</button>
      </div>
    </form>
    <div class="text-center mt-6">
      <router-link class="text-blue-400 underline hover:no-underline hover:text-blue-600" :to="{ name: 'result' }">Voir les résultats</router-link>
    </div>
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
      sex: null,
      errors: {
        sex: null,
        weight: null,
        length: null,
        name: null,
        email: null,
        birthDate: null
      }
    }
  },
  watch: {
    name: function () {
      if (this.errors.name) {
        this.errors.name = null
      }
    },
    weight: {
      handler: function () {
        this.errors.weight = null
      },
      deep: true
    },
    length: function () {
      if (this.errors.length) {
        this.errors.length = null
      }
    },
    email: function () {
      if (this.errors.email) {
        this.errors.email = null
      }
    },
    birthDate: function () {
      if (this.errors.birthDate) {
        this.errors.birthDate = null
      }
    },
    sex: function () {
      if (this.errors.sex) {
        this.errors.sex = null
      }
    }
  },
  methods: {
    async onSubmit () {
      const kg = !isNaN(parseInt(this.weight.kg)) ? parseInt(this.weight.kg) * 1000 : 0
      const g = !isNaN(parseInt(this.weight.g)) ? parseInt(this.weight.g) : 0
      const weight = kg + g
      let hasError = false

      if (weight < 1000 || weight > 6000) {
        this.errors.weight = 'Un bébé a la naissance fait généralement entre 1kg et 6kg.'
        hasError = true
      }

      if (isNaN(parseInt(this.length)) || parseInt(this.length) < 10 || parseInt(this.length) >= 100) {
        this.errors.length = 'Un bébé à la naissance fait généralement plus de 10cm et moins de 1 mètre.'
        hasError = true
      }

      if (!this.email || this.email.trim() === '') {
        this.errors.email = 'L \'email doit être renseigné.'
        hasError = true
      }

      if (!this.name || this.name.trim() === '') {
        this.errors.name = 'Le prénom doit être renseigné.'
        hasError = true
      }

      if (!this.sex || this.sex.trim() === '') {
        this.errors.sex = 'Il faut choisir un sexe !'
        hasError = true
      }

      const birthDateTime = Date.parse(this.birthDate)
      if (isNaN(birthDateTime) || birthDateTime > 1570665600000 || birthDateTime < 1562716800000) {
        this.errors.birthDate = 'Le bébé ne peut techniquement pas naître avant Juillet 2019 ou après Octobre 2019.'
        hasError = true
      }

      if (hasError) {
        return
      }

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
        localStorage.setItem('sex_quiz_answered', '1')
        this.$router.push('/resultat')
      }
    }
  }
}
</script>
