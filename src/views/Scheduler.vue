<template>
  <div>
    <Scheduler :data="Mitarbeiter" />
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
          abwesenheit: "12-20",
          events: [
            { start: "Thu Mar 1 2020", end: "Thu Mar 1 2020" },
            { start: "Thu Mar 19 2020", end: "Thu Mar 23 2020" },
            { start: "Thu Mar 12 2020", end: "Thu Mar 16 2020" }
          ]
        },
        {
          name: "Kartoffel Kopf",
          abwesenheit: "12-20",
          events: [{ start: "Thu Feb 12 2020", end: "Thu Feb 16 2020" }]
        }
      ]
    };
  }
};
</script>



