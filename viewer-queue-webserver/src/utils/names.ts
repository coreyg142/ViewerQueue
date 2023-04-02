import { Server } from "socket.io";
import { db } from "./db.js";

console.log("Running db query");

const docRef = db.collection("ViewerQueue").doc("namesLists");
const document = await docRef.get();
export let queuedNames: Array<string> = document?.data()?.queuedNames;
export let poppedNames: Array<string> = document?.data()?.poppedNames;

export async function addName(name: string) {
  name = name.trim();
  if (queuedNames.includes(name)) {
    return { error: "You are already in the queue!" };
  }

  queuedNames.push(name);
  console.log(`Adding ${name} to the queue at position ${queuedNames.length}`);
  try {
    await docRef.update({ queuedNames });
    return {
      result: `Successfully added to the queue at position ${queuedNames.length}`,
    };
  } catch (e) {
    console.error(e);
    return { error: "Something went wrong" };
  }
}

export async function deleteName(name: string) {
  if (!queuedNames.includes(name)) {
    return { error: "That username is not in the queue" };
  }
  const idx = queuedNames.findIndex((s) => s === name);
  const deleting = queuedNames.splice(idx, 1);
  console.log(`Removing ${deleting} from the queue`);
  try {
    await docRef.update({ queuedNames });
    return { result: `Successfully removed ${name} from the queue` };
  } catch (e) {
    console.error(e);
    return { error: "Something went wrong" };
  }
}

export async function popName() {
  if (queuedNames.length === 0) {
    return { error: "There are no names in the queue" };
  }
  const name = queuedNames.shift() || "";
  poppedNames.unshift(name);
  console.log(`Popping ${name} from the queue`);
  try {
    await docRef.update({ queuedNames });
    await docRef.update({ poppedNames });
    return { result: `${name} is the next name!`, name };
  } catch (e) {
    console.error(e);
    return { error: "Something went wrong getting the next name" };
  }
}

export async function reOrderName(name: string, newIdx: number) {
  if (!queuedNames.includes(name)) {
    return { error: "That username is not in the queue" };
  }
  const idx = queuedNames.findIndex((s) => s === name);
  const moving = queuedNames.splice(idx, 1);
  queuedNames.splice(newIdx, 0, moving[0]);
  console.log(`Moving ${moving} to position ${newIdx}`);
  // TODO: update DB
}

export async function clearQueues(io: Server) {
  queuedNames = [];
  poppedNames = [];
  try {
    await docRef.update({ queuedNames });
    await docRef.update({ poppedNames });
    io.emit("refresh-lists", queuedNames, poppedNames);
    return { result: "Successfully cleared queues" };
  } catch (e) {
    console.error(e);
    return { error: "Something went wrong" };
  }
}

export async function forceSync() {
  const document = await docRef.get();
  queuedNames = document?.data()?.queuedNames;
  return true;
}
