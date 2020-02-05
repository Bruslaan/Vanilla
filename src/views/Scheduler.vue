<template>
  <div class="tcontainer">
    <v-simple-table fixed-header height="90vh">
      <template v-slot:default>
        <thead>
          <tr>
            <th class="name_header">Name</th>
            <th v-for="(n,i) in 31" :key="i">
              <v-col>
                {{n}}
                Mo
              </v-col>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(n,i) in 60" :key="i">
            <th>Peter Zwegert</th>
            <td v-for="(n,i) in 31" :key="i"></td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>

<script scoped>
export default {
  data() {
    return {
      desserts: []
    };
  }
};
</script>




<style scoped>
.tcontainer {
  /* max-width: 100vh;
  max-height: 100vh;
  overflow: scroll;
  position: relative; */
  margin: 10px;
}
.name_header {
  min-width: 150px;
}
table {
  position: relative;
  border-collapse: collapse;
  table-layout: fixed;
}
td,
th {
  border-right: 1px solid #ccc;
  min-width: 40px;
  text-align: center !important;
}

thead th {
  position: -webkit-sticky; /* for Safari */
  position: sticky;
  top: 0;
}

thead th:first-child {
  left: 0;
  z-index: 3;
}

tbody th {
  position: -webkit-sticky; /* for Safari */
  position: sticky;
  left: 0;
  background: #fff;
  border-right: 1px solid #ccc;
  padding: 10px;
}
.v-data-table td,
.v-data-table th {
  padding: 0 0px;
}
</style>