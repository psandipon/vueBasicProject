<template>
  <div  class="about mt-5">
   <v-card class="mx-5">
     <v-card-text> 
      <dessertTable> </dessertTable>
     </v-card-text>
   </v-card>
  </div>
</template>

<script>
import dessertTable from "@/components/tables/dessert_table";

export default {
  components: {
    dessertTable,
    }
};
</script>
<style scoped>

 

</style>

