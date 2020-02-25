<template>
  <v-data-table
    :search="search"
    flat
    :headers="headers"
    :items="users"
    sort-by="calories"
    class="elevation-0"
  >
    <template v-slot:item.name="{ item }">
      <v-row align="center">
        <v-col cols="12" class="pt-2 pb-2">
          <v-avatar class="mr-1" size="36">
            <v-img :src="item.avatar" alt="John">
              <template v-slot:placeholder>
                <v-row class="fill-height ma-0" align="center" justify="center">
                  <v-progress-circular indeterminate color="grey lighten-2"></v-progress-circular>
                </v-row>
              </template>
            </v-img>
          </v-avatar>
          <a class="ml-2">{{item.name}}</a>
        </v-col>
      </v-row>
    </template>

    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>My Mitarbeiter</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
          
        ></v-text-field>
            <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on }">
            <v-btn text class="mb-2" v-on="on">+ New User</v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="12" md="12" v-for="(header, index) in headers" :key="index">
                    <v-text-field
                      v-if="header.value!='action'"
                      v-model="editedItem[header.value]"
                      :label="header.text"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="save">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.action="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
      <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize">Reset</v-btn>
    </template>
  </v-data-table>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
    search: "",
    headers: [
      {
        text: "Name",
        align: "left",
        value: "name"
      },
      { text: "Email", value: "email" },
      { text: "Passwort", value: "password" },
      { text: "Actions", value: "action", sortable: false }
    ],
    users: [],
    editedIndex: -1,
    editedItem: {},
    defaultItem: {}
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  created() {
    this.initialize();
  },

  methods: {
    async initialize() {
      let users = await this.$store.dispatch("user/getAllUsers");

      let formattedUsers = [];

      for (var user in users) {
        formattedUsers.push({
          name: users[user]["name"],
          email: "blabl",
          password: "kaka",
          avatar: users[user]["avatar"]
        });
      }

console.log(users)
      this.users = formattedUsers;
    },

    editItem(item) {
      this.editedIndex = this.users.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.users.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.users.splice(index, 1);
    },

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.users[this.editedIndex], this.editedItem);
      } else {
        this.users.push(this.editedItem);
      }
      this.close();
    }
  }
};
</script>
