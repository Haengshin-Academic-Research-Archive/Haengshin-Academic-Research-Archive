// js/loader.js
export async function loadMetaTxt(path) {
  // 공백/한글 폴더명 때문에 반드시 encodeURI
  const res = await fetch(encodeURI(path));
  if (!res.ok) throw new Error(`TXT 로드 실패: ${res.status} (${path})`);

  const text = await res.text();
  const obj = {};

  text.split(/\r?\n/).forEach(line => {
    const idx = line.indexOf(":");
    if (idx === -1) return;
    const key = line.slice(0, idx).trim();
    const val = line.slice(idx + 1).trim();
    if (!key) return;
    obj[key] = val;
  });

  // ✅ 한글 키 → 사이트 내부 표준 키로 정규화
  const title = obj["제목"] ?? obj["title"] ?? obj["Title"] ?? "";
  const subject = obj["구분"] ?? obj["subject"] ?? obj["Subject"] ?? "";
  const abstract = obj["초록"] ?? obj["abstract"] ?? obj["Abstract"] ?? "";

  return { title, subject, abstract, raw: obj };
}

// txt 경로 → pdf 경로 자동 변환
export function metaToPdfPath(metaPath) {
  return metaPath
    .replace(/^meta data\//, "paper/")
    .replace(/\.txt$/i, ".pdf");
}

