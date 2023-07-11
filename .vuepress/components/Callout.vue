<template>
  <div class="callout">
    <div class="callout-header">
      <slot name="icon">
        <span class="callout-icon">!</span>
      </slot>
      <slot name="title"></slot>
    </div>
    <div class="callout-content">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.callout {
  display: flex;
  flex-direction: column;
  background-color: #f9fafb;
  border-radius: 4px;
  border: 1px solid #e2e8f0;
  padding: 16px;
}

.callout-header {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
}

.callout-header slot[name="icon"] {
  margin-right: 8px;
}

.callout-header slot[name="title"] {
  font-weight: bold;
}

.callout-content {
  margin-top: 8px;
}

.callout-icon {
  font-size: 20px;
  font-weight: bold;
  margin-right: 8px;
}
</style>

<script>
export default {
  name: "Callout",
};
</script>
