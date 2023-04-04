import { reactive } from "vue";
import { io } from "socket.io-client";
import axios from "axios";
import { apiUrl } from "./main";
export const state = reactive({
  connected: false,
  queuedNames: [] as string[],
  poppedNames: [] as string[],
});

export const socket = io(apiUrl);
socket.on("name-added", (...args) => {
  state.queuedNames.push(args[0]);
});

socket.on("name-popped", (...args) => {
  state.poppedNames.unshift(args[0]);
  state.queuedNames = state.queuedNames.filter((name) => name !== args[0]);
});

socket.on("refresh-lists", (...args) => {
  state.queuedNames = args[0];
  state.poppedNames = args[1];
});

socket.on("connect", async () => {
  state.connected = true;
  // console.log("Connected to socket");
  const response = await axios.get(apiUrl + "/queue");
  state.queuedNames = response.data.lists.queued;
  state.poppedNames = response.data.lists.popped;
});
