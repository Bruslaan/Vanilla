<template>
<div>
  <Scheduler :data="Mitarbeiter"/>
</div>
</template>

<script >
import Scheduler from '../components/Scheduler/Scheduler'

export default {
  computed: {},
  components:{Scheduler},
  methods: {
  

  },
  data() {
    return {
      Mitarbeiter: [
        {
          name: "Test Peter Hans Jürgen",
          abwesenheit: "12-20"
        },
        {
          name: "Francesco Lauinger",
          abwesenheit: "2-5"
        },
        {
          name: "Jürgen Meier",
          abwesenheit: "1-7"
        },
        {
          name: "Jürgen Maraschki",
          abwesenheit: "15-19"
        },
        {
          name: "Peter Montenari",
          abwesenheit: "4-7"
        },
                {
          name: "Ruslan Zwegert",
          abwesenheit: "2-5"
        },
        {
          name: "Jürgen Meier",
          abwesenheit: "1-7"
        },
        {
          name: "Jürgen Maraschki",
          abwesenheit: ""
        },
        {
          name: "Ruslan Montenari",
          abwesenheit: "14-17"
        },
                {
          name: "Peter Zwegert",
          abwesenheit: "2-10"
        },
        {
          name: "Jürgen Meier",
          abwesenheit: "1-7"
        },
        {
          name: "Jürgen Maraschki",
          abwesenheit: "15-19"
        },
        {
          name: "Ruslan Montenari",
          abwesenheit: "4-7"
        },        {
          name: "Peter Zwegert",
          abwesenheit: "2-5"
        },
        {
          name: "Jürgen Meier",
          abwesenheit: "1-7"
        },
        {
          name: "Jürgen Maraschki",
          abwesenheit: "15-19"
        },
        {
          name: "Ruslan Montenari",
          abwesenheit: "14-17"
        },        {
          name: "Peter Zwegert",
          abwesenheit: "2-15"
        },
        {
          name: "Jürgen Meier",
          abwesenheit: "10-17"
        },
        {
          name: "Jürgen Maraschki",
          abwesenheit: "15-19"
        },
        {
          name: "Ruslan Montenari",
          abwesenheit: "4-7"
        }
      ]
    };
  }
};
</script>



