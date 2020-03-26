<template>
  <div style="width: 100%;">
    <v-toolbar flat color="white">
      <v-row align="center">
        <v-btn icon @click="prevWeek">
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
        <v-btn @click="heute" text>Heute</v-btn>
        <v-btn icon @click="nextWeek">
          <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
        <h1 class="ml-2">{{ title }} {{ title2 }}</h1>
      </v-row>
    </v-toolbar>

    <v-row class="px-3" style="text-align: center;">
      <v-col class="py-0" style="font-size: x-small;">MO</v-col>
      <v-col class="py-0" style="font-size: x-small;">DI</v-col>
      <v-col class="py-0" style="font-size: x-small;">MI</v-col>
      <v-col class="py-0" style="font-size: x-small;">DO</v-col>
      <v-col class="py-0" style="font-size: x-small;">FR</v-col>
      <v-col class="py-0" style="font-size: x-small;">SA</v-col>
      <v-col class="py-0" style="font-size: x-small;">SO</v-col>
    </v-row>
    <v-row class="px-3" style="text-align: center;">
      <v-col v-for="day of weekInfo" :key="day">{{day}}</v-col>
    </v-row>
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
      :label-size="5"
    >
      <template v-slot:label="item">{{value[item.index]}}</template>
    </v-sparkline>
  </div>
</template>

<script>
export default {
  data: () => ({
    currentDate: new Date(),
    value: [8, 8, 5, 5, 0, 0, 0],
    monate: [
      "Januar",
      "Februar",
      "März",
      "April",
      "Mai",
      "Juni",
      "Juli",
      "August",
      "September",
      "Oktober",
      "November",
      "Dezember"
    ]
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
      let start = this.start();
      let end = this.end();
      if (!start || !end) {
        return "";
      }

      const startMonth = start.month;
      const startYear = start.year;

      return `${this.monate[startMonth]} ${startYear}`;
    },
    title2() {
      let start = this.start();
      let end = this.end();
      if (!start || !end) {
        return "";
      }
      const endMonth = end.month;
      const endYear = end.year;
      const startMonth = start.month;

      if (startMonth != endMonth) {
        return `- ${this.monate[endMonth]} ${endYear}`;
      }

      return "";
    },
    weekInfo() {
      let array = [];
      for (let i = 0; i < 7; i++) {
        var curr = new Date(this.currentDate);
        var first = curr.getDate() - curr.getDay() + 1;
        var firstday = new Date(curr.setDate(first));
        let next = firstday.getDate() + i;
        var nextDay = new Date(firstday.setDate(next));

        array.push(nextDay.getDate());
      }
      console.log(array);
      return array;
    }
  },
  methods: {
    start() {
      var curr = new Date(this.currentDate);
      var first = curr.getDate() - curr.getDay() + 1;
      var firstday = new Date(curr.setDate(first));

      let start = {};
      start["year"] = firstday.getFullYear();
      start["month"] = firstday.getMonth();
      start["day"] = firstday.getDate();
      return start;
    },
    end() {
      var curr = new Date(this.currentDate);
      var first = curr.getDate() - curr.getDay() + 1;
      var last = first + 6;
      var lastday = new Date(curr.setDate(last));

      let end = {};
      end["year"] = lastday.getFullYear();
      end["month"] = lastday.getMonth();
      end["day"] = lastday.getDate();
      return end;
    },
    // getWeekNumber() {
    //   let now = this.currentDate;
    //   let onejan = new Date(now.getFullYear(), 0, 1);
    //   return Math.ceil(((now - onejan) / 86400000 + onejan.getDay() + 1) / 7)
    // },
    nextWeek() {
      var curr = new Date(this.currentDate);
      let next = curr.getDate() + 7;
      this.currentDate = new Date(curr.setDate(next));
    },
    heute() {
      this.currentDate = new Date();
    },
    prevWeek() {
      var curr = new Date(this.currentDate);
      let prev = curr.getDate() - 7;
      this.currentDate = new Date(curr.setDate(prev));
    }
  }
};
</script>
