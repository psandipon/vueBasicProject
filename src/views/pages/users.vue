<template>
<div>
  <div class="about mt-5">
   <v-card class="mx-5">
     <v-card-text> 
      <userTable> </userTable>
     </v-card-text>
   </v-card>
  </div>

  <chat> </chat>
   
  
</div>
</template>

<script>
import userTable from "@/components/tables/user_table";
import chat from "@/components/chat/private-chat.vue";

export default {
  components: {
    userTable,
    chat
    }
};
</script>
<style scoped>

 

</style>

