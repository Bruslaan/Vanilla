<template>
  <div>
    <Scheduler :data="Mitarbeiter"/>
    <v-btn text @click="addElement">Test</v-btn>
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
          events: [
            // { start: "Thu Feb 12 2020", end: "Thu Feb 16 2020" },
            {
              name: "Urlaub",
              start: "2020-02-18",
              end: "2020-02-23",
              color: "orange",
              type: "Abwesenheit",
              abwesenheitsGrund: "Urlaub"
            }
          ]
        }
      ]
    };
  }
};
</script>



