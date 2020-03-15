<template>
  <div>
    <v-progress-circular :rotate="360" :size="100" :width="15" :value="20" color="teal">{{ 20 }}</v-progress-circular>
  </div>
</template>

<script>
export default {
  props: {
    events: {
      type: Array,
      required: true
    },
    Urlaubsanspruch: {
        type: Array,
        required: true
    }
  }
};
</script>


