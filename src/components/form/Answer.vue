<template>
  <div>
    <ul class="list-group">
      <li class="list-group-item">Температура: {{ temp }} &deg;C</li>
      <li class="list-group-item">Чувствуется как: {{ temp_feel }} &deg;C</li>
      <li class="list-group-item">Скорость ветра: {{ wind_speed }} м/с</li>
      <li class="list-group-item">Видимость: {{ visibility }} м</li>
      <li class="list-group-item">Влажность: {{ humidity }}%</li>
      <li class="list-group-item">Давление: {{ pressure }} кПа</li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ["currentCityData"],
  data() {
    return {};
  },
  computed: {
    temp() {
      //   console.log(this.currentCityData);
      if (this.currentCityData == null) {
        return "NULL";
      } else {
        return (this.currentCityData.main.temp - 273).toFixed(1);
      }
    },
    temp_feel() {
      if (this.currentCityData == null) {
        return "NULL";
      } else {
        return (this.currentCityData.main.feels_like - 273).toFixed(1);
      }
    },
    wind_speed() {
      if (this.currentCityData == null) {
        return "NULL";
      } else {
        return this.currentCityData.wind.speed;
      }
    },
    visibility() {
      if (this.currentCityData == null) {
        return "NULL";
      } else {
        return this.currentCityData.visibility;
      }
    },
    humidity() {
      if (this.currentCityData == null) {
        return "NULL";
      } else {
        return this.currentCityData.main.humidity;
      }
    },
    pressure() {
      if (this.currentCityData == null) {
        return "NULL";
      } else {
        return this.currentCityData.main.pressure;
      }
    },
  },
};
</script>

<style scoped>
</style>