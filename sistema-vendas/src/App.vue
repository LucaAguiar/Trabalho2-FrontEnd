<template>
    <div id="app">
        <div class="loader-container" v-if="onLoad">
            <b-spinner variant="light"></b-spinner>
        </div>
        <router-view />
    </div>
</template>

<script>
import { mapState } from "vuex";

export default {
    name: "app",
    computed: {
        ...mapState(["onLoad"]),
    },
};
</script>

<style>
#app {
    font-family: "Montserrat";
    font-weight: 600;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: white;
}
.loader-container {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #444444;
    opacity: 0.7;
    position: absolute;
    height: 100vh;
    width: 100%;
    z-index: 2;
}
</style>
