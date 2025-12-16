async function loadText(path) {
  const res = await fetch(path);
  if (!res.ok) throw new Error(`텍스트 로드 실패: ${path} (${res.status})`);
  // BOM 제거 + CRLF 대응
  return (await res.text()).replace(/^\uFEFF/, "").replace(/\r\n/g, "\n");
}

// txt 형식:
// 제목: ...
// 구분: ...
// 초록: ...  (초록이 여러 줄일 수도 있음)
async function loadPaperTxt(path, id) {
  const text = await loadText(path);

  const raw = {};
  const lines = text.split("\n");

  let currentKey = null;

  for (const line of lines) {
    if (!line.trim()) continue;

    // "키: 값" 패턴이면 새 키 시작
    const m = line.match(/^([^:]+)\s*:\s*(.*)$/);
    if (m) {
      currentKey = m[1].trim();
      raw[currentKey] = (m[2] ?? "").trim();
    } else if (currentKey) {
      // 값이 여러 줄인 경우 이어붙이기(초록 등)
      raw[currentKey] += (raw[currentKey] ? "\n" : "") + line.trim();
    }
  }

  // 한글 키 -> 내부 표준 필드로 정규화
  const paper = {
    id,
    // 표준 필드
    title: raw["제목"] ?? raw["title"] ?? "",
    subject: raw["구분"] ?? raw["subject"] ?? "",
    abstract: raw["초록"] ?? raw["abstract"] ?? "",
    // 원본도 보관(디버깅용)
    raw
  };

  return paper;
}

async function loadManifest(path = "manifest.json") {
  const res = await fetch(path);
  if (!res.ok) throw new Error(`manifest 로드 실패: ${res.status}`);
  return res.json();
}
