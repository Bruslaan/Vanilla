<template>
  <div style="width: 100%;">
    <v-toolbar flat color="white">
      <v-row align="center">
        <v-btn icon @click="prevYear">
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
        <v-btn @click="heute" text>Heute</v-btn>
        <v-btn icon @click="nextYear">
          <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
        <h1 class="ml-2">{{ title }}</h1>
      </v-row>
    </v-toolbar>

    <v-sparkline
      :value="value"
      :gradient="['#f72047', '#ffd200', '#1feaea']"
      :smooth="0"
      :line-width="10"
      :stroke-linecap="round"
      :gradient-direction="top"
      type="bar"
      :auto-line-width="false"
      auto-draw
      :show-labels="true"
      :label-size="7"
      :labels="mylabel"
    >
      <template v-slot:label="item">
        {{value[item.index]}}
        {{ item.value }}
      </template>
    </v-sparkline>
  </div>
</template>

<script>
export default {
  data: () => ({
    currentDate: new Date(),
    value: [8, 8, 5, 5, 0, 0, 0],
    mylabel: ["MO", "DI", "MI", "DO", "FR", "SA", "SO"]
  }),
  props: {
    events: {
      type: Array,
      required: true
    },
    Arbeitszeit: {
      type: Array,
      required: true
    }
  },
  computed: {
    title() {
      return this.currentDate.getFullYear();
    }
  },
  methods: {
    nextYear() {
      let oldDate = this.currentDate;
      this.currentDate = new Date(
        oldDate.getFullYear() + 1,
        oldDate.getMonth() + 1,
        0
      );
    },
    heute() {
      this.currentDate = new Date();
    },
    prevYear() {
      let oldDate = this.currentDate;
      this.currentDate = new Date(
        oldDate.getFullYear() - 1,
        oldDate.getMonth() + 1,
        0
      );
    }
  }
};
</script>
