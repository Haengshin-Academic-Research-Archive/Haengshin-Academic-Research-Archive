async function loadPaperTxt(path, id) {
  const res = await fetch(path);
  const text = await res.text();

  const paper = { id };

  text.split("\n").forEach(line => {
    const [key, ...rest] = line.split(":");
    if (!key || rest.length === 0) return;
    paper[key.trim()] = rest.join(":").trim();
  });

  return paper;
}
