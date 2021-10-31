<template>
  <div class="p-4 data-manipulation">
    <app-cityIn
      :currentCity="currentCity"
      :updateData="updateData"
    ></app-cityIn>
    <app-answer-success
      :currentCityData="currentCityData"
      v-if="isDataValid && !inProgress"
    ></app-answer-success>
    <div
      class="alert alert-primary"
      role="alert"
      v-if="!isDataValid && !inProgress"
    >
      <a
        href="https://www.google.com/search?q=if+something+is+wrong&source=hp&ei=BTpsYenMMqiorgSU8LKwCA&iflsig=ALs-wAMAAAAAYWxIFUqu5ZcveaFV9ukc8mLiVGQE-LDy&ved=0ahUKEwip4-3C2tHzAhUolIsKHRS4DIYQ4dUDCAc&uact=5&oq=if+something+is+wrong&gs_lcp=Cgdnd3Mtd2l6EAMyBQgAEIAEMgYIABAWEB4yBggAEBYQHjIGCAAQFhAeMgYIABAWEB4yBggAEBYQHjIGCAAQFhAeMgYIABAWEB4yBggAEBYQHjIGCAAQFhAeOggIABCABBCxAzoOCC4QgAQQsQMQxwEQowI6DgguEIAEELEDEMcBENEDOgsIABCABBCxAxCDAToICAAQsQMQgwE6CQgAEIAEEAoQAToFCC4QgAQ6CAguEIAEEJMCUO8QWLNJYLRNaAFwAHgAgAFliAHyCZIBBDIwLjGYAQCgAQGwAQA&sclient=gws-wiz"
        class="alert-link"
        target="_blank"
        >Что-то пошло не так.</a
      >
    </div>

    <div class="d-flex justify-content-center" v-if="inProgress">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  </div>
</template>

<script>
import Answer from "./Answer.vue";
import CityIn from "./CityIn.vue";

export default {
  data() {
    return {
      currentCity: localStorage.getItem("previousCity") || "Москва",
      currentCityData: null,
      isDataValid: true,
      inProgress: false,
    };
  },
  components: {
    "app-cityIn": CityIn,
    "app-answer-success": Answer,
  },
  methods: {
    async updateData(newCity) {
      this.inProgress = true;
      this.currentCity = newCity;

      localStorage.setItem("previousCity", newCity);
      this.$emit("changeCity", this.currentCity);
      try {
        const API_KEY = "fefdbfb5a1c67a4e7c664447c496b3a7";
        let url = `http://api.openweathermap.org/data/2.5/weather?q=${this.currentCity}&appid=${API_KEY}`;
        let res = await fetch(url);

        let data = await res.json();
        if (res.status == 200 || res.status == 201) {
          this.isDataValid = true;
          this.currentCityData = data;
        } else {
          this.isDataValid = false;
          console.log("Произошла ошибка");
        }
      } catch (error) {
        this.isDataValid = false;
        console.log(error);
      }
      this.inProgress = false;
    },
  },
  mounted() {
    this.updateData(this.currentCity);
  },
  //   computed: {
  //     currentCityData: async function () {
  //       const API_KEY = "fefdbfb5a1c67a4e7c664447c496b3a7";
  //       let url = `http://api.openweathermap.org/data/2.5/weather?q=Ижевск&appid=${API_KEY}`;

  //       let data = await fetch(url)
  //         .then(function (response) {
  //           if (response.status !== 200) {
  //             console.log(
  //               "Looks like there was a problem. Status Code: " + response.status
  //             );
  //             return null;
  //           }

  //           // Examine the text in the response
  //           response.json().then(function (data) {
  //             // console.log(data);
  //             alert(1);
  //             return data;
  //           });
  //         })
  //         .catch(function (err) {
  //           console.log("Fetch Error :-S", err);
  //           return null;
  //         });
  //       alert(2);
  //       console.log(data);
  //       return data;
  //     },
  //   },
};
</script>

<style scoped>
.data-manipulation {
  min-height: 50vh;
}
</style>