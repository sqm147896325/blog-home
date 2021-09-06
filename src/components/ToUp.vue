<template>
  <div class="to-up" @click="toUp"></div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
    data() {
        return {

        }
    },
    methods: {
        toUp() {
            
        }
    }
})
</script>

<style>
.to-up{
    position: fixed;
    bottom: 50px;
    right: 50px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: #000;
}
</style>