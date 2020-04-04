<template>
  <v-row class="fill-height">
    <!-- SnackBar -->
    <v-snackbar color="red" v-model="snackbar">
      {{ text }}
      <v-btn text fab dark small @click="snackbar = false">
        <v-icon>mdi-close</v-icon>
      </v-btn>
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
        <div v-if="type == 'day'" style="justify-content: center;">
        <v-btn fab text small color="grey darken-2" @click="prev">
          <v-icon small>mdi-chevron-left</v-icon>
        </v-btn>
        <v-btn text color="grey darken-2" @click="setToday">HEUTE</v-btn>
        <v-btn fab text small color="grey darken-2" @click="next">
          <v-icon small>mdi-chevron-right</v-icon>
        </v-btn>
      </div>
        <h1 class="ml-2">Stundenplan</h1>
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
            <v-list-item @click="viewDay()">
              <v-list-item-title>Day</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-toolbar>
      <v-row class="px-3">
        <div class="pa-0" style="width: 60px !important;"></div>
        <v-col style="text-align: center;" v-if="checkHeader('1')">{{Wochentage[0]}}</v-col>
        <v-col style="text-align: center;" v-if="checkHeader('2')">{{Wochentage[1]}}</v-col>
        <v-col style="text-align: center;" v-if="checkHeader('3')">{{Wochentage[2]}}</v-col>
        <v-col style="text-align: center;" v-if="checkHeader('4')">{{Wochentage[3]}}</v-col>
        <v-col style="text-align: center;" v-if="checkHeader('5')">{{Wochentage[4]}}</v-col>
        <v-col style="text-align: center;" v-if="checkHeader('6')">{{Wochentage[5]}}</v-col>
        <v-col style="text-align: center;" v-if="checkHeader('0')">{{Wochentage[6]}}</v-col>
      </v-row>
      <!-- CALENDAR -->
      <v-sheet height="76vh">
        <v-calendar
          ref="calendar"
          v-model="focus"
          color="primary"
          :events="events"
          :event-color="getEventColor"
          :type="type"
          :weekdays="weekday"
          @click:event="showEvent"
          @mouseenter:event="eventHovered=true"
          @mouseleave:event="eventHovered=false"
          hide-header
        >
          <template v-slot:event="item">
            <div
              style="overflow-wrap: break-word; white-space: pre-wrap; font-weight: bold;"
              class="pl-1"
            >{{item.event.name}}</div>
            <div
              style="overflow-wrap: break-word; white-space: pre-wrap;"
              class="pl-1 pb-1"
            >{{item.event.ort}}</div>
            <div
              style="overflow-wrap: break-word; white-space: pre-wrap;"
              class="pl-1 pb-1"
            >{{item.event.start.split(" ")[1]}} - {{item.event.end.split(" ")[1]}}</div>
            <div
              style="overflow-wrap: break-word; white-space: pre-wrap;"
              class="pl-1"
            >{{item.event.notiz}}</div>
          </template>
        </v-calendar>
        <!-- EVENT MENU -->
        <v-dialog v-model="selectedOpen" width="500">
          <v-card color="grey lighten-4" flat>
            <!-- EVENT TITLE TOOLBAR -->
            <v-toolbar dark>
              <v-toolbar-title>{{ selectedEvent.name }}</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn text fab dark small @click="clearAndCloseModal">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-toolbar>
            <v-row>
              <v-col cols="2">
                <v-list-item>Was:</v-list-item>
              </v-col>
              <v-col cols="10">
                <v-list-item>
                  <v-text-field flat single-line hide-details dense v-model="selectedEvent.name"></v-text-field>
                </v-list-item>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="2">
                <v-list-item>Wo:</v-list-item>
              </v-col>
              <v-col cols="10">
                <v-list-item>
                  <v-text-field flat single-line hide-details dense v-model="selectedEvent.ort"></v-text-field>
                </v-list-item>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="2">
                <v-list-item>Wann:</v-list-item>
              </v-col>
              <v-col cols="10">
                <v-list-item>
                  <v-select
                    v-model="selectedEvent.wochentag"
                    :items="Wochentage"
                    dense
                    hide-details
                    label="Wochentag"
                  ></v-select>
                </v-list-item>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="2">
                <v-list-item>Start:</v-list-item>
              </v-col>
              <v-col cols="10">
                <v-list-item>
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
            <v-row>
              <v-col cols="2">
                <v-list-item>Notiz:</v-list-item>
              </v-col>
              <v-col cols="10">
                <v-list-item>
                  <v-textarea flat single-line hide-details dense v-model="selectedEvent.notiz"></v-textarea>
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
    focus: "2020-02-03",
    type: "week",
    Wochentage: ["Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag", "Sonntag"],
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
    renderEvent: false,
    eventToRender: null,
    eventHovered: false,
    mapping: {
      Montag: "2020-02-03",
      Dienstag: "2020-02-04",
      Mittwoch: "2020-02-05",
      Donnerstag: "2020-02-06",
      Freitag: "2020-02-07",
      Samstag: "2020-02-08",
      Sonntag: "2020-02-09"
    },
    mapping2: {
      "1": "2020-02-03",
      "2": "2020-02-04",
      "3": "2020-02-05",
      "4": "2020-02-06",
      "5": "2020-02-07",
      "6": "2020-02-08",
      "0": "2020-02-09"
    },
    events: [
      {
        name: "Arbeit",
        start: "2020-02-03 08:00",
        end: "2020-02-03 16:00",
        wochentag: "MO",
        color: "#4C95FF",
        ort: "in der olga",
        notiz: "so ist dat geil"
      },
      {
        name: "die",
        start: "2020-02-04 08:00",
        end: "2020-02-04 16:00",
        wochentag: "MO",
        color: "#4C95FF",
        ort: "in der olga",
        notiz: "so ist dat geil"
      },
      {
        name: "mi",
        start: "2020-02-05 08:00",
        end: "2020-02-05 16:00",
        wochentag: "MO",
        color: "#4C95FF",
        ort: "in der olga",
        notiz: "so ist dat geil"
      },
      {
        name: "do",
        start: "2020-02-06 08:00",
        end: "2020-02-06 16:00",
        wochentag: "MO",
        color: "#4C95FF",
        ort: "in der olga",
        notiz: "so ist dat geil"
      },
      {
        name: "fr",
        start: "2020-02-07 08:00",
        end: "2020-02-07 16:00",
        wochentag: "MO",
        color: "#4C95FF",
        ort: "in der olga",
        notiz: "so ist dat geil"
      },
      {
        name: "sa",
        start: "2020-02-08 08:00",
        end: "2020-02-08 16:00",
        wochentag: "MO",
        color: "#4C95FF",
        ort: "in der olga",
        notiz: "so ist dat geil"
      },
      {
        name: "so",
        start: "2020-02-09 08:00",
        end: "2020-02-09 16:00",
        wochentag: "MO",
        color: "#4C95FF",
        ort: "in der olga",
        notiz: "so ist dat geil"
      }
    ]
  }),
  watch: {
    selectedOpen(val) {
      val || this.clearAndCloseModal();
    }
  },
  mounted() {
    this.$refs.calendar.scrollToTime("05:30");
    this.$refs.calendar.checkChange();
  },
  methods: {
    viewDay() {
      this.setToday();
      this.type = "day";
    },
    createEvent() {
      this.selectedOpen = true;
    },
    // updateRange({ start, end }) {
    //   this.start = start;
    //   this.end = end;
    // },
    getEventColor(event) {
      return event.color;
    },
    splitDayAndTime(dateTime) {
      let splittedDateTime = dateTime.split(" ");

      return [splittedDateTime[0], splittedDateTime[1]];
    },
    showEvent({ nativeEvent, event }) {
      const open = () => {
        this.selectedEvent = event;
        this.selectedEventIndex = this.events.indexOf(event);
        this.selectedElement = nativeEvent.target;
        let startDateTime = this.splitDayAndTime(this.selectedEvent.start);
        let endDateTime = this.splitDayAndTime(this.selectedEvent.end);

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
    validateEvent() {
      if (!this.selectedEvent.wochentag) {
        this.text = "Wochentag muss eingetragen sein";
        this.snackbar = true;
        return true;
      }
      if (!this.selectedEvent.startTime || !this.selectedEvent.endTime) {
        this.text = "Zeiten dürfen nicht leer sein";
        this.snackbar = true;
        return true;
      }
      if (this.selectedEvent.startTime > this.selectedEvent.endTime) {
        this.text = "Start muss vor Ende liegen du GEILE SAU!";
        this.snackbar = true;
        return true;
      }
      return false;
    },
    updateEvent() {
      if (this.validateEvent()) {
        return;
      }
      let startTime;
      let endTime;

      startTime = [
        this.mapping[this.selectedEvent.wochentag],
        this.selectedEvent.startTime
      ].join(" ");
      endTime = [
        this.mapping[this.selectedEvent.wochentag],
        this.selectedEvent.endTime
      ].join(" ");
      let updatedEvent = {
        name: this.selectedEvent.name,
        start: startTime,
        end: endTime,
        wochentag: this.selectedEvent.wochentag,
        color: "#4C95FF",
        ort: this.selectedEvent.ort,
        notiz: this.selectedEvent.notiz
      };
      if (this.selectedEventIndex != -1) {
        this.events.splice(this.selectedEventIndex, 1);
      }
      this.events.push(updatedEvent);
      this.clearAndCloseModal();
    },
    setToday() {
      let currentDate = new Date();
      let wochentag = currentDate.getDay();
      this.focus = this.mapping2[wochentag];
    },
    prev() {
      let wochentag = new Date(this.focus).getDay();
      if (wochentag == 0) {
        this.focus = this.mapping2[6];
      } else {
        this.focus = this.mapping2[wochentag - 1];
      }
    },
    next() {
      let wochentag = new Date(this.focus).getDay();
      if (wochentag == 6) {
        this.focus = this.mapping2[0];
      } else {
        this.focus = this.mapping2[wochentag + 1];
      }
    },
    checkHeader(w) {
      if (this.type == "week") {
        return true
      }
      let wochentag = new Date(this.focus).getDay();
      if (w == wochentag) {
        return true
      }
      return false
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