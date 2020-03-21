<template>
  <div>
    <span>
      <v-row class="my-0">
        <v-col>Urlaub Bestätigt: {{getEventCounter("Urlaub", "bestätigt")}}</v-col>
      </v-row>
            <v-row class="my-0">
        <v-col>Krankheit Bestätigt: {{getEventCounter("Krankheit", "bestätigt")}}</v-col>
      </v-row>
            <v-row class="my-0">
        <v-col>Feiertag Bestätigt: {{getEventCounter("Feiertag", "bestätigt")}}</v-col>
      </v-row>
    </span>
  </div>
</template>

<script>
export default {
  props: {
    events: {
      type: Array,
      required: true
    },
    currentDate: {
      type: Date,
      required: true
    }
  },
  methods: {
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
    getUrlaubTotal() {
      return (
        this.getEventCounter("Urlaub", "angefragt") +
        this.getEventCounter("Urlaub", "bestätigt") +
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
    }
  }
};
</script>

