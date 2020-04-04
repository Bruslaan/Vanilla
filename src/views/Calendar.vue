<template>
  <v-row class="fill-height">
    <!-- SnackBar -->
    <v-snackbar color="red" v-model="snackbar">
      {{ text }}
      <v-btn text fab dark small @click="snackbar = false">
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <!-- <v-btn color="white" text @click="snackbar = false">Schließen</v-btn> -->
    </v-snackbar>
    <!-- Floating Button -->
    <v-btn
      class="floating_action_button mb-12"
      @click="createEvent"
      dark
      fab
      bottom
      right
      color="red"
    >
      <v-icon>mdi-plus</v-icon>
    </v-btn>
    <!-- TOOLBAR -->
    <v-col class="pa-0">
      <v-toolbar flat color="white">
        <v-btn fab text small color="grey darken-2" @click="prev">
          <v-icon small>mdi-chevron-left</v-icon>
        </v-btn>
        <v-btn text color="grey darken-2" @click="setToday">HEUTE</v-btn>
        <v-btn fab text small color="grey darken-2" @click="next">
          <v-icon small>mdi-chevron-right</v-icon>
        </v-btn>
        <h1 class="ml-2">{{ title }}</h1>
        <v-chip
          v-if="ifMonatBestätigt(start)"
          class="ma-2 ml-3"
          small
          color="green"
          text-color="white"
        >Bestätigt</v-chip>
        <h1 class="ml-2">{{ title2 }}</h1>
        <v-chip
          v-if="ifMonatBestätigt(end)"
          class="ma-2 ml-3"
          small
          color="green"
          text-color="white"
        >Bestätigt</v-chip>
        <v-spacer></v-spacer>
        <v-menu bottom right>
          <template v-slot:activator="{ on }">
            <v-btn outlined color="grey darken-2" v-on="on">
              <span>{{ typeToLabel[type] }}</span>
              <v-icon right>mdi-menu-down</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item @click="type = 'week'">
              <v-list-item-title>Week</v-list-item-title>
            </v-list-item>
            <v-list-item @click="type = 'month'">
              <v-list-item-title>Month</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-toolbar>
      <!-- CALENDAR -->
      <v-sheet height="80vh">
        <v-calendar
          ref="calendar"
          v-model="focus"
          color="primary"
          :events="events"
          :event-color="getEventColor"
          :now="today"
          :type="type"
          :weekdays="weekday"
          @click:event="showEvent"
          @change="updateRange"
          @mousedown:time="startCreating"
          @mouseup:time="endCreating"
          @mouseenter:event="eventHovered=true"
          @mouseleave:event="eventHovered=false"
          @mousedown:day="startAlldayEvent"
          @mouseup:day="endAlldayEvent"
        ></v-calendar>
        <!-- EVENT MENU -->
        <v-dialog v-model="selectedOpen" width="500">
          <v-card color="grey lighten-4" flat>
            <!-- EVENT TITLE TOOLBAR -->
            <v-toolbar dark>
              <!-- <v-toolbar-title>{{ selectedEvent.name }}</v-toolbar-title> -->
              <v-select
                v-model="selectedEvent.type"
                :items="types"
                dense
                outlined
                hide-details
                class="mr-5"
                label="Erfassung"
              ></v-select>
              <v-spacer></v-spacer>
              <v-btn text fab dark small @click="clearAndCloseModal">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-toolbar>

            <v-expand-transition>
              <v-row v-if="selectedEvent.type=='Abwesenheit'">
                <v-col cols="6">
                  <v-list-item>
                    <v-select
                      v-model="selectedEvent.abwesenheitsGrund"
                      :items="abwesenheitsGrund"
                      dense
                      outlined
                      hide-details
                      class="mr-5"
                      label="Grund"
                    ></v-select>
                  </v-list-item>
                </v-col>
              </v-row>
            </v-expand-transition>
            <v-row>
              <v-col cols="2">
                <v-list-item>Start:</v-list-item>
              </v-col>
              <v-col cols="10">
                <v-list-item>
                  <v-icon>mdi-calendar</v-icon>
                  <input class="pa-2" type="date" v-model="selectedEvent.startDay">
                </v-list-item>
                <v-list-item v-if="selectedEvent.type =='Anwesenheit'">
                  <v-icon>mdi-clock</v-icon>
                  <input
                    class="pa-2"
                    type="time"
                    id="appt"
                    name="appt"
                    min="00:00"
                    max="23:59"
                    v-model="selectedEvent.startTime"
                  >
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
                  <input class="pa-2" type="date" v-model="selectedEvent.endDay">
                </v-list-item>
                <v-list-item v-if="selectedEvent.type =='Anwesenheit'">
                  <v-icon>mdi-clock</v-icon>
                  <input
                    class="pa-2"
                    type="time"
                    id="appt"
                    name="appt"
                    min="00:00"
                    max="23:59"
                    v-model="selectedEvent.endTime"
                  >
                </v-list-item>
              </v-col>
            </v-row>
            <v-card-actions>
              <v-btn text color="primary" @click="updateEvent">Speichern</v-btn>
              <v-spacer></v-spacer>
              <v-btn
                v-if="selectedEventIndex != -1"
                dark
                fab
                small
                class="mr-1"
                color="red"
                @click="deleteEvent"
              >
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-sheet>
    </v-col>
  </v-row>
</template>


<script>
export default {
  data: () => ({
    weekday: [1, 2, 3, 4, 5, 6, 0],
    focus: "",
    type: "week",
    abwesenheitsGrund: ["Urlaub", "Krankheit", "Feiertag"],
    types: ["Abwesenheit", "Anwesenheit"],
    text: "Hello, I'm a snackbar",
    typeToLabel: {
      month: "Month",
      week: "Week",
      day: "Day",
      "4day": "4 Days"
    },
    snackbar: false,
    start: null,
    end: null,
    selectedEvent: {},
    selectedEventIndex: -1,
    selectedElement: null,
    selectedOpen: false,
    newAllDayEvent: {},
    renderEvent: false,
    renderAllDayEvent: false,
    eventToRender: null,
    eventHovered: false,
    // events are all events of an user and all blockierungen
    monatBestätigt: {
      "2020-03": true,
      "2020-04": true,
      "2020-05": true
    },
    events: [
      {
        name: "Blockierung",
        start: "2020-02-11",
        end: "2020-02-14",
        color: "#ff4500",
        type: "Blockierung",
        status: "bestätigt"
      },
      {
        name: "Blockierung",
        start: "2020-03-01",
        end: "2020-03-04",
        color: "#ff4500",
        type: "Blockierung",
        status: "bestätigt"
      },
      {
        name: "Blockierung",
        start: "2020-03-11",
        end: "2020-03-14",
        color: "#ff4500",
        type: "Blockierung",
        status: "bestätigt"
      },
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
    ],
    colors: [
      "blue",
      "indigo",
      "deep-purple",
      "cyan",
      "green",
      "orange",
      "grey darken-1"
    ],
    names: ["Meeting"]
  }),

  watch: {
    selectedOpen(val) {
      val || this.clearAndCloseModal();
    }
  },
  computed: {
    title() {
      const { start, end } = this;
      if (!start || !end) {
        return "";
      }

      const startMonth = this.monthFormatter(start);
      const startYear = start.year;
      const startDay = start.day;

      switch (this.type) {
        case "month":
          return `${startMonth} ${startYear}`;
        case "week":
          return `${startMonth} ${startYear}`;
        case "day":
          return `${startMonth} ${startDay} ${startYear}`;
      }
      return "";
    },
    title2() {
      const { start, end } = this;
      if (!start || !end) {
        return "";
      }
      const endMonth = this.monthFormatter(end);
      const endYear = end.year;
      const startMonth = this.monthFormatter(start);

      switch (this.type) {
        case "week":
          if (startMonth != endMonth) {
            return `- ${endMonth} ${endYear}`;
          }
      }
      return "";
    },
    monthFormatter() {
      return this.$refs.calendar.getFormatter({
        timeZone: "UTC",
        month: "long"
      });
    }
  },
  mounted() {
    this.$refs.calendar.scrollToTime("05:30");
    this.$refs.calendar.checkChange();
  },
  methods: {
    ifMonatBestätigt(datum) {
      if (datum) {
        let key = "";
        const endMonth = this.monthFormatter(this.end);
        const startMonth = this.monthFormatter(this.start);
        if (datum == this.start) {
          const Year = String(this.start.year);
          const Month = String(this.start.month).padStart(2, "0");
          key = Year + "-" + Month;
          if (this.monatBestätigt[key] == true) {
            return true;
          } else {
            return false;
          }
        }
        if (datum == this.end && startMonth != endMonth) {
          const Year = String(this.end.year);
          const Month = String(this.end.month).padStart(2, "0");
          key = Year + "-" + Month;
          if (this.monatBestätigt[key] == true) {
            return true;
          } else {
            return false;
          }
        }
      }
    },
    createEvent() {
      // this.selectedEvent.type="Abwesenheit"
      // this.selectedEvent.abwesenheitsGrund = "Urlaub"
      this.selectedEvent.status = "angefragt";
      this.selectedOpen = true;
    },
    // startCreating({ date, time }) {
    //   if (this.eventHovered) {
    //     return;
    //   }
    //   let newEvent = {
    //     name: "New Event",
    //     start: [date, time].join(" "),
    //     end: [date, time].join(" "),
    //     color: "#C5C5C5",
    //     status: "angefragt",
    //     type: "Anwesenheit"
    //   };
    //   this.events.push(newEvent);
    //   this.renderEvent = true;
    // },
    // endCreating() {
    //   this.renderEvent = false;
    // },
    // startAlldayEvent(event) {
    //   if (!this.eventHovered) {
    //     this.renderAllDayEvent = true;
    //     this.newAllDayEvent = {
    //       name: "Urlaub",
    //       start: event.date,
    //       end: event.date,
    //       type: "Abwesenheit",
    //       color: "#C5C5C5",
    //       status: "angefragt",
    //       abwesenheitsGrund: "Urlaub"
    //     };
    //   }
    // },
    // endAlldayEvent(event) {
    //   if (this.renderAllDayEvent) {
    //     this.renderAllDayEvent = false;
    //     this.newAllDayEvent["end"] = event.date;

    //     this.events.push(this.newAllDayEvent);
    //     this.newAllDayEvent = {};
    //   }
    // },
    // is triggered when new Calender week is renderd
    updateRange({ start, end }) {
      this.start = start;
      this.end = end;
    },
    viewDay({ date }) {
      this.focus = date;
      this.type = "day";
    },
    getEventColor(event) {
      return event.color;
    },
    setToday() {
      this.focus = this.today;
    },
    prev() {
      this.$refs.calendar.prev();
    },
    next() {
      this.$refs.calendar.next();
    },
    splitDayAndTime(dateTime) {
      let splittedDateTime = dateTime.split(" ");

      return [splittedDateTime[0], splittedDateTime[1]];
    },
    showEvent({ nativeEvent, event }) {
      if (event.type == "Blockierung") {
        return;
      }
      const open = () => {
        this.selectedEvent = event;
        this.selectedEventIndex = this.events.indexOf(event);
        this.selectedElement = nativeEvent.target;
        let startDateTime = this.splitDayAndTime(this.selectedEvent.start);
        let endDateTime = this.splitDayAndTime(this.selectedEvent.end);

        this.selectedEvent["startDay"] = startDateTime[0];
        this.selectedEvent["endDay"] = endDateTime[0];
        this.selectedEvent["startTime"] = startDateTime[1];
        this.selectedEvent["endTime"] = endDateTime[1];

        setTimeout(() => (this.selectedOpen = true), 10);
      };

      if (this.selectedOpen) {
        this.selectedOpen = false;
        setTimeout(open, 10);
      } else {
        open();
      }

      nativeEvent.stopPropagation();
    },
    deleteEvent() {
      if (this.selectedEvent && this.selectedEventIndex != -1) {
        this.events.splice(this.selectedEventIndex, 1);
        this.clearAndCloseModal();
      }
    },
    clearAndCloseModal() {
      this.selectedOpen = false;
      this.selectedEventIndex = -1;
      this.selectedEvent = {};
      this.selectedElement = null;
    },

    checkOverlap(event) {
      let newStartTime;
      let newEndTime;
      if (event.type == "Anwesenheit") {
        newStartTime = Date.parse(event.start);
        newEndTime = Date.parse(event.end);
      }
      if (event.type == "Abwesenheit") {
        newStartTime = Date.parse(event.start + " 00:00");
        newEndTime = Date.parse(event.end + " 23:59");
      }
      for (let index = 0; index < this.events.length; index++) {
        if (this.events[index]["type"] == "Anwesenheit") {
          let startTime = Date.parse(this.events[index]["start"]);
          let endTime = Date.parse(this.events[index]["end"]);
          if (newStartTime <= startTime && newEndTime > startTime) {
            return true;
          }
          if (newStartTime > startTime && newStartTime < endTime) {
            return true;
          }
        }
        if (this.events[index]["type"] == "Abwesenheit") {
          let startTime = Date.parse(this.events[index]["start"] + " 00:00");
          let endTime = Date.parse(this.events[index]["end"] + " 23:59");
          console.log(newStartTime, newEndTime, startTime, endTime);
          if (newStartTime <= startTime && newEndTime > startTime) {
            return true;
          }
          if (newStartTime > startTime && newStartTime < endTime) {
            return true;
          }
        }
      }
      return false;
    },
    checkBlockierung(event) {
      let newStartTime;
      let newEndTime;
      newStartTime = Date.parse(event.start + " 00:00");
      newEndTime = Date.parse(event.end + " 23:59");
      for (let index = 0; index < this.events.length; index++) {
        if (this.events[index]["type"] == "Blockierung") {
          let startTime = Date.parse(this.events[index]["start"] + " 00:00");
          let endTime = Date.parse(this.events[index]["end"] + " 23:59");
          if (newStartTime <= startTime && newEndTime > startTime) {
            console.log("olga1");
            return true;
          }
          if (newStartTime > startTime && newStartTime < endTime) {
            console.log("olga2");
            return true;
          }
        }
      }
      return false;
    },
    validateEvent() {
      if (
        this.selectedEvent.type == "Abwesenheit" &&
        !this.abwesenheitsGrund.includes(this.selectedEvent.abwesenheitsGrund)
      ) {
        this.text = "Abwesenheits Grund nicht gesetzt";
        this.snackbar = true;
        return true;
      }
      if (!this.selectedEvent.type) {
        this.text = "Erfassung nicht ausgewählt";
        this.snackbar = true;
        return true;
      }
      if (!this.selectedEvent.startDay || !this.selectedEvent.endDay) {
        this.text = "Start Tag und End Tag müssen eingetragen sein";
        this.snackbar = true;
        return true;
      }
      if (
        this.selectedEvent.type == "Anwesenheit" &&
        (!this.selectedEvent.startTime || !this.selectedEvent.endTime)
      ) {
        this.text = "Zeiten dürfen nicht leer sein";
        this.snackbar = true;
        return true;
      }

      if (
        this.selectedEvent.type == "Anwesenheit" &&
        (this.selectedEvent.startDay > this.selectedEvent.endDay ||
          this.selectedEvent.startTime > this.selectedEvent.endTime)
      ) {
        this.text = "Start muss vor Ende liegen du GEILE SAU!";
        this.snackbar = true;
        return true;
      }
      if (
        this.selectedEvent.type == "Abwesenheit" &&
        this.selectedEvent.startDay > this.selectedEvent.endDay
      ) {
        this.text = "Start muss vor Ende liegen du GEILE SAU!";
        this.snackbar = true;
        return true;
      }
      // if (
      //   this.selectedEvent.type == "Anwesenheit" &&
      //   this.selectedEvent.startTime
      // )
      let refStart =
        this.selectedEvent.startDay.split("-")[0] +
        "-" +
        this.selectedEvent.startDay.split("-")[1];
      let refEnd =
        this.selectedEvent.endDay.split("-")[0] +
        "-" +
        this.selectedEvent.endDay.split("-")[1];
      if (
        this.monatBestätigt[refStart] == true ||
        this.monatBestätigt[refEnd] == true
      ) {
        this.text = "Dieser Monat wurde bereits bestätigt";
        this.snackbar = true;
        return true;
      }

      return false;
    },

    returnColor() {
      if (this.selectedEvent.status == "angefragt") {
        return "#C5C5C5";
      }
      if (this.selectedEvent.type == "Anwesenheit") {
        return "#4C95FF";
      }
      let colorMap = {
        Urlaub: "#FFB63D",
        Krankheit: "#A43DFF",
        Feiertag: "#52FF3D"
      };
      let x = colorMap[this.selectedEvent.abwesenheitsGrund];
      return x;
    },
    updateEvent() {
      if (this.validateEvent()) {
        return;
      }

      let startTime;
      let endTime;

      if (this.selectedEvent.type == "Anwesenheit") {
        startTime = [
          this.selectedEvent.startDay,
          this.selectedEvent.startTime
        ].join(" ");
        endTime = [this.selectedEvent.endDay, this.selectedEvent.endTime].join(
          " "
        );
      } else {
        startTime = this.selectedEvent.startDay;
        endTime = this.selectedEvent.endDay;
      }

      let neuerName =
        this.selectedEvent.type == "Anwesenheit"
          ? "Arbeit"
          : this.selectedEvent.abwesenheitsGrund;

      let updatedEvent = {
        name: neuerName,
        start: startTime,
        end: endTime,
        status: "angefragt",
        type: this.selectedEvent.type,
        color: this.returnColor(),
        abwesenheitsGrund: this.selectedEvent.abwesenheitsGrund || "Arbeit"
      };
      if (this.selectedEventIndex != -1) {
        this.events.splice(this.selectedEventIndex, 1);
      }
      if (this.checkOverlap(updatedEvent) == true) {
        this.text = "Termine dürfen sich nicht überlappen";
        this.snackbar = true;
        return;
      }
      if (updatedEvent.type == "Abwesenheit") {
        if (this.checkBlockierung(updatedEvent) == true) {
          this.text =
            "Achtung! An diesem Tag ist eine Blockierung eingetragen!";
          this.snackbar = true;
        }
      }
      this.events.push(updatedEvent);
      this.clearAndCloseModal();
    }
  }
};
</script>

<style scoped >
.floating_action_button {
  position: absolute;
  bottom: -20px;
  right: 28px;
  transform: translate(0px, -0px);
  z-index: 900;
}
::v-deep ::selection {
  background-color: initial;
  color: inherit;
  text-shadow: initial;
}
</style>