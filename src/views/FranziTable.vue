<template>
  <div>
    <TableComponent title="Fahrzeuge" :headers="headers" :data="data" :protocol="protocol"/>
    <!-- <TableComponent :data="Mitarbeiter"/> -->
  </div>
</template>

<script >
import TableComponent from "../components/Table/TableComponent";

export default {
  computed: {},
  components: { TableComponent },
  methods: {
    addElement() {}
  },
  data() {
    return {
      headers: [
        { name: "Kennzeichen", type: "text" },
        { name: "Mitarbeiter", type: "text" },
        { name: "Kilometerstand", type: "number" },
        { name: "NächsterService", type: "date" },
        { name: "Funktionsfähig", type: "bool" },
        { name: "Erstelltam", type: "text" },
        { name: "Erstelltvon", type: "text" }
      ],
      data: [
        {
          uid: "2222",
          Kennzeichen: "M V 1337",
          Mitarbeiter: "Franzi",
          Kilometerstand: "100000",
          NächsterService: "03.03.2020",
          Funktionsfähig: "true",
          Erstelltam: "01.03.2020 11:00",
          Erstelltvon: "Francesco"
        },
        {
          uid: "1234",
          Kennzeichen: "M V 1338",
          Mitarbeiter: "Brus",
          Kilometerstand: "500",
          NächsterService: "03.04.2020",
          Funktionsfähig: "false",
          Erstelltam: "01.03.2020 11:00",
          Erstelltvon: "Francesco"
        },
        {
          uid: "1111",
          Kennzeichen: "M V 1339",
          Mitarbeiter: "Jansen",
          Kilometerstand: "123",
          NächsterService: "02.05.2020",
          Funktionsfähig: "true",
          Erstelltam: "01.03.2020 11:00",
          Erstelltvon: "Francesco"
        }
      ],
      protocol: {
        "1234": [
          {
            ref: "1234",
            Kennzeichen: "M V 1338",
            Mitarbeiter: "Brusssssss",
            Kilometerstand: "300",
            NächsterService: "03.03.2020",
            Funktionsfähig: "true",
            Erstelltam: "01.03.2020 11:00",
            Erstelltvon: "Francesco"
          },
          {
            ref: "1234",
            Kennzeichen: "M V 1338",
            Mitarbeiter: "Brusssssss",
            Kilometerstand: "0",
            NächsterService: "03.03.2020",
            Funktionsfähig: "true",
            Erstelltam: "01.03.2020 11:00",
            Erstelltvon: "Francesco"
          }
        ],
        "1111": [
          {
            ref: "1111",
            Kennzeichen: "M V 1339",
            Mitarbeiter: "Jansen",
            Kilometerstand: "1",
            NächsterService: "02.05.2020",
            Funktionsfähig: "true",
            Erstelltam: "01.03.2020 11:00",
            Erstelltvon: "Francesco"
          },
          {
            ref: "1111",
            Kennzeichen: "M V 1339",
            Mitarbeiter: "Jansen",
            Kilometerstand: "2",
            NächsterService: "02.05.2020",
            Funktionsfähig: "true",
            Erstelltam: "01.03.2020 11:00",
            Erstelltvon: "Francesco"
          },
          {
            ref: "1111",
            Kennzeichen: "M V 1339",
            Mitarbeiter: "Jansen",
            Kilometerstand: "3",
            NächsterService: "02.05.2020",
            Funktionsfähig: "true",
            Erstelltam: "01.03.2020 11:00",
            Erstelltvon: "Francesco"
          },
          {
            ref: "1111",
            Kennzeichen: "M V 1339",
            Mitarbeiter: "Jansen",
            Kilometerstand: "4",
            NächsterService: "02.05.2020",
            Funktionsfähig: "true",
            Erstelltam: "01.03.2020 11:00",
            Erstelltvon: "Francesco"
          }
        ]
      }
    };
  }
};
</script>



