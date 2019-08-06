<template>
  <div>
    
    <div class="about mt-5">
      <v-card class="mx-5">
        <v-card-text>
          <userTable></userTable>
        </v-card-text>
      </v-card>
    </div>
    
     
    
   
    

  </div>
</template>

<script>
import userTable from "@/components/tables/user_table";


export default {
  data() {
    return {
      sheet: false
    };
  },
  components: {
    userTable,
    
  }
};
</script>
<style scoped>

</style>

