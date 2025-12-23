export const petImages = {
  dog: {
    Labrador: [
      "https://images.unsplash.com/photo-1558788353-f76d92427f16",
      "https://images.unsplash.com/photo-1587300003388-59208cc962cb",
      "https://images.unsplash.com/photo-1517849845537-4d257902454a",
      "https://images.unsplash.com/photo-1537151625747-768eb6cf92b6",
      "https://images.unsplash.com/photo-1601758123927-1964b0b6f8c4",
    ],
    Beagle: [
      "https://images.unsplash.com/photo-1548199973-03cce0bbc87b",
      "https://images.unsplash.com/photo-1596492784531-6e6eb5ea9993",
      "https://images.unsplash.com/photo-1560807707-8cc77767d783",
      "https://images.unsplash.com/photo-1525253086316-d0c936c814f8",
      "https://images.unsplash.com/photo-1558788353-f76d92427f16",
    ],
  },

  cat: {
    Persian: [
      "https://images.unsplash.com/photo-1595433562696-19fdbb1b7fbc",
      "https://images.unsplash.com/photo-1574158622682-e40e69881006",
      "https://images.unsplash.com/photo-1518791841217-8f162f1e1131",
      "https://images.unsplash.com/photo-1606225457115-9b0e4c7b4f31",
      "https://images.unsplash.com/photo-1543852786-1cf6624b9987",
    ],
    Bengal: [
      "https://images.unsplash.com/photo-1518791841217-8f162f1e1131",
      "https://images.unsplash.com/photo-1543852786-1cf6624b9987",
      "https://images.unsplash.com/photo-1574158622682-e40e69881006",
      "https://images.unsplash.com/photo-1595433562696-19fdbb1b7fbc",
      "https://images.unsplash.com/photo-1606225457115-9b0e4c7b4f31",
    ],
  },
};

export function getRandomPetImage(type, breed) {
  const images = petImages[type]?.[breed];
  if (!images || images.length === 0) {
    return "https://via.placeholder.com/400x250?text=Pet";
  }
  return images[Math.floor(Math.random() * images.length)];
}
