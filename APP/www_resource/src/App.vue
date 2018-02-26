<template>
  <div id="app">
    <f7-statusbar></f7-statusbar>
    <f7-view main>
      <!-- Initial Page -->
      <f7-page>
        <!-- Top Navbar-->
        <f7-navbar title="Awesome App"></f7-navbar>
        <!-- Toolbar-->
        <f7-toolbar>
          <f7-link>Link 1</f7-link>
          <f7-link>Link 2</f7-link>
        </f7-toolbar>
        <!-- Page Content -->
        <p>Page content goes here</p>
        <f7-link href="/about/">About App</f7-link>
      </f7-page>
    </f7-view>
    <!-- <router-view/> -->
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>
</style>
