<template>
    <p 
      class="post-tag"
    >
        {{tag}}
    </p>
</template>

<script>
export default {
  props: {
    tag: {
      type: String,
      required: true,
    }
  }
}
</script>

<style scoped>
    .post-tag{
      display: inline;
      border: 1px solid lightgray;
      padding: 4px;
      border-radius: 5px;
    }
</style>