<template>
  <!--* This 'id = "app"' can be connected with main.js-48 -->
  <!--* It controls the rest of whole page except the left side bar -->
  <div id="app">
    <!--* It presents each pages in each route -->
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>
