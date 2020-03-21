<template>
  <v-card class="ml-3 mb-3" max-width="320" outlined>
    <v-list-item three-line>
      <v-list-item-content>
        <div class="overline mb-4">{{text1}}</div>
        <v-list-item-title class="headline mb-1">{{text2}}</v-list-item-title>
        <v-list-item-subtitle>{{text3}}</v-list-item-subtitle>
      </v-list-item-content>

      <v-progress-circular
        :rotate="360"
        :size="100"
        :width="15"
        :value="zahl1inProzent"
        :color="color1"
      >{{ zahl1 }} / {{zahl2}}</v-progress-circular>
    </v-list-item>
  </v-card>
</template>

<script>
export default {
  props: {
    text1: String,
    text2: String,
    text3: String,
    zahl1: Number,
    zahl2: Number,
    color1: String
  },
  computed: {
    zahl1inProzent() {
      if (this.zahl2 != 0) {
        return (this.zahl1 / this.zahl2) * 100;
      } else {
        return 0
      }
    }
  }
};
</script>

