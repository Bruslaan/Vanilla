<template>
  <v-col cols="12" sm="12" md="12" lg="12">
    <!-- SnackBar -->
    <v-snackbar color="amber" v-model="snackbar" timeout="99999999">Etwas wird editiert!</v-snackbar>
    <v-row class="ml-3">
      <h4>{{text}}</h4>
      <v-spacer></v-spacer>
      <v-btn v-if="edit" fab text small class="mr-3" @click="saveChanges">
        <v-icon>mdi-content-save</v-icon>
      </v-btn>
      <v-btn v-if="edit" fab text small class="mr-2" @click="abortChanges">
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <v-btn v-if="!edit" @click="edit = !edit" fab text small class="mr-2" color="grey darken-1">
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
    </v-row>

    <v-divider></v-divider>
    <div class="ml-3">
      <v-row class="mb-1" v-for="(item, index) of data" :key="index" no-gutters>
        <v-col class="pt-2" cols="12" sm="12" md="4">
          <p class="ma-0">{{item.name}}</p>
        </v-col>
        <!-- ENABLED -->
        <v-col cols="12" sm="12" md="8" v-if="edit">
          <v-text-field
            v-if="editedItem[index].type == 'text' || editedItem[index].type == 'number'"
            :type="editedItem[index].type == 'number' ? 'number' : 'text' "
            flat
            single-line
            hide-details
            dense
            v-model="editedItem[index].value"
          ></v-text-field>
          <v-select
            v-if="editedItem[index].type == 'select'"
            v-model="editedItem[index].value"
            :items="editedItem[index].options"
            flat
            single-line
            hide-details
            dense
          ></v-select>
          <v-select
            v-if="editedItem[index].type == 'selectMultiple'"
            v-model="editedItem[index].value"
            :items="editedItem[index].options"
            flat
            single-line
            hide-details
            dense
            multiple
          ></v-select>
          <v-menu
            v-if="editedItem[index].type == 'date'"
            ref="modal"
            v-model="modal"
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
            max-width="290px"
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="editedItem[index].value"
                v-on="on"
                flat
                single-line
                hide-details
                dense
              ></v-text-field>
            </template>
            <v-date-picker v-model="editedItem[index].value" no-title @input="modal = false"></v-date-picker>
          </v-menu>
          <v-text-field
            v-if="editedItem[index].type == 'email'"
            type="email"
            :rules="emailRules"
            flat
            single-line
            hide-details
            dense
            v-model="editedItem[index].value"
          ></v-text-field>
          <v-textarea
            v-if="editedItem[index].type == 'textarea'"
            flat
            single-line
            hide-details
            dense
            v-model="editedItem[index].value"
          ></v-textarea>
        </v-col>
        <!-- DISABLED -->
        <v-col cols="12" sm="12" md="8" v-else>
          <v-text-field
            v-if="editedItem[index].type == 'text' || editedItem[index].type == 'number'"
            :type="editedItem[index].type == 'number' ? 'number' : 'text' "
            flat
            single-line
            hide-details
            dense
            v-model="editedItem[index].value"
            disabled
          ></v-text-field>
          <v-select
            v-if="editedItem[index].type == 'select'"
            v-model="editedItem[index].value"
            :items="editedItem[index].options"
            flat
            single-line
            hide-details
            dense
            disabled
          ></v-select>
          <v-select
            v-if="editedItem[index].type == 'selectMultiple'"
            v-model="editedItem[index].value"
            :items="editedItem[index].options"
            flat
            single-line
            hide-details
            dense
            multiple
            disabled
          ></v-select>
          <v-text-field
            v-if="editedItem[index].type == 'date'"
            v-model="editedItem[index].value"
            v-on="on"
            flat
            single-line
            hide-details
            dense
            disabled
          ></v-text-field>
          <v-text-field
            v-if="editedItem[index].type == 'email'"
            type="email"
            :rules="emailRules"
            flat
            single-line
            hide-details
            dense
            disabled
            v-model="editedItem[index].value"
          ></v-text-field>
          <v-textarea
            v-if="editedItem[index].type == 'textarea'"
            flat
            single-line
            hide-details
            dense
            disabled
            v-model="editedItem[index].value"
          ></v-textarea>
        </v-col>
      </v-row>
    </div>
  </v-col>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      required: true
    },
    text: {
      type: String,
      required: true
    }
  },
  created() {
    this.editedItem = JSON.parse(JSON.stringify(this.data));
    // this.editedItem = Object.assign({}, this.data);
  },
  methods: {
    saveChanges() {
      this.data = JSON.parse(JSON.stringify(this.editedItem));
      // this.data = this.editedItem;
      this.edit = false;
    },
    abortChanges() {
      this.editedItem = JSON.parse(JSON.stringify(this.data));
      // this.editedItem = Object.assign({}, this.data);
      this.edit = false;
    }
  },
  watch: {
    edit: function (val) {
      this.snackbar = val
    },
  },
  data() {
    return {
      editedItem: [],
      edit: false,
      modal: false,
      emailRules: [v => /.+@.+/.test(v) || "E-mail must be valid"],
      snackbar: false
    };
  }
};
</script>

<style>
</style>