const dogNames = [
  "Bruno", "Rocky", "Buddy", "Max", "Charlie", "Leo", "Oscar"
];

const catNames = [
  "Luna", "Milo", "Bella", "Kitty", "Simba", "Cleo", "Nala"
];

export function getPetName(type, id) {
  const list = type === "Dog" ? dogNames : catNames;
  return list[id % list.length];
}

export function getPetImage(type) {
  const query = type === "Dog" ? "dog" : "cat";
  return `https://source.unsplash.com/800x600/?${query}`;
}

export function monthsToYears(months) {
  return `${Math.floor(months / 12)} years`;
}
