<template>
  <div>
    <h1 class="ml-3">Stammdaten</h1>
    <v-card color="basil" flat>
      <v-layout wrap class="pa-3 mt-5">
        <v-row>
          <Informationen :data="PersonalInformation" text="Personal Information" />
          <Informationen :data="AndereInformationen" text="Andere Information" />
          <Informationen :data="AndereInformationen" text="Bank Daten" />
        </v-row>
      </v-layout>
    </v-card>
  </div>
</template>

<script>
import Informationen from "../components/Informationen";
export default {
  components: { Informationen },
  data() {
    return {
      PersonalInformation: {
        Vorname: "Josef",
        Nachname: "Meier",
        Wohnort: "Maraschki Straße 12",
        SteuerID: 12
      },
      AndereInformationen: {
        Bank: "Mascha Kascha",
        "Name des Kontoinhabers": "Meier",
        IBAN: "as123asdRoll",
        BIC: "22222"
      }
    };
  }
};
</script>

<style>
</style>