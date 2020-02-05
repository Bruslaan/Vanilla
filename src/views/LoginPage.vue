<template>
  <v-app>
    <v-content>
      <v-container class="mt-12" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card outlined>
              <v-card-text>
                <v-form>
                  <h1 class="my-5">Vanilla</h1>
                  <v-text-field v-model="username" label="Login" name="login" type="text" />

                  <v-text-field
                    v-model="password"
                    id="password"
                    label="Password"
                    name="password"
                    type="password"
                  />
                  <p v-if="errorMessage">{{errorMessage}}</p>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn outlined :loading="loading" :disabled="loading" @click="loginUser">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: "",
      errorMessage: "",
      loading: false,
      redirect: undefined
    };
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true
    }
  },
  methods: {
    loginUser() {
      this.loading = true;
      let self = this;

      this.$store
        .dispatch("user/login", {username: self.username, password: self.password})
        .then(() => {
          self.$router.push({ path: self.redirect || "/" });
          self.loading = false;
        })
        .catch(() => {
          self.loading = false;
        });
    }
  }
};
</script>