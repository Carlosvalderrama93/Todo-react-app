export default function textFormater(textTask) {
  textTask = textTask.trim(); // deleting ending and starting spaces
  textTask = textTask
    ? textTask.charAt(0).toUpperCase() + textTask.slice(1)
    : null; // transform the firts letter in uppercase
  const textFormated = [];
  for (let i = 0; i < textTask.length; i++) {
    textTask[i] === " " && textTask[i + 1] === " "
      ? undefined
      : textFormated.push(textTask[i]);
  }

  textTask = textFormated.join(""); // Transform the array into a String
  return textTask;
}
