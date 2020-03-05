<script>
import Informationen from "../components/Informationen";
export default {
  components: { Informationen },
  data() {
    return {
      tab: null,
      items: ["Information", "Anwesenheit", "Abwesenheit", "Rollen"]
    };
  }
};
</script>
<style>
</style>

<template>
  <div>
    <v-card outlined>
      <v-card-title class="text-center justify-center py-6">
        <v-row align="center">
          <v-avatar class="ma-4" size="90">
            <v-img :src="$store.getters['user/avatar']" alt="John">
              <template v-slot:placeholder>
                <v-row class="fill-height ma-0" align="center" justify="center">
                  <v-progress-circular indeterminate color="grey lighten-2"></v-progress-circular>
                </v-row>
              </template>
            </v-img>
          </v-avatar>
          <!-- <a @click="$router.push('/profilePage')" class="ml-2">{{item.name}}</a> -->

          <h1 class="font-weight-bold display-1">Dei Mudda</h1>
        </v-row>
      </v-card-title>

      <v-tabs v-model="tab" centered grow background-color="light-grey">
        <v-tab v-for="item in items" :key="item">{{ item }}</v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab">
        <v-tab-item v-for="item in items" :key="item">
          <v-card color="basil" flat>
            <Informationen />
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </div>
</template>