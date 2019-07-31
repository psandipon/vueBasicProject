<template>
  <div id="loader" small class="text-xs-center">
    <v-progress-linear
      background-color="white"
      color="black"
      :indeterminate="loader"
    ></v-progress-linear>
  </div>
</template>

<script>
export default {
  props: ["loader"],
  data() {
    return {};
  },
  watch: {
    loader(val) {
      this.$emit("update:loader", val);
    }
  }
};
</script>

<style>

#loader{
    
    padding: 0px;
    margin: 0px;
    font-size: 4px;
}

</style>
