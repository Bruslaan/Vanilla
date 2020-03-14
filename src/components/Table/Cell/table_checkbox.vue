<template>
  <td>
    <!-- <v-checkbox class="ma-0" v-model="mapping[name]" color="success" disabled hide-details></v-checkbox> -->
    <input type="checkbox" v-model="mapping[name]" disabled id="vehicle1" name="vehicle1" value="Bike">
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

<style scoped>
td {
  text-align: center;
}
</style>

