const params = new URLSearchParams(location.search);
const id = params.get("id");
const container = document.getElementById("paper");

(async () => {
  try {
    if (!id) throw new Error("id 파라미터가 없습니다.");

    const manifest = await loadManifest();
    const item = manifest.find((m) => String(m.id) === String(id));
    if (!item) throw new Error(`manifest에서 id=${id}를 찾지 못했습니다.`);

    const meta = await loadPaperTxt(item.meta, item.id);

    container.innerHTML = `
      <h2>${meta.title}</h2>
      <div class="meta">구분: ${item.subject || meta.subject}</div>
      <p style="white-space: pre-wrap;">${meta.abstract}</p>
      <a href="${item.pdf}" target="_blank" rel="noopener">PDF 보기</a>
    `;
  } catch (err) {
    container.innerHTML = `<p>오류: ${err.message}</p>`;
    console.error(err);
  }
})();
