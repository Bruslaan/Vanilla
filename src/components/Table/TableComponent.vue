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
    <v-dialog v-model="dialog" scrollable persistent max-width="500px">
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
            <v-col
              cols="12"
              sm="12"
              md="12"
              class="py-0"
              v-for="(header, index) in headers"
              :key="index"
            >
              <v-text-field
                v-if="header.name!='Erstelltam' && header.name!='Erstelltvon'"
                v-model="editedItem[header.name]"
                :label="header.name"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="12" md="12" class="py-0 pt-2">
              <v-file-input
                v-model="files"
                label="Datei"
                multiple
                chips
                outlined
                accept=".png, .jpg"
                placeholder="Datei auswählen"
                @change="onFilePicked()"
              ></v-file-input>
            </v-col>
          </v-row>
          <v-img class="my-2" v-for="(file, i) in files" :key="file" :src="filesURL[i]"></v-img>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="save">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- MODAL COLUMN -->
    <v-dialog v-model="dialogColumn" scrollable persistent max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">Column</span>
          <v-spacer></v-spacer>
          <v-btn text fab small @click="dialogColumn=false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="12" sm="12" md="12" v-for="(header, index) in headers" :key="index">
              <v-text-field
                v-if="header.name!='Erstelltam' && header.name!='Erstelltvon'"
                v-model="header.name"
                :label="header.name"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="save">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- MODAL FILTER -->
    <v-dialog v-model="dialogFilter" scrollable persistent max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">Neuer Filter</span>
          <v-spacer></v-spacer>
          <v-btn text fab small @click="dialogFilter=false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-row class="pa-2">
            <v-select
              v-model="filterHeader"
              :items="getHeadernames()"
              dense
              outlined
              hide-details
              class
              label="Spalte"
            ></v-select>
          </v-row>
          <v-row class="pa-2">
            <v-select
              v-model="filterOperator"
              :items="filters"
              dense
              outlined
              hide-details
              class
              label="Filter"
            ></v-select>
          </v-row>
          <v-row class="px-3">
            <v-text-field hide-details label="Wert" v-model="val1"></v-text-field>
          </v-row>
          <v-row class="px-3">
            <v-text-field
              label="Zweiter Wert"
              v-model="val2"
              hide-details
              v-if="filterOperator=='zwischen' || filterOperator=='zwischen inbegriffen' || filterOperator=='nicht zwischen'"
            ></v-text-field>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="addFilter(filterHeader, filterOperator, val1, val2)"
          >Filter</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- VIEWER -->
    <v-dialog v-model="viewer" scrollable persistent max-width="1000px">
      <v-card>
        <v-card-title>
          <span class="headline">Viewer</span>
          <v-spacer></v-spacer>
          <v-btn text fab small @click="closeViewer()">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-img class="my-2" v-for="(file, i) in files" :key="file" :src="filesURL[i]"></v-img>
        </v-card-text>
      </v-card>
    </v-dialog>
    <!-- TABLE -->
    <!-- TABLE TOOLBAR -->
    <v-toolbar flat color="white">
      <v-toolbar-title>{{ title }}</v-toolbar-title>
      <v-btn text class="mx-2" @click="switchFilterRow()">
        <v-icon>mdi-filter-menu</v-icon>
      </v-btn>
      <v-text-field
        style="max-width: 200px; margin-left: auto"
        v-model="search"
        label="Suche"
        hide-details
        :onkeyup="searchFunction()"
      ></v-text-field>
    </v-toolbar>
    <!-- FILTER -->
    <v-expand-transition>
      <v-card outlined v-if="filterRow==true">
        <v-row class="ma-0 py-0 px-0">
          <v-col cols="1">
            <v-btn @click="dialogFilter=true" class="py-2" text color="grey darken-1">
              <v-icon>mdi-filter-plus</v-icon>
            </v-btn>
          </v-col>
          <v-col cols="11">
            <v-chip-group>
              <v-chip
                v-for="(item, index) in filters_arguments"
                :key="index"
                close
                small
                @click:close="filterDelete(index)"
              >{{item.column + " " + item.Operator + " " + item.value + " " + item.value2}}</v-chip>
            </v-chip-group>
          </v-col>
        </v-row>
      </v-card>
    </v-expand-transition>
    <!-- TABLE CONTENT -->
    <v-simple-table fixed-header class="pt-1" height="80vh">
      <template v-slot:default>
        <thead>
          <tr>
            <th
              class="text-left"
              @click="sort(index)"
              v-for="(head, index) in headers"
              :key="index"
            >{{ head.name }}</th>
            <th style="width: 40px">
              <v-btn @click="dialogColumn = true" text small color="grey darken-1">
                <v-icon>mdi-table-column-plus-before</v-icon>
              </v-btn>
            </th>
          </tr>
        </thead>
        <tbody id="myTable">
          <tr v-for="(item, index) in data" :key="index" :id="item.uid" class="TR">
            <!-- <component
              v-for="(header, index_column) in headers"
              :key="index_column"
              :is="component_mapping[String(header.type)]"
              v-bind:name="item[header.name]"
            ></component>-->
            <Cell
              v-for="(header, index_column) in headers"
              :key="index_column"
              :component="header.type"
              v-bind:name="item[header.name]"
            ></Cell>
            <td style="text-align: center">
              <v-icon v-if="item.Files" small class="mr-2" @click="viewFile(item)">mdi-image</v-icon>
              <v-icon small class="mr-2" @click="editItem(item, index)">mdi-pencil</v-icon>
              <v-icon small class="mr-2" @click="toggleProtocol(item)">mdi-script</v-icon>
              <v-icon small @click="deleteItem(item, index)">mdi-delete</v-icon>
            </td>
          </tr>
          <tr
            v-for="(protocol_item, protocol_index) in activeprotocol"
            :key="protocol_index"
            :id="protocol_item.ref"
            class="protocolTR"
          >
            <Cell
              v-for="(header, protocol_index_column) in headers"
              :key="protocol_index_column"
              class="protocolTD"
              :component="header.type"
              v-bind:name="protocol_item[header.name]"
            ></Cell>
            <td class="protocolTD"></td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>

<script>
// import TableText from "./table_text";
// import TableCheckbox from "./table_checkbox";
import Cell from "./Cell";
import { setTimeout } from "timers";
// import { createDOM } from '../utils/utils';
export default {
  props: {
    data: {
      type: Array,
      required: true
    },
    protocol: {
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
  components: {
    // TableText,
    // TableCheckbox,
    Cell
  },
  data() {
    return {
      files: [],
      filesURL: [],
      viewer: false,
      search: "",
      dialog: false,
      dialogColumn: false,
      dialogFilter: false,
      filterRow: false,
      filterHeader: "",
      filterOperator: "",
      filters_arguments: [],
      filters: [
        "gleich",
        "nicht gleich",
        "größer",
        "größer gleich",
        "kleiner",
        "kleiner gleich",
        "zwischen",
        "zwischen inbegriffen",
        "nicht zwischen"
      ],
      val1: "",
      val2: "",
      // component_mapping: {
      //   text: "TableText",
      //   number: "TableText",
      //   date: "TableText",
      //   bool: "TableCheckbox"
      // },
      editedIndex: -1,
      editedItem: {},
      activeprotocol: [],
      activeprotocolids: {}
    };
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    }
  },
  methods: {
    onFilePicked() {
      // console.log("before", this.files);
      // console.log("before", this.filesURL);
      for (let file of this.files) {
        const fileReader = new FileReader();

        fileReader.addEventListener("load", () => {
          this.filesURL.push(fileReader.result);
        });
        fileReader.readAsDataURL(file);
      }
      // console.log("after", this.files);
      // console.log("after", this.filesURL);
    },
    viewFile(item) {
      this.files = item.Files;
      this.onFilePicked();
      this.viewer = true;
    },
    closeViewer() {
      this.viewer = false;
      this.files = [];
      this.filesURL = [];
    },
    toggleProtocol(item) {
      //   if (item.uid in this.activeprotocolids) {
      //     //lalal
      //   } else {
      //     this.activeprotocolids[item.uid] = [];
      //     for (let row of this.protocol[item.uid]) {
      //       let td_list = [];
      //       for (let header of this.headers) {
      //           let td = createElement(Cell, {
      //             props: {
      //               key: j,
      //               component: row[header.type],
      //               name: row[header.name]
      //             }
      //           });
      //           td_list.push(td)
      //       }
      //       let tr = createDOM("tr", [{"class": "protocolTR"}], "", td_list);
      //       item.parentElement.insertAfter(tr, item);
      //       // this.activeprotocolids[item.uid].push(this.activeprotocol.length - 1);
      //     }
      //   }

      if (item.uid in this.activeprotocolids) {
        // trs aus activeprotocol löschen und id aus activeprotocolids löschen
        this.activeprotocol.splice(
          this.activeprotocolids[item.uid][0],
          this.activeprotocolids[item.uid].length
        );
        delete this.activeprotocolids[item.uid];
      } else {
        this.activeprotocolids[item.uid] = [];
        for (let i in this.protocol[item.uid]) {
          console.log(i);
          this.activeprotocol.push(this.protocol[item.uid][i]);
          this.activeprotocolids[item.uid].push(this.activeprotocol.length - 1);
        }
      }
      this.renderProtocol();
    },
    renderProtocol() {
      let table = document.getElementById("myTable");
      console.log(table);
      let rows = table.getElementsByClassName("TR");
      console.log(rows);
      let protocolRows = table.getElementsByClassName("protocolTR");
      console.log(protocolRows);
      for (let i in rows) {
        for (let j in protocolRows) {
          console.log(rows[i]);
          console.log(rows[i].id);
          console.log(protocolRows[j]);
          console.log(protocolRows[j].id);

          if (protocolRows[j].id == rows[i].id) {
            console.log(table, "ja");
            // table.insertAfter(protocolRows[j], rows[i]);
          }
        }
      }
    },
    switchFilterRow() {
      if (this.filterRow == true) {
        this.filterRow = false;
      } else {
        this.filterRow = true;
      }
    },
    getHeadernames() {
      let items = [];
      let item;
      for (item in this.headers) {
        items.push(this.headers[item].name);
      }
      return items;
    },
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

      if (this.files.length > 0) {
        this.editedItem["Files"] = this.files;
        this.files = [];
        this.filesURL = [];
      }

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
        this.files = [];
        this.filesURL = [];
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
    },
    sort(index) {
      if (this.headers[index].type == "text") {
        this.sortText(index);
        return;
      }
      if (this.headers[index].type == "number") {
        this.sortNumber(index);
        return;
      }
      if (this.headers[index].type == "date") {
        this.sortDate(index);
        return;
      }
    },
    sortText(index) {
      let table,
        rows,
        switching,
        i,
        x,
        y,
        shouldSwitch,
        dir,
        switchcount = 0;
      table = document.getElementById("myTable");
      switching = true;
      //Set the sorting direction to ascending:
      dir = "asc";
      /*Make a loop that will continue until
    no switching has been done:*/
      while (switching) {
        //start by saying: no switching is done:
        switching = false;
        rows = table.getElementsByTagName("tr");
        /*Loop through all table rows (except the
      first, which contains table headers):*/
        for (i = 0; i < rows.length - 1; i++) {
          //start by saying there should be no switching:
          shouldSwitch = false;
          /*Get the two elements you want to compare,
        one from current row and one from the next:*/
          x = rows[i].getElementsByTagName("td")[index];
          y = rows[i + 1].getElementsByTagName("td")[index];
          /*check if the two rows should switch place,
        based on the direction, asc or desc:*/
          if (dir == "asc") {
            if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
              //if so, mark as a switch and break the loop:
              shouldSwitch = true;
              break;
            }
          } else if (dir == "desc") {
            if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
              //if so, mark as a switch and break the loop:
              shouldSwitch = true;
              break;
            }
          }
        }
        if (shouldSwitch) {
          /*If a switch has been marked, make the switch
        and mark that a switch has been done:*/
          rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
          switching = true;
          //Each time a switch is done, increase this count by 1:
          switchcount++;
        } else {
          /*If no switching has been done AND the direction is "asc",
        set the direction to "desc" and run the while loop again.*/
          if (switchcount == 0 && dir == "asc") {
            dir = "desc";
            switching = true;
          }
        }
      }
    },
    sortNumber(index) {
      let table,
        rows,
        switching,
        i,
        x,
        y,
        shouldSwitch,
        dir,
        switchcount = 0;
      table = document.getElementById("myTable");
      switching = true;
      //Set the sorting direction to ascending:
      dir = "asc";
      /*Make a loop that will continue until
    no switching has been done:*/
      while (switching) {
        //start by saying: no switching is done:
        switching = false;
        rows = table.getElementsByTagName("tr");
        /*Loop through all table rows (except the
      first, which contains table headers):*/
        for (i = 0; i < rows.length - 1; i++) {
          //start by saying there should be no switching:
          shouldSwitch = false;
          /*Get the two elements you want to compare,
        one from current row and one from the next:*/
          x = rows[i].getElementsByTagName("td")[index];
          y = rows[i + 1].getElementsByTagName("td")[index];
          /*check if the two rows should switch place,
        based on the direction, asc or desc:*/
          if (dir == "asc") {
            if (
              Number(x.innerHTML.toLowerCase()) >
              Number(y.innerHTML.toLowerCase())
            ) {
              //if so, mark as a switch and break the loop:
              shouldSwitch = true;
              break;
            }
          } else if (dir == "desc") {
            if (
              Number(x.innerHTML.toLowerCase()) <
              Number(y.innerHTML.toLowerCase())
            ) {
              //if so, mark as a switch and break the loop:
              shouldSwitch = true;
              break;
            }
          }
        }
        if (shouldSwitch) {
          /*If a switch has been marked, make the switch
        and mark that a switch has been done:*/
          rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
          switching = true;
          //Each time a switch is done, increase this count by 1:
          switchcount++;
        } else {
          /*If no switching has been done AND the direction is "asc",
        set the direction to "desc" and run the while loop again.*/
          if (switchcount == 0 && dir == "asc") {
            dir = "desc";
            switching = true;
          }
        }
      }
    },
    sortDate(index) {
      let table,
        rows,
        switching,
        i,
        x,
        y,
        shouldSwitch,
        dir,
        switchcount = 0;
      table = document.getElementById("myTable");
      switching = true;
      //Set the sorting direction to ascending:
      dir = "asc";
      /*Make a loop that will continue until
    no switching has been done:*/
      while (switching) {
        //start by saying: no switching is done:
        switching = false;
        rows = table.getElementsByTagName("tr");
        /*Loop through all table rows (except the
      first, which contains table headers):*/
        for (i = 0; i < rows.length - 1; i++) {
          //start by saying there should be no switching:
          shouldSwitch = false;
          /*Get the two elements you want to compare,
        one from current row and one from the next:*/
          x = rows[i].getElementsByTagName("td")[index];
          y = rows[i + 1].getElementsByTagName("td")[index];
          /*check if the two rows should switch place,
        based on the direction, asc or desc:*/
          if (dir == "asc") {
            let ds1 = x.innerHTML.toLowerCase().split(".");
            let ds2 = y.innerHTML.toLowerCase().split(".");
            if (ds1[2] + ds1[1] + ds1[0] > ds2[2] + ds2[1] + ds2[0]) {
              //if so, mark as a switch and break the loop:
              shouldSwitch = true;
              break;
            }
          } else if (dir == "desc") {
            let ds1 = x.innerHTML.toLowerCase().split(".");
            let ds2 = y.innerHTML.toLowerCase().split(".");
            if (ds1[2] + ds1[1] + ds1[0] < ds2[2] + ds2[1] + ds2[0]) {
              //if so, mark as a switch and break the loop:
              shouldSwitch = true;
              break;
            }
          }
        }
        if (shouldSwitch) {
          /*If a switch has been marked, make the switch
        and mark that a switch has been done:*/
          rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
          switching = true;
          //Each time a switch is done, increase this count by 1:
          switchcount++;
        } else {
          /*If no switching has been done AND the direction is "asc",
        set the direction to "desc" and run the while loop again.*/
          if (switchcount == 0 && dir == "asc") {
            dir = "desc";
            switching = true;
          }
        }
      }
    },
    filterTable(filterHeader, ope, val, val2) {
      let td;
      let table = document.getElementById("myTable");
      let tr = [];
      table.getElementsByTagName("tr").forEach(function(el) {
        tr.push(el);
      });
      let th_index = this.getHeadernames().indexOf(filterHeader);
      let th_type = this.headers[th_index].type;
      // Loop through all table rows, and hide those who don't match the search query
      for (let i = 0; i < tr.length; i++) {
        let check = false;
        let value;
        let value2;
        let content;
        td = tr[i].getElementsByTagName("td")[th_index];
        if (td.innerHTML.includes("</") == false) {
          // console.log("equal", "not", "greater", "greater equal", "less", "less equal", "is between", "is between equal", "is not between"])
          // console.log("gleich", "nicht gleich", "größer", "größer gleich", "kleiner", "kleiner gleich", "zwischen", "zwischen inbegriffen", "nicht zwischen"])
          if (th_type == "date") {
            value = val.split(".")[2] + val.split(".")[1] + val.split(".")[0];
            value2 =
              val2.split(".")[2] + val2.split(".")[1] + val2.split(".")[0];
            content =
              td.innerHTML.split(".")[2] +
              td.innerHTML.split(".")[1] +
              td.innerHTML.split(".")[0];
          } else if (th_type == "number") {
            value = Number(val);
            value2 = Number(val2);
            content = Number(td.innerHTML);
          } else if (th_type == "text") {
            value = String(val);
            value2 = String(val2);
            content = String(td.innerHTML);
          } else if (th_type == "email") {
            value = String(val);
            value2 = String(val2);
            content = String(td.innerHTML);
          }
          if (ope == "gleich") {
            if (content == value) {
              check = true;
            }
          } else if (ope == "nicht gleich") {
            if (content != value) {
              check = true;
            }
          } else if (ope == "größer") {
            if (content > value) {
              check = true;
            }
          } else if (ope == "größer gleich") {
            if (content >= value) {
              check = true;
            }
          } else if (ope == "kleiner") {
            if (content < value) {
              check = true;
            }
          } else if (ope == "kleiner gleich") {
            if (content <= value) {
              check = true;
            }
          } else if (ope == "zwischen") {
            if (content > value && content < value2) {
              check = true;
            }
          } else if (ope == "zwischen inbegriffen") {
            if (content >= value && content <= value2) {
              check = true;
            }
          } else if (ope == "nicht zwischen") {
            if (content < value && content > value2) {
              check = true;
            }
          }
        }
        if (check) {
          // console.log(test)
        } else {
          // tr[i].style.display = "none";
          tr[i].classList.add("nodisplay");
        }
      }
    },
    addFilter(filterHeader, ope, val, val2) {
      this.filters_arguments.push({
        column: filterHeader,
        Operator: ope,
        value: val,
        value2: val2
      });
      this.filterHeader = "";
      this.filterOperator = "";
      this.val1 = "";
      this.val2 = "";
      this.apply_filters_arguments();
      this.dialogFilter = false;
    },
    clearAllFilters() {
      let table = document.getElementById("myTable");
      let tr = [];
      table.getElementsByTagName("tr").forEach(function(el) {
        tr.push(el);
      });
      for (let i = 0; i < tr.length; i++) {
        tr[i].style.display = "";
        if (tr[i].classList.contains("nodisplay")) {
          tr[i].classList.remove("nodisplay");
        }
        // if (tr[i].getElementsByTagName("button").length != 0) {
        //   let button_id = tr[i].getElementsByTagName("button")[0].id;
        //   var protokoll_elemets = table.getElementsByClassName(button_id);
        //   for (let j = 0; j < protokoll_elemets.length; j++) {
        //     protokoll_elemets[j].style.display = "";
        //     if (protokoll_elemets[j].classList.contains("nodisplay")) {
        //       protokoll_elemets[j].classList.remove("nodisplay");
        //     }
        //   }
        // }
      }
    },
    apply_filters_arguments() {
      this.clearAllFilters();
      // console.log(this.filters_arguments.length);
      for (let i = 0; i < this.filters_arguments.length; i++) {
        let accept_col = this.filters_arguments[i]["column"];
        let accept_ope = this.filters_arguments[i]["Operator"];
        let accept_val = this.filters_arguments[i]["value"];
        let accept_val2 = this.filters_arguments[i]["value2"];
        this.filterTable(accept_col, accept_ope, accept_val, accept_val2);
      }
    },
    filterDelete(index) {
      this.filters_arguments.splice(index, 1);
      this.apply_filters_arguments();
    }
    // findWithAttr(array, attr, value) {
    //   for (var i = 0; i < array.length; i += 1) {
    //     if (array[i][attr] === value) {
    //       return i;
    //     }
    //   }
    //   return -1;
    // }
  }
};
</script>

<style scoped>
.protocolTD {
  background-color: lightgray;
  /* box-shadow: inset 0px 4px 8px -5px rgba(50, 50, 50, 0.75), inset 0px -4px 8px -5px rgba(50, 50, 50, 0.75) */
}
.nodisplay {
  display: none;
}
.hidden {
  display: none;
}
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
}
tbody td:first-child:not(.protocolTD) {
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
}
tbody td:last-child:not(.protocolTD) {
  background-color: white;
}
</style>
