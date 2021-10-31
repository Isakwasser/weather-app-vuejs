<template>
  <div id="app" class="container rounded-3 bg-light">
    <div class="row">
      <app-img
        class="col-md-6 p-0 overflow-hidden"
        :city="currentCity"
      ></app-img>
      <app-form class="col-md-6" @changeCity="currentCity = $event"></app-form>
    </div>
  </div>
</template>

<script>
import Img from "./components/Photo.vue";
import Form from "./components/form/Form.vue";

export default {
  data() {
    return {
      currentCity: "Польша",
    };
  },
  components: {
    "app-img": Img,
    "app-form": Form,
  },
};
</script>

<style>
#app {
  max-width: 1000px;
  width: 90%;
  min-width: 300px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
html,
body {
  min-width: 350px;
  height: 95vh;
  position: relative;
}
body::before {
  content: "";

  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  display: block;
  background-image: url("./assets/body-bg.jpg");

  background-size: cover;
  background-position: center;
  filter: blur(100px);
}
</style>
