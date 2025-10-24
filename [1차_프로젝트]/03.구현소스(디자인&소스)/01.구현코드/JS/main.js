// 위고 출판사 메인 페이지 JS - main.js

/* ***************************************************************** */
/* 공통 기능 - 모든 페이지에서 사용 */
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

/* ***************************************************************** */

// 부드러운 스크롤 기능
function smoothScrollTo(target) {
  const element = document.querySelector(target);
  if (element) {
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
}

/* ***************************************************************** */

// 페이지 로드 완료 메시지
window.addEventListener("load", function () {
  console.log("위고 출판사 페이지 로드 완료");
});

/* ***************************************************************** */

// 스크롤 효과 - 헤더 크기 조절
const scbody = document.body.classList;

window.addEventListener("scroll", () => {
  let scTop = window.scrollY;
  console.log("scroll~~~!", scTop);

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

// 언어 설정 버튼 (KR, EN)
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
/* ***************************************************************** */
/* index.html 페이지 전용 기능 */
/* ***************************************************************** */
/* ***************************************************************** */

// Swiper 슬라이더 초기화
document.addEventListener("DOMContentLoaded", function () {
  const swiperElement = document.querySelector(".main-swiper");

  if (swiperElement) {
    // 드래그 감지를 위한 변수
    let isDragging = false;
    // 현재 드래그 중인지 여부
    let startX = 0;
    let startY = 0;

    const swiper = new Swiper(".main-swiper", {
      // 슬라이드 무한반복
      loop: true,
      // 0.8초 후에 슬라이드 전환
      speed: 800,
      // 자정 재생 설정
      autoplay: {
        // 5초간 이미지 노출
        delay: 5000,
        // 터치/마우스 해도 자동재생 유지
        disableOnInteraction: false,
      },
      // 이전/다음 버튼 설정
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      // 키보드 조작설정
      keyboard: {
        // 키보드 방향키로 슬라이드 이동 가능
        enabled: true,
      },
      // 한 화면에 3개 노출
      slidesPerView: 3,
      // 한 화면에 1장씩 옆으로 넘어감
      slidesPerGroup: 1,
      // 슬라이드 간 간격 (픽셀 0)
      spaceBetween: 0,
      // 슬라이드가 부족해도 네비게이션 버튼 표시
      watchOverflow: false,
      // 슬라이드 전환 효과
      effect: "slide",

      // 반응형 브레이크포인트
      breakpoints: {
        // 모바일 (768px 이하)
        0: {
          slidesPerView: 1,
          slidesPerGroup: 1,
        },
        // 태블릿 (768px ~ 940px)
        768: {
          slidesPerView: 2,
          slidesPerGroup: 1,
        },
        // 데스크톱 (940px 이상)
        940: {
          slidesPerView: 3,
          slidesPerGroup: 1,
        },
      },
    });

    // 모든 슬라이드 링크에 드래그 감지 추가
    const slideLinks = swiperElement.querySelectorAll(".slide-link");

    slideLinks.forEach((link) => {
      // 터치/마우스 시작
      link.addEventListener("mousedown", (e) => {
        // 드래그 상태 초기화
        isDragging = false;
        startX = e.clientX;
        startY = e.clientY;
      });

      // === 터치 드래그 시작 감지 (모바일) ===
      link.addEventListener("touchstart", (e) => {
        // 드래그 상태 초기화
        isDragging = false;
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
      });

      // === 마우스 이동 중 드래그 여부 판단 (PC) ===
      link.addEventListener("mousemove", (e) => {
        // 마우스가 눌린 상태인지 확인
        if (startX !== 0) {
          const diffX = Math.abs(e.clientX - startX);
          const diffY = Math.abs(e.clientY - startY);
          // 5px 이상 움직였으면 드래그로 판단
          if (diffX > 5 || diffY > 5) {
            isDragging = true;
          }
        }
      });

      // === 터치 이동 중 드래그 여부 판단 (모바일) ===
      link.addEventListener("touchmove", (e) => {
        // 터치가 시작된 상태인지 확인
        if (startX !== 0) {
          const diffX = Math.abs(e.touches[0].clientX - startX);
          const diffY = Math.abs(e.touches[0].clientY - startY);
          // 5px 이상 움직였으면 드래그로 판단
          if (diffX > 5 || diffY > 5) {
            isDragging = true;
          }
        }
      });

      // === 클릭 이벤트 처리 ===
      link.addEventListener("click", (e) => {
        // 드래그 중이었다면 링크 이동 차단
        if (isDragging) {
          // 기본 링크 동작 취소
          e.preventDefault();
          // 이벤트 전파 중단
          e.stopPropagation();
        }
        // 상태 초기화
        // 드래그 상태 리셋
        isDragging = false;
        startX = 0;
        startY = 0;
      });
    });
  }

  // 메인 페이지 탭 기능 초기화
  initBookTabs();

  // 메인 페이지 책 클릭시 링크 추가
  addMainPageBookLinks();

  // All Books 페이지라면 책 데이터 로드
  const bookGrid = document.querySelector(".book-grid");
  if (bookGrid) {
    console.log("All Books 페이지 - 데이터 로드 시작");
    loadBooksData();
  }

  console.log("위고 출판사 페이지 로드 완료");
});

/* ***************************************************************** */

// index.html - 메인 페이지 탭 기능 (New Books, Best, All)
function initBookTabs() {
  const tabs = document.querySelectorAll(".nav-tab");
  const allbookRows = document.querySelectorAll(".book-row");

  // 탭이 없으면 종료 (all-books 페이지)
  if (tabs.length === 0 || allbookRows.length === 0) return;

  // 첫 번째 탭 활성화
  tabs[0].classList.add("active");

  // 초기 상태: New Books만 표시 - 10권
  allbookRows.forEach((row) => {
    if (row.getAttribute("data-category") === "new") {
      row.style.display = "flex";
    } else {
      row.style.display = "none";
    }
  });

  // 각 탭에 클릭 이벤트 추가
  tabs.forEach((tab, index) => {
    tab.addEventListener("click", function (e) {
      e.preventDefault();

      // 모든 탭에서 active 제거
      tabs.forEach((t) => t.classList.remove("active"));

      // 클릭한 탭에 active 추가
      this.classList.add("active");

      // 클릭한 탭의 data-category 속성 가져오기
      let category;

      if (index === 0) {
        category = "new";
      } else if (index === 1) {
        category = "best";
      } else if (index === 2) {
        // All 탭 클릭 시 all-books.html로 이동
        window.location.href = "all-books.html";
        return;
      }

      // 해당 카테고리의 책만 표시
      allbookRows.forEach((row, i) => {
        if (row.getAttribute("data-category") === category) {
          row.style.display = "flex";
          setTimeout(() => animateBooks(row), i * 50);
        } else {
          row.style.display = "none";
        }
      });
    });
  });
}

// 책 애니메이션 효과
function animateBooks(row) {
  const books = row.querySelectorAll(".book-item");
  books.forEach((book, i) => {
    setTimeout(() => {
      book.style.opacity = "0";
      book.style.transform = "translateY(20px)";
      book.style.transition = "opacity 0.5s ease, transform 0.5s ease";

      setTimeout(() => {
        book.style.opacity = "1";
        book.style.transform = "translateY(0)";
      }, 50);
    }, i * 100);
  });
}

/* ***************************************************************** */

// index.html - 메인페이지 책 클릭시 상세페이지 이동
function addMainPageBookLinks() {
  const mainPageBooks = document.querySelectorAll(".book-section .book-item");

  if (mainPageBooks.length === 0) {
    console.log("메인페이지가 아님");
    return;
  }

  // 제목 정규화 함수 (공백, 쉼표 제거 후 소문자 변환)
  const normalizeTitle = (title) => {
    return title.replace(/[\s,]/g, "").toLowerCase();
  };

  mainPageBooks.forEach((bookItem) => {
    bookItem.addEventListener("click", function () {
      const bookTitle =
        this.querySelector(".book-title h4")?.textContent.trim();

      if (!bookTitle) return;

      fetch("./data/books.json")
        .then((res) => res.json())
        .then((books) => {
          // 정규화된 제목으로 비교
          const normalizedBookTitle = normalizeTitle(bookTitle);
          const book = books.find(
            (b) => normalizeTitle(b.title) === normalizedBookTitle
          );

          if (book) {
            console.log(`✅ 책 찾음: "${bookTitle}" → ID: ${book.id}`);
            window.location.href = `detail-page.html?id=${book.id}`;
          } else {
            console.error(`❌ 책을 찾을 수 없음: "${bookTitle}"`);
          }
        })
        .catch((err) => console.error("책 데이터 로드 실패:", err));
    });
    bookItem.style.cursor = "pointer";
  });

  console.log("메인페이지 책 링크 연결 완료:", mainPageBooks.length);
}

/* ***************************************************************** */
/* ***************************************************************** */
/* all-books.html 페이지 전용 기능 */
/* ***************************************************************** */
/* ***************************************************************** */

// 책 데이터 저장 변수
let booksData = [];

// 페이지네이션 변수
let currentPage = 1;
const itemsPerPage = 15;
let currentCategory = "All";
let currentSortType = "name"; // 책 정렬타입(가나다 순)

/* ***************************************************************** */

// all-books.html - 책 데이터 로드
async function loadBooksData() {
  try {
    console.log("books.json 로드 중...");
    const response = await fetch("./data/books.json");
    booksData = await response.json();
    renderBooks();
  } catch (error) {
    console.error("책 데이터 로드 실패:", error);
  }
}

/* ***************************************************************** */

// all-books.html - 책 HTML 생성
function renderBooks() {
  const bookGrid = document.querySelector(".book-grid");
  if (!bookGrid) {
    console.log("book-grid 요소를 찾을 수 없음");
    return;
  }

  console.log("책 데이터 로드 시작");
  bookGrid.innerHTML = ""; // 기존 내용 제거

  booksData.forEach((book) => {
    const bookItem = document.createElement("div");
    bookItem.className = "book-item";
    bookItem.setAttribute("data-category", book.category);
    bookItem.setAttribute("data-title", book.title);
    if (book.rank) bookItem.setAttribute("data-rank", book.rank);

    bookItem.innerHTML = `
      <img src="${book.image}" alt="${book.title}" class="book-cover" />
      <div class="book-info-text">
        <p>「${book.title}」<br />${book.author}</p>
      </div>
    `;

    // 클릭 시 상세페이지로 이동
    bookItem.addEventListener("click", () => {
      window.location.href = `detail-page.html?id=${book.id}`;
    });
    bookItem.style.cursor = "pointer";

    bookGrid.appendChild(bookItem);
  });

  // 렌더링 후 탭 초기화 및 필터링

  // 카테고리 탭 초기화
  initCategoryTabs();

  // 현재 카테고리와 페이지에 맞는 책 필터링 및 표시
  filterAndPaginate(currentCategory, currentPage);

  // 페이지네이션 버튼들(이전/다음)의 상태를 업데이트
  updatePagination();
}

/* ***************************************************************** */

// all-books.html - 카테고리 탭 기능 초기화
function initCategoryTabs() {
  const categoryTabs = document.querySelectorAll(".category-tab");
  const bookItems = document.querySelectorAll(".book-item");

  console.log("카테고리 탭 개수:", categoryTabs.length);
  console.log("책 아이템 개수:", bookItems.length);

  if (categoryTabs.length === 0) {
    console.log("카테고리 탭 없음 - 메인 페이지");
    return;
  }

  console.log("카테고리 탭 초기화 완료");

  // 각 탭에 클릭 이벤트 추가
  categoryTabs.forEach((tab) => {
    tab.addEventListener("click", function (e) {
      e.preventDefault();

      console.log("탭 클릭:", this.textContent.trim());

      // 모든 탭에서 active 제거
      categoryTabs.forEach((t) => t.classList.remove("active"));

      // 클릭한 탭에 active 추가
      this.classList.add("active");

      // 탭 텍스트 가져오기
      currentCategory = this.textContent.trim();
      currentPage = 1; // 탭 변경시 1페이지로 리셋

      // 정렬 타입 설정
      // 인기순만 다르게, 나머지는 모두 가나다순
      if (currentCategory === "인기순") {
        currentSortType = "sales";
        console.log("정렬방식 : 인기순"); // 인기순만 순위 정렬
      } else {
        currentSortType = "name";
        console.log("정렬방식 : 가나다순");
        // All, 아무튼, 점선면, 그림책, 기타 모두 가나다순
      }

      // 필터링 및 페이지네이션 적용
      filterAndPaginate(currentCategory, currentPage);
      updatePagination();
    });
  });

  // 페이지네이션 버튼 이벤트
  const prevBtn = document.querySelector(".pagination .prev");
  const nextBtn = document.querySelector(".pagination .next");

  console.log("prevBtn:", prevBtn);
  console.log("nextBtn:", nextBtn);

  // < 이전 버튼 이벤트
  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      if (currentPage > 1) {
        currentPage--;
        filterAndPaginate(currentCategory, currentPage);
        updatePagination();

        console.log("최상단으로 이동하기");
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      } else {
        console.log("첫 페이지는 해당안함");
      }
    });
  }

  // > 다음 버튼 이벤트
  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      const totalPages = getTotalPages(currentCategory);
      if (currentPage < totalPages) {
        currentPage++;
        filterAndPaginate(currentCategory, currentPage);
        updatePagination();

        console.log("최상단으로 이동하기");
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      } else {
        console.log("최종 페이지는 해당안함");
      }
    });
  }
}

/* ***************************************************************** */

// all-books.html - 카테고리별 책 필터링 및 페이지네이션
function filterAndPaginate(category, page) {
  const bookItems = document.querySelectorAll(".book-item");
  let filteredBooks = [];

  // 카테고리별 책 필터링
  bookItems.forEach((item) => {
    const itemCategory = item.getAttribute("data-category");

    if (category === "All") {
      filteredBooks.push(item);
    } else if (category === "아무튼 시리즈" && itemCategory === "아무튼") {
      filteredBooks.push(item);
    } else if (category === "점선면 시리즈" && itemCategory === "점선면") {
      filteredBooks.push(item);
    } else if (category === "위고의 그림책" && itemCategory === "그림책") {
      filteredBooks.push(item);
    } else if (category === "기타" && itemCategory === "기타") {
      filteredBooks.push(item);
    } else if (category === "인기순") {
      filteredBooks.push(item);
    }
  });

  // 정렬 로직
  if (currentSortType === "sales") {
    console.log("인기순 정렬 실행");
    // 인기순 (data-rank 기준 오름차순)
    filteredBooks.sort((a, b) => {
      const rankA = parseInt(a.getAttribute("data-rank")) || Infinity;
      const rankB = parseInt(b.getAttribute("data-rank")) || Infinity;

      // 둘 다 순위가 있으면 순위로 정렬
      if (rankA !== Infinity && rankB !== Infinity) {
        return rankA - rankB;
      }

      // 둘다 순위가 없으면 가나다 순으로 정렬
      if (rankA === Infinity && rankB === Infinity) {
        const titleA = a.getAttribute("data-title") || "";
        const titleB = b.getAttribute("data-title") || "";
        return titleA.localeCompare(titleB, "ko", { sensitivity: "base" });
      }

      // 하나만 순위가 있으면 순위 있는 게 앞으로
      return rankA - rankB;
    });
  } else {
    console.log("가나다순 정렬 실행");
    // ★수정됨: 가나다순 정렬
    filteredBooks.sort((a, b) => {
      const titleA = a.getAttribute("data-title") || "";
      const titleB = b.getAttribute("data-title") || "";

      // ★수정됨: 중복된 localeCompare 제거, 한 번만 실행
      return titleA.localeCompare(titleB, "ko", {
        sensitivity: "base",
        numeric: false,
        ignorePunctuation: false,
      });
    });

    // 정렬 결과 확인 (처음 5개만)
    console.log(
      "정렬 후 순서 (처음 5개):",
      filteredBooks.slice(0, 5).map((book) => book.getAttribute("data-title"))
    );
  }

  // DOM 재배치 - 정렬된 순서대로 DOM 요소를 다시 추가
  const bookGrid = document.querySelector(".book-grid");

  // 현재 페이지에 해당하는 책만 표시 (15권씩)
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // 모든 책 숨기기
  bookItems.forEach((item) => {
    item.style.display = "none";
  });

  // 정렬된 순서대로 DOM에 다시 추가
  filteredBooks.forEach((item, index) => {
    // 현재 페이지에 표시할 책인지 확인
    if (index >= startIndex && index < endIndex) {
      // DOM 순서 변경을 위해 appendChild (이미 있는 요소는 이동됨)
      bookGrid.appendChild(item);
      item.style.display = "block";

      // 애니메이션 효과
      item.style.opacity = "0";
      item.style.transform = "translateY(20px)";

      setTimeout(() => {
        item.style.transition = "opacity 0.5s ease, transform 0.5s ease";
        item.style.opacity = "1";
        item.style.transform = "translateY(0)";
      }, 100);
    }
  });

  console.log(`${category} - 페이지 ${page}: ${startIndex}~${endIndex} 표시`);
}

/* ***************************************************************** */

// all-books.html - 전체 페이지 수 계산
function getTotalPages(category) {
  const bookItems = document.querySelectorAll(".book-item");
  let count = 0;

  bookItems.forEach((item) => {
    const itemCategory = item.getAttribute("data-category");

    if (category === "All") {
      count++;
    } else if (category === "아무튼 시리즈" && itemCategory === "아무튼") {
      count++;
    } else if (category === "점선면 시리즈" && itemCategory === "점선면") {
      count++;
    } else if (category === "위고의 그림책" && itemCategory === "그림책") {
      count++;
    } else if (category === "기타" && itemCategory === "기타") {
      // ★추가됨: 기타 카테고리 처리
      count++;
    } else if (category === "인기순") {
      count++;
    }
  });

  return Math.ceil(count / itemsPerPage);
}

/* ***************************************************************** */

// all-books.html - 페이지네이션 UI 업데이트
function updatePagination() {
  const totalPages = getTotalPages(currentCategory);
  const pageNumbersContainer = document.querySelector(".page-numbers");
  const prevBtn = document.querySelector(".pagination .prev");
  const nextBtn = document.querySelector(".pagination .next");

  if (!pageNumbersContainer) return;

  // 페이지 번호 버튼 생성
  pageNumbersContainer.innerHTML = "";

  // 15권 이하면 페이지 번호 숨기기
  if (totalPages <= 1) {
    pageNumbersContainer.style.display = "none";
    if (prevBtn) prevBtn.style.display = "none";
    if (nextBtn) nextBtn.style.display = "none";
    return;
  } else {
    pageNumbersContainer.style.display = "flex";
    if (prevBtn) prevBtn.style.display = "flex";
    if (nextBtn) nextBtn.style.display = "flex";
  }

  for (let i = 1; i <= totalPages; i++) {
    const pageBtn = document.createElement("button");
    pageBtn.className = "page-num";
    pageBtn.textContent = i;

    if (i === currentPage) {
      pageBtn.classList.add("active");
    }

    pageBtn.addEventListener("click", () => {
      currentPage = i;
      filterAndPaginate(currentCategory, currentPage);
      updatePagination();

      // 페이지 변경시 최상단으로 올라가기
      // 페이지 숫자를 누르면 페이지가 변환되면서 최상단으로 올라가는 것임
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });

    pageNumbersContainer.appendChild(pageBtn);
  }

  // 이전/다음 버튼 활성화/비활성화
  if (prevBtn) {
    prevBtn.disabled = currentPage === 1;
  }

  if (nextBtn) {
    nextBtn.disabled = currentPage === totalPages;
  }
}
