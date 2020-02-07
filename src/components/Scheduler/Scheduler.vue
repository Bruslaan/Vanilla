<template>
  <div class="tcontainer">
    <div>
      <v-row align="center">
        <v-btn icon @click="prevMonth">
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
        <!-- <v-btn icon @click="heute">
          <v-icon>mdi-calendar-month</v-icon>
        </v-btn>-->
        <v-btn @click="heute" text>Heute</v-btn>
        <v-btn icon @click="nextMonth">
          <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
        <h1>{{ title }}</h1>
        <v-spacer></v-spacer>
        <v-btn icon @click="heute">
          <v-icon>mdi-settings</v-icon>
        </v-btn>
      </v-row>
    </div>
    <v-simple-table fixed-header height="90vh">
      <template v-slot:default>
        <thead>
          <tr>
            <th class="name_header">Mitarbeiter Name</th>
            <th v-for="(n,i) in days" :key="i" :class="[isToday(n) ? {today:true} : {}]">
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
                <v-img :src="`https://i.pravatar.cc/10${i}`" alt="John">
                  <template v-slot:placeholder>
                    <v-row class="fill-height ma-0" align="center" justify="center">
                      <v-progress-circular indeterminate color="grey lighten-2"></v-progress-circular>
                    </v-row>
                  </template>
                </v-img>
              </v-avatar>
              {{element.name}}
            </th>
            <td v-for="(n,i) in days" :key="i" :class="[ hasActiveEvents(element, n)]"></td>
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
      currentDate: new Date(),
      lazyImage: require("@/assets/avatar-icon-png-9.jpg"),
      types: {
        Arbeit: "work",
        else: "scheduler_active"
      }
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

    isToday(day) {
      let today = new Date();
      today.setHours(0, 0, 0, 0);
      let n = new Date(
        this.currentDate.getFullYear(),
        this.currentDate.getMonth(),
        day
      );
      // console.log(today, n)
      if (today.getTime() === n.getTime()) {
        return true;
      }
      return false;
    },
    hasActiveEvents(element, tag) {
      // tage zwischen element.start und element.end markieren
      let n = new Date(
        this.currentDate.getFullYear(),
        this.currentDate.getMonth(),
        tag
      );
      // let found = false;
      for (let index = 0; index < element.events.length; index++) {
        let startTime = Date.parse(element.events[index]["start"]);
        let endTime = Date.parse(element.events[index]["end"]);
        if (n >= startTime && n <= endTime) {
          // event found
          let cssProperty = {};
          let type = this.types[element.events[index]["type"]];
          if (type) {
            cssProperty[type] = true;
          } else {
            cssProperty["scheduler_active"] = true;
          }
          return cssProperty;
        }
      }
      return {};
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
th.today {
  background: rgba(0, 0, 0, 0.06) !important;
}
.work {
  background: lightgreen;
  border-color: lightgreen;
}
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