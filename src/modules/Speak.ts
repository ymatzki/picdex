export function Speak(word: string, lang?: string) {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = lang || "en-US";
  speechSynthesis.cancel();
  speechSynthesis.speak(utterance);
  utterance.onerror = (e) => {
    console.error(
      "An error has occurred with the speech synthesis: " + e.error
    );
  };
}
