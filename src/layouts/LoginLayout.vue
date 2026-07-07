<template>
  <div class="login-layout">
    <div class="login-layout__glow" />
    <div class="login-layout__content">
      <router-view />
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.login-layout {
  position: relative;
  min-height: 100vh;
  background: linear-gradient(135deg, #f3f3f7 0%, #ece9ff 60%, #f7eef0 100%);
  overflow: hidden;

  &__glow {
    position: absolute;
    width: 520px;
    height: 520px;
    border-radius: 50%;
    filter: blur(90px);
    opacity: 0.5;
    background: radial-gradient(circle, rgba(115, 103, 240, 0.45), transparent 70%);
    top: -160px;
    right: -120px;
    pointer-events: none;
  }

  &__content {
    position: relative;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    padding: 24px;
  }
}
</style>
