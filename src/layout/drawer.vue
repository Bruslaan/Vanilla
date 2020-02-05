<template>
  <v-navigation-drawer v-model="drawer" mobile-break-point="900" left app>
    <template v-slot:prepend>
      <v-list-item two-line>
        <v-list-item-avatar>
          <img src="https://randomuser.me/api/portraits/women/81.jpg" />
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>{{$store.getters["user/name"]}}</v-list-item-title>
          <v-list-item-subtitle>Status oder So</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </template>

    <v-divider></v-divider>

    <v-list dense>
      <ListItem v-for="route in routes" :key="route.path" :item="route"  :base-path="route.path" />
    </v-list>
  </v-navigation-drawer>
</template>
<script>
import ListItem from "./drawer_list_item";
export default {
  components: { ListItem },
  computed: {
    routes() {
      console.log(this.$router.options.routes);
      return this.$router.options.routes;
    }
  },
  props: {
    value: Boolean
  },
  watch: {
    value: function() {
      this.drawer = this.value;
    },
    drawer: function() {
      this.$emit("input", this.drawer);
    }
  },
  data() {
    return {
      drawer: true
    };
  }
};
</script>