<script>
import InformationenFranzi from "../components/InformationenFranzi";
export default {
  components: { InformationenFranzi },
  data() {
    return {
      tab: null,
      items: ["Info", "Anwesenheit", "Abwesenheit", "Rollen", "Vertrag"],
      // PersonalInformation: {
      //   Vorname: "Josef",
      //   Nachname: "Meier",
      //   Wohnort: "Maraschki Straße 12",
      //   SteuerID: 12
      // },
      // AndereInformationen: {
      //   Bank: "Mascha Kascha",
      //   "Name des Kontoinhabers": "Meier",
      //   IBAN: "as123asdRoll",
      //   BIC: "22222"
      // },
      InfoFields: {
        Account: [
          {
            name: "Account Email",
            type: "email",
            value: "franzi@vanillasoftware.de"
          },
          {
            name: "Passwort",
            type: "text",
            value: "Halllllllllo"
          }
        ],
        "Persönliche Angaben": [
          {
            name: "Anrede",
            type: "select",
            options: ["Herr", "Frau"],
            value: "Herr"
          },
          { name: "Vorname", type: "text", value: "Fra" },
          { name: "Nachname", type: "text", value: "nzi" },
          { name: "Geburtsdatum", type: "date", value: "1988-01-01" },
          { name: "Nationalität", type: "text", value: "ITA" },
          { name: "Geburtsort", type: "text", value: "Burg" },
          {
            name: "Status",
            type: "select",
            options: ["Ledig", "Verheiratet"],
            value: "Ledig"
          }
        ],
        "Adresse & Kontakt": [
          { name: "Straße", type: "text", value: "Franzisstraße" },
          { name: "Nr.", type: "number", value: "1337" },
          { name: "Postleitzahl", type: "number", value: "85521" },
          { name: "Ort", type: "text", value: "MUC" },
          { name: "Private Email", type: "email", value: "franzi@franzi.de" },
          { name: "Telefon", type: "number", value: "089123123" },
          { name: "Mobilfunknummer", type: "number", value: "0160123123" }
        ],
        Rechnungsanschrift: [
          { name: "Bank", type: "text", value: "Die Beste Bank" },
          { name: "IBAN", type: "text", value: "DE13371337133713371337" },
          { name: "BIC", type: "text", value: "98765432" }
        ],
        Zusatz: [
          {
            name: "Notiz",
            type: "textarea",
            value: "franzi du geile Schlange, keiner kann so oft und so lange!"
          }
        ]
      }
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
        <v-tab-item>
          <v-card color="basil" flat>
            <v-layout wrap class="pa-3 mt-5">
              <v-row>
                <InformationenFranzi v-for="(item, index) of Object.keys(InfoFields)" :key="index" :data="InfoFields[item]" :text="item"></InformationenFranzi>
                <!-- <Informationen :data="PersonalInformation" text="Personal Information"/>
                <Informationen :data="AndereInformationen" text="Andere Information"/>
                <Informationen :data="AndereInformationen" text="Bank Daten"/>-->
              </v-row>
            </v-layout>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card color="basil" flat>
            <v-layout wrap class="pa-3 mt-5">TAB 2</v-layout>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card color="basil" flat>
            <v-layout wrap class="pa-3 mt-5">TAB 3</v-layout>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card color="basil" flat>
            <v-layout wrap class="pa-3 mt-5">TAB 4 ETC</v-layout>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </div>
</template>