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
          <tr v-for="(element,i) in Mitarbeiter" :key="i">
            <th class="name_header">
              <v-avatar class="mr-1" size="36">
                <img :src="`https://i.pravatar.cc/10${i}`" alt="John" />
              </v-avatar>
              {{element.name}}
            </th>
            <td v-for="(n,i) in 31" :key="i" :class="[ hasActiveElements(element, n) ]"></td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>

<script scoped>
export default {
  computed: {},
  methods: {
    hasActiveElements(element, n) {
      return n >= element.abwesenheit.split("-")[0] &&
        n <= element.abwesenheit.split("-")[1]
        ? { scheduler_active: true }
        : {};
    }
  },
  data() {
    return {
      Mitarbeiter: [
        {
          name: "Hans Peter Hans Maraschki",
          abwesenheit: "12-20"
        },
        {
          name: "Peter Zwegert",
          abwesenheit: "2-5"
        },
        {
          name: "Jürgen Meier",
          abwesenheit: "1-7"
        },
        {
          name: "Jürgen Maraschki",
          abwesenheit: "15-19"
        },
        {
          name: "Ruslan Montenari",
          abwesenheit: "4-7"
        },
                {
          name: "Peter Zwegert",
          abwesenheit: "2-5"
        },
        {
          name: "Jürgen Meier",
          abwesenheit: "1-7"
        },
        {
          name: "Jürgen Maraschki",
          abwesenheit: ""
        },
        {
          name: "Ruslan Montenari",
          abwesenheit: "14-17"
        },
                {
          name: "Peter Zwegert",
          abwesenheit: "2-10"
        },
        {
          name: "Jürgen Meier",
          abwesenheit: "1-7"
        },
        {
          name: "Jürgen Maraschki",
          abwesenheit: "15-19"
        },
        {
          name: "Ruslan Montenari",
          abwesenheit: "4-7"
        },        {
          name: "Peter Zwegert",
          abwesenheit: "2-5"
        },
        {
          name: "Jürgen Meier",
          abwesenheit: "1-7"
        },
        {
          name: "Jürgen Maraschki",
          abwesenheit: "15-19"
        },
        {
          name: "Ruslan Montenari",
          abwesenheit: "14-17"
        },        {
          name: "Peter Zwegert",
          abwesenheit: "2-15"
        },
        {
          name: "Jürgen Meier",
          abwesenheit: "10-17"
        },
        {
          name: "Jürgen Maraschki",
          abwesenheit: "15-19"
        },
        {
          name: "Ruslan Montenari",
          abwesenheit: "4-7"
        }
      ]
    };
  }
};
</script>




<style scoped>
.scheduler_active {
  background: lightblue;
  border-color: lightblue;
}
.tcontainer {
  /* max-width: 100vh;
  max-height: 100vh;
  overflow: scroll;
  position: relative; */
  margin: 10px;
}
.name_header {
  min-width: 250px;
  text-align: left !important;
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