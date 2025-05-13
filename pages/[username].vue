<template>
  <ProfileCard v-if="user" :user="user" />
  <WelcomePage v-else />
</template>

<script>
import ProfileCard from '~/components/ProfileCard.vue';
import WelcomePage from '~/components/WelcomePage.vue';
import { users } from '~/data/users';

export default {
  components: {
    ProfileCard,
    WelcomePage,
  },
  setup() {
    const route = useRoute();
    const user = users[route.params.username];
    return { user };
  },
};
</script>