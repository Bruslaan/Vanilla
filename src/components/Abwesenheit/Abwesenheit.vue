<template>
  <div>
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

        <v-btn @click="getEventCounts">LALLALALALAALALALAL</v-btn>
      </v-row>
    </v-toolbar>

    <v-row>
      <AbwesenheitCard
        text1="Urlaubstage"
        text2="Übrig"
        text3="Anzahl an übrigen Urlaubstagen"
        zahl1="20"
        :zahl2="getUrlaubstageGesamt()"
        color1="orange"
      ></AbwesenheitCard>
      <AbwesenheitCard
        text1="Urlaubstage"
        text2="Angefragt"
        text3="Anzahl an angefragten Urlaubstagen"
        zahl1="5"
        :zahl2="getUrlaubstageGesamt()"
        color1="orange"
      ></AbwesenheitCard>
      <AbwesenheitCard
        text1="Urlaubstage"
        text2="Bestätigt"
        text3="Anzahl an bestätigten Urlaubstagen"
        zahl1="5"
        :zahl2="getUrlaubstageGesamt()"
        color1="orange"
      ></AbwesenheitCard>
    </v-row>
    <v-row>
      <AbwesenheitCard
        text1="Krankheit"
        text2="Angefragt"
        text3="Anzahl an angefragten Krankheitstagen"
        zahl1="5"
        zahl2="30"
        color1="rgb(164, 61, 255)"
      ></AbwesenheitCard>
      <AbwesenheitCard
        text1="Krankheit"
        text2="Bestätigt"
        text3="Anzahl an bestätigten Krankheitstagen"
        zahl1="5"
        zahl2="30"
        color1="rgb(164, 61, 255)"
      ></AbwesenheitCard>
    </v-row>
    <v-row>
      <AbwesenheitCard
        text1="Feiertage"
        text2="Angefragt"
        text3="Anzahl an angefragten Feiertagen"
        zahl1="5"
        zahl2="30"
        color1="rgb(82, 255, 61)"
      ></AbwesenheitCard>
      <AbwesenheitCard
        text1="Feiertage"
        text2="Bestätigt"
        text3="Anzahl an bestätigten Feiertagen"
        zahl1="5"
        zahl2="30"
        color1="rgb(82, 255, 61)"
      ></AbwesenheitCard>
    </v-row>
  </div>
</template>

<script>
import AbwesenheitCard from "./AbwesenheitCard";
export default {
  data: () => ({
    currentDate: new Date()
  }),
  props: {
    events: {
      type: Array,
      required: true
    },
    Urlaubsanspruch: {
      type: Array,
      required: true
    },
    Vertrag: {
      type: Array,
      required: true
    }
  },
  components: {
    AbwesenheitCard
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
    },
    getUrlaubstageGesamt() {
      let UrlaubProMonat = this.Urlaubsanspruch.find(
        e => e.name === "Urlaubstage pro Monat"
      ).value;

      let startDate = this.Vertrag.find(e => e.name === "Start").value;
      let endDate = this.Vertrag.find(e => e.name === "Ende").value;
      let laufzeit = this.Vertrag.find(e => e.name === "Laufzeit").value;

      let startYear = startDate.split("-")[0];
      let startMonth = Number(startDate.split("-")[1]);
      let startDay = Number(startDate.split("-")[2]);

      let endYear = endDate.split("-")[0];
      let endMonth = Number(endDate.split("-")[1]);
      let endDay = Number(endDate.split("-")[2]);

      let refYear = this.currentDate.getFullYear();

      if (
        (laufzeit == "unbefristet" && startYear != refYear) ||
        (laufzeit == "befristet" && startYear != refYear && endYear != refYear)
      ) {
        console.log(Math.round(UrlaubProMonat * 12));
        return Math.round(UrlaubProMonat * 12);
      } else if (
        (laufzeit == "unbefristet" && startYear == refYear) ||
        (laufzeit == "befristet" && startYear == refYear && endYear != refYear)
      ) {
        let differenceMonth = 12 - startMonth;
        let totalUrlaubMonth = differenceMonth * UrlaubProMonat;

        let refTotalMonthDays = new Date(
          startYear,
          startMonth - 1,
          0
        ).getDate();
        let totalUrlaubDays =
          ((refTotalMonthDays - startDay) / refTotalMonthDays) * UrlaubProMonat;
        console.log(Math.round(totalUrlaubMonth + totalUrlaubDays));
        return Math.round(totalUrlaubMonth + totalUrlaubDays);
      } else if (
        laufzeit == "befristet" &&
        startYear != refYear &&
        endYear == refYear
      ) {
        let differenceMonth = endMonth - 1;
        let totalUrlaubMonth = differenceMonth * UrlaubProMonat;

        let refTotalMonthDays = new Date(endYear, endMonth - 1, 0).getDate();
        let totalUrlaubDays = (endDay / refTotalMonthDays) * UrlaubProMonat;
        console.log(Math.round(totalUrlaubMonth + totalUrlaubDays));
        return Math.round(totalUrlaubMonth + totalUrlaubDays);
      } else if (
        laufzeit == "befristet" &&
        startYear == refYear &&
        endYear == refYear
      ) {
        let differenceMonth = endMonth - 1 - startMonth;
        let totalUrlaubMonth = differenceMonth * UrlaubProMonat;

        let refTotalMonthDaysStartingMonth = new Date(
          startYear,
          startMonth - 1,
          0
        ).getDate();
        let refTotalMonthDaysEndingMonth = new Date(
          endYear,
          endMonth - 1,
          0
        ).getDate();
        let totalUrlaubDaysStartingMonth =
          ((refTotalMonthDaysStartingMonth - startDay) /
            refTotalMonthDaysStartingMonth) *
          UrlaubProMonat;
        let totalUrlaubDaysEndingMonth =
          (endDay / refTotalMonthDaysEndingMonth) *
          refTotalMonthDaysEndingMonth;
        console.log(
          Math.round(
            totalUrlaubMonth +
              totalUrlaubDaysStartingMonth +
              totalUrlaubDaysEndingMonth
          )
        );
        return Math.round(
          totalUrlaubMonth +
            totalUrlaubDaysStartingMonth +
            totalUrlaubDaysEndingMonth
        );
      }
    },
    getEventCounts() {
      let Urlaub_events = this.events.filter(
        e => e.name === "Urlaub" && e.status === "angefragt"
      );

      console.log(Urlaub_events)
    }
  }
};
</script>


