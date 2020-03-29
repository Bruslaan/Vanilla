<script>
import InformationenFranzi from "../components/InformationenFranzi";
import Abwesenheit from "../components/Abwesenheit/Abwesenheit";
import Anwesenheit from "../components/Anwesenheit/Anwesenheit";

export default {
  components: { InformationenFranzi, Anwesenheit, Abwesenheit },
  data() {
    return {
      tab: null,
      items: ["Info", "Anwesenheit", "Abwesenheit", "Dokumente", "Vertrag"],
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
      },
      VertragFields: {
        Vertrag: [
          {
            name: "Art",
            type: "select",
            options: [
              "Tarifvertrag",
              "Arbeitsvertrag",
              "Minijob",
              "Dienstvertrag",
              "unbestimmt"
            ],
            value: "Arbeitsvertrag"
          },
          {
            name: "Laufzeit",
            type: "select",
            options: ["befristet", "unbefristet"],
            value: "unbefristet"
          },
          { name: "Start", type: "date", value: "2019-05-01" },
          { name: "Ende", type: "date", value: "" },
          { name: "Probezeit", type: "text", value: "6 Monate" },
          { name: "Kündigunsfrist", type: "text", value: "3 Monate" }
        ],
        Stellenbeschreibung: [
          { name: "Position", type: "text", value: "CEO" },
          { name: "Tätigkeit", type: "text", value: "Unernehmensführung" },
          { name: "Abteilung", type: "text", value: "Vorstand" },
          {
            name: "Direkter Vorgesetzter",
            type: "select",
            options: [],
            value: ""
          }
        ],
        Tätigkeitsstätte: [
          { name: "1. Arbeitsort", type: "text", value: "München" },
          { name: "1. Adresse", type: "text", value: "BWLer Raum" },
          { name: "2. Arbeitsorit", type: "text", value: "Dahoam" },
          { name: "2. Adresse", type: "text", value: "MeineStraße" }
        ],
        Arbeitszeit: [
          {
            name: "Typ",
            type: "select",
            options: ["Vollzeit", "Teilzeit"],
            value: "Teilzeit"
          },
          {
            name: "Wochentage",
            type: "selectMultiple",
            options: ["MO", "DI", "MI", "DO", "FR", "SA", "SO"],
            value: ["SA", "SO"]
          },
          { name: "Wochenstunden", type: "number", value: "35" },
          { name: "Überstunden", type: "number", value: "5" }
        ],
        Vergütung: [
          {
            name: "Typ",
            type: "select",
            options: ["Pauschal", "Arbeitsstunden"],
            value: "Pauschal"
          },
          { name: "Monatslohn Brutto", type: "number", value: "10000" },
          { name: "Stundenlohn Brutto", type: "number", value: "" },
          {
            name: "Bonus",
            type: "selectMultiple",
            options: [
              "Geldprämie",
              "Weihnachtsgeld",
              "Gewinnbeteiligung",
              "Sachleistung"
            ],
            value: [
              "Geldprämie",
              "Weihnachtsgeld",
              "Gewinnbeteiligung",
              "Sachleistung"
            ]
          }
        ],
        Urlaubsanspruch: [
          { name: "Urlaubstage pro Monat", type: "number", value: "2.5" },
          { name: "Anzahl Feiertage pro Jahr", type: "number", value: "13" }
        ],
        Krankenkasse: [
          {
            name: "Typ",
            type: "select",
            options: ["Gesetzlich", "Privat", "befreit"],
            value: "Gesetzlich"
          },
          { name: "Name", type: "text", value: "HEK" },
          { name: "Einzugsstelle", type: "text", value: "???" },
          { name: "Versichertennummer", type: "text", value: "012312313" },
          { name: "Kartennummber", type: "text", value: "01234432" },
          { name: "Ablaufdatum", type: "date", value: "2025-01-01" }
        ],
        Steuer: [
          {
            name: "Steueridentifikationsnummer",
            type: "number",
            value: "123456789"
          },
          {
            name: "Steuerklasse",
            type: "select",
            options: ["1", "2", "3", "4", "5", "6"],
            value: "1"
          },
          {
            name: "Bundesland",
            type: "select",
            options: [
              "Baden-Württemberg",
              "Bayern",
              "Berlin",
              "Brandenburg",
              "Bremen",
              "Hamburg",
              "Hessen",
              "Mecklenburg-Vorpommern",
              "Niedersachsen",
              "Nordrhein-Westfalen",
              "Rheinland-Pfalz",
              "Saarland",
              "Sachsen",
              "Sachsen-Anhalt",
              "Schleswig-Holstein",
              "Thüringen"
            ],
            value: "Bayern"
          },
          { name: "Kirchensteuer in %", type: "number", value: "8" },
          { name: "Kinderfreibetrag", type: "text", value: "" }
        ],
        Zusatz: [
          {
            name: "Notiz",
            type: "textarea",
            value: "Geiler Vertrag"
          }
        ]
      },
      monatBestätigt: {
        "2020-03": true,
        "2020-04": true,
        "2020-05": true
      },
      events: [
        {
          name: "Arbeit",
          start: "2020-03-22 06:15",
          end: "2020-03-22 12:00",
          color: "#C5C5C5",
          type: "Anwesenheit",
          status: "angefragt",
          abwesenheitsGrund: "Arbeit"
        },
        {
          name: "Arbeit",
          start: "2020-03-23 06:15",
          end: "2020-03-23 12:00",
          color: "#C5C5C5",
          type: "Anwesenheit",
          status: "angefragt",
          abwesenheitsGrund: "Arbeit"
        },
        {
          name: "Arbeit",
          start: "2020-03-24 06:00",
          end: "2020-03-24 09:00",
          color: "#C5C5C5",
          type: "Anwesenheit",
          status: "angefragt",
          abwesenheitsGrund: "Arbeit"
        },
        {
          name: "Arbeit",
          start: "2020-03-24 15:00",
          end: "2020-03-24 16:00",
          color: "#C5C5C5",
          type: "Anwesenheit",
          status: "angefragt",
          abwesenheitsGrund: "Arbeit"
        },
        {
          name: "Urlaub",
          start: "2019-12-25",
          end: "2020-01-01",
          color: "#C5C5C5",
          type: "Abwesenheit",
          status: "bestätigt",
          abwesenheitsGrund: "Urlaub"
        },
        {
          name: "Urlaub",
          start: "2020-02-17",
          end: "2020-02-18",
          color: "#C5C5C5",
          type: "Abwesenheit",
          status: "bestätigt",
          abwesenheitsGrund: "Urlaub"
        },
        {
          name: "Urlaub",
          start: "2020-05-15",
          end: "2020-05-16",
          color: "#FFB63D",
          type: "Abwesenheit",
          status: "storniert",
          abwesenheitsGrund: "Urlaub"
        },
        {
          name: "Urlaub",
          start: "2020-01-10",
          end: "2020-01-15",
          color: "#FFB63D",
          type: "Abwesenheit",
          status: "bestätigt",
          abwesenheitsGrund: "Urlaub"
        },
        {
          name: "Urlaub",
          start: "2020-02-27",
          end: "2020-02-28",
          color: "#C5C5C5",
          type: "Abwesenheit",
          status: "bestätigt",
          abwesenheitsGrund: "Urlaub"
        },
        {
          name: "Urlaub",
          start: "2020-03-27",
          end: "2020-03-28",
          color: "#C5C5C5",
          type: "Abwesenheit",
          status: "bestätigt",
          abwesenheitsGrund: "Urlaub"
        },
        {
          name: "Urlaub",
          start: "2020-04-09",
          end: "2020-04-14",
          color: "#C5C5C5",
          type: "Abwesenheit",
          status: "angefragt",
          abwesenheitsGrund: "Urlaub"
        },
        {
          name: "Arbeit",
          start: "2020-02-20 06:00",
          end: "2020-02-20 12:00",
          color: "#C5C5C5",
          type: "Anwesenheit",
          status: "angefragt",
          abwesenheitsGrund: "Arbeit"
        },
        {
          name: "Arbeit",
          start: "2020-02-21 07:00",
          end: "2020-02-21 11:00",
          color: "#C5C5C5",
          type: "Anwesenheit",
          status: "angefragt",
          abwesenheitsGrund: "Arbeit"
        },
        {
          name: "Arbeit",
          start: "2020-02-21 12:00",
          end: "2020-02-21 15:30",
          color: "#C5C5C5",
          type: "Anwesenheit",
          status: "angefragt",
          abwesenheitsGrund: "Arbeit"
        },
        {
          name: "Krankheit",
          start: "2020-02-22",
          end: "2020-02-22",
          color: "#C5C5C5",
          type: "Abwesenheit",
          status: "bestätigt",
          abwesenheitsGrund: "Krankheit"
        },
        {
          name: "Krankheit",
          start: "2020-02-24",
          end: "2020-02-25",
          color: "#C5C5C5",
          type: "Abwesenheit",
          status: "angefragt",
          abwesenheitsGrund: "Krankheit"
        },
        {
          name: "Feiertag",
          start: "2020-02-23",
          end: "2020-02-23",
          color: "#C5C5C5",
          type: "Abwesenheit",
          status: "bestätigt",
          abwesenheitsGrund: "Feiertag"
        },
        {
          name: "Feiertag",
          start: "2020-04-01",
          end: "2020-04-01",
          color: "#C5C5C5",
          type: "Abwesenheit",
          status: "angefragt",
          abwesenheitsGrund: "Feiertag"
        }
      ]
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
                <InformationenFranzi
                  v-for="(item, index) of Object.keys(InfoFields)"
                  :key="index"
                  :data="InfoFields[item]"
                  :text="item"
                ></InformationenFranzi>
              </v-row>
            </v-layout>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card color="basil" flat>
            <v-layout wrap class="pa-3 mt-5">
              <Anwesenheit :events="events" :Arbeitszeit="VertragFields.Arbeitszeit" :monat="monatBestätigt"></Anwesenheit>
            </v-layout>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card color="basil" flat>
            <v-layout wrap class="pa-3 mt-5">
              <Abwesenheit
                :events="events"
                :Urlaubsanspruch="VertragFields.Urlaubsanspruch"
                :Vertrag="VertragFields.Vertrag"
              ></Abwesenheit>
            </v-layout>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card color="basil" flat>
            <v-layout wrap class="pa-3 mt-5">TAB 4 ETC</v-layout>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card color="basil" flat>
            <v-layout wrap class="pa-3 mt-5">
              <v-row>
                <InformationenFranzi
                  v-for="(item, index) of Object.keys(VertragFields)"
                  :key="index"
                  :data="VertragFields[item]"
                  :text="item"
                ></InformationenFranzi>
              </v-row>
            </v-layout>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </div>
</template>