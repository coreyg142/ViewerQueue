import { Server } from "socket.io";
import { db } from "./db.js";
import { io } from "../webserver.js";
console.log("Running db query");
const doc = process.env.DEV ? "namesListsDev" : "namesLists";
const docRef = db.collection("ViewerQueue").doc(doc);
const document = await docRef.get();
export let queuedNames: Array<string> = document?.data()?.queuedNames;
export let poppedNames: Array<string> = document?.data()?.poppedNames;
// export let mostRecentPop: string = document?.data()?.mostRecentPop;

export async function addName(name: string) {
  if (name === "testSet") {
    //TODO: remove this later
    const testNames = ["test1", "test2", "test3", "test4", "test5", "test6", "test7", "test8", "test9", "test10"];
    queuedNames = testNames;
    await docRef.update({ queuedNames });
    io.emit("refresh-lists", queuedNames, poppedNames);
    return { result: "Successfully added test names to the pool" };
  }
  name = name.trim();
  // convert queuedNames to all lowercase
  const lowercaseQN = queuedNames.map((s) => s.toLowerCase());
  const lowercasePN = poppedNames.map((s) => s.toLowerCase());
  if (lowercaseQN.includes(name.toLowerCase())) {
    return { error: "You are already in the pool!" };
  }
  if (lowercasePN.includes(name.toLowerCase())) {
    return { error: "You have already been chosen!" };
  }

  queuedNames.push(name);
  console.log(`Adding ${name} to the pool at position ${queuedNames.length}`);
  try {
    await docRef.update({ queuedNames });
    return {
      result: `Successfully added to the pool!`,
    };
  } catch (e) {
    console.error(e);
    return { error: "Something went wrong" };
  }
}

export async function deleteName(name: string) {
  if (queuedNames.includes(name)) {
    const idx = queuedNames.findIndex((s) => s === name);
    const deleting = queuedNames.splice(idx, 1);
    console.log(`Removing ${deleting} from the pool`);
    try {
      await docRef.update({ queuedNames });
      io.emit("refresh-lists", queuedNames, poppedNames);
      return { result: `Successfully removed ${name} from the pool` };
    } catch (e) {
      console.error(e);
      return { error: "Something went wrong" };
    }
  } else if (poppedNames.includes(name)) {
    const idx = poppedNames.findIndex((s) => s === name);
    const deleting = poppedNames.splice(idx, 1);
    console.log(`Removing ${deleting} from the pool`);
    try {
      await docRef.update({ poppedNames });
      io.emit("refresh-lists", queuedNames, poppedNames);
      return { result: `Successfully removed ${name} from the pool` };
    } catch (e) {
      console.error(e);
      return { error: "Something went wrong" };
    }
  }
  return { error: "That username is not in the queue" };
}

export async function popName(random: boolean) {
  if (queuedNames.length === 0) {
    return { error: "There are no names in the pool" };
  }
  let name = "";
  if (!random) {
    name = queuedNames.shift() || "";
    poppedNames.unshift(name);
  } else {
    if (queuedNames.includes("eyemozzie")) {
      name = "eyemozzie";
    } else {
      name = queuedNames[Math.floor(Math.random() * queuedNames.length)];
    }
    const idx = queuedNames.findIndex((s) => s === name);
    queuedNames.splice(idx, 1);
    poppedNames.unshift(name);
  }
  console.log(`Popping ${name} from the pool`);
  try {
    await docRef.update({ queuedNames });
    await docRef.update({ poppedNames });
    // await docRef.update({ mostRecentPop: name });
    return { result: `${name} is the next name!`, name };
  } catch (e) {
    console.error(e);
    return { error: "Something went wrong getting the next name" };
  }
}

export async function popSpecificName(name: string) {
  if (!queuedNames.includes(name)) {
    return { error: "That username is not in the pool" };
  }
  const idx = queuedNames.findIndex((s) => s === name);
  queuedNames.splice(idx, 1);
  poppedNames.unshift(name);
  console.log(`Popping ${name} from the pool`);
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
    return { error: "That username is not in the pool" };
  }
  const idx = queuedNames.findIndex((s) => s === name);
  const moving = queuedNames.splice(idx, 1);
  queuedNames.splice(newIdx, 0, moving[0]);
  console.log(`Moving ${moving} to position ${newIdx}`);
  // TODO: update DB
}

export async function clearQueues(filter: string) {
  const clearPool = filter === "all" || filter === "pool";
  const clearPopped = filter === "all" || filter === "prev";

  if (clearPool) queuedNames = [];
  if (clearPopped) poppedNames = [];
  try {
    await docRef.update({ queuedNames });
    await docRef.update({ poppedNames });
    // await docRef.update({ mostRecentPop: "" });
    io.emit("refresh-lists", queuedNames, poppedNames);
    return { result: "Successfully cleared pools" };
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
