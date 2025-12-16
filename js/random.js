const container = document.getElementById("random-container");

let manifest = [];
let isLoading = false;

function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

async function loadRandomOnce() {
  if (isLoading) return;
  isLoading = true;

  try {
    const item = pickRandom(manifest);
    if (!item) return;

    const meta = await loadPaperTxt(item.meta, item.id);

    const div = document.createElement("div");
    div.className = "paper";
    div.innerHTML = `
      <h3><a href="paper.html?id=${encodeURIComponent(item.id)}">${meta.title}</a></h3>
      <div class="meta">구분: ${item.subject || meta.subject}</div>
      <p style="white-space: pre-wrap;">${meta.abstract}</p>
      <a href="${item.pdf}" target="_blank" rel="noopener">PDF</a>
    `;
    container.appendChild(div);
  } catch (err) {
    console.error(err);
  } finally {
    isLoading = false;
  }
}

(async () => {
  try {
    manifest = await loadManifest();

    // 처음 3개 로드
    for (let i = 0; i < 3; i++) await loadRandomOnce();

    // 무한 스크롤
    window.addEventListener("scroll", async () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 120) {
        await loadRandomOnce();
      }
    });
  } catch (err) {
    container.innerHTML = `<p>오류: ${err.message}</p>
      <p>※ 로컬에서 file://로 열면 fetch가 막힙니다. 반드시 로컬 서버로 실행하세요.</p>`;
    console.error(err);
  }
})();
