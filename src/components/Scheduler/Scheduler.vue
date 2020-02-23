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
          <tr v-for="(element,i1) in data" :key="i1">
            <th class="name_header">
              <v-row align="center">
                <v-col cols="10">
                  <v-avatar class="mr-1" size="36">
                    <v-img :src="`https://i.pravatar.cc/10${i1}`" alt="John">
                      <template v-slot:placeholder>
                        <v-row class="fill-height ma-0" align="center" justify="center">
                          <v-progress-circular indeterminate color="grey lighten-2"></v-progress-circular>
                        </v-row>
                      </template>
                    </v-img>
                  </v-avatar>
                  {{element.name}}
                </v-col>
                <v-col cols="2">
                  <v-checkbox
                    v-model="element.monatBestätigt"
                    color="success"
                  ></v-checkbox>
                </v-col>
              </v-row>
            </th>
            <td
              v-for="(n,i2) in days"
              :key="i2"
              :style="[ hasActiveEvents(element, n)]"
              v-on:click="testfunction(element, n)"
            >{{getWorkingHours(element, n)}}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>

    <!-- EVENT MENU -->
    <v-dialog v-model="selectedOpen" width="450">
      <v-card color="grey lighten-4" flat>
        <!-- EVENT TITLE TOOLBAR -->
        <v-toolbar dark>
          <v-toolbar-title>{{selectedEventText[this.selectedEvent.status]}}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn text fab dark small @click="selectedOpen=false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-row>
          <v-col cols="2" class="pb-0">
            <v-list-item>Name:</v-list-item>
          </v-col>
          <v-col cols="8" class="pb-0">
            <v-list-item>{{this.selectedName}}</v-list-item>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="2" class="pb-0">
            <v-list-item>Grund:</v-list-item>
          </v-col>
          <v-col cols="8" class="pb-0">
            <v-list-item>{{this.selectedEvent.abwesenheitsGrund}}</v-list-item>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="2" class="pb-0">
            <v-list-item>Von:</v-list-item>
          </v-col>
          <v-col cols="8" class="pb-0">
            <v-list-item>{{this.selectedEvent.start}}</v-list-item>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="2" class="pb-0">
            <v-list-item>Bis:</v-list-item>
          </v-col>
          <v-col cols="8" class="pb-0">
            <v-list-item>{{this.selectedEvent.end}}</v-list-item>
          </v-col>
        </v-row>
        <v-card-actions>
          <v-btn text color="primary" @click="acceptEvent">Ja</v-btn>
          <v-spacer></v-spacer>
          <v-btn text color="primary" @click="declineEvent">Nein</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import settings from "@/settings";

export default {
  data: () => ({
    selectedEvent: {},
    selectedIndex: -1,
    selectedName: "",
    selectedEventText: {
      angefragt: "Anfrage bestätigen?",
      storniert: "Stornierung bestätigen?",
      bestätigt: "Absage erteilen?"
    },
    selectedOpen: false,
    currentDate: new Date(),
    lazyImage: require("@/assets/avatar-icon-png-9.jpg"),
    types: {
      Arbeit: "work",
      else: "scheduler_active"
    }
  }),
  props: {
    data: {
      type: Array,
      required: true
    }
  },
  methods: {
    findWithAttr(array, attr, value) {
      for (var i = 0; i < array.length; i += 1) {
        if (array[i][attr] === value) {
          return i;
        }
      }
      return -1;
    },
    testfunction(element, tag) {
      let n = new Date(
        this.currentDate.getFullYear(),
        this.currentDate.getMonth(),
        tag
      );
      n = Date.parse(n);
      for (let index = 0; index < element.events.length; index++) {
        if (element.events[index]["type"] == "Abwesenheit") {
          let startTime = Date.parse(element.events[index]["start"] + " 00:00");
          let endTime = Date.parse(element.events[index]["end"] + " 00:00");
          if (n >= startTime && n <= endTime) {
            this.selectedOpen = true;
            this.selectedEvent = element.events[index];
            this.selectedIndex = index;
            this.selectedName = element.name;
          }
        }
      }
    },
    acceptEvent() {
      if (this.selectedEvent.status == "angefragt") {
        this.selectedEvent.status = "bestätigt";
        this.selectedEvent.color =
          settings.eventColorMapping[this.selectedEvent["type"]][
            this.selectedEvent.abwesenheitsGrund
          ];
      } else if (
        this.selectedEvent.status == "storniert" ||
        this.selectedEvent.status == "bestätigt"
      ) {
        this.data[this.findWithAttr(this.data, "name", this.selectedName)][
          "events"
        ].splice(this.selectedIndex, 1);
      }
      this.clearAndCloseModal();
    },
    declineEvent() {
      if (this.selectedEvent.status == "angefragt") {
        this.data[this.findWithAttr(this.data, "name", this.selectedName)][
          "events"
        ].splice(this.selectedIndex, 1);
      } else if (this.selectedEvent.status == "storniert") {
        this.selectedEvent.status = "bestätigt";
        this.selectedEvent.color =
          settings.eventColorMapping[this.selectedEvent["type"]][
            this.selectedEvent.abwesenheitsGrund
          ];
      }
      this.clearAndCloseModal();
    },
    clearAndCloseModal() {
      this.selectedOpen = false;
      this.selectedEventIndex = -1;
      this.selectedEvent = {};
    },
    nextMonth() {
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
      n = Date.parse(n);
      for (let index = 0; index < element.events.length; index++) {
        if (element.events[index]["type"] == "Abwesenheit") {
          let startTime = Date.parse(element.events[index]["start"] + " 00:00");
          let endTime = Date.parse(element.events[index]["end"] + " 00:00");

          if (n >= startTime && n <= endTime) {
            // event found
            let color = element.events[index]["color"];
            let cssProperty = {};

            let event = element.events[index];
            if (event.status != "angefragt") {
              cssProperty["background"] = color;
              cssProperty["border-color"] = color;
            }
            if (event.status == "angefragt") {
              let outlineColor = settings.eventColorMapping[event["type"]];
              cssProperty["background"] =
                "repeating-linear-gradient(45deg, #ffffff, #ffffff 3px, " +
                outlineColor[event["abwesenheitsGrund"]] +
                " 3px, " +
                outlineColor[event["abwesenheitsGrund"]] +
                " 6px)";
            }
            if (event.status == "storniert") {
              let outlineColor = settings.eventColorMapping[event["type"]];
              cssProperty["background"] =
                "repeating-linear-gradient(45deg, red, red 3px, " +
                outlineColor[event["abwesenheitsGrund"]] +
                " 3px, " +
                outlineColor[event["abwesenheitsGrund"]] +
                " 6px)";
            }
            return cssProperty;
          }
        }
      }
      return {};
    },
    getWorkingHours(element, tag) {
      // tage zwischen element.start und element.end markieren
      let tod = new Date(
        this.currentDate.getFullYear(),
        this.currentDate.getMonth(),
        tag
      );
      tod = Date.parse(tod);
      let workingHours = "";
      for (let index = 0; index < element.events.length; index++) {
        if (element.events[index]["type"] == "Anwesenheit") {
          let startTime = Date.parse(
            element.events[index]["start"].split(" ")[0] + " 00:00"
          );
          let endTime = Date.parse(
            element.events[index]["end"].split(" ")[0] + " 00:00"
          );
          if (tod >= startTime && tod <= endTime) {
            // event found
            let startTimeDecimal =
              Number(
                element.events[index]["start"].split(" ")[1].split(":")[0]
              ) +
              Number(
                element.events[index]["start"].split(" ")[1].split(":")[1] / 60
              );
            let endTimeDecimal =
              Number(element.events[index]["end"].split(" ")[1].split(":")[0]) +
              Number(
                element.events[index]["end"].split(" ")[1].split(":")[1] / 60
              );
            if (workingHours == "") {
              workingHours = endTimeDecimal - startTimeDecimal;
            } else {
              workingHours = workingHours + (endTimeDecimal - startTimeDecimal);
            }
          }
        }
      }
      return workingHours;
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