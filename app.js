const NEWS_URL = "https://jibunsenyo.github.io/news.json";

async function loadNews() {
  try {
    const res = await fetch(
      `${NEWS_URL}?t=${Date.now()}`,
      {
        cache: "no-store",
        headers: {
          "Cache-Control": "no-cache"
        }
      }
    );

    const data = await res.json();
    render(data);
  } catch (e) {
    console.error("読み込み失敗", e);
  }
}

function render(list) {
  const el = document.getElementById("news");
  el.innerHTML = "";

  list.forEach(item => {
    el.innerHTML += `
      <div class="item">
        <img src="${item.image || 'noimage.png'}">
        <div>
          <div class="source">${item.source}</div>
          <div>${item.title}</div>
        </div>
      </div>
    `;
  });
}

// 初回表示
loadNews();

// アプリに戻ったら自動更新（iOS対策）
document.addEventListener("visibilitychange", () => {
  if (!document.hidden) {
    loadNews();
  }
});
