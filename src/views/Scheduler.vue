<template>
  <div>
    <Scheduler :data="Mitarbeiter"/>
    <!-- <v-btn text @click="addElement">Test</v-btn> -->
  </div>
</template>

<script >
import Scheduler from "../components/Scheduler/Scheduler";

export default {
  computed: {},
  components: { Scheduler },
  methods: {
    addElement() {
      this.Mitarbeiter[0].events.push({
        start: "Thu Feb 4 2020",
        end: "Thu Feb 13 2020"
      });
    }
  },
  data() {
    return {
      Mitarbeiter: [
        {
          name: "Test Peter Hans Jürgen",
          monat: "02-2020",
          monatBestätigt: true,
          events: [
            // { start: "Thu Feb 12 2020", end: "Thu Feb 16 2020" },
            {
              name: "Urlaub",
              start: "2020-02-15",
              end: "2020-02-16",
              color: "#FFB63D",
              type: "Abwesenheit",
              status: "storniert",
              abwesenheitsGrund: "Urlaub"
            },
            {
              name: "Urlaub",
              start: "2020-02-17",
              end: "2020-02-18",
              color: "#C5C5C5",
              type: "Abwesenheit",
              status: "angefragt",
              abwesenheitsGrund: "Urlaub"
            },
            {
              name: "Urlaub",
              start: "2020-02-19",
              end: "2020-02-19",
              color: "#FFB63D",
              type: "Abwesenheit",
              status: "bestätigt",
              abwesenheitsGrund: "Urlaub"
            },
            {
              name: "Arbeit",
              start: "2020-02-20 06:00",
              end: "2020-02-20 12:00",
              color: "#C5C5C5",
              type: "Anwesenheit",
              status: "angefragt",
              abwesenheitsGrund: "Arbeit"
            },
            {
              name: "Arbeit",
              start: "2020-02-21 02:00",
              end: "2020-02-21 11:00",
              color: "#C5C5C5",
              type: "Anwesenheit",
              status: "angefragt",
              abwesenheitsGrund: "Arbeit"
            },
            {
              name: "Arbeit",
              start: "2020-02-21 12:00",
              end: "2020-02-21 23:20",
              color: "#C5C5C5",
              type: "Anwesenheit",
              status: "angefragt",
              abwesenheitsGrund: "Arbeit"
            },
            {
              name: "Krankheit",
              start: "2020-02-22",
              end: "2020-02-22",
              color: "#C5C5C5",
              type: "Abwesenheit",
              status: "angefragt",
              abwesenheitsGrund: "Krankheit"
            },
            {
              name: "Feiertag",
              start: "2020-02-23",
              end: "2020-02-23",
              color: "#C5C5C5",
              type: "Abwesenheit",
              status: "angefragt",
              abwesenheitsGrund: "Feiertag"
            }
          ]
        },
        {
          name: "Franzi von Olga",
          monatBestätigt: true,
          events: [
            {
              name: "Urlaub",
              start: "2020-02-03",
              end: "2020-02-10",
              color: "#C5C5C5",
              type: "Abwesenheit",
              status: "angefragt",
              abwesenheitsGrund: "Urlaub"
            },
            {
              name: "Arbeit",
              start: "2020-02-20 06:00",
              end: "2020-02-20 12:00",
              color: "#C5C5C5",
              type: "Anwesenheit",
              status: "angefragt",
              abwesenheitsGrund: "Arbeit"
            }
          ]
        },
        {
          name: "Brus von Olga",
          monatBestätigt: true,
          events: [
            {
              name: "Urlaub",
              start: "2020-02-07",
              end: "2020-02-10",
              color: "#C5C5C5",
              type: "Abwesenheit",
              status: "angefragt",
              abwesenheitsGrund: "Urlaub"
            },
            {
              name: "Arbeit",
              start: "2020-02-20 06:00",
              end: "2020-02-20 12:00",
              color: "#C5C5C5",
              type: "Anwesenheit",
              status: "angefragt",
              abwesenheitsGrund: "Arbeit"
            }
          ]
        },
        {
          name: "Jansen von Olga",
          monatBestätigt: true,
          events: [
            {
              name: "Urlaub",
              start: "2020-02-05",
              end: "2020-02-10",
              color: "#C5C5C5",
              type: "Abwesenheit",
              status: "angefragt",
              abwesenheitsGrund: "Urlaub"
            },
            {
              name: "Arbeit",
              start: "2020-02-20 06:00",
              end: "2020-02-20 12:00",
              color: "#C5C5C5",
              type: "Anwesenheit",
              status: "angefragt",
              abwesenheitsGrund: "Arbeit"
            }
          ]
        },
        {
          name: "Jansen von Clash",
          monatBestätigt: true,
          events: [
            {
              name: "Urlaub",
              start: "2020-02-05",
              end: "2020-02-10",
              color: "#C5C5C5",
              type: "Abwesenheit",
              status: "angefragt",
              abwesenheitsGrund: "Urlaub"
            },
            {
              name: "Arbeit",
              start: "2020-02-20 06:00",
              end: "2020-02-20 12:00",
              color: "#C5C5C5",
              type: "Anwesenheit",
              status: "angefragt",
              abwesenheitsGrund: "Arbeit"
            }
          ]
        },
        {
          name: "Jansen von Royale",
          monatBestätigt: true,
          events: [
            {
              name: "Urlaub",
              start: "2020-02-05",
              end: "2020-02-10",
              color: "#C5C5C5",
              type: "Abwesenheit",
              status: "angefragt",
              abwesenheitsGrund: "Urlaub"
            },
            {
              name: "Arbeit",
              start: "2020-02-20 06:00",
              end: "2020-02-20 12:00",
              color: "#C5C5C5",
              type: "Anwesenheit",
              status: "angefragt",
              abwesenheitsGrund: "Arbeit"
            }
          ]
        }
      ]
    };
  }
};
</script>



