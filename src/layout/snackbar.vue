<template>

    <v-snackbar
      v-model="snackbar"
      :timeout="timeout"
      :color="color"
      top
      right
    >
    <v-icon class="pr-2" color="white">{{geticon()}}</v-icon>
     {{ text }} 
    </v-snackbar>
  
</template>

<script>
  export default {
      props: ['snackbar','text','color'] ,
    data () {
      return {
        timeout: 2000,
      }
    },
    methods:{
      geticon(){
        if (this.color == "success"){
          console.log("success") ;
          return "done"
        }else{
          console.log("error") ;
          return "error_outline"
        }
      }
    },
    watch:{
        snackbar(val){
            console.log("snackbar ->"+ val) ;
            console.log("component watch val", )
            this.$emit("update:snackbar", val)
        }
    }
  }
</script>