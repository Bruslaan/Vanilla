<template>
  <v-col cols="12" sm="12" md="12" lg="12">
    <v-row class="ml-3">
      <h4>{{text}}</h4>
      <v-spacer></v-spacer>
      <v-btn v-if="edit" outlined text small class="mr-3" @click="saveChanges">
        <v-icon>mdi-content-save</v-icon>
      </v-btn>
      <v-btn v-if="edit" outlined text small class="mr-3" @click="abortChanges">
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <v-btn v-if="!edit" @click="edit = !edit" text small color="grey darken-1">
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
    </v-row>

    <v-divider></v-divider>
    <div class="ml-3">
      <v-row class="mb-1" v-for="(item, index) of data" :key="index" no-gutters>
        <v-col class="pt-2" cols="12" sm="12" md="4">
          <p class="ma-0">{{item.name}}</p>
        </v-col>
        <v-col cols="12" sm="12" md="8" v-if="edit">
          <v-text-field flat single-line hide-details dense v-model="editedItem[index].value"></v-text-field>
        </v-col>
        <v-col cols="12" sm="12" md="8" v-else>
          <v-text-field
            flat
            single-line
            hide-details
            disabled
            dense
            v-model="editedItem[index].value"
          ></v-text-field>
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
  data() {
    return {
      editedItem: [],
      edit: false
    };
  }
};
</script>

<style>
</style>