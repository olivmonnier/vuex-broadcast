<template>
  <div class="container">
  <h1>{{ msg }}</h1>

  <div class="columns">
    <textarea @change="editText" v-model="text"></textarea>
    <div v-html="text"></div>
  </div>

  <p>
    <a href="https://vitejs.dev/guide/features.html" target="_blank">
      Vite Documentation
    </a>
    |
    <a href="https://v3.vuejs.org/" target="_blank">Vue 3 Documentation</a>
  </p>

  <button @click="increment">count is: {{ count }}</button>
  <p>
    Edit
    <code>components/HelloWorld.vue</code> to test hot module replacement.
  </p>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  props: {
    msg: String
  },
  computed: {
    ...mapState(['count']),
    text: {
      get() {
        return this.$store.state.text
      },
      set(value) {
        this.editText(value)
      }
    }
  },
  methods: {
    ...mapActions([
      'increment',
      'editText'
    ])
  }
}
</script>

<style scoped>
a {
  color: #42b983;
}
.columns {
  margin: auto;
  display: flex;
  flex-direction: row;
}
.columns > * {
  flex: 1;
  min-height: 450px;
}
.container {
  max-width: 800px;
  margin: auto;
}
</style>
