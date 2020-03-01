<template>
  <div>
    <!-- FLOATING BUTTON -->
    <v-btn
      class="floating_action_button mb-12"
      @click="dialog=true"
      dark
      fab
      bottom
      right
      color="red"
    >
      <v-icon>mdi-plus</v-icon>
    </v-btn>
    <!-- MODAL -->
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">{{ formTitle }}</span>
          <v-spacer></v-spacer>
          <v-btn text fab small @click="close">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="12" sm="12" md="12" v-for="(header, index) in headers" :key="index">
              <v-text-field
                v-if="header.name!='Erstelltam' && header.name!='Erstelltvon'"
                v-model="editedItem[header.name]"
                :label="header.name"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row justify="center">
              <v-btn>ADD</v-btn>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="save">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- TABLE -->
    <!-- TABLE TOOLBAR -->
    <v-toolbar flat color="white">
      <v-toolbar-title>{{ title }}</v-toolbar-title>
      <v-text-field
        style="max-width: 200px; margin-left: auto"
        v-model="search"
        label="Suche"
        hide-details
        :onkeyup="searchFunction()"
      ></v-text-field>
    </v-toolbar>
    <!-- TABLE CONTENT -->
    <v-simple-table fixed-header height="80vh">
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left" v-for="(head, index) in headers" :key="index">{{ head.name }}</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody id="myTable">
          <tr v-for="(item, index) in data" :key="index">
            <td
              v-for="(header, index_column) in headers"
              :key="index_column"
              :type="header.type"
            >{{ item[header.name] }}</td>
            <td>
              <v-icon small class="mr-2" @click="editItem(item, index)">mdi-pencil</v-icon>
              <v-icon small @click="deleteItem(item, index)">mdi-delete</v-icon>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      required: true
    },
    headers: {
      type: Array,
      required: true
    },
    title: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      search: "",
      dialog: false,
      editedIndex: -1,
      editedItem: {}
    };
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    }
  },
  methods: {
    save() {
      //get now in form dd.mm.yyyy hh:mm
      let today = new Date();
      let now =
        String(today.getDate()).padStart(2, "0") +
        "." +
        String(today.getMonth() + 1).padStart(2, "0") +
        "." +
        today.getFullYear() +
        " " +
        String(today.getHours()).padStart(2, "0") +
        ":" +
        String(today.getMinutes()).padStart(2, "0");
      this.editedItem["Erstelltam"] = now;
      this.editedItem["Erstelltvon"] = this.$store.getters["user/name"];

      if (this.editedIndex > -1) {
        Object.assign(this.data[this.editedIndex], this.editedItem);
      } else {
        this.data.push(this.editedItem);
      }
      this.close();
    },
    editItem(item, index) {
      this.dialog = true;
      this.editedItem = Object.assign({}, item);
      this.editedIndex = index;
    },
    deleteItem(item, index) {
      confirm("Are you sure you want to delete this item?") &&
        this.data.splice(index, 1);
    },
    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = {};
        this.editedIndex = -1;
      }, 300);
    },
    searchFunction() {
      // Declare variables
      let filter, table, tr, td, i, j, found, txtValue;
      filter = this.search.toUpperCase();
      table = document.getElementById("myTable");
      if (table) {
        tr = table.getElementsByTagName("tr");
        // Loop through all table rows, and hide those who don't match the search query
        for (i = 0; i < tr.length; i++) {
          td = tr[i].getElementsByTagName("td");
          found = false;
          for (j = 0; j < td.length; j++) {
            if (td[j]) {
              txtValue = td[j].textContent || td[j].innerText;
              if (txtValue.toUpperCase().indexOf(filter) > -1) {
                found = true;
              }
            }
          }
          if (found != true) {
            tr[i].style.display = "none";
          } else {
            tr[i].style.display = "";
          }
        }
      }
    }
  }
};
</script>

<style scoped>
.floating_action_button {
  position: absolute;
  bottom: 0px;
  right: 28px;
  transform: translate(0px, -0px);
  z-index: 900;
}
thead th,
tbody td {
  position: -webkit-sticky; /* for Safari */
  position: sticky;
  top: 0;
  white-space: nowrap;
}
thead th:first-child {
  left: 0;
  z-index: 4;
  border-right: 1px solid #ccc;
  background-color: white;
}
tbody td:first-child {
  left: 0;
  z-index: 3;
  border-right: 1px solid #ccc;
  background-color: white;
}
thead th:last-child {
  right: 0;
  z-index: 4;
  border-left: 1px solid #ccc;
  background-color: white;
}
tbody td:last-child {
  right: 0;
  z-index: 3;
  border-left: 1px solid #ccc;
  background-color: white;
}
</style>
