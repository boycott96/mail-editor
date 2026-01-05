import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import "virtual:svg-icons-register";
import SvgIcon from "./components/SvgIcon.vue";

import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

createApp(App).use(ElementPlus).component("svg-icon", SvgIcon).mount("#app");
