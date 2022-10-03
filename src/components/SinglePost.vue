<template>
  <v-col>
    <v-card
      class="mx-auto single-post"
      width="344"
    >
      <v-card-title>
        <router-link
          :to="`/users/${post.user.id}`"
        >
          {{post.user.username}}
        </router-link>
      </v-card-title>

      <v-img
        :src="post.picture"
        height="200px"
      ></v-img>

      <v-card-title>
        {{post.title}}
      </v-card-title>

      <v-card-subtitle>
        {{post.content}}
      </v-card-subtitle>
      
      <v-card-text>
        <PostTag
          :tag="tag.title"
          v-bind:key="tag.id" 
          v-for="tag in post.tags"
        />
      </v-card-text>

    </v-card>
  </v-col>
</template>

<script>
import PostTag from './PostTag.vue';
export default {
    props: {
        post: {
            type: Object,
            required: true,
        }
    },
    components: { PostTag }
}
</script>

