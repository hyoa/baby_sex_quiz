<template>
  <div>
    <label class="block uppercase tracking-wide text-gray-800 text-xs font-bold mb-2" :for="name">
      {{ label }}
    </label>
    <input
      class="appearance-none block w-full bg-gray-200 text-gray-800 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray"
      :type="type"
      :id="name"
      :placeholder="placeholder"
      :value="value"
      @input="$emit('input', $event.target.value)"
    >
  </div>
</template>

<script>
export default {
  name: 'Input',
  props: ['name', 'placeholder', 'label', 'type', 'value']
}
</script>

<style scoped>

</style>
