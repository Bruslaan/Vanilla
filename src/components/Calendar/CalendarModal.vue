<template>
  <v-row justify="center">

  </v-row>
</template>

<script>
export default {
  methods:{
    saveEvent(){
      this.editedEvent = this.event
     let newEvent = this.editedEvent
     let newYear = this.dates[0].split("-")[0]
     let newMonth = this.dates[0].split("-")[1]
     let newDay = this.dates[0].split("-")[2]
     let newEndYear = this.dates[1].split("-")[0]
     let newEndMonth= this.dates[1].split("-")[1]
     let newEndDay = this.dates[1].split("-")[2]
     newEvent.start = new Date(newYear,newMonth,newDay)
     newEvent.end = new Date(newEndYear,newEndMonth,newEndDay)
     console.log(this.editedEvent)
     console.log(newEvent)
       this.$emit("eventChanged", newEvent);
    }
  },
  props: {
    value: Boolean,
    event: {
      type: Object,
    }
  },
  watch: {
    value() {
      if (this.value) {
        if (this.event) {
          console.log(this.event)
          let selectedEventDateStart = this.event.start;
          let selectedEventDateEnd = this.event.end;

          console.log(selectedEventDateEnd)
          let startYear = selectedEventDateStart.getFullYear();
          let startMonth = selectedEventDateStart.getMonth() + 1;
          let startDay = selectedEventDateStart.getDate();

          let endYear = selectedEventDateEnd.getFullYear();
          let endMonth = selectedEventDateEnd.getMonth() + 1;
          let endDay = selectedEventDateEnd.getDate();

          if (startMonth < 10) startMonth = "0" + startMonth;
          if (startDay < 10) startDay = "0" + startDay;
          if (endMonth < 10) endMonth = "0" + endMonth;
          if (endDay < 10) endDay = "0" + endDay;

          let start = [startYear, startMonth, startDay].join("-");
          let end = [endYear, endMonth, endDay].join("-");
        
          
          this.dates = [start, end];
          
        }
      }
    }
  },
  computed: {
    dateRangeText() {
      return this.dates.join(" bis ");
    },
    show: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      }
    }
  },
  data: () => ({
    dates: ["2019-09-10", "2019-09-20"],
    menu: false,
    modal: false,
    menu2: false,
    editedEvent: null
  })
};
</script>