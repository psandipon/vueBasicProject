<template>
  <div  class="about mt-5">
   <v-card class="mx-0">
     <v-card-text> 
      <userTable> </userTable>
     </v-card-text>
   </v-card>
  </div>
</template>

<script>
import userTable from "@/components/tables/user_table";

export default {
  components: {
    userTable,
    }
};
</script>
<style scoped>

 

</style>

