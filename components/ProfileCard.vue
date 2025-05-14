<template>
  <div class="bg-white bg-opacity-90 p-8 rounded-xl shadow-lg w-full max-w-md text-center relative">
    <!-- Dialog thông báo -->
    <div
      v-if="showDialog"
      class="absolute top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded-lg shadow-md animate-fade-in"
    >
      {{ dialogMessage }}
    </div>

    <!-- Ảnh đại diện -->
    <img
      :src="user.avatar"
      alt="Profile"
      class="w-40 h-40 rounded-full mx-auto mb-4 border-4 border-blue-500"
    />

    <!-- Tên và biểu tượng verified -->
    <h1 class="text-3xl font-bold flex items-center justify-center gap-2">
      {{ user.name }}
      <svg class="w-6 h-6 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
        <path
          d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15l-5-5 1.41-1.41L11 14.17l7.59-7.59L20 8l-9 9z"
        />
      </svg>
    </h1>

    <!-- Mô tả -->
    <p class="text-lg text-gray-600 mt-2">{{ user.description }}</p>

    <!-- Danh sách liên kết mạng xã hội -->
    <div class="mt-6 space-y-4">
      <a
        v-for="social in user.socials"
        :key="social.name"
        :href="social.href"
        :target="social.copyable ? '' : '_blank'"
        rel="noopener noreferrer"
        :class="[
          'flex items-center justify-center gap-2 bg-gradient-to-r text-white py-2 rounded-full',
          social.gradient,
          social.copyable ? 'cursor-pointer' : '',
        ]"
        @mouseenter="handleMouseEnter(social)"
        @mouseleave="handleMouseLeave(social)"
        @click="social.isMomo? handleMomoClick(social.text):(social.copyable ? copyToClipboard(social.text, social.name) : null)"
      >
        <i :class="social.icon"></i> {{ socialTexts[social.name] }}
      </a>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      socialTexts: this.user.socials.reduce(
        (acc, social) => ({ ...acc, [social.name]: social.name }),
        {}
      ),
      showDialog: false,
      dialogMessage: '',
    };
  },
  methods: {
    handleMouseEnter(social) {
      this.socialTexts[social.name] = social.text;
      this.$forceUpdate();
    },
    handleMouseLeave(social) {
      this.socialTexts[social.name] = social.name;
      this.$forceUpdate();
    },
    copyToClipboard(text, bankName) {
      navigator.clipboard
        .writeText(text)
        .then(() => {
          this.dialogMessage = `Đã copy số tài khoản ${bankName}: ${text}`;
          this.showDialog = true;
          setTimeout(() => {
            this.showDialog = false;
          }, 2000);
        })
        .catch((err) => {
          console.error('Lỗi khi copy:', err);
          this.dialogMessage = 'Lỗi khi copy, vui lòng thử lại!';
          this.showDialog = true;
          setTimeout(() => {
            this.showDialog = false;
          }, 2000);
        });
    },
    handleMomoClick(phone) {
      const momoDeepLink = `momo://?action=payWithPhone&phone=${phone}`
      const momoWebLink = `https://nhantien.momo.vn/${phone}`

      // Thử mở app trong tab mới
      const newWindow = window.open(momoDeepLink, '_blank')

      // Fallback: nếu không mở được app (vì không có handler momo://), sau 1s thì chuyển link tab đó sang QR
      setTimeout(() => {
        try {
          if (newWindow && !newWindow.closed) {
            newWindow.location.href = momoWebLink
          }
        } catch (e) {
          // Nếu bị block thì mở mới lại
          window.open(momoWebLink, '_blank')
        }
      }, 1000)
    }
  },
};
</script>