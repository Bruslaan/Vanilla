<template>
  <div class="calenderContainer">
    <!-- Modal -->

    <v-dialog v-model="modalOpen" persistent max-width="350px">
      <v-card>
        <v-card-title>
          <span class="headline">Abwesenheit</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="12">
                <v-select :items="['Urlaub','Krankheit','Feiertag']" label="Grund" required></v-select>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-menu
                  ref="menu"
                  v-model="menu"
                  :close-on-content-click="false"
                  :return-value.sync="dates"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field v-model="dateRangeText" label="Datum" readonly v-on="on"></v-text-field>
                  </template>
                  <v-date-picker range v-model="dates" no-title scrollable>
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
                    <v-btn text color="primary" @click="$refs.menu.save(dates)">OK</v-btn>
                  </v-date-picker>
                </v-menu>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="modalOpen = false">Close</v-btn>
          <v-btn color="blue darken-1" text @click="newEventSaved">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <FullCalendar
      height="parent"
      ref="fullCalendar"
      defaultView="timeGridWeek"
      :editable="true"
      :selectable="true"
      :header="{
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
      }"
      locale="de"
      locales="de"
      :plugins="calendarPlugins"
      :events="events"
      :selectMirror="true"
      @select="handleDateClick"
      @eventDrop="updateEvent"
      @eventResize="updateEvent"
      @eventClick="handleEventClick"
      eventColor="light-blue"
      eventTextColor="white"
    />
  </div>
</template>

<script>
import FullCalendar from "@fullcalendar/vue";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
// import CalendarModal from "../components/Calendar/CalendarModal";
// import esLocale from '@fullcalendar/core/locales/de';

export default {
  components: {
    FullCalendar
    // CalendarModal // make the <FullCalendar> tag available
  },
  data: function() {
    return {
      modalOpen: false,
      events: [],
      calendarPlugins: [
        // plugins must be defined in the JS
        dayGridPlugin,
        timeGridPlugin,
        interactionPlugin // needed for dateClick
      ],
      selectedEvent: null,
      dates: ["2019-09-10", "2019-09-20"],
      menu: false,
      modal: false,
      menu2: false,
      editedIndex: -1
    };
  },
  computed: {
    dateRangeText() {
      return this.dates.join(" bis ");
    }
  },
  watch: {},
  methods: {
    editItem(item) {
      this.editedIndex = this.events.indexOf(item);
      this.selectedEvent = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.events.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.events.splice(index, 1);
    },

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.selectedEvent = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.events[this.editedIndex], this.selectedEvent);
      } else {
        this.events.push(this.selectedEvent);
      }
      this.close();
    },

    newEventSaved() {
      console.log(this.dates);

      this.selectedEvent.start.setYear(this.dates[0].split("-")[0]);
      this.selectedEvent.start.setMonth(this.dates[0].split("-")[1] - 1);
      this.selectedEvent.start.setDate(this.dates[0].split("-")[2]);

      this.selectedEvent.end.setYear(this.dates[1].split("-")[0]);
      this.selectedEvent.end.setMonth(this.dates[1].split("-")[1] - 1);
      this.selectedEvent.end.setDate(this.dates[1].split("-")[2]);

      Object.assign(this.events[this.editedIndex], this.selectedEvent);
      this.modalOpen = false
      console.log(this.events);
    },
    handleEventClick(e) {
      this.modalOpen = true;
      let editedEvent = {
        id: e.event.id,
        title: e.event.title,
        start: e.event.start,
        end: e.event.end,
        allDay: true
      };

      console.log(this.findWithAttr(this.events, "id", e.event.id));
      this.editedIndex = this.findWithAttr(this.events, "id", e.event.id);

      this.selectedEvent = Object.assign({}, editedEvent);
      // dates überschreiben

      let selectedEventDateStart = this.selectedEvent.start;
      let selectedEventDateEnd = this.selectedEvent.end;

      let startYear = selectedEventDateStart.getFullYear();
      let startMonth = selectedEventDateStart.getMonth() + 1;
      let startDay = selectedEventDateStart.getDate();

      let endYear = selectedEventDateEnd.getFullYear();
      let endMonth = selectedEventDateEnd.getMonth() + 1;
      let endDay = selectedEventDateEnd.getDate() - 1;

      if (startMonth < 10) startMonth = "0" + startMonth;
      if (startDay < 10) startDay = "0" + startDay;
      if (endMonth < 10) endMonth = "0" + endMonth;
      if (endDay < 10) endDay = "0" + endDay;

      let start = [startYear, startMonth, startDay].join("-");
      let end = [endYear, endMonth, endDay].join("-");

      this.dates = [start, end];
    },
    updateEvent(arg) {
      let index = this.events.findIndex(_event => _event.id == arg.event.id);
      this.events[index].title = arg.event.title;
      this.events[index].start = arg.event.start;
      this.events[index].end = arg.event.end;
    },
    handleDateClick(arg) {
      this.events.push({
        id: new Date().getTime(),
        title: "Arbeit",
        start: arg.start,
        end: arg.end,
        allDay: arg.allDay
      });
      let calendarApi = this.$refs.fullCalendar.getApi(); // from the ref="..."
      calendarApi.unselect();
    },
    findWithAttr(array, attr, value) {
      console.log(array);

      for (var i = 0; i < array.length; i += 1) {
        console.log(array[i][attr]);
        console.log(value);
        if (array[i][attr] == value) {
          return i;
        }
      }
      return -2;
    }
  }
};
</script>

<style lang='scss' scoped>
// you must include each plugins' css
// paths prefixed with ~ signify node_modules
@import "~@fullcalendar/core/main.css";
@import "~@fullcalendar/daygrid/main.css";
@import "~@fullcalendar/timegrid/main.css";

.calenderContainer {
  // font-family: Arial, Helvetica Neue, Helvetica, sans-serif;
  font-size: 14px;
  // margin-top: 14px;
  height: 90vh !important;
}
</style>