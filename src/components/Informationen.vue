<template>
  <div>
    <v-layout wrap class="pa-3 mt-5">
      <v-row>
        <v-col cols="12" sm="12" md="6" lg="6">
          <v-row class="ml-3">
            <p>Persönliche Daten</p>
            <v-spacer></v-spacer>
            <v-btn @click="edit = !edit" text small color="grey darken-1">
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
          </v-row>

          <v-divider></v-divider>
          <div class="ml-3">
            <v-row class>
              <v-col>Vorname</v-col>
              <v-col v-if="edit">
                <v-text-field flat outlined single-line hide-details dense value="Josef"></v-text-field>
              </v-col>
              <v-col v-else>Josef</v-col>
            </v-row>
            <v-row class>
              <v-col>Nachname</v-col>
              <!-- <v-col>Meier</v-col> -->
              <v-col v-if="edit">
                <v-text-field flat outlined single-line hide-details dense value="Meier"></v-text-field>
              </v-col>
              <v-col v-else>Meier</v-col>
            </v-row>
            <v-row class>
              <v-col>Straße</v-col>
              <v-col v-if="edit">
                <v-text-field flat outlined single-line hide-details dense value="Kartoschka"></v-text-field>
              </v-col>
              <v-col v-else>Kartoschka</v-col>
            </v-row>
            <v-row class>
              <v-col>Stadt</v-col>
              <v-col v-if="edit">
                <v-text-field flat outlined single-line hide-details dense value="Josef"></v-text-field>
              </v-col>
              <v-col v-else>Josef</v-col>
            </v-row>
            <v-row class>
              <v-col>PLZ</v-col>
              <v-col v-if="edit">
                <v-text-field flat outlined single-line hide-details dense value="Josef"></v-text-field>
              </v-col>
              <v-col v-else>Josef</v-col>
            </v-row>
            <v-row class>
              <v-col>Vorname</v-col>
              <v-col v-if="edit">
                <v-text-field flat outlined single-line hide-details dense value="Josef"></v-text-field>
              </v-col>
              <v-col v-else>Josef</v-col>
            </v-row>
            <v-row class>
              <v-col>Vorname</v-col>
              <v-col v-if="edit">
                <v-text-field flat outlined single-line hide-details dense value="Josef"></v-text-field>
              </v-col>
              <v-col v-else>Josef</v-col>
            </v-row>
          </div>
        </v-col>
        <v-col cols="12" sm="12" md="6" lg="6">
          <p class="ma-3">Personalinformationen</p>
          <v-divider></v-divider>
          <div class="ml-3">
            <v-row class>
              <v-col>Vorname</v-col>
              <v-col>Josef</v-col>
            </v-row>
            <v-row class>
              <v-col>Nachname</v-col>
              <v-col>Meier</v-col>
            </v-row>
            <v-row class>
              <v-col>Straße</v-col>
              <v-col>Josef Meier</v-col>
            </v-row>
          </div>
        </v-col>
        <v-col cols="12" sm="12" md="6" lg="6">
          <p class="ma-3">Personalinformationen</p>
          <v-divider></v-divider>
          <div class="ml-3">
            <v-row class>
              <v-col>Vorname</v-col>
              <v-col>Josef</v-col>
            </v-row>
            <v-row class>
              <v-col>Nachname</v-col>
              <v-col>Meier</v-col>
            </v-row>
            <v-row class>
              <v-col>Straße</v-col>
              <v-col>Josef Meier</v-col>
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