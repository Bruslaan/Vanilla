<template>
  <div class="tcontainer">
    <!-- SnackBar -->
    <v-snackbar color="red" v-model="snackbar">
      {{ text }}
      <v-btn color="white" text @click="snackbar = false">Close</v-btn>
    </v-snackbar>
    <!-- FLOATING BUTTON -->
    <v-btn
      class="floating_action_button mb-12"
      @click="newBlockierungOpen=true"
      dark
      fab
      bottom
      right
      color="red"
    >
      <v-icon>mdi-plus</v-icon>
    </v-btn>
    <!-- CREATE BLOCKIERUNG -->
    <v-dialog v-model="newBlockierungOpen" width="500">
      <v-card color="grey lighten-4" flat>
        <!-- EVENT TITLE TOOLBAR -->
        <v-toolbar dark>
          <v-toolbar-title>Neue Blockierung</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn text fab dark small @click="newBlockierungOpen=false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <!-- CONTENT -->
        <v-row>
          <v-col cols="2">
            <v-list-item>Start:</v-list-item>
          </v-col>
          <v-col cols="10">
            <v-list-item>
              <v-icon>mdi-calendar</v-icon>
              <input class="pa-2" type="date" v-model="newBlockierung.start">
            </v-list-item>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="2">
            <v-list-item>Ende:</v-list-item>
          </v-col>
          <v-col cols="10">
            <v-list-item>
              <v-icon>mdi-calendar</v-icon>
              <input class="pa-2" type="date" v-model="newBlockierung.end">
            </v-list-item>
          </v-col>
        </v-row>
        <v-card-actions>
          <v-btn text color="primary" @click="acceptBlockierung()">Speichern</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- TOOLBAR -->
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
        <h1 class="ml-2">{{ title }}</h1>
        <v-spacer></v-spacer>
        <v-col cols="3" class="pt-0 pb-2">
          <v-text-field v-model="search" label="Suche" hide-details :onkeyup="searchFunction()"></v-text-field>
        </v-col>
        <v-btn icon @click="heute">
          <v-icon>mdi-settings</v-icon>
        </v-btn>
      </v-row>
    </div>
    <!-- SCHEDULER -->
    <v-simple-table fixed-header height="80vh">
      <template v-slot:default>
        <thead>
          <tr>
            <th class="name_header">Mitarbeiter Name</th>
            <th
              v-for="(n,i) in days"
              :key="i"
              :style="[isBlocked(n)]"
              v-on:click="manageBlocked(n)"
            >
              <v-col>
                <v-row align="center" justify="center">{{n}}</v-row>
                <v-row align="center" justify="center">{{getDayOfWeek(n)}}</v-row>
              </v-col>
            </th>
          </tr>
        </thead>
        <tbody id="myTable">
          <tr v-for="(element,i1) in data" :key="i1">
            <th class="name_header">
              <v-row align="center">
                <v-col cols="9" class="pt-2 pb-2">
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
                <v-col cols="3" class="pt-2 pb-2 ml-auto">
                  <v-checkbox
                    class="ma-0"
                    v-model="element.monatBestätigt"
                    color="success"
                    hide-details
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
          <v-toolbar-title v-if="this.selectedEvent.type != 'Blockierung'">{{selectedEventText[this.selectedEvent.status]}}</v-toolbar-title>
          <v-toolbar-title v-else>Blockierung Löschen?</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn text fab dark small @click="clearAndCloseModal()">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-row v-if="this.selectedEvent.type != 'Blockierung'">
          <v-col cols="2" class="pb-0">
            <v-list-item>Name:</v-list-item>
          </v-col>
          <v-col cols="8" class="pb-0">
            <v-list-item>{{this.selectedName}}</v-list-item>
          </v-col>
        </v-row>
        <v-row v-if="this.selectedEvent.type != 'Blockierung'">
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
    search: "",
    selectedEvent: {},
    selectedIndex: -1,
    selectedName: "",
    selectedEventText: {
      angefragt: "Anfrage bestätigen?",
      storniert: "Stornierung bestätigen?",
      bestätigt: "Absage erteilen?",
    },
    selectedOpen: false,
    newBlockierungOpen: false,
    newBlockierung: {},
    text: "",
    snackbar: false,
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
    },
    Blockierungen: {
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
      if (element.monatBestätigt == false) {
        let n = new Date(
          this.currentDate.getFullYear(),
          this.currentDate.getMonth(),
          tag
        );
        n = Date.parse(n);
        for (let index = 0; index < element.events.length; index++) {
          if (element.events[index]["type"] == "Abwesenheit") {
            let startTime = Date.parse(
              element.events[index]["start"] + " 00:00"
            );
            let endTime = Date.parse(element.events[index]["end"] + " 00:00");
            if (n >= startTime && n <= endTime) {
              this.selectedOpen = true;
              this.selectedEvent = element.events[index];
              this.selectedIndex = index;
              this.selectedName = element.name;
            }
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
      } else if (this.selectedEvent.status == "Blockierung") {
        this.Blockierungen.splice(this.selectedIndex, 1);
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
    isBlocked(tag) {
      let tod = new Date(
        this.currentDate.getFullYear(),
        this.currentDate.getMonth(),
        tag
      );
      tod = Date.parse(tod);
      for (let index = 0; index < this.Blockierungen.length; index++) {
        let startTime = Date.parse(
          this.Blockierungen[index]["start"] + " 00:00"
        );
        let endTime = Date.parse(this.Blockierungen[index]["end"] + " 00:00");
        if (tod >= startTime && tod <= endTime) {
          let cssProperty = {};
          cssProperty["background"] = "#ff4500";
          return cssProperty;
        }
      }
      return {};
    },
    manageBlocked(tag) {
      let tod = new Date(
        this.currentDate.getFullYear(),
        this.currentDate.getMonth(),
        tag
      );
      tod = Date.parse(tod);
      for (let index = 0; index < this.Blockierungen.length; index++) {
        let startTime = Date.parse(
          this.Blockierungen[index]["start"] + " 00:00"
        );
        let endTime = Date.parse(this.Blockierungen[index]["end"] + " 00:00");
        if (tod >= startTime && tod <= endTime) {
          this.selectedOpen = true;
          this.selectedEvent = this.Blockierungen[index];
          this.selectedIndex = index;
          this.selectedEvent.type = "Blockierung";
        }
      }
    },
    acceptBlockierung() {
      if (!this.newBlockierung.start || !this.newBlockierung.end) {
        this.text = "Start Tag und End Tag müssen eingetragen sein";
        this.snackbar = true;
        return;
      }
      if (this.newBlockierung.start > this.newBlockierung.end) {
        this.text = "Start muss vor Ende liegen du GEILE SAU!";
        this.snackbar = true;
        return;
      }
      this.newBlockierung.status = "bestätigt"
      this.newBlockierung.name = "Blockierung"
      this.newBlockierung.color = "#ff4500"
      this.Blockierungen.push(this.newBlockierung)
      this.newBlockierung = {}
      this.newBlockierungOpen = false
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
      return workingHours ? Number(workingHours).toFixed(2) : workingHours;
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
    },
    searchFunction() {
      // Declare variables
      let filter, table, tr, td, i, txtValue;
      filter = this.search.toUpperCase();
      table = document.getElementById("myTable");
      if (table) {
        tr = table.getElementsByTagName("tr");
        // Loop through all table rows, and hide those who don't match the search query
        for (i = 0; i < tr.length; i++) {
          td = tr[i].getElementsByTagName("th")[0];
          if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
              tr[i].style.display = "";
            } else {
              tr[i].style.display = "none";
            }
          }
        }
      }
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
.floating_action_button {
  position: absolute;
  bottom: -10px;
  right: 28px;
  transform: translate(0px, -0px);
  z-index: 900;
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