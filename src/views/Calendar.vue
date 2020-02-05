<template>
  <div class="calenderContainer">
    <FullCalendar
      ref="fullCalendar"
      defaultView="timeGridWeek"
      :editable="true"
      :selectable="true"
      :header="{
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
      }"
      :plugins="calendarPlugins"
      :events="events"
      :selectMirror="true"
      @select="handleDateClick"
      @eventDrop="updateEvent"
      @eventResize="updateEvent"
    />
  </div>
</template>

<script>
import FullCalendar from "@fullcalendar/vue";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

export default {
  components: {
    FullCalendar // make the <FullCalendar> tag available
  },
  data: function() {
    return {
      events: [],
      calendarPlugins: [
        // plugins must be defined in the JS
        dayGridPlugin,
        timeGridPlugin,
        interactionPlugin // needed for dateClick
      ]
    };
  },
  watch: {},

  methods: {
    updateEvent(arg) {
      console.log("Event Drop");

      let index = this.events.findIndex(_event => _event.id == arg.event.id);

      this.events[index].title = arg.event.title;
      this.events[index].start = arg.event.start;
      this.events[index].end = arg.event.end;

      // this.$store.commit("UPDATE_EVENT", arg.event);
    },
    handleDateClick(arg) {
      this.events.push({
        id: new Date().getTime(),
        title: "Something",
        start: arg.start,
        end: arg.end,
        allDay: arg.allDay
      });
    }
  }
};
</script>

<style lang='scss'>
// you must include each plugins' css
// paths prefixed with ~ signify node_modules
@import "~@fullcalendar/core/main.css";
@import "~@fullcalendar/daygrid/main.css";
@import "~@fullcalendar/timegrid/main.css";

.calenderContainer {
  // font-family: Arial, Helvetica Neue, Helvetica, sans-serif;
  font-size: 14px;
  // margin-top: 14px;
  // height: 100vh;
}
</style>