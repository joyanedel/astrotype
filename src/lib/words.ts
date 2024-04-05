const loadWords = async (n: number) => {
  const response = await fetch(`https://random-word-api.herokuapp.com/word?number=${n}`);
  const words = await response.json();
  return words;
}

export const getNWords = async (n: number) => {
  const words = await loadWords(n);
  return words.slice(0, n);
}
