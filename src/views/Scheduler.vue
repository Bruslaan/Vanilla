<template>
  <div>
    <Scheduler :data="Mitarbeiter" />
  </div>
</template>

<script >
import Scheduler from "../components/Scheduler/Scheduler";

export default {
  computed: {},
  components: { Scheduler },
  methods: {},
  data() {
    return {
      Mitarbeiter: [
        {
          name: "Test Peter Hans Jürgen",
          abwesenheit: "12-20",
          start:
            "Mon Feb 03 2020",
          end:
            "Mon Feb 06 2020"
        },
        {
          name: "Kartoffel Kopf",
          abwesenheit: "12-20",
          start:
            "Thu Mar 12 2020",
          end:
            "Thu Mar 16 2020"
        }
      ]
    };
  }
};
</script>



