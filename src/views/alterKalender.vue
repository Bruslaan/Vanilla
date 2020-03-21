<template>
  <div>
    <!-- CALENDAR TOOLBAR -->
    <v-sheet tile height="60" color="grey lighten-3" class="d-flex">
      <v-toolbar flat color="white">
       
        <v-btn icon class="ma-2" @click="$refs.calendar.prev()">
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
         <v-btn text class="ma-2" color="grey darken-2" @click="setToday">Today</v-btn>
        <v-btn icon class="ma-2" @click="$refs.calendar.next()">
          <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
        <v-toolbar-title class="ma-2">{{ title }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-select
          v-model="type"
          :items="types"
          dense
          outlined
          hide-details
          class="ma-2"
          label="Ansicht"
        ></v-select>
      </v-toolbar>
    </v-sheet>

    <!-- CALENDAR -->
    <v-sheet height="85vh">
      <v-calendar
        ref="calendar"
        colors
        v-model="focus"
        :now="today"
        :events="events"
        color="primary"
        :type="type"
        :event-color="getEventColor"
        :weekdays="weekday"
        :interval-format="intervalFormat"
        @click:event="showEvent"
        @mouseenter:event="eventLock=true"
        @mouseleave:event="eventLock=false"
        @mousedown:time="startEvent"
        @mouseup:time="endEvent"
        @mousedown:day="startAlldayEvent"
        @mouseup:day="endAlldayEvent"
        @change="updateRange"
      ></v-calendar>

      <!-- EVENT MENU -->
      <v-menu
        v-model="selectedOpen"
        :close-on-content-click="false"
        :activator="selectedElement"
        offset-x
      >
        <v-card color="grey lighten-4" flat>
          <!-- EVENT TITLE TOOLBAR -->
          <v-toolbar dark>
            <!-- <v-toolbar-title>{{ selectedEvent.name }}</v-toolbar-title> -->
            <v-select
              v-model="was"
              :items="was2"
              dense
              outlined
              hide-details
              class="mr-5"
              label="Erfassung"
            ></v-select>
            <v-spacer></v-spacer>
            <v-btn fab dark small @click="selectedOpen = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar>

          <!-- MAYBE DATEPICKER ??????? -->
          <!-- <v-menu
            v-model="picker"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field v-model="startEventDay" prepend-icon="event" readonly v-on="on"></v-text-field>
            </template>
            <v-date-picker v-model="startEventDay" @input="picker = false"></v-date-picker>
          </v-menu>-->

          <!-- EVENT CONTENT -->
          <v-expand-transition>
            <v-row v-if="was=='Abwesenheit'">
              <v-col cols="6">
                <v-list-item>
                  <v-select
                    v-model="grund"
                    :items="gruende"
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
                <input class="pa-2" type="date" v-model="startEventDay">
              </v-list-item>
              <v-list-item v-if="was=='Anwesenheit'">
                <v-icon>mdi-clock</v-icon>
                <input
                  class="pa-2"
                  type="time"
                  id="appt"
                  name="appt"
                  min="00:00"
                  max="23:59"
                  v-model="startEventTime"
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
                <input class="pa-2" type="date" v-model="endEventDay">
              </v-list-item>
              <v-list-item v-if="was=='Anwesenheit'">
                <v-icon>mdi-clock</v-icon>
                <input
                  class="pa-2"
                  type="time"
                  id="appt"
                  name="appt"
                  min="00:00"
                  max="23:59"
                  v-model="endEventTime"
                >
              </v-list-item>
            </v-col>
          </v-row>
          <v-card-actions>
            <v-btn text color="primary" @click="SaveEditedEvent">Speichern</v-btn>
            <v-spacer></v-spacer>
            <v-btn dark small class="mr-1" color="red" @click="DeleteEditedEvent">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-menu>
    </v-sheet>
  </div>
</template>

<script>
export default {
  data: () => ({
    fab: false,
    focus: "",
    grund: "Urlaub",
    gruende: ["Urlaub", "Krankheit", "Feiertag"],
    was: "Anwesenheit",
    was2: ["Anwesenheit", "Abwesenheit"],
    type: "week",
    types: ["week", "month"],
    picker: false,
    holdingButton: false,
    eventLock: false,
    selectedIndex: -1,
    selectedOpen: false,
    newEvent: {},
    selectedEvent: {},
    selectedElement: null,
    value: "",
    start: null,
    end: null,
    weekday: [1, 2, 3, 4, 5, 6, 0],
    events: []
  }),

  computed: {
    startEventTime: {
      set: function(value) {
        if (this.selectedEvent.start) {
          console.log(value);
          this.selectedEvent.start =
            this.selectedEvent.start.split(" ")[0] + " " + value;
        }
      },
      get: function() {
        if (this.selectedEvent.start) {
          let selectedEventStartTime = this.selectedEvent.start.split(" ");
          return selectedEventStartTime[1] || "08:00";
        }
        return "00:00";
      }
    },
    endEventTime: {
      set: function(value) {
        if (this.selectedEvent) {
          console.log(value);
          this.selectedEvent.end =
            this.selectedEvent.end.split(" ")[0] + " " + value;
        }
      },
      get: function() {
        if (this.selectedEvent.end) {
          let selectedEventStartTime = this.selectedEvent.end.split(" ");
          return selectedEventStartTime[1] || "12:00";
        }
        return "00:00";
      }
    },
    startEventDay: {
      set: function(value) {
        if (this.selectedEvent) {
          console.log(value);
          this.selectedEvent.start =
            value + " " + this.selectedEvent.start.split(" ")[1];
        }
      },
      get: function() {
        if (this.selectedEvent.start) {
          let selectedEventStartDay = this.selectedEvent.start.split(" ");

          return selectedEventStartDay[0];
        }
        return "2020-01-01";
      }
    },
    endEventDay: {
      set: function(value) {
        if (this.selectedEvent) {
          console.log(value);
          this.selectedEvent.end =
            value + " " + this.selectedEvent.end.split(" ")[1];
        }
      },
      get: function() {
        if (this.selectedEvent.end) {
          let selectedEventEndDay = this.selectedEvent.end.split(" ");

          return selectedEventEndDay[0];
        }
        return "2020-01-01";
      }
    },
    monthFormatter() {
      return this.$refs.calendar.getFormatter({
        timeZone: "UTC",
        month: "long"
      });
    },
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
    }
  },
  methods: {
    SaveEditedEvent() {
      if (this.was == "Abwesenheit") {
        console.log(this.selectedEvent);

        try {
          this.selectedEvent.start = this.selectedEvent.start.split(" ")[0];
          this.selectedEvent.end = this.selectedEvent.end.split(" ")[0];
        } catch {
          console.log("es gibt kein split");
        }
        console.log("vor", this.selectedEvent);

        this.selectedEvent.name = this.grund;
      }
      if (this.was == "Anwesenheit") {
        this.selectedEvent.name = "Arbeit";
        this.selectedEvent.start =
          this.selectedEvent.start.split(" ")[0] + " " + this.startEventTime;
        this.selectedEvent.end =
          this.selectedEvent.end.split(" ")[0] + " " + this.endEventTime;
      }
      this.selectedEvent.art = this.was;
      this.events.splice(this.selectedIndex, 1);
      console.log("nach", this.selectedEvent);

      this.events.push(this.selectedEvent);
      this.selectedEvent = {};
      this.selectedIndex = -1;
      this.selectedOpen = false;
      // this.events.
    },
    DeleteEditedEvent() {
      this.events.splice(this.selectedIndex, 1);
      this.selectedEvent = {};
      this.selectedIndex = -1;
      this.selectedOpen = false;
    },
    intervalFormat(interval) {
      return interval.time;
    },
    getEventColor(event) {
      return event.color;
    },
    setToday() {
      this.focus = this.today;
    },
    showEvent({ nativeEvent, event }) {
      this.was = event.art;
      const open = () => {
        this.selectedEvent = event;
        this.selectedIndex = this.events.indexOf(event);
        this.selectedElement = nativeEvent.target;
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
    startAlldayEvent(event) {
      if (!this.eventLock) {
        this.holdingButton = true;
        this.newEvent["art"] = "Abwesenheit";
        this.newEvent["name"] = "Urlaub";
        this.newEvent["start"] = event.date;
        this.newEvent["color"] = "rgba(25, 118, 210,1)";
      }
    },
    endAlldayEvent(event) {
      if (this.holdingButton) {
        this.holdingButton = false;
        this.newEvent["end"] = event.date;
        this.events.push(this.newEvent);
        this.newEvent = {};
      }
    },
    startEvent(time) {
      if (!this.eventLock) {
        let timeSplit = time.time.split(":");
        let newmin = (Math.round(timeSplit[1] / 15) * 15) % 60;
        if (newmin == "0") {
          newmin = "00";
        }
        let h =
          timeSplit[1] > 52
            ? timeSplit[0] === 23
              ? 0
              : ++timeSplit[0]
            : timeSplit[0];

        let roundedTime = h + ":" + newmin;

        let newTime = time.date + " " + roundedTime;
        this.newEvent["art"] = "Anwesenheit";
        this.newEvent["name"] = "newEvent";
        this.newEvent["start"] = newTime;
        this.newEvent["color"] = "rgba(25, 118, 210,0.2)";
        this.newEvent["end"] = newTime;
        this.events.push(this.newEvent);
        this.holdingButton = true;
      }
    },

    buildingEvent() {
      //time in den klammern?
      // if (this.newEvent.start && this.holdingButton) {
      //   let timeSplit = time.time.split(":");
      //   let newmin = (Math.round(timeSplit[1] / 15) * 15) % 60;
      //   if (newmin == "0") {
      //     newmin = "00";
      //   }
      //   let h =
      //     timeSplit[1] > 52
      //       ? timeSplit[0] === 23
      //         ? 0
      //         : ++timeSplit[0]
      //       : timeSplit[0];
      //   let roundedTime = h + ":" + newmin;
      //   let newTime = time.date + " " + roundedTime;
      //   let oldEventIndex = this.events.findIndex(x => x.name === "newEvent");
      //   let oldEvent = this.events[
      //     this.events.findIndex(x => x.name === "newEvent")
      //   ];
      //   this.events[this.events.findIndex(x => x.name === "newEvent")][
      //     "end"
      //   ] = newTime;
      //   oldEvent["end"] = newTime;
      //   this.events.splice(oldEventIndex, 1);
      //   this.events.push(oldEvent);
      // }
    },
    endEvent(time) {
      if (this.newEvent.start) {
        let oldEvent = this.events[
          this.events.findIndex(x => x.name === "newEvent")
        ];

        let timeSplit = time.time.split(":");
        let newmin = (Math.round(timeSplit[1] / 15) * 15) % 60;
        if (newmin == "0") {
          newmin = "00";
        }
        let h =
          timeSplit[1] > 52
            ? timeSplit[0] === 23
              ? 0
              : ++timeSplit[0]
            : timeSplit[0];

        let roundedTime = h + ":" + newmin;

        let newTime = time.date + " " + roundedTime;
        let oldEventIndex = this.events.findIndex(x => x.name === "newEvent");

        this.events[this.events.findIndex(x => x.name === "newEvent")][
          "color"
        ] = this.newEvent["color"] = "rgba(25, 118, 210,1)";

        this.events[this.events.findIndex(x => x.name === "newEvent")][
          "end"
        ] = newTime;
        this.events[this.events.findIndex(x => x.name === "newEvent")]["name"] =
          "Arbeit";

        oldEvent["end"] = newTime;

        this.events.splice(oldEventIndex, 1);
        this.events.push(oldEvent);
        this.holdingButton = false;
        this.newEvent = {};
      }
    },
    updateRange({ start, end }) {
      this.start = start;
      this.end = end;
    }
  },

  mounted() {
    this.$refs.calendar.scrollToTime("08:00");
    this.$refs.calendar.checkChange();
  }
};
</script>

<style>
::selection {
  background-color: initial;
  color: inherit;
  text-shadow: initial;
}
</style>
