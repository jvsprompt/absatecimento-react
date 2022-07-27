function removeSpaces(str) {
  const newStr = str.replace(/\s/g, '');
  return newStr.normalize('NFD')
    .replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

export default removeSpaces;
