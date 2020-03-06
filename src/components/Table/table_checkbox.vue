<template>
  <td>
    <v-checkbox class="ma-0" v-model="mapping[name]" color="success" disabled hide-details></v-checkbox>
  </td>
</template>

<script>
export default {
  props: ["name"],
  data () {
      return {
          mapping: {
              "true": true,
              "false": false
          }
      }
  }
};
</script>
