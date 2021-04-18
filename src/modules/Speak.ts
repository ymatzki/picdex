export function Speak(word: string) {
  const utterance = new SpeechSynthesisUtterance(word);
  speechSynthesis.speak(utterance);
}
