// https://dev.to/drbragg/handling-service-worker-updates-in-your-vue-pwa-1pip
<template>
  <div v-if="updateExists">
    <h3 @click="refreshApp" class="update-glow">
      {{ currentlyShowingText }}
    </h3>
  </div>
</template>
<script>
import { isFirefox } from "../utilities.js";
export default {
  data() {
    return {
      // refresh variables
      refreshing: false,
      registration: null,
      updateExists: false,
      // texts
      updateNotifyText: "Update available, do you want to update?",
      pleaseReopenOnChrome:
        "Update installed! Please reopen Cool-Pool to apply the update",
      currentlyShowingText: null,
    };
  },

  created() {
    this.currentlyShowingText = this.updateNotifyText;
    // Listen for our custom event from the SW registration
    document.addEventListener("swUpdated", this.updateAvailable, {
      once: true,
    });

    // Prevent multiple refreshes
    navigator.serviceWorker.addEventListener("controllerchange", () => {
      if (this.refreshing) return;
      this.refreshing = true;
      // Here the actual reload of the page occurs
      window.location.reload(true);
    });
  },

  methods: {
    // Store the SW registration so we can send it a message
    // We use `updateExists` to control whatever alert, toast, dialog, etc we want to use
    // To alert the user there is an update they need to refresh for
    updateAvailable(event) {
      this.registration = event.detail;
      console.log("hello");
      this.updateExists = true;
    },

    // Called when the user accepts the update
    refreshApp() {
      if (this.isFirefox()) {
        this.updateExists = false;
        window.location.reload(true);
      } else {
        this.currentlyShowingText = this.pleaseReopenOnChrome;
      }
    },
    isFirefox,
  },
};
</script>
