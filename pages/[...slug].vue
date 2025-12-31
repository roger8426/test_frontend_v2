<template>
  <div class="not-found">
    <h1>404</h1>
    <p>{{ t('pageNotFound') }}</p>
    <NuxtLink to="/">{{ t('backHome') }}</NuxtLink>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<style scoped lang="scss">
.not-found {
  background-color: #333;
  color: #fff;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 20px;

  h1 {
    font-size: 72px;
    margin: 0 0 20px 0;
  }

  p {
    font-size: 18px;
    margin: 0 0 30px 0;
    color: #ccc;
  }

  a {
    display: inline-block;
    padding: 10px 20px;
    background-color: #4caf50;
    color: #fff;
    text-decoration: none;
    border-radius: 6px;
    transition: background-color 0.3s;

    &:hover {
      background-color: #45a049;
    }
  }
}
</style>
