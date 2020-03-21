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
      </v-row>
    </v-toolbar>

    <v-row>
      <AbwesenheitCard
        text1="Urlaubstage"
        text2="Übrig"
        text3="Anzahl an übrigen Urlaubstagen"
        :zahl1="getÜbrig()"
        :zahl2="getUrlaubstageGesamt()"
        color1="rgb(251, 208, 0)"
      ></AbwesenheitCard>
    </v-row>
    <v-row>
      <AbwesenheitCard
        text1="Urlaubstage"
        text2="Angefragt"
        text3="Anzahl an angefragten Urlaubstagen"
        :zahl1="getEventCounter('Urlaub', 'angefragt')"
        :zahl2="getUrlaubstageGesamt()"
        color1="orange"
      ></AbwesenheitCard>
      <AbwesenheitCard
        text1="Urlaubstage"
        text2="Bestätigt"
        text3="Anzahl an bestätigten Urlaubstagen"
        :zahl1="getEventCounter('Urlaub', 'bestätigt')"
        :zahl2="getUrlaubstageGesamt()"
        color1="orange"
      ></AbwesenheitCard>
      <AbwesenheitCard
        text1="Urlaubstage"
        text2="Storniert"
        text3="Anzahl an stornierten Urlaubstagen"
        :zahl1="getEventCounter('Urlaub', 'storniert')"
        :zahl2="getUrlaubstageGesamt()"
        color1="orange"
      ></AbwesenheitCard>
    </v-row>
    <v-row>
      <AbwesenheitCard
        text1="Krankheit"
        text2="Angefragt"
        text3="Anzahl an angefragten Krankheitstagen"
        :zahl1="getEventCounter('Krankheit', 'angefragt')"
        :zahl2="getKrankheitTotal()"
        color1="rgb(164, 61, 255)"
      ></AbwesenheitCard>
      <AbwesenheitCard
        text1="Krankheit"
        text2="Bestätigt"
        text3="Anzahl an bestätigten Krankheitstagen"
        :zahl1="getEventCounter('Krankheit', 'bestätigt')"
        :zahl2="getKrankheitTotal()"
        color1="rgb(164, 61, 255)"
      ></AbwesenheitCard>
      <AbwesenheitCard
        text1="Krankheit"
        text2="Storniert"
        text3="Anzahl an stornierten Krankheitstagen"
        :zahl1="getEventCounter('Krankheit', 'storniert')"
        :zahl2="getKrankheitTotal()"
        color1="rgb(164, 61, 255)"
      ></AbwesenheitCard>
    </v-row>
    <v-row>
      <AbwesenheitCard
        text1="Feiertage"
        text2="Angefragt"
        text3="Anzahl an angefragten Feiertagen"
        :zahl1="getEventCounter('Feiertag', 'angefragt')"
        :zahl2="getFeiertageTotal()"
        color1="rgb(82, 255, 61)"
      ></AbwesenheitCard>
      <AbwesenheitCard
        text1="Feiertage"
        text2="Bestätigt"
        text3="Anzahl an bestätigten Feiertagen"
        :zahl1="getEventCounter('Feiertag', 'bestätigt')"
        :zahl2="getFeiertageTotal()"
        color1="rgb(82, 255, 61)"
      ></AbwesenheitCard>
      <AbwesenheitCard
        text1="Feiertage"
        text2="Storniert"
        text3="Anzahl an stornierten Feiertagen"
        :zahl1="getEventCounter('Feiertag', 'storniert')"
        :zahl2="getFeiertageTotal()"
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
        return Math.round(
          totalUrlaubMonth +
            totalUrlaubDaysStartingMonth +
            totalUrlaubDaysEndingMonth
        );
      }
    },
    checkDate(start, end) {
      let refYear = this.currentDate.getFullYear();
      let startYear = start.split("-")[0];
      let endYear = end.split("-")[0];

      if (startYear != refYear && endYear != refYear) {
        return false;
      } else {
        return true;
      }
    },
    getEventCounter(type, status) {
      let filtered_events = this.events.filter(
        e =>
          e.name === type &&
          e.status === status &&
          this.checkDate(e.start, e.end)
      );

      let refYear = this.currentDate.getFullYear();
      
      // Calculate length of each event:
      let counter = 0;
      for (let event of filtered_events) {
        let startYear = event.start.split("-")[0];
        let endYear = event.end.split("-")[0];

        let date1 = new Date();
        if (startYear != refYear) {
          date1 = new Date(refYear, 0, 1);
        } else {
          date1 = new Date(
            event.start.split("-")[0],
            event.start.split("-")[1] - 1,
            event.start.split("-")[2]
          );
        }

        let date2 = new Date();
        if (endYear != refYear) {
          date2 = new Date(refYear, 12, 0);
        } else {
          date2 = new Date(
            event.end.split("-")[0],
            event.end.split("-")[1] - 1,
            event.end.split("-")[2]
          );
        }
        let diffTime = Math.abs(date2 - date1);
        let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
        counter += diffDays;
      }
      return counter;
    },
    getÜbrig() {
      return (
        this.getUrlaubstageGesamt() -
        this.getEventCounter("Urlaub", "angefragt") -
        this.getEventCounter("Urlaub", "bestätigt") -
        this.getEventCounter("Urlaub", "storniert")
      );
    },
    getKrankheitTotal() {
      return (
        this.getEventCounter("Krankheit", "angefragt") +
        this.getEventCounter("Krankheit", "bestätigt") +
        this.getEventCounter("Krankheit", "storniert")
      );
    },
    getFeiertageTotal() {
      return (
        this.getEventCounter("Feiertag", "angefragt") +
        this.getEventCounter("Feiertag", "bestätigt") +
        this.getEventCounter("Feiertag", "storniert")
      );
    }
  }
};
</script>


