<template>
    <h1 class="title">Canvas 🎨</h1>
    <nav>
      <RouterLink to="/wowen-knots">
        <div class="row">
          <h2>Wowen knots</h2>
          <p class="red-text">⚠️ Not uploaded yet</p>
        </div>
      </RouterLink>
    </nav>
  </template>
  
  <script setup>
  //==================================
  // Import
  //==================================
  import { RouterLink } from "vue-router";
  
  </script>
  
  <style lang="scss" scoped>
  $title-h: 25vh;
  .title {
    width: 100%;
    text-align: center;
    height: $title-h;
    color: #ddd;
    display: grid;
    place-content: center;
  }
  nav {
    max-width: 1100px;
    width: 100%;
    height: 60vh;
    overflow-y: scroll;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    h2 {
      letter-spacing: 1px;
      color: #fff;
    }
    .row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-gap: 12px;
      padding: 12px;
      height: 66px;
      align-items: center;
      cursor: pointer;
      background-color: transparent;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      &:hover {
        background-color: var(--primary-02);
        transition-duration: var(--transition-medium);
      }
      .red-text {
        color: orangered;
      }
    }
  }
  </style>