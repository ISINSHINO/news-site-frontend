<template>
    <v-container>
        <v-row 
            v-if="posts.length"
        >
            <SinglePost
                v-for="post in posts" 
                v-bind:key="post.id" 
                :post="post"
            />
         </v-row>
        <h2
          v-else
        >Nothing to show...</h2>
    </v-container>
</template>

<script>
import SinglePost from '@/components/SinglePost';

export default {
    props: {
        posts: {
            type: Array,
            required: true
        }
    },
    components: {SinglePost}
}
</script>