<template>
  <v-card class="ml-3 mb-3" max-width="320" outlined>
    <v-list-item three-line>
      <v-list-item-content>
        <div class="overline mb-4">{{text1}}</div>
        <v-list-item-title class="headline mb-1">{{text2}}</v-list-item-title>
        <v-list-item-subtitle>{{text3}}</v-list-item-subtitle>
      </v-list-item-content>
      <p class="px-5 mx-4" style="font-size: xx-large;">{{value}}</p>
    </v-list-item>
  </v-card>
</template>

<script>
export default {
  props: {
    text1: String,
    text2: String,
    text3: String,
    value: Number
  }
};
</script>

