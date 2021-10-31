<template>
  <div class="input-group mb-3">
    <input
      type="text"
      class="form-control"
      placeholder="Введите место"
      aria-label="city"
      aria-describedby="button-selectPlace"
      v-model="city"
      @keyup.enter="updateData(city)"
    />
    <button
      class="btn btn-outline-secondary"
      type="button"
      id="button-selectPlace"
      @click="updateData(city)"
    >
      Найти
    </button>
  </div>
</template>

<script>
export default {
  props: ["currentCity", "updateData"],
  data() {
    return {
      city: this.currentCity,
    };
  },
  methods: {},
};
</script>