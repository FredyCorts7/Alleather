<template>
  <div>
    <Nav/>
    <router-view/>
    <Foot/>
  </div>
</template>

<script>
import Nav from './components/statics/Nav.vue'
import Foot from './components/statics/Foot.vue'

export default {
  name: 'app',
    components: {
        Nav,
        Foot
    }
}
</script>