<template>
  <v-row class="fill-height">
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
    <v-col>
      <v-sheet height="64">
        <v-toolbar flat color="white">
          <v-btn fab text small color="grey darken-2" @click="prev">
            <v-icon small>mdi-chevron-left</v-icon>
          </v-btn>
          <v-btn text color="grey darken-2" @click="setToday">Today</v-btn>
          <v-btn fab text small color="grey darken-2" @click="next">
            <v-icon small>mdi-chevron-right</v-icon>
          </v-btn>
          <v-toolbar-title>{{ title }}</v-toolbar-title>
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
      </v-sheet>
      <v-sheet height="600">
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
              <v-row v-show="selectedEvent.type=='Abwesenheit'">
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
                  <input class="pa-2" type="date" v-model="selectedEvent.startDay" />
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
                  />
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
                  <input class="pa-2" type="date" v-model="selectedEvent.endDay" />
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
                  />
                </v-list-item>
              </v-col>
            </v-row>
            <v-card-actions>
              <v-btn text color="primary" @click="updateEvent">Speichern</v-btn>
              <v-spacer></v-spacer>
              <v-btn v-if="!dontShowDelete" dark fab small class="mr-1" color="red" @click="deleteEvent">
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

    typeToLabel: {
      month: "Month",
      week: "Week",
      day: "Day",
      "4day": "4 Days"
    },
    start: null,
    end: null,
    selectedEvent: {},
    selectedEventIndex: -1,
    selectedElement: null,
    selectedOpen: false,
    renderEvent: false,
    eventToRender: null,
    eventHovered: false,
    dontShowDelete: false, 
    events: [
      {
        name: "Weekly Meeting",
        start: "2020-02-11",
        end: "2020-02-12",
        color: "primary",
        type: "Abwesenheit"
      },
      {
        name: "Weekly Meeting",
        start: "2020-02-13 12:00",
        end: "2020-02-13 13:00",
        color: "primary",
        type: "Anwesenheit"
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
    monthFormatter() {
      return this.$refs.calendar.getFormatter({
        timeZone: "UTC",
        month: "long"
      });
    }
  },
  mounted() {
    this.$refs.calendar.checkChange();
  },
  methods: {
    createEvent() {
      this.selectedOpen = true;
      this.dontShowDelete = true;
    },
    startCreating({ date, time }) {
      if (this.eventHovered) {
        return;
      }
      let newEvent = {
        name: "New Event",
        start: [date, time].join(" "),
        end: [date, time].join(" "),
        color: "primary",
        type: "Anwesenheit"
      };
      this.events.push(newEvent);
      this.renderEvent = true;
    },
    endCreating() {
      // console.log("time", time);
      this.renderEvent = false;
    },
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
      this.dontShowDelete = false;
    },
    validateAnwesenheit() {
      if (this.selectedEvent.startTime && this.selectedEvent.endTime) {
        return true;
      }
      return false;
    },
    updateEvent() {
      let startTime;
      let endTime;

      if (
        this.selectedEvent.type == "Anwesenheit" &&
        this.validateAnwesenheit()
      ) {
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

      let updatedEvent = {
        name: "Weekly Meeting",
        start: startTime,
        end: endTime,
        color: "red",
        type: this.selectedEvent.type,
        abwesenheitsGrund: this.selectedEvent.abwesenheitsGrund
      };
      this.events.splice(this.selectedEventIndex, 1);
      this.events.push(updatedEvent);

      this.clearAndCloseModal();
    }
  }
};
</script>

<style  scoped>
.floating_action_button {
  position: absolute;
  bottom: 0px;
  right: 28px;
  transform: translate(0px, -28px);
  z-index: 900;
}
</style>