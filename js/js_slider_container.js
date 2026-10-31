const sliderWrapper = document.getElementById('sliderWrapper');
const slides = document.querySelectorAll('.slide');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const dots = document.querySelectorAll('.dot');

let currentIndex = 0;
const totalSlides = slides.length;
const autoPlayTime = 3000; // TG tự chuyển ảnh: 3000ms
let slideInterval;

// Hàm cập nhật vị trí slide và active dot
function updateSlider() {
  // Dịch chuyển wrapper sang trái
  sliderWrapper.style.transform = `translateX(-${currentIndex * 100}%)`;

  // Cập nhật trạng thái dot
  dots.forEach((dot, index) => {
    dot.classList.toggle('active', index === currentIndex);
  });
}

function nextSlide() {
  currentIndex = (currentIndex + 1) % totalSlides; // Quay lại 0 khi hết ảnh
  updateSlider();
}

function prevSlide() {
  currentIndex = (currentIndex - 1 + totalSlides) % totalSlides; // Về cuối nếu đang ở ảnh đầu
  updateSlider();
}

// khi bấm nút
nextBtn.addEventListener('click', () => {
  nextSlide();
  resetAutoPlay(); // Reset lại bộ đếm khi tự bấm
});

prevBtn.addEventListener('click', () => {
  prevSlide();
  resetAutoPlay();
});

// Bấm vào các dấu chấm tròn để nhảy tới slide đó
dots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    currentIndex = index;
    updateSlider();
    resetAutoPlay();
  });
});

// Tự động chuyển ảnh sau mỗi 3 giây
function startAutoPlay() {
  slideInterval = setInterval(nextSlide, autoPlayTime);
}

function resetAutoPlay() {
  clearInterval(slideInterval);
  startAutoPlay();
}

// Tạm dừng khi rê chuột vào slider, chạy tiếp khi di chuột ra ngoài
const container = document.querySelector('.slider-container');
container.addEventListener('mouseenter', () => clearInterval(slideInterval));
container.addEventListener('mouseleave', startAutoPlay);

// Khởi động chạy tự động lần đầu
startAutoPlay();