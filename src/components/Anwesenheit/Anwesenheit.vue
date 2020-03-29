<template>
  <div style="width: 100%;">
    <v-row class="mx-1">
      <v-toolbar flat color="white">
        <v-row align="center">
          <v-btn icon @click="prevWeek">
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
          <v-btn @click="heute" text>Heute</v-btn>
          <v-btn icon @click="nextWeek">
            <v-icon>mdi-chevron-right</v-icon>
          </v-btn>
          <h1 class="ml-2">
            KW {{getWeekNumber()}}: {{ title }}
            <v-chip
              v-if="ifMonatBestätigt(start())"
              style="vertical-align: text-bottom;"
              class="ma-2 ml-1"
              small
              color="green"
              text-color="white"
            >Bestätigt</v-chip>
            {{ title2 }}
            <v-chip
              v-if="ifMonatBestätigt(end())"
              style="vertical-align: text-bottom;"
              class="ma-2 ml-1"
              small
              color="green"
              text-color="white"
            >Bestätigt</v-chip>
          </h1>
        </v-row>
      </v-toolbar>
    </v-row>
    <v-row>
      <v-col cols="12" sm="12" md="8" class="pr-0">
        <v-card outlined class="py-4 pr-0">
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
            gradient-direction="top"
            type="bar"
            :auto-line-width="false"
            :show-labels="true"
            :label-size="5"
          >
            <template v-slot:label="item">{{value[item.index]}} h</template>
          </v-sparkline>
        </v-card>
      </v-col>
      <v-col cols="12" sm="12" md="4" class="pl-0">
        <AbwesenheitCard
          text1="Aktuelle Woche"
          text2="Wochenstunden"
          text3="Anzahl an gearbeiteten Stunden in dieser Woche"
          :zahl1="summe(value)"
          :zahl2="getWochenstunden()"
          color1="#1feaea"
        ></AbwesenheitCard>
        <!-- <UberstundenCard
          text1="Gesamt"
          text2="Überstunden"
          text3="Anzahl an bestätigten Überstunden insgesamt"
          :value="getÜberstunden()"
        ></UberstundenCard>-->
      </v-col>
    </v-row>
  </div>
</template>

<script>
import AbwesenheitCard from "../Abwesenheit/AbwesenheitCard";
// import UberstundenCard from "./ÜberstundenCard";

export default {
  data: () => ({
    currentDate: new Date(),
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
    },
    monat: {
      type: Object,
      required: true
    }
  },
  components: {
    AbwesenheitCard
    // UberstundenCard
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
        if (curr.getDay() == 0) {
          first = curr.getDate() - 7 + 1;
        }
        var firstday = new Date(curr.setDate(first));
        let next = firstday.getDate() + i;
        var nextDay = new Date(firstday.setDate(next));

        array.push(nextDay.getDate());
      }
      return array;
    },
    value() {
      // Arbeit are all events of this week
      let Arbeit = this.events.filter(
        e => e.name === "Arbeit" && this.checkInside(e.start, e.end)
      );

      let hours = [];
      for (let i = 0; i < 7; i++) {
        // calculate date of Monday
        let curr = new Date(this.currentDate);
        let first = curr.getDate() - curr.getDay() + 1;
        if (curr.getDay() == 0) {
          first = curr.getDate() - 7 + 1;
        }
        let firstday = new Date(curr.setDate(first));
        let next = firstday.getDate() + i;
        let nextDay = new Date(firstday.setDate(next));
        let nextDate =
          nextDay.getFullYear() +
          "-" +
          String(Number(nextDay.getMonth()) + 1).padStart(2, "0") +
          "-" +
          String(nextDay.getDate()).padStart(2, "0");

        // console.log("nextdate", nextDate);

        //find all events in Arbeit of monday
        let Today = Arbeit.filter(e => e.start.split(" ")[0] == nextDate);

        // console.log("today", Today);

        let workingHours = 0;

        for (let index = 0; index < Today.length; index++) {
          let startTimeDecimal =
            Number(Today[index]["start"].split(" ")[1].split(":")[0]) +
            Number(Today[index]["start"].split(" ")[1].split(":")[1] / 60);
          let endTimeDecimal =
            Number(Today[index]["end"].split(" ")[1].split(":")[0]) +
            Number(Today[index]["end"].split(" ")[1].split(":")[1] / 60);
          if (workingHours == "") {
            workingHours = endTimeDecimal - startTimeDecimal;
          } else {
            workingHours = workingHours + (endTimeDecimal - startTimeDecimal);
          }
        }

        workingHours = parseFloat(workingHours.toFixed(2));

        hours.push(workingHours);
      }
      //   console.log(hours);

      //   console.log(Arbeit);
      return hours;
    }
  },
  methods: {
    ifMonatBestätigt(datum) {
      if (datum) {
        let key = "";
        const endMonth = this.end().month + 1;
        const startMonth = this.start().month + 1;
        // console.log(datum);
        // console.log(this.start());
        if (datum.day == this.start().day) {
          //   console.log("in der olga");
          const Year = String(this.start().year);
          const Month = String(this.start().month + 1).padStart(2, "0");
          key = Year + "-" + Month;
          //   console.log(key);
          if (this.monat[key] == true) {
            return true;
          } else {
            return false;
          }
        }
        if (datum.day == this.end().day && startMonth != endMonth) {
          const Year = String(this.end().year);
          const Month = String(this.end().month + 1).padStart(2, "0");
          key = Year + "-" + Month;
          if (this.monat[key] == true) {
            return true;
          } else {
            return false;
          }
        }
      }
    },
    getÜberstunden() {
      let Überstunden = this.Arbeitszeit.find(e => e.name === "Überstunden")
        .value;
      return Überstunden;
    },
    summe(arr) {
      return arr.reduce(function(a, b) {
        return a + b;
      }, 0);
    },
    getWochenstunden() {
      let Wochenstunden = this.Arbeitszeit.find(e => e.name === "Wochenstunden")
        .value;
      return Wochenstunden;
    },
    checkInside(startEvent, endEvent) {
      let curr = new Date(this.currentDate);
      let first = curr.getDate() - curr.getDay() + 1;
      if (curr.getDay() == 0) {
        first = curr.getDate() - 7 + 1;
      }
      let firstDate = new Date(curr.setDate(first));
      let startRef = new Date(
        firstDate.getFullYear(),
        firstDate.getMonth(),
        firstDate.getDate()
      );

      let last = first + 6;
      let lastRef = new Date(curr.setDate(last));
      let endRef = new Date(
        lastRef.getFullYear(),
        lastRef.getMonth(),
        lastRef.getDate()
      );

      startRef = Date.parse(startRef);
      endRef = Date.parse(endRef);

      let startYear = startEvent.split(" ")[0].split("-")[0];
      let startMonth = startEvent.split(" ")[0].split("-")[1];
      let startDay = startEvent.split(" ")[0].split("-")[2];
      let startDate = new Date(
        Number(startYear),
        Number(startMonth) - 1,
        Number(startDay)
      );
      startDate = Date.parse(startDate);

      let endYear = endEvent.split(" ")[0].split("-")[0];
      let endMonth = endEvent.split(" ")[0].split("-")[1];
      let endDay = endEvent.split(" ")[0].split("-")[2];
      let endDate = new Date(
        Number(endYear),
        Number(endMonth) - 1,
        Number(endDay)
      );
      endDate = Date.parse(endDate);

      //   console.log("ref", startRef, endRef);
      //   console.log("event", startDate, endDate);

      if (startDate >= startRef && startDate <= endRef) {
        return true;
      }
      if (endDate >= startRef && endDate <= endRef) {
        return true;
      }
      return false;
    },
    start() {
      var curr = new Date(this.currentDate);
      var first = curr.getDate() - curr.getDay() + 1;
      if (curr.getDay() == 0) {
        first = curr.getDate() - 7 + 1;
      }
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
      if (curr.getDay() == 0) {
        first = curr.getDate() - 7 + 1;
      }
      var last = first + 6;
      var lastday = new Date(curr.setDate(last));

      let end = {};
      end["year"] = lastday.getFullYear();
      end["month"] = lastday.getMonth();
      end["day"] = lastday.getDate();
      return end;
    },
    getWeekNumber() {
      let now = this.currentDate;
      let onejan = new Date(now.getFullYear(), 0, 1);
      return (
        Math.ceil(((now - onejan) / 86400000 + onejan.getDay() + 1) / 7) - 1
      );
    },
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
