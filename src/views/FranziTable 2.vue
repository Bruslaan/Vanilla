<template>
  <div>
    <TableComponent :headers="headers" :data="data"/>
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
        { name: "Kennzeichen", type: "string" },
        { name: "Mitarbeiter", type: "string" },
        { name: "Kilometerstand", type: "number" },
        { name: "Erstelltam", type: "string" },
        { name: "Erstelltvon", type: "string" }
      ],
      data: [
        {
          uid: "2222",
          Kennzeichen: "M V 1337",
          Mitarbeiter: "Franzi",
          Kilometerstand: "100000",
          Erstelltam: "01.03.2020 11:00",
          Erstelltvon: "Francesco"
        },
        {
          uid: "1234",
          Kennzeichen: "M V 1338",
          Mitarbeiter: "Brus",
          Kilometerstand: "0",
          Erstelltam: "01.03.2020 11:00",
          Erstelltvon: "Francesco"
        },
        {
          uid: "1111",
          Kennzeichen: "M V 1339",
          Mitarbeiter: "Jansen",
          Kilometerstand: "123",
          Erstelltam: "01.03.2020 11:00",
          Erstelltvon: "Francesco"
        }
      ],
      protokoll: [
        {
          ref: "1234",
          Kennzeichen: "M V 1338",
          Mitarbeiter: "Brusssssssssssss",
          Kilometerstand: "0",
          Erstelltam: "01.03.2020 11:00",
          Erstelltvon: "Francesco"
        }
      ]
    };
  }
};
</script>



