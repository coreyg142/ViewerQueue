import { reactive } from "vue";
import { io } from "socket.io-client";
import axios from "axios";
import { hostname } from "./main";
export const state = reactive({
  connected: false,
  queuedNames: [] as string[],
  poppedNames: [] as string[],
});

export const socket = io(hostname);
socket.on("name-added", (...args) => {
  console.log("Name added");
  console.log(args[0]);
  state.queuedNames.push(args[0]);
});

socket.on("name-popped", (...args) => {
  console.log("Name popped");
  console.log(args[0]);
  state.poppedNames.push(args[0]);
  state.queuedNames.shift();
});

socket.on("connect", async () => {
  state.connected = true;
  console.log("Connected to socket");
  const response = await axios.get(hostname + "/queue");
  console.log(response);
  state.queuedNames = response.data.lists.queued;
  console.log(state.queuedNames);
});
