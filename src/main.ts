import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import Notifications from '@kyvg/vue3-notification'
import "./assets/scss/style.scss?v=<?=time()?>"
const app = createApp(App);
app.use(store);
app.use(router);
app.use(Notifications);
app.mount("#app");
