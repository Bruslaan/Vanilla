<template>
  <div class="home">
  <p>{{$store.getters.name}}</p>
  <p>User: {{$store.getters["user/name"]}}</p>
  <p>Token: {{$store.getters["user/token"]}}</p>
  <!-- <p> {{$store.getters["user/avatar"]}}</p> -->
  <p>Setting: {{$store.getters.fixedHeader}}</p>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "home",
  components: {}
};
</script>
