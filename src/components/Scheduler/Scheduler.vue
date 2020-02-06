<template>
  <div class="tcontainer">
    <div>
      <v-row align="center">
        <v-btn icon @click="prevMonth">
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
        <v-btn icon @click="heute">
          <v-icon>mdi-calendar-month</v-icon>
        </v-btn>

        <v-btn icon @click="nextMonth">
          <v-icon>mdi-chevron-right</v-icon>
        </v-btn>

        <h1>{{ title }}</h1>
      </v-row>
    </div>
    <v-simple-table fixed-header height="90vh">
      <template v-slot:default>
        <thead>
          <tr>
            <th class="name_header">Name</th>
            <th v-for="(n,i) in days" :key="i">
              <v-col>
                <v-row align="center" justify="center">{{n}}</v-row>
                <v-row align="center" justify="center">{{getDayOfWeek(n)}}</v-row>
              </v-col>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(element,i) in data" :key="i">
            <th class="name_header">
              <v-avatar class="mr-1" size="36">
                <img :src="`https://i.pravatar.cc/10${i}`" alt="John" />
              </v-avatar>
              {{element.name}}
            </th>
            <td v-for="(n,i) in days" :key="i" :class="[ hasActiveElements(element, n) ]"></td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentDate: new Date()
    };
  },
  props: {
    data: {
      type: Array,
      required: true
    }
  },
  methods: {
    nextMonth() {
      //   this.currentDate = this.currentDate.setMonth(this.currentDate.getMonth() + 1);
      let oldDate = this.currentDate;

      this.currentDate = new Date(
        oldDate.getFullYear(),
        oldDate.getMonth() + 2,
        0
      );
    },
    heute() {
      this.currentDate = new Date();
    },
    prevMonth() {
      //   this.currentDate = this.currentDate.setMonth(this.currentDate.getMonth() + 1);
      let oldDate = this.currentDate;

      this.currentDate = new Date(oldDate.getFullYear(), oldDate.getMonth(), 0);
    },
    hasActiveElements(element, tag) {
      // tage zwischen element.start und element.end markieren
      let n = new Date(
        this.currentDate.getFullYear(),
        this.currentDate.getMonth(),
        tag
      );
      let startTime = Date.parse(element.start);
      let endTime = Date.parse(element.end);

      return n >= startTime && n <= endTime ? { scheduler_active: true } : {};
    },
    getDayOfWeek(day) {
      let date = new Date(
        this.currentDate.getFullYear(),
        this.currentDate.getMonth(),
        day
      );
      let weekIndex = date.getDay();
      let weekMap = ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"];
      return weekMap[weekIndex];
    }
  },
  computed: {
    days() {
      let date = this.currentDate;
      let days = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
      return days;
    },
    title() {
      let monthArray = [
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
      ];
      return (
        monthArray[this.currentDate.getMonth()] +
        " " +
        this.currentDate.getFullYear()
      );
    }
  }
  //
};
</script>

<style scoped>
.scheduler_active {
  background: lightblue;
  border-color: lightblue;
}
.tcontainer {
  /* max-width: 100vh;
  max-height: 100vh;
  overflow: scroll;
  position: relative; */
  margin: 10px;
}
.name_header {
  min-width: 250px;
  text-align: left !important;
}

table {
  position: relative;
  border-collapse: collapse;
  table-layout: fixed;
}
td,
th {
  border-right: 1px solid #ccc;
  min-width: 50px;
  text-align: center !important;
}

thead th {
  position: -webkit-sticky; /* for Safari */
  position: sticky;
  top: 0;
}

thead th:first-child {
  left: 0;
  z-index: 3;
}

tbody th {
  position: -webkit-sticky; /* for Safari */
  position: sticky;
  left: 0;
  background: #fff;
  border-right: 1px solid #ccc;
  padding: 10px;
}
.v-data-table td,
.v-data-table th {
  padding: 0 0px;
}
</style>