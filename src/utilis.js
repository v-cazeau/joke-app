export function shuffle(array) {
  let currentIndex = array.length;
  while (currentIndex) {
    //pick a remaining element.
    const randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    //and swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
  return array;
}
