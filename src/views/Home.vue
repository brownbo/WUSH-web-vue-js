<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <div>
      {{ this.$store.state.name }}
    </div>
    <!-- <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" /> -->
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src

@Component({
  components: {
    HelloWorld,
  },
})
export default class Home extends Vue {
  mounted() {
    console.log(this.$store.state);
    Array.from({ length: 10 }, _ => {
      return 3;
    });
  }

  
}
</script>
