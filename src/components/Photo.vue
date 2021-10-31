<template>
  <div>
    <div
      v-if="imageStatus.getStatus() == 'initialize' || false"
      class="align-center d-flex p-4"
    >
      Приложение в процессе запуска
      <div class="spinner-border text-primary p-0 mx-3" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
    <div
      v-else-if="imageStatus.getStatus() == 'image-shown'"
      class="img rounded-start"
      :style="{ backgroundImage: 'url(' + imgURL + ')' }"
    ></div>
    <div
      v-else-if="imageStatus.getStatus() == 'image-download'"
      class="d-flex justify-content-center"
    >
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
    <div
      class="alert alert-primary"
      role="alert"
      v-else-if="imageStatus.getStatus() == 'image-not-exist'"
    >
      Фотография для этого места не найдена.
    </div>

    <div
      class="alert alert-error"
      role="alert"
      v-else-if="imageStatus.getStatus() == 'error'"
    >
      Какая-то ошибка.
    </div>
    <div v-else>Интересно, какое действие дошло сюда?</div>
  </div>
</template>

<script>
export default {
  props: ["city"],
  data() {
    return {
      imageStatus: {
        isValid: false,
        status: ["initialize"],
        setStatus: function (el) {
          this.status.push(el);
        },
        getStatus: function () {
          return this.status[this.status.length - 1];
        },
      },
      imgURL: "none",
    };
  },
  methods: {
    async changeIMG(text) {
      this.imageStatus.setStatus("image-download");
      try {
        const API_KEY = "23909248-46987dab904e15ddebe9addff";
        let url = `https://pixabay.com/api/?key=${API_KEY}&q=${encodeURIComponent(
          text
        )}`;
        let res = await fetch(url);

        let data = await res.json();
        if (res.status == 200 || res.status == 201) {
          if (data.hits.length) {
            this.imgURL =
              data.hits[
                Math.floor(Math.random() * data.hits.length)
              ].largeImageURL;
            this.imageStatus.setStatus("image-shown");
          } else {
            this.imageStatus.setStatus("image-not-exist");
          }
        } else {
          this.imageStatus.setStatus("error");
        }
      } catch (error) {
        this.imageStatus.setStatus("error");
        console.log(error);
      }
    },
  },
  watch: {
    city: function () {
      this.changeIMG(this.city);
    },
  },
  mounted() {
    this.changeIMG(this.city);
  },
};
</script>

<style scoped>
.img {
  min-height: 100%;
  background-image: url("../assets/body-bg.jpg");
  background-size: cover;
  background-position: center;
}
</style>