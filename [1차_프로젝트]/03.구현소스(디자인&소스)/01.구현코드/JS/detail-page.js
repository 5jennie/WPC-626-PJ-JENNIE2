// 위고 출판사 detail-page js - detail-page.js


/* ***************************************************************** */
// 1:1 문의 페이지네이션 /* ★수정됨: qna- 클래스명으로 통일 */

let currentQnaPage = 1;
const qnaPerPage = 5; // 페이지당 5개씩 표시

function initQnaPagination() {
  const qnaItems = document.querySelectorAll(".qna-item");
  const prevBtn = document.querySelector(
    '[data-panel="qna"] .pagination .prev'
  );
  const nextBtn = document.querySelector(
    '[data-panel="qna"] .pagination .next'
  );
  const pageNumbersContainer = document.querySelector(
    '[data-panel="qna"] .page-numbers'
  );

  if (!qnaItems.length || !prevBtn || !nextBtn || !pageNumbersContainer) {
    console.log("페이지네이션 요소를 찾을 수 없음");
    return;
  }

  const totalPages = Math.ceil(qnaItems.length / qnaPerPage);

  console.log("전체 문의:", qnaItems.length);
  console.log("전체 페이지:", totalPages);

  // 5개 이하면 페이지네이션 숨김
  if (totalPages <= 1) {
    document.querySelector('[data-panel="qna"] .pagination').style.display =
      "none";
    return;
  } else {
    document.querySelector('[data-panel="qna"] .pagination').style.display =
      "flex";
  }

  // 페이지 번호 버튼 생성
  function updatePagination() {
    pageNumbersContainer.innerHTML = "";

    for (let i = 1; i <= totalPages; i++) {
      const pageBtn = document.createElement("button");
      pageBtn.className = "page-num";
      pageBtn.textContent = i;

      if (i === currentQnaPage) {
        pageBtn.classList.add("active");
      }

      pageBtn.addEventListener("click", () => {
        currentQnaPage = i;
        showQnaPage(currentQnaPage);
        updatePagination();
      });

      pageNumbersContainer.appendChild(pageBtn);
    }

    // 이전/다음 버튼 활성화/비활성화
    prevBtn.disabled = currentQnaPage === 1;
    nextBtn.disabled = currentQnaPage === totalPages;
  }

  // 해당 페이지의 문의만 표시
  function showQnaPage(page) {
    const startIndex = (page - 1) * qnaPerPage;
    const endIndex = startIndex + qnaPerPage;

    qnaItems.forEach((item, index) => {
      if (index >= startIndex && index < endIndex) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });

    console.log(`페이지 ${page}: ${startIndex}~${endIndex - 1} 표시`);
  }

  // 이전 버튼 클릭
  prevBtn.addEventListener("click", () => {
    if (currentQnaPage > 1) {
      currentQnaPage--;
      showQnaPage(currentQnaPage);
      updatePagination();
    }
  });

  // 다음 버튼 클릭
  nextBtn.addEventListener("click", () => {
    if (currentQnaPage < totalPages) {
      currentQnaPage++;
      showQnaPage(currentQnaPage);
      updatePagination();
    }
  });

  // 초기 렌더링
  updatePagination();
  showQnaPage(currentQnaPage);
}

/* ***************************************************************** */
// 컴포넌트 로드 함수
async function loadComponent(selector, file) {
  try {
    const response = await fetch(file);
    const html = await response.text();
    document.querySelector(selector).innerHTML = html;

    // 헤더 로드 후 언어 버튼 초기화
    if (selector === "#header") {
      initLanguageButtons();
    }
  } catch (error) {
    console.error(`${file} 로드 실패:`, error);
  }
}

// Header와 Footer 로드
loadComponent("#header", "./inc/hero.html");
loadComponent("#footer", "./inc/footer.html");

/* ***************************************************************** */
// 언어 버튼 기능
function initLanguageButtons() {
  const krBtn = document.querySelector(".lang-kr");
  const enBtn = document.querySelector(".lang-en");

  if (krBtn && enBtn) {
    krBtn.classList.add("active");

    krBtn.addEventListener("click", function () {
      krBtn.classList.add("active");
      enBtn.classList.remove("active");
    });

    enBtn.addEventListener("click", function () {
      enBtn.classList.add("active");
      krBtn.classList.remove("active");
    });
  }
}

/* ***************************************************************** */
// 스크롤 효과 - 헤더 크기 조절
const scbody = document.body.classList;

window.addEventListener("scroll", () => {
  let scTop = window.scrollY;

  if (scTop > 300) {
    scbody.add("on3");
    scbody.remove("on1", "on2");
  } else if (scTop > 200) {
    scbody.add("on2");
    scbody.remove("on1", "on3");
  } else if (scTop > 100) {
    scbody.add("on1");
    scbody.remove("on2", "on3");
  } else {
    scbody.remove("on1", "on2", "on3");
  }
});

/* ***************************************************************** */
// 탭 메뉴 기능 */

function initTabMenu() {
  const tabButtons = document.querySelectorAll(".tab-btn");
  const tabPanels = document.querySelectorAll(".tab-panel");

  console.log("탭 버튼 개수:", tabButtons.length);
  console.log("탭 패널 개수:", tabPanels.length);

  // 각 탭 버튼에 클릭 이벤트 추가
  tabButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // 클릭한 버튼의 data-tab 값 가져오기
      const targetTab = this.getAttribute("data-tab");

      console.log("클릭한 탭:", targetTab);

      // 모든 탭 버튼에서 active 제거
      tabButtons.forEach((btn) => btn.classList.remove("active"));

      // 클릭한 버튼에 active 추가
      this.classList.add("active");

      // 모든 탭 패널 숨기기
      tabPanels.forEach((panel) => {
        panel.classList.remove("active");
      });

      // 해당하는 탭 패널만 보이기
      const targetPanel = document.querySelector(`[data-panel="${targetTab}"]`);

      if (targetPanel) {
        targetPanel.classList.add("active");
        console.log("활성화된 패널:", targetTab);
      } else {
        console.error("패널을 찾을 수 없음:", targetTab);
      }
    });
  });
}

/* ***************************************************************** */
// DOMContentLoaded - 페이지 로드 완료 후 실행

document.addEventListener("DOMContentLoaded", function () {
  console.log("상세페이지 로드 시작");

  // 책 데이터 로드 추가
  loadBookDetail();

  // 탭 메뉴 초기화
  initTabMenu();

  // 1:1 문의 페이지네이션 초기화 /* ★수정됨: 페이지네이션 초기화 추가 */
  initQnaPagination();

  console.log("상세페이지 로드 완료");
});

/* ***************************************************************** */
// 페이지 로드 시 최상단으로 이동

window.onbeforeunload = function () {
  window.scrollTo(0, 0);
};

// 히스토리 사용 시에도 최상단으로 이동
if (history.scrollRestoration) {
  history.scrollRestoration = "manual";
}

// 페이지 로드 즉시 최상단으로
window.addEventListener("load", function () {
  setTimeout(function () {
    window.scrollTo(0, 0);
  }, 0);
});

// 위고 출판사 detail-page js - detail-page.js

/* ***************************************************************** */
// URL에서 책 ID 가져오기 및 데이터 로드 */

const urlParams = new URLSearchParams(window.location.search);
const bookId = urlParams.get("id");

console.log("URL에서 가져온 책 ID:", bookId);

// 책 데이터 로드
async function loadBookDetail() {
  if (!bookId) {
    console.error("책 ID가 없습니다!");
    return;
  }

  try {
    const response = await fetch("./data/books.json");
    const books = await response.json();
    const book = books.find((b) => b.id == bookId);

    if (!book) {
      console.error("해당 ID의 책을 찾을 수 없습니다!");
      return;
    }

    console.log("로드된 책 정보:", book);
    displayBookDetail(book);
  } catch (error) {
    console.error("책 데이터 로드 실패:", error);
  }
}

// 책 정보를 페이지에 표시
function displayBookDetail(book) {
  // 책 표지
  const coverImg = document.querySelector(".dp-book-cover img");
  if (coverImg && book.coverImage) {
    coverImg.src = book.coverImage;
  }

  // 책 제목
  const bookTitle = document.querySelector(".book-title");
  if (bookTitle) {
    bookTitle.textContent = `[${book.title}] ${book.author}`;
  }

  // 책 정보
  const bookTxt = document.querySelector(".book-txt");
  if (bookTxt) {
    bookTxt.innerHTML = `
      ${book.isbn}<br />
      ${book.author} 저 | ${book.publisher} | ${book.publishDate}<br />
      ${book.pages} | ${book.weight} | ${book.size}
    `;
  }

  // 책소개
  const introTitle = document.querySelector('[data-panel="intro"] h2');
  if (introTitle && book.intro) {
    introTitle.textContent = book.intro;
  }

  // 기존 p 태그 모두 제거 후 새로 생성
  const introPanel = document.querySelector('[data-panel="intro"]');
  if (introPanel && book.description) {
    // 기존 p 태그 모두 제거
    const oldParagraphs = introPanel.querySelectorAll("p");
    oldParagraphs.forEach((p) => p.remove());

    // 새로운 p 태그 생성
    book.description.forEach((text) => {
      const p = document.createElement("p");
      p.textContent = text;

      // 이미지 위에 P태그 먼저 삽입
      introPanel.querySelector(".detail-image").before(p);
    });

    // 상세 이미지
    const detailImg = document.querySelector(".detail-image img");
    if (detailImg && book.detailImage) {
      detailImg.src = book.detailImage;
    }
  }

  // 목차
  const contentsList = document.querySelector('[data-panel="contents"] ul');
  if (contentsList && book.contents) {
    contentsList.innerHTML = "";
    book.contents.forEach((item) => {
      const li = document.createElement("li");
      li.textContent = item;
      contentsList.appendChild(li);
    });
  }

  // 저자 소개
  if (book.authorInfo) {
    const authorTitle = document.querySelector('[data-panel="author"] h2');
    const authorRole = document.querySelector('[data-panel="author"] h3');
    const authorBio = document.querySelectorAll('[data-panel="author"] p');

    if (authorTitle) authorTitle.textContent = book.authorInfo.name;
    if (authorRole) authorRole.textContent = book.authorInfo.role;

    // 기존 p 태그 모두 제거 후 새로 생성
    const authorPanel = document.querySelector('[data-panel="author"]');
    if (authorPanel && book.authorInfo.bio) {
      // 기존 p 태그 모두 제거
      const oldBioParagraphs = authorPanel.querySelectorAll("p");
      oldBioParagraphs.forEach((p) => p.remove());

      // 새로운 p 태그 생성
      book.authorInfo.bio.forEach((text) => {
        const p = document.createElement("p");
        p.textContent = text;
        authorPanel.appendChild(p);
      });
    }
  }
}

/* ***************************************************************** */
