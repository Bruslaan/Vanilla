<template>
  <v-col cols="12" sm="12" md="6" lg="6">
    <v-row class="ml-3">
      <p>{{text}}</p>
      <v-spacer></v-spacer>
      <v-btn @click="edit = !edit" text small color="grey darken-1">
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
    </v-row>

    <v-divider></v-divider>
    <div class="ml-3">
      <v-row class="mb-1" v-for="item in Object.keys(editedItem)" :key="item" no-gutters>
        <v-col cols="12" sm="12" lg="6">
          <h4>{{item}}</h4>
        </v-col>
        <v-col cols="12" sm="12" lg="6" v-if="edit">
          <v-text-field flat outlined single-line hide-details dense v-model="editedItem[item]"></v-text-field>
        </v-col>
        <v-col v-else>{{editedItem[item]}}</v-col>
      </v-row>
      <v-row v-if="edit">
        <v-spacer></v-spacer>
        <v-btn outlined text class="mr-3" @click="abortChanges">Abbrechen</v-btn>
        <v-btn outlined text class="mr-3" @click="saveChanges">Save</v-btn>
      </v-row>
    </div>
  </v-col>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      required: true
    },
    text: {
      type: String,
      required: true
    }
  },

  created() {
    this.editedItem = Object.assign({}, this.data);
  },
  methods: {
    saveChanges() {
      this.data = this.editedItem;
      this.edit = false;
    },
    abortChanges() {
      this.editedItem = Object.assign({}, this.data);
      this.edit = false;
    }
  },
  data() {
    return {
      editedItem: {},
      edit: false
    };
  }
};
</script>

<style>
</style>