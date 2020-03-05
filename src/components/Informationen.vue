<template>
  <div>
    <v-layout wrap class="pa-3 mt-5">
      <v-row>
        <v-col v-for="item in 8"  :key="item" cols="12" sm="12" md="6" lg="6">
          <v-row class="ml-3">
            <p>Persönliche Daten</p>
            <v-spacer></v-spacer>
            <v-btn @click="edit = !edit" text small color="grey darken-1">
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
          </v-row>

          <v-divider></v-divider>
          <div class="ml-3">
            <v-row class="mb-1" v-for="item in 4" :key="item" no-gutters>
              <v-col cols="12" sm="12" lg="6"><h4>Vorname</h4></v-col>
              <v-col cols="12" sm="12" lg="6" v-if="edit">
                <v-text-field flat outlined single-line hide-details dense value="Josef"></v-text-field>
              </v-col>
              <v-col v-else>Josef</v-col>
            </v-row>
            <v-row v-if="edit">
              <v-spacer></v-spacer>
              <v-btn outlined text class="mr-3">Abbrechen</v-btn>
              <v-btn outlined text class="mr-3">Save</v-btn>
            </v-row>
          </div>
        </v-col>
        
      </v-row>
    </v-layout>
  </div>
</template>

<script>
export default {
  data() {
    return {
      edit: false
    };
  }
};
</script>

<style>
</style>