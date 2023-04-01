import { db } from "./db.js";

console.log("Running db query");

const docRef = db.collection("ViewerQueue").doc("usernameArray");
const document = await docRef.get();
export let namesList: Array<string> = document?.data()?.usernameArray;

console.log(namesList);

export async function addName(name: string) {
  name = name.trim();
  if (!namesList.includes(name)) {
    return { error: "You are already in the queue!" };
  }

  namesList.push(name);
  console.log(`Adding ${name} to the queue at position ${namesList.length}`);
  try {
    await docRef.update({ namesList });
    return { result: `Successfully added ${name} to the queue` };
  } catch (e) {
    console.error(e);
    return { error: "Something went wrong" };
  }
}

export async function deleteName(name: string) {
  if (!namesList.includes(name)) {
    return { error: "That username is not in the queue" };
  }
  const idx = namesList.findIndex((s) => s === name);
  const deleting = namesList.splice(idx, 1);
  console.log(`Removing ${deleting} from the queue`);
  try {
    await docRef.update({ namesList });
    return { result: `Successfully removed ${name} from the queue` };
  } catch (e) {
    console.error(e);
    return { error: "Something went wrong" };
  }
}

export function reOrderName(name: string, newIdx: number) {
  if (!namesList.includes(name)) {
    return { error: "That username is not in the queue" };
  }
  const idx = namesList.findIndex((s) => s === name);
  const moving = namesList.splice(idx, 1);
  namesList.splice(newIdx, 0, moving[0]);
  console.log(`Moving ${moving} to position ${newIdx}`);
}

export async function forceSync() {
  const document = await docRef.get();
  namesList = document?.data()?.usernameArray;
  return true;
}
