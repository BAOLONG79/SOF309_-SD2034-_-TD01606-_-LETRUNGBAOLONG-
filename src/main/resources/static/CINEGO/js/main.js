// ========================================================
// CINEGO - JAVASCRIPT ASM GIAI ĐOẠN 1
// ========================================================

// ========================================================
// 1. TRANG CHỦ
// ========================================================

function renderFeaturedMovies() {
    const container = document.getElementById("featuredMovies");
    if (!container) return;

    container.innerHTML = "";

    movies.slice(0, 4).forEach(function(movie) {
        container.innerHTML += `
            <div class="movie-card">
                <img src="${movie.image}" alt="${movie.name}" class="movie-image"
                     onerror="this.src='https://via.placeholder.com/400x550?text=CINEGO'">
                <div class="movie-info">
                    <h3>${movie.name}</h3>
                    <p class="movie-category">${movie.category}</p>
                    <div class="movie-actions">
                        <button class="btn-favorite" onclick="toggleFavorite(${movie.id})">
                            ♡ Yêu thích
                        </button>
                        <a href="chi-tiet.html?id=${movie.id}" class="btn-detail">Chi tiết</a>
                        <a href="dat-ve.html?id=${movie.id}" class="btn-book">Đặt vé</a>
                    </div>
                </div>
            </div>
        `;
    });
}

// Slider
let currentSlide = 0;

const sliderImages = [
    "images/slider1.jpg",
    "images/slider2.jpg",
    "images/slider3.jpg"
];

function showSlide(index) {
    const hero = document.querySelector(".hero");
    const dots = document.querySelectorAll(".dot");

    if (!hero || dots.length === 0) return;

    currentSlide = index;

    hero.style.backgroundImage =
        `url('${sliderImages[currentSlide]}')`;

    dots.forEach(function(dot) {
        dot.classList.remove("active");
    });

    if (dots[currentSlide]) {
        dots[currentSlide].classList.add("active");
    }
}

function nextSlide() {
    currentSlide++;

    if (currentSlide >= sliderImages.length) {
        currentSlide = 0;
    }

    showSlide(currentSlide);
}

function prevSlide() {
    currentSlide--;

    if (currentSlide < 0) {
        currentSlide = sliderImages.length - 1;
    }

    showSlide(currentSlide);
}

// Tự động chuyển slide
setInterval(function() {
    nextSlide();
}, 5000);

// Countdown
function countdown() {
    const daysElement = document.getElementById("days");

    if (!daysElement) return;

    const hoursElement = document.getElementById("hours");
    const minutesElement = document.getElementById("minutes");
    const secondsElement = document.getElementById("seconds");

    const endTime =
        new Date().getTime() + (24 * 60 * 60 * 1000);

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = endTime - now;

        if (distance <= 0) {
            daysElement.innerText = "00";
            hoursElement.innerText = "00";
            minutesElement.innerText = "00";
            secondsElement.innerText = "00";
            return;
        }

        const days = Math.floor(
            distance / (1000 * 60 * 60 * 24)
        );

        const hours = Math.floor(
            (distance % (1000 * 60 * 60 * 24)) /
            (1000 * 60 * 60)
        );

        const minutes = Math.floor(
            (distance % (1000 * 60 * 60)) /
            (1000 * 60)
        );

        const seconds = Math.floor(
            (distance % (1000 * 60)) / 1000
        );

        daysElement.innerText = String(days).padStart(2, "0");
        hoursElement.innerText = String(hours).padStart(2, "0");
        minutesElement.innerText = String(minutes).padStart(2, "0");
        secondsElement.innerText = String(seconds).padStart(2, "0");
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// Popup
function openPopup() {
    const popup = document.getElementById("welcomePopup");

    if (popup) {
        popup.classList.add("show");
    }
}

function closePopup() {
    const popup = document.getElementById("welcomePopup");

    if (popup) {
        popup.classList.remove("show");
    }
}

// Back to top
function backToTop() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

window.addEventListener("scroll", function() {
    const button = document.getElementById("backToTop");

    if (!button) return;

    if (window.scrollY > 300) {
        button.classList.add("show");
    } else {
        button.classList.remove("show");
    }
});

// ========================================================
// 2. TRANG DANH MỤC + TÌM KIẾM
// ========================================================

function createMovieCard(movie) {
    return `
        <div class="movie-card">
            <img src="${movie.image}" alt="${movie.name}" class="movie-image"
                 onerror="this.src='https://via.placeholder.com/400x550?text=CINEGO'">

            <div class="movie-info">
                <h3>${movie.name}</h3>
                <p class="movie-category">${movie.category}</p>
                <p class="movie-price">
                    ${movie.price.toLocaleString("vi-VN")} VNĐ
                </p>

                <div class="movie-actions">
                    <button class="btn-favorite"
                            onclick="toggleFavorite(${movie.id})">
                        ♡ Yêu thích
                    </button>

                    <a href="chi-tiet.html?id=${movie.id}"
                       class="btn-detail">
                        Chi tiết
                    </a>

                    <a href="dat-ve.html?id=${movie.id}"
                       class="btn-book">
                        Đặt vé
                    </a>
                </div>
            </div>
        </div>
    `;
}

function renderMovieList(movieArray) {
    const container = document.getElementById("movieList");
    const result = document.getElementById("movieResult");

    if (!container) return;

    container.innerHTML = "";

    if (movieArray.length === 0) {
        container.innerHTML = `
            <p style="color:#aaa;">
                Không tìm thấy phim phù hợp.
            </p>
        `;

        if (result) {
            result.innerText = "Không có kết quả";
        }

        return;
    }

    if (result) {
        result.innerText =
            "Tìm thấy " + movieArray.length + " bộ phim";
    }

    movieArray.forEach(function(movie) {
        container.innerHTML += createMovieCard(movie);
    });
}

function filterMovies() {
    const searchInput =
        document.getElementById("movieSearch");

    const categoryInput =
        document.getElementById("categoryFilter");

    const sortInput =
        document.getElementById("sortPrice");

    if (!searchInput || !categoryInput || !sortInput) {
        return;
    }

    const keyword =
        searchInput.value.trim().toLowerCase();

    const category =
        categoryInput.value;

    const sort =
        sortInput.value;

    let result = [...movies];

    if (keyword !== "") {
        result = result.filter(function(movie) {
            return movie.name
                .toLowerCase()
                .includes(keyword);
        });
    }

    if (category !== "all") {
        result = result.filter(function(movie) {
            return movie.category === category;
        });
    }

    if (sort === "low") {
        result.sort(function(a, b) {
            return a.price - b.price;
        });
    }

    if (sort === "high") {
        result.sort(function(a, b) {
            return b.price - a.price;
        });
    }

    if (sort === "name") {
        result.sort(function(a, b) {
            return a.name.localeCompare(b.name);
        });
    }

    renderMovieList(result);
}

// Tìm kiếm riêng
function renderSearchMovies(movieArray) {
    const container =
        document.getElementById("searchMovieList");

    const result =
        document.getElementById("searchResult");

    if (!container) return;

    container.innerHTML = "";

    if (movieArray.length === 0) {
        container.innerHTML =
            `<p style="color:#aaa;">Không tìm thấy phim phù hợp.</p>`;

        if (result) {
            result.innerText = "Không có kết quả";
        }

        return;
    }

    if (result) {
        result.innerText =
            "Tìm thấy " + movieArray.length + " bộ phim";
    }

    movieArray.forEach(function(movie) {
        container.innerHTML += createMovieCard(movie);
    });
}

function filterSearchMovies() {
    const input =
        document.getElementById("searchInput");

    const category =
        document.getElementById("searchCategory");

    const sort =
        document.getElementById("searchSort");

    if (!input || !category || !sort) return;

    const keyword =
        input.value.trim().toLowerCase();

    let result = [...movies];

    if (keyword !== "") {
        result = result.filter(function(movie) {
            return movie.name.toLowerCase().includes(keyword);
        });
    }

    if (category.value !== "all") {
        result = result.filter(function(movie) {
            return movie.category === category.value;
        });
    }

    if (sort.value === "low") {
        result.sort(function(a, b) {
            return a.price - b.price;
        });
    }

    if (sort.value === "high") {
        result.sort(function(a, b) {
            return b.price - a.price;
        });
    }

    if (sort.value === "name") {
        result.sort(function(a, b) {
            return a.name.localeCompare(b.name);
        });
    }

    renderSearchMovies(result);
}

// ========================================================
// 3. CHI TIẾT PHIM
// ========================================================

function getMovieId() {
    const params =
        new URLSearchParams(window.location.search);

    return Number(params.get("id"));
}

function renderMovieDetail() {
    const container =
        document.getElementById("movieDetail");

    if (!container) return;

    const movieId = getMovieId();

    const movie = movies.find(function(item) {
        return item.id === movieId;
    });

    if (!movie) {
        container.innerHTML = `
            <div class="empty-message">
                <h2>Không tìm thấy phim</h2>
                <p>Phim bạn đang tìm không tồn tại.</p>
                <a href="danh-muc.html" class="btn-primary">
                    Quay lại danh sách phim
                </a>
            </div>
        `;

        return;
    }

    container.innerHTML = `
        <div class="movie-detail">

            <div>
                <img
                    src="${movie.image}"
                    alt="${movie.name}"
                    class="movie-detail-image"
                    onerror="this.src='https://via.placeholder.com/400x550?text=CINEGO'"
                >
            </div>

            <div class="movie-detail-info">

                <p class="category">${movie.category}</p>

                <h1>${movie.name}</h1>

                <p class="description">
                    ${movie.description}
                </p>

                <p class="detail-price">
                    ${movie.price.toLocaleString("vi-VN")} VNĐ
                </p>

                <div class="quantity-box">
                    <strong>Số vé:</strong>

                    <button onclick="changeQuantity(-1)">-</button>

                    <span id="quantity">1</span>

                    <button onclick="changeQuantity(1)">+</button>
                </div>

                <div class="detail-actions">

                    <a
                        href="dat-ve.html?id=${movie.id}"
                        class="btn-primary">
                        Đặt vé ngay
                    </a>

                    <button
                        class="btn-favorite"
                        id="favoriteButton"
                        onclick="toggleFavorite(${movie.id})">
                        ♡ Yêu thích
                    </button>

                </div>

            </div>
        </div>
    `;

    updateFavoriteButton(movie.id);
}

let quantity = 1;

function changeQuantity(value) {
    quantity += value;

    if (quantity < 1) quantity = 1;
    if (quantity > 10) quantity = 10;

    const element =
        document.getElementById("quantity");

    if (element) {
        element.innerText = quantity;
    }
}

// ========================================================
// 4. YÊU THÍCH
// ========================================================

function getFavorites() {
    return JSON.parse(
        localStorage.getItem("cinegoFavorites")
    ) || [];
}

function toggleFavorite(movieId) {
    let favorites = getFavorites();

    const index =
        favorites.indexOf(movieId);

    if (index === -1) {
        favorites.push(movieId);
        showToast("Đã thêm phim vào yêu thích ❤️");
    } else {
        favorites.splice(index, 1);
        showToast("Đã xóa phim khỏi yêu thích");
    }

    localStorage.setItem(
        "cinegoFavorites",
        JSON.stringify(favorites)
    );

    updateFavoriteButton(movieId);

    if (document.getElementById("favoriteList")) {
        renderFavorites();
    }
}

function updateFavoriteButton(movieId) {
    const buttons =
        document.querySelectorAll(
            `.btn-favorite[onclick="toggleFavorite(${movieId})"]`
        );

    const favorites = getFavorites();

    buttons.forEach(function(button) {
        if (favorites.includes(movieId)) {
            button.innerText = "♥ Đã yêu thích";
            button.classList.add("active");
        } else {
            button.innerText = "♡ Yêu thích";
            button.classList.remove("active");
        }
    });
}

function renderFavorites() {
    const container =
        document.getElementById("favoriteList");

    const count =
        document.getElementById("favoriteCount");

    if (!container) return;

    const favorites = getFavorites();

    if (count) {
        count.innerText = favorites.length;
    }

    const favoriteMovies =
        movies.filter(function(movie) {
            return favorites.includes(movie.id);
        });

    if (favoriteMovies.length === 0) {
        container.innerHTML = `
            <p style="color:#aaa;">
                Bạn chưa có phim yêu thích.
            </p>
        `;
        return;
    }

    container.innerHTML = "";

    favoriteMovies.forEach(function(movie) {
        container.innerHTML += createMovieCard(movie);
    });

    favoriteMovies.forEach(function(movie) {
        updateFavoriteButton(movie.id);
    });
}

// Toast
function showToast(message) {
    const oldToast =
        document.querySelector(".toast");

    if (oldToast) {
        oldToast.remove();
    }

    const toast =
        document.createElement("div");

    toast.className = "toast";
    toast.innerText = message;

    document.body.appendChild(toast);

    setTimeout(function() {
        toast.remove();
    }, 2500);
}

// ========================================================
// 5. ĐẶT VÉ
// ========================================================

let selectedShowtime = "";
let selectedSeats = [];

function getBookingMovie() {
    const params =
        new URLSearchParams(window.location.search);

    const id = Number(params.get("id"));

    return movies.find(function(movie) {
        return movie.id === id;
    });
}

function renderBookingPage() {
    const container =
        document.getElementById("bookingPage");

    if (!container) return;

    const movie = getBookingMovie();

    if (!movie) {
        container.innerHTML = `
            <div class="booking-box">
                <h2>Không tìm thấy phim</h2>
                <a href="danh-muc.html" class="btn-primary">
                    Quay lại danh sách phim
                </a>
            </div>
        `;
        return;
    }

    // Reset dữ liệu khi mở một trang đặt vé mới
    selectedShowtime = "";
    selectedSeats = [];

    container.innerHTML = `
        <div class="booking-layout">

            <div class="booking-box">

                <h2>${movie.name}</h2>

                <label class="booking-label">
                    Chọn ngày xem
                </label>

                <select
                    id="bookingDate"
                    class="booking-select"
                    onchange="updateBooking()">

                    <option value="">
                        -- Chọn ngày --
                    </option>

                    <option value="23/10/2026">23/10/2026</option>
                    <option value="24/10/2026">24/10/2026</option>
                    <option value="25/10/2026">25/10/2026</option>

                </select>

                <label class="booking-label">
                    Chọn suất chiếu
                </label>

                <div class="showtimes">

                    <button class="showtime-btn"
                            onclick="selectShowtime(this, '09:00')">
                        09:00
                    </button>

                    <button class="showtime-btn"
                            onclick="selectShowtime(this, '12:30')">
                        12:30
                    </button>

                    <button class="showtime-btn"
                            onclick="selectShowtime(this, '15:30')">
                        15:30
                    </button>

                    <button class="showtime-btn"
                            onclick="selectShowtime(this, '19:00')">
                        19:00
                    </button>

                    <button class="showtime-btn"
                            onclick="selectShowtime(this, '21:30')">
                        21:30
                    </button>

                </div>

                <h3 class="seat-title">Chọn ghế</h3>

                <div class="seat-screen">
                    MÀN HÌNH
                </div>

                <div class="seats">

                    <button class="seat" onclick="selectSeat(this, 'A1')">A1</button>
                    <button class="seat" onclick="selectSeat(this, 'A2')">A2</button>
                    <button class="seat" onclick="selectSeat(this, 'A3')">A3</button>
                    <button class="seat" onclick="selectSeat(this, 'A4')">A4</button>
                    <button class="seat" onclick="selectSeat(this, 'A5')">A5</button>
                    <button class="seat" onclick="selectSeat(this, 'A6')">A6</button>

                    <button class="seat" onclick="selectSeat(this, 'B1')">B1</button>
                    <button class="seat" onclick="selectSeat(this, 'B2')">B2</button>
                    <button class="seat" onclick="selectSeat(this, 'B3')">B3</button>
                    <button class="seat sold">B4</button>
                    <button class="seat" onclick="selectSeat(this, 'B5')">B5</button>
                    <button class="seat" onclick="selectSeat(this, 'B6')">B6</button>

                    <button class="seat" onclick="selectSeat(this, 'C1')">C1</button>
                    <button class="seat" onclick="selectSeat(this, 'C2')">C2</button>
                    <button class="seat sold">C3</button>
                    <button class="seat" onclick="selectSeat(this, 'C4')">C4</button>
                    <button class="seat" onclick="selectSeat(this, 'C5')">C5</button>
                    <button class="seat" onclick="selectSeat(this, 'C6')">C6</button>

                    <button class="seat" onclick="selectSeat(this, 'D1')">D1</button>
                    <button class="seat" onclick="selectSeat(this, 'D2')">D2</button>
                    <button class="seat" onclick="selectSeat(this, 'D3')">D3</button>
                    <button class="seat" onclick="selectSeat(this, 'D4')">D4</button>
                    <button class="seat" onclick="selectSeat(this, 'D5')">D5</button>
                    <button class="seat" onclick="selectSeat(this, 'D6')">D6</button>

                </div>
            </div>

            <div class="booking-summary">

                <h2>Thông tin đặt vé</h2>

                <img
                    src="${movie.image}"
                    alt="${movie.name}"
                    onerror="this.src='https://via.placeholder.com/400x550?text=CINEGO'">

                <div class="summary-row">
                    <span>Phim</span>
                    <strong id="summaryMovie">${movie.name}</strong>
                </div>

                <div class="summary-row">
                    <span>Ngày</span>
                    <strong id="summaryDate">Chưa chọn</strong>
                </div>

                <div class="summary-row">
                    <span>Suất</span>
                    <strong id="summaryTime">Chưa chọn</strong>
                </div>

                <div class="summary-row">
                    <span>Ghế</span>
                    <strong id="summarySeats">Chưa chọn</strong>
                </div>

                <div class="summary-row">
                    <span>Giá vé</span>
                    <strong>${movie.price.toLocaleString("vi-VN")} VNĐ</strong>
                </div>

                <div class="summary-total">
                    <span>Tổng tiền</span>
                    <span id="summaryTotal">0 VNĐ</span>
                </div>

                <p id="bookingError" class="booking-error"></p>

                <button
                    class="btn-primary"
                    style="width:100%;"
                    onclick="continueBooking()">
                    Tiếp tục thanh toán
                </button>

            </div>

        </div>
    `;
}

function selectShowtime(button, time) {
    document.querySelectorAll(".showtime-btn")
        .forEach(function(item) {
            item.classList.remove("active");
        });

    button.classList.add("active");
    selectedShowtime = time;

    updateBooking();
}

function selectSeat(button, seat) {
    if (button.classList.contains("sold")) {
        return;
    }

    const index =
        selectedSeats.indexOf(seat);

    if (index === -1) {
        selectedSeats.push(seat);
        button.classList.add("selected");
    } else {
        selectedSeats.splice(index, 1);
        button.classList.remove("selected");
    }

    updateBooking();
}

function updateBooking() {
    const dateElement =
        document.getElementById("bookingDate");

    if (!dateElement) return;

    const movie = getBookingMovie();

    if (!movie) return;

    const date = dateElement.value;

    const summaryDate =
        document.getElementById("summaryDate");

    const summaryTime =
        document.getElementById("summaryTime");

    const summarySeats =
        document.getElementById("summarySeats");

    const summaryTotal =
        document.getElementById("summaryTotal");

    summaryDate.innerText =
        date || "Chưa chọn";

    summaryTime.innerText =
        selectedShowtime || "Chưa chọn";

    summarySeats.innerText =
        selectedSeats.length > 0
            ? selectedSeats.join(", ")
            : "Chưa chọn";

    const total =
        selectedSeats.length * movie.price;

    summaryTotal.innerText =
        total.toLocaleString("vi-VN") + " VNĐ";
}

function continueBooking() {
    const dateElement =
        document.getElementById("bookingDate");

    const error =
        document.getElementById("bookingError");

    if (!dateElement || !error) return;

    const date = dateElement.value;

    if (!date) {
        error.innerText =
            "Vui lòng chọn ngày xem.";
        error.style.display = "block";
        return;
    }

    if (!selectedShowtime) {
        error.innerText =
            "Vui lòng chọn suất chiếu.";
        error.style.display = "block";
        return;
    }

    if (selectedSeats.length === 0) {
        error.innerText =
            "Vui lòng chọn ít nhất một ghế.";
        error.style.display = "block";
        return;
    }

    error.style.display = "none";

    const movie = getBookingMovie();

    const booking = {
        movieId: movie.id,
        movieName: movie.name,
        date: date,
        time: selectedShowtime,
        seats: selectedSeats,
        quantity: selectedSeats.length,
        total: selectedSeats.length * movie.price
    };

    localStorage.setItem(
        "cinegoBooking",
        JSON.stringify(booking)
    );

    window.location.href =
        "thanh-toan.html";
}

// ========================================================
// 6. THANH TOÁN
// ========================================================

function getBookingData() {
    const data =
        localStorage.getItem("cinegoBooking");

    if (!data) return null;

    try {
        return JSON.parse(data);
    } catch (error) {
        return null;
    }
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPhone(phone) {
    return /^0[0-9]{9}$/.test(phone);
}

function renderPaymentPage() {
    const container =
        document.getElementById("paymentPage");

    if (!container) return;

    const booking = getBookingData();

    if (!booking) {
        container.innerHTML = `
            <div class="payment-box">
                <h2>Chưa có thông tin đặt vé</h2>
                <p>Vui lòng chọn phim và đặt vé trước.</p>
                <a href="danh-muc.html" class="btn-primary">
                    Xem danh sách phim
                </a>
            </div>
        `;
        return;
    }

    container.innerHTML = `
        <div class="payment-layout">

            <div class="payment-box">

                <h2>Thông tin khách hàng</h2>

                <div id="paymentMessage"
                     class="payment-message"></div>

                <form id="paymentForm">

                    <div class="form-group">
                        <label>Họ và tên *</label>
                        <input type="text"
                               id="paymentName"
                               placeholder="Nhập họ và tên">
                        <p id="nameError" class="form-error">
                            Vui lòng nhập họ tên.
                        </p>
                    </div>

                    <div class="form-group">
                        <label>Email *</label>
                        <input type="email"
                               id="paymentEmail"
                               placeholder="example@gmail.com">
                        <p id="emailError" class="form-error">
                            Email không hợp lệ.
                        </p>
                    </div>

                    <div class="form-group">
                        <label>Số điện thoại *</label>
                        <input type="text"
                               id="paymentPhone"
                               placeholder="0123456789">
                        <p id="phoneError" class="form-error">
                            Số điện thoại không hợp lệ.
                        </p>
                    </div>

                    <div class="form-group">
                        <label>Phương thức thanh toán *</label>

                        <div class="payment-method">

                            <label>
                                <input type="radio"
                                       name="paymentMethod"
                                       value="Momo">
                                Ví MoMo
                            </label>

                            <label>
                                <input type="radio"
                                       name="paymentMethod"
                                       value="Bank">
                                Chuyển khoản
                            </label>

                            <label>
                                <input type="radio"
                                       name="paymentMethod"
                                       value="Cash">
                                Tại quầy
                            </label>

                        </div>

                        <p id="methodError" class="form-error">
                            Vui lòng chọn phương thức thanh toán.
                        </p>
                    </div>

                    <button type="submit"
                            class="btn-primary"
                            style="width:100%;">
                        Xác nhận thanh toán
                    </button>

                </form>
            </div>

            <div class="order-box">

                <h2>Thông tin vé</h2>

                <div class="order-row">
                    <span>Phim</span>
                    <strong>${booking.movieName}</strong>
                </div>

                <div class="order-row">
                    <span>Ngày</span>
                    <strong>${booking.date}</strong>
                </div>

                <div class="order-row">
                    <span>Suất chiếu</span>
                    <strong>${booking.time}</strong>
                </div>

                <div class="order-row">
                    <span>Ghế</span>
                    <strong>${booking.seats.join(", ")}</strong>
                </div>

                <div class="order-row">
                    <span>Số lượng</span>
                    <strong>${booking.quantity}</strong>
                </div>

                <div class="order-total">
                    <span>Tổng tiền</span>
                    <span>
                        ${booking.total.toLocaleString("vi-VN")} VNĐ
                    </span>
                </div>

            </div>

        </div>
    `;

    document.getElementById("paymentForm")
        .addEventListener("submit", processPayment);
}

function processPayment(event) {
    event.preventDefault();

    const name =
        document.getElementById("paymentName").value.trim();

    const email =
        document.getElementById("paymentEmail").value.trim();

    const phone =
        document.getElementById("paymentPhone").value.trim();

    const method =
        document.querySelector(
            'input[name="paymentMethod"]:checked'
        );

    let valid = true;

    const nameError =
        document.getElementById("nameError");

    const emailError =
        document.getElementById("emailError");

    const phoneError =
        document.getElementById("phoneError");

    const methodError =
        document.getElementById("methodError");

    nameError.style.display =
        name === "" ? "block" : "none";

    if (name === "") {
        valid = false;
    }

    emailError.style.display =
        isValidEmail(email) ? "none" : "block";

    if (!isValidEmail(email)) {
        valid = false;
    }

    phoneError.style.display =
        isValidPhone(phone) ? "none" : "block";

    if (!isValidPhone(phone)) {
        valid = false;
    }

    methodError.style.display =
        method ? "none" : "block";

    if (!method) {
        valid = false;
    }

    if (!valid) {
        const message =
            document.getElementById("paymentMessage");

        message.innerText =
            "Vui lòng kiểm tra lại thông tin.";

        message.className =
            "payment-message error";

        return;
    }

    const booking = getBookingData();

    if (!booking) return;

    const bookingCode =
        "CG" + Date.now().toString().slice(-6);

    const historyItem = {
        code: bookingCode,
        name: name,
        email: email,
        phone: phone,
        movieName: booking.movieName,
        date: booking.date,
        time: booking.time,
        seats: booking.seats,
        quantity: booking.quantity,
        total: booking.total,
        method: method.value,
        status: "Đã thanh toán",
        createdAt: new Date().toLocaleString("vi-VN")
    };

    let history =
        JSON.parse(
            localStorage.getItem("cinegoHistory")
        ) || [];

    history.push(historyItem);

    localStorage.setItem(
        "cinegoHistory",
        JSON.stringify(history)
    );

    localStorage.setItem(
        "cinegoSuccess",
        JSON.stringify(historyItem)
    );

    localStorage.removeItem("cinegoBooking");

    window.location.href =
        "thanh-cong.html";
}

// ========================================================
// 7. TRANG THÀNH CÔNG
// ========================================================

function renderSuccessPage() {
    const container =
        document.getElementById("successPage");

    if (!container) return;

    const data =
        JSON.parse(
            localStorage.getItem("cinegoSuccess")
        );

    if (!data) {
        container.innerHTML = `
            <div class="success-box">
                <div class="success-icon">!</div>
                <h1>Không tìm thấy thông tin đặt vé</h1>
                <p>Vui lòng thực hiện đặt vé trước.</p>
                <a href="danh-muc.html" class="btn-primary">
                    Xem danh sách phim
                </a>
            </div>
        `;
        return;
    }

    container.innerHTML = `
        <div class="success-box">

            <div class="success-icon">✓</div>

            <h1>Đặt vé thành công!</h1>

            <p>
                Cảm ơn bạn đã sử dụng dịch vụ của CINEGO.
            </p>

            <div class="success-info">

                <p><strong>Mã đặt vé:</strong> ${data.code}</p>
                <p><strong>Phim:</strong> ${data.movieName}</p>
                <p><strong>Ngày xem:</strong> ${data.date}</p>
                <p><strong>Suất chiếu:</strong> ${data.time}</p>
                <p><strong>Ghế:</strong> ${data.seats.join(", ")}</p>
                <p><strong>Số vé:</strong> ${data.quantity}</p>
                <p><strong>Tổng tiền:</strong> ${data.total.toLocaleString("vi-VN")} VNĐ</p>
                <p><strong>Thanh toán:</strong> ${data.method}</p>
                <p><strong>Trạng thái:</strong> ${data.status}</p>

            </div>

            <div class="success-actions">

                <a href="lich-su.html" class="btn-primary">
                    Xem lịch sử đặt vé
                </a>

                <a href="danh-muc.html" class="btn-secondary">
                    Tiếp tục đặt vé
                </a>

            </div>

        </div>
    `;
}

// ========================================================
// 8. LỊCH SỬ ĐẶT VÉ
// ========================================================

function renderHistory() {
    const historyList =
        document.getElementById("historyList");

    if (!historyList) return;

    const history =
        JSON.parse(
            localStorage.getItem("cinegoHistory")
        ) || [];

    if (history.length === 0) {
        historyList.innerHTML = `
            <tr>
                <td colspan="10" class="empty-history">
                    Chưa có lịch sử đặt vé.
                </td>
            </tr>
        `;
        return;
    }

    historyList.innerHTML =
        history.map(function(item) {
            return `
                <tr>
                    <td class="history-code">${item.code}</td>
                    <td>${item.movieName}</td>
                    <td>${item.date}</td>
                    <td>${item.time}</td>
                    <td>${item.seats.join(", ")}</td>
                    <td>${item.quantity}</td>
                    <td>${item.name}</td>
                    <td>${item.method}</td>
                    <td class="history-total">
                        ${item.total.toLocaleString("vi-VN")}đ
                    </td>
                    <td>
                        <span class="history-status">
                            ${item.status}
                        </span>
                    </td>
                </tr>
            `;
        }).join("");
}

// ========================================================
// 9. ĐĂNG KÝ
// ========================================================

function registerUser(event) {
    event.preventDefault();

    const name =
        document.getElementById("registerName").value.trim();

    const email =
        document.getElementById("registerEmail").value.trim();

    const phone =
        document.getElementById("registerPhone").value.trim();

    const password =
        document.getElementById("registerPassword").value;

    const confirmPassword =
        document.getElementById("registerConfirmPassword").value;

    const nameError =
        document.getElementById("nameError");

    const emailError =
        document.getElementById("emailError");

    const phoneError =
        document.getElementById("phoneError");

    const passwordError =
        document.getElementById("passwordError");

    const confirmPasswordError =
        document.getElementById("confirmPasswordError");

    const registerMessage =
        document.getElementById("registerMessage");

    [nameError, emailError, phoneError,
     passwordError, confirmPasswordError]
        .forEach(function(element) {
            if (element) element.textContent = "";
        });

    if (registerMessage) {
        registerMessage.textContent = "";
    }

    let valid = true;

    if (name === "") {
        if (nameError) {
            nameError.textContent =
                "Vui lòng nhập họ và tên.";
        }
        valid = false;
    }

    if (email === "") {
        if (emailError) {
            emailError.textContent =
                "Vui lòng nhập email.";
        }
        valid = false;
    } else if (!isValidEmail(email)) {
        if (emailError) {
            emailError.textContent =
                "Email không hợp lệ.";
        }
        valid = false;
    }

    if (phone === "") {
        if (phoneError) {
            phoneError.textContent =
                "Vui lòng nhập số điện thoại.";
        }
        valid = false;
    } else if (!/^[0-9]{10,11}$/.test(phone)) {
        if (phoneError) {
            phoneError.textContent =
                "Số điện thoại phải có 10 - 11 chữ số.";
        }
        valid = false;
    }

    if (password === "") {
        if (passwordError) {
            passwordError.textContent =
                "Vui lòng nhập mật khẩu.";
        }
        valid = false;
    } else if (password.length < 6) {
        if (passwordError) {
            passwordError.textContent =
                "Mật khẩu phải có ít nhất 6 ký tự.";
        }
        valid = false;
    }

    if (confirmPassword === "") {
        if (confirmPasswordError) {
            confirmPasswordError.textContent =
                "Vui lòng nhập lại mật khẩu.";
        }
        valid = false;
    } else if (confirmPassword !== password) {
        if (confirmPasswordError) {
            confirmPasswordError.textContent =
                "Mật khẩu nhập lại không khớp.";
        }
        valid = false;
    }

    if (!valid) return;

    let users =
        JSON.parse(
            localStorage.getItem("cinegoUsers")
        ) || [];

    if (users.some(function(user) {
        return user.email === email;
    })) {
        if (emailError) {
            emailError.textContent =
                "Email này đã được đăng ký.";
        }
        return;
    }

    users.push({
        id: Date.now(),
        name: name,
        email: email,
        phone: phone,
        password: password
    });

    localStorage.setItem(
        "cinegoUsers",
        JSON.stringify(users)
    );

    if (registerMessage) {
        registerMessage.textContent =
            "Đăng ký thành công! Đang chuyển sang trang đăng nhập...";
        registerMessage.style.color = "#00c853";
    }

    document.getElementById("registerForm").reset();

    setTimeout(function() {
        window.location.href = "dang-nhap.html";
    }, 1500);
}

// ========================================================
// 10. ĐĂNG NHẬP
// ========================================================

function loginUser(event) {
    event.preventDefault();

    const email =
        document.getElementById("loginEmail").value.trim();

    const password =
        document.getElementById("loginPassword").value;

    const emailError =
        document.getElementById("loginEmailError");

    const passwordError =
        document.getElementById("loginPasswordError");

    const loginMessage =
        document.getElementById("loginMessage");

    emailError.textContent = "";
    passwordError.textContent = "";
    loginMessage.textContent = "";

    let valid = true;

    if (email === "") {
        emailError.textContent =
            "Vui lòng nhập email.";
        valid = false;
    }

    if (password === "") {
        passwordError.textContent =
            "Vui lòng nhập mật khẩu.";
        valid = false;
    }

    if (!valid) return;

    const users =
        JSON.parse(
            localStorage.getItem("cinegoUsers")
        ) || [];

    const user =
        users.find(function(account) {
            return account.email === email &&
                   account.password === password;
        });

    if (!user) {
        loginMessage.textContent =
            "Email hoặc mật khẩu không chính xác.";
        loginMessage.style.color = "#ff4d4d";
        return;
    }

    sessionStorage.setItem(
        "cinegoCurrentUser",
        JSON.stringify(user)
    );

    loginMessage.textContent =
        "Đăng nhập thành công!";
    loginMessage.style.color = "#00c853";

    setTimeout(function() {
        window.location.href = "index.html";
    }, 1000);
}

function updateLoginStatus() {
    const containers =
        document.querySelectorAll(
            ".header-actions, .header-buttons"
        );

    if (containers.length === 0) return;

    let currentUser = null;

    try {
        currentUser =
            JSON.parse(
                sessionStorage.getItem("cinegoCurrentUser")
            );
    } catch (error) {
        currentUser = null;
    }

    containers.forEach(function(container) {
        if (currentUser) {
            container.innerHTML = `
                <span class="user-name">
                    Xin chào, ${currentUser.name}
                </span>
                ${currentUser.role === "admin" ? '<a href="admin.html" class="btn-login">Quản trị</a>' : ''}
                <button type="button"
                        class="btn-login"
                        onclick="logoutUser()">
                    Đăng xuất
                </button>
            `;
        } else {
            container.innerHTML = `
                <a href="dang-nhap.html" class="btn-login">
                    Đăng nhập
                </a>
                <a href="dang-ky.html"
                   class="btn-primary btn-register">
                    Đăng ký
                </a>
            `;
        }
    });
}

function logoutUser() {
    sessionStorage.removeItem("cinegoCurrentUser");

    showToast("Đã đăng xuất!");

    setTimeout(function() {
        window.location.href = "index.html";
    }, 500);
}

// ========================================================
// 11. LIÊN HỆ
// ========================================================

function contactFormSubmit(event) {
    event.preventDefault();

    const name =
        document.getElementById("contactName").value.trim();

    const email =
        document.getElementById("contactEmail").value.trim();

    const phone =
        document.getElementById("contactPhone").value.trim();

    const content =
        document.getElementById("contactContent").value.trim();

    const nameError =
        document.getElementById("contactNameError");

    const emailError =
        document.getElementById("contactEmailError");

    const phoneError =
        document.getElementById("contactPhoneError");

    const contentError =
        document.getElementById("contactContentError");

    const message =
        document.getElementById("contactMessage");

    nameError.textContent = "";
    emailError.textContent = "";
    phoneError.textContent = "";
    contentError.textContent = "";
    message.textContent = "";

    let valid = true;

    if (name === "") {
        nameError.textContent =
            "Vui lòng nhập họ và tên.";
        valid = false;
    }

    if (email === "") {
        emailError.textContent =
            "Vui lòng nhập email.";
        valid = false;
    } else if (!isValidEmail(email)) {
        emailError.textContent =
            "Email không hợp lệ.";
        valid = false;
    }

    if (phone === "") {
        phoneError.textContent =
            "Vui lòng nhập số điện thoại.";
        valid = false;
    } else if (!/^[0-9]{10,11}$/.test(phone)) {
        phoneError.textContent =
            "Số điện thoại phải có 10 - 11 chữ số.";
        valid = false;
    }

    if (content === "") {
        contentError.textContent =
            "Vui lòng nhập nội dung.";
        valid = false;
    } else if (content.length < 10) {
        contentError.textContent =
            "Nội dung phải có ít nhất 10 ký tự.";
        valid = false;
    }

    if (!valid) return;

    message.textContent =
        "Gửi liên hệ thành công! Cảm ơn bạn đã liên hệ CINEGO.";

    message.style.color = "#00c853";

    document.getElementById("contactForm").reset();

    document.getElementById("charCount").textContent = "0";

    showToast("Gửi liên hệ thành công!");
}

// ========================================================
// 12. VỀ CHÚNG TÔI
// ========================================================

function setupAboutPage() {
    const more =
        document.getElementById("aboutMore");

    const button =
        document.getElementById("aboutMoreButton");

    if (!more || !button) return;

    button.addEventListener("click", function() {
        more.classList.toggle("show");

        if (more.classList.contains("show")) {
            button.innerText = "Thu gọn";
        } else {
            button.innerText = "Xem thêm";
        }
    });
}

// ========================================================
// QUẢN TRỊ CINEGO (DEMO LOCALSTORAGE)
// ========================================================
function loadAdminMovieOverrides() {
    try {
        const saved = JSON.parse(localStorage.getItem("cinegoAdminMovies"));
        if (Array.isArray(saved)) movies = saved;
    } catch (error) {
        console.warn("Không đọc được dữ liệu phim quản trị.", error);
    }
}

function getAdminCurrentUser() {
    try { return JSON.parse(sessionStorage.getItem("cinegoCurrentUser")); }
    catch (error) { return null; }
}

function initAdminDashboard() {
    const root = document.getElementById("adminDashboard");
    if (!root) return;
    const current = getAdminCurrentUser();
    if (!current || current.role !== "admin") {
        root.innerHTML = '<section class="admin-card"><h2>Không có quyền truy cập</h2><p>Vui lòng đăng nhập bằng tài khoản Admin để sử dụng trang quản trị.</p><a class="admin-btn" href="dang-nhap.html">Đến trang đăng nhập</a></section>';
        return;
    }
    loadAdminMovieOverrides();
    renderAdminDashboard();
}

function renderAdminDashboard() {
    const root = document.getElementById("adminDashboard");
    if (!root) return;
    const bookings = JSON.parse(localStorage.getItem("cinegoHistory") || "[]");
    const users = JSON.parse(localStorage.getItem("cinegoUsers") || "[]");
    root.innerHTML = `
      <div class="admin-welcome"><div><p class="admin-eyebrow">CINEGO CONTROL CENTER</p><h1>Quản trị hệ thống</h1><p>Xin chào, ${escapeAdminText((getAdminCurrentUser()||{}).name || "Admin")}.</p></div><button class="admin-btn admin-btn-light" onclick="logoutUser()">Đăng xuất</button></div>
      <div class="admin-stats">
        <article class="admin-stat"><span>Tổng phim</span><strong>${movies.length}</strong></article>
        <article class="admin-stat"><span>Đơn đặt vé</span><strong>${bookings.length}</strong></article>
        <article class="admin-stat"><span>Tài khoản</span><strong>${users.length}</strong></article>
        <article class="admin-stat"><span>Doanh thu ghi nhận</span><strong>${bookings.reduce((sum,b)=>sum+Number(b.total||0),0).toLocaleString("vi-VN")} ₫</strong></article>
      </div>
      <section class="admin-card"><div class="admin-section-head"><div><h2>Quản lý phim</h2><p>Thêm, sửa hoặc xóa phim. Dữ liệu demo được lưu trên trình duyệt này.</p></div><button class="admin-btn" onclick="resetAdminMovieForm()">+ Thêm phim mới</button></div>
        <form id="adminMovieForm" class="admin-form" onsubmit="saveAdminMovie(event)">
          <input type="hidden" id="adminMovieId"><label>Tên phim<input id="adminMovieName" required maxlength="100" placeholder="Tên phim"></label>
          <label>Thể loại<input id="adminMovieCategory" required maxlength="60" placeholder="Hành động"></label>
          <label>Giá vé (VNĐ)<input id="adminMoviePrice" type="number" min="1" required placeholder="75000"></label>
          <label>Ảnh (đường dẫn)<input id="adminMovieImage" required placeholder="images/movie1.jpg"></label>
          <label class="admin-description">Mô tả<input id="adminMovieDescription" required maxlength="300" placeholder="Mô tả ngắn về phim"></label>
          <div class="admin-form-actions"><button class="admin-btn" type="submit">Lưu phim</button><button class="admin-btn admin-btn-light" type="button" onclick="resetAdminMovieForm()">Hủy</button></div>
        </form>
        <div class="admin-table-wrap"><table class="admin-table"><thead><tr><th>ID</th><th>Phim</th><th>Thể loại</th><th>Giá vé</th><th>Thao tác</th></tr></thead><tbody>${movies.map(m=>`<tr><td>${escapeAdminText(m.id)}</td><td>${escapeAdminText(m.name)}</td><td>${escapeAdminText(m.category)}</td><td>${Number(m.price||0).toLocaleString("vi-VN")} ₫</td><td><button class="admin-small" onclick="editAdminMovie(${Number(m.id)})">Sửa</button> <button class="admin-small admin-danger" onclick="deleteAdminMovie(${Number(m.id)})">Xóa</button></td></tr>`).join("") || '<tr><td colspan="5">Chưa có phim.</td></tr>'}</tbody></table></div>
      </section>
      <section class="admin-card"><h2>Đơn đặt vé</h2><p>Thông tin lấy từ lịch sử đặt vé được lưu ở trình duyệt.</p><div class="admin-table-wrap"><table class="admin-table"><thead><tr><th>Mã đơn</th><th>Phim</th><th>Ngày</th><th>Suất</th><th>Ghế</th><th>Tổng tiền</th><th>Trạng thái</th></tr></thead><tbody>${bookings.map(b=>`<tr><td>${escapeAdminText(b.code||"—")}</td><td>${escapeAdminText(b.movieName||"—")}</td><td>${escapeAdminText(b.date||"—")}</td><td>${escapeAdminText(b.time||"—")}</td><td>${escapeAdminText((b.seats||[]).join(", "))}</td><td>${Number(b.total||0).toLocaleString("vi-VN")} ₫</td><td><span class="admin-status">${escapeAdminText(b.status||"Đã đặt")}</span></td></tr>`).join("") || '<tr><td colspan="7">Chưa có đơn đặt vé nào.</td></tr>'}</tbody></table></div></section>
      <section class="admin-card"><h2>Tài khoản người dùng</h2><p>Admin có thể xóa tài khoản Customer. Tài khoản Admin được bảo vệ không cho xóa.</p><div class="admin-table-wrap"><table class="admin-table"><thead><tr><th>Họ tên</th><th>Email</th><th>Số điện thoại</th><th>Vai trò</th><th>Thao tác</th></tr></thead><tbody>${users.map((u,index)=>`<tr><td>${escapeAdminText(u.name||"—")}</td><td>${escapeAdminText(u.email||"—")}</td><td>${escapeAdminText(u.phone||"—")}</td><td>${u.role==="admin"?"Admin":"Customer"}</td><td>${u.role==="admin"?'<span class="admin-status">Được bảo vệ</span>':`<button class="admin-small admin-danger" onclick="deleteAdminUser(${index})">Xóa tài khoản</button>`}</td></tr>`).join("") || '<tr><td colspan="5">Chưa có tài khoản.</td></tr>'}</tbody></table></div></section>`;
}

function deleteAdminUser(userIndex) {
    const current = getAdminCurrentUser();
    if (!current || current.role !== "admin") {
        alert("Bạn không có quyền xóa tài khoản.");
        return;
    }
    let users = [];
    try { users = JSON.parse(localStorage.getItem("cinegoUsers") || "[]"); } catch (_) { users = []; }
    const target = users[userIndex];
    if (!target) {
        alert("Không tìm thấy tài khoản. Vui lòng tải lại trang.");
        renderAdminDashboard();
        return;
    }
    if (target.role === "admin") {
        alert("Không thể xóa tài khoản Admin.");
        return;
    }
    const label = target.email || target.name || "người dùng này";
    if (!confirm(`Bạn có chắc chắn muốn xóa tài khoản ${label}? Thao tác này không thể hoàn tác.`)) return;
    users.splice(userIndex, 1);
    localStorage.setItem("cinegoUsers", JSON.stringify(users));
    renderAdminDashboard();
    alert("Đã xóa tài khoản người dùng.");
}

function escapeAdminText(value) {
    return String(value == null ? "" : value).replace(/[&<>"']/g, ch => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;", "'":"&#39;"}[ch]));
}
function persistAdminMovies() {
    localStorage.setItem("cinegoAdminMovies", JSON.stringify(movies));
    renderAdminDashboard();
}
function resetAdminMovieForm() {
    const form=document.getElementById("adminMovieForm"); if(form) form.reset();
    const id=document.getElementById("adminMovieId"); if(id) id.value="";
}
function saveAdminMovie(event) {
    event.preventDefault();
    const idValue=document.getElementById("adminMovieId").value;
    const movie={id:idValue?Number(idValue):Math.max(0,...movies.map(m=>Number(m.id)||0))+1,
      name:document.getElementById("adminMovieName").value.trim(),
      category:document.getElementById("adminMovieCategory").value.trim(),
      price:Number(document.getElementById("adminMoviePrice").value),
      image:document.getElementById("adminMovieImage").value.trim(),
      description:document.getElementById("adminMovieDescription").value.trim()};
    if(!movie.name||!movie.category||!movie.image||!movie.description||!Number.isFinite(movie.price)||movie.price<=0){alert("Vui lòng nhập đầy đủ thông tin phim hợp lệ.");return;}
    const index=movies.findIndex(m=>Number(m.id)===movie.id);
    if(index>=0) movies[index]=movie; else movies.push(movie);
    persistAdminMovies(); resetAdminMovieForm(); alert("Đã lưu thông tin phim.");
}
function editAdminMovie(id) {
    const movie=movies.find(m=>Number(m.id)===Number(id)); if(!movie)return;
    document.getElementById("adminMovieId").value=movie.id;
    document.getElementById("adminMovieName").value=movie.name||"";
    document.getElementById("adminMovieCategory").value=movie.category||"";
    document.getElementById("adminMoviePrice").value=movie.price||"";
    document.getElementById("adminMovieImage").value=movie.image||"";
    document.getElementById("adminMovieDescription").value=movie.description||"";
    document.getElementById("adminMovieForm").scrollIntoView({behavior:"smooth",block:"center"});
}
function deleteAdminMovie(id) {
    const movie=movies.find(m=>Number(m.id)===Number(id)); if(!movie)return;
    if(!confirm(`Bạn có chắc muốn xóa phim "${movie.name}"?`))return;
    movies=movies.filter(m=>Number(m.id)!==Number(id)); persistAdminMovies();
}

// ========================================================
// KHỞI TẠO
// ========================================================

function ensureDemoAdminAccount() {
    // Tạo sẵn tài khoản quản trị demo để phục vụ kiểm thử ASM.
    // Lưu ý: đây là tài khoản demo phía trình duyệt, không dùng cho hệ thống thật.
    let users = [];
    try {
        users = JSON.parse(localStorage.getItem("cinegoUsers")) || [];
    } catch (error) {
        users = [];
    }

    const adminEmail = "admin@cinego.vn";
    const existingAdmin = users.find(function(user) {
        return user.email && user.email.toLowerCase() === adminEmail;
    });

    if (!existingAdmin) {
        users.push({
            id: "cinego-demo-admin",
            name: "Quản trị viên CINEGO",
            email: adminEmail,
            phone: "0900000000",
            password: "Admin123!",
            role: "admin"
        });
        localStorage.setItem("cinegoUsers", JSON.stringify(users));
    } else if (!existingAdmin.role) {
        existingAdmin.role = "admin";
        localStorage.setItem("cinegoUsers", JSON.stringify(users));
    }
}

document.addEventListener("DOMContentLoaded", function() {
    ensureDemoAdminAccount();
    loadAdminMovieOverrides();

    // Trang chủ
    renderFeaturedMovies();
    showSlide(0);
    countdown();

    // Popup sau 2 giây
    if (document.getElementById("welcomePopup")) {
        setTimeout(function() {
            openPopup();
        }, 2000);
    }

    // Back to top
    if (document.getElementById("backToTop")) {
        window.dispatchEvent(new Event("scroll"));
    }

    // Danh mục
    if (document.getElementById("movieList")) {
        renderMovieList(movies);
    }

    // Tìm kiếm
    if (document.getElementById("searchMovieList")) {
        renderSearchMovies(movies);

        const searchInput =
            document.getElementById("searchInput");

        const searchButton =
            document.getElementById("searchButton");

        const searchCategory =
            document.getElementById("searchCategory");

        const searchSort =
            document.getElementById("searchSort");

        if (searchButton) {
            searchButton.addEventListener(
                "click",
                filterSearchMovies
            );
        }

        if (searchInput) {
            searchInput.addEventListener(
                "input",
                filterSearchMovies
            );
        }

        if (searchCategory) {
            searchCategory.addEventListener(
                "change",
                filterSearchMovies
            );
        }

        if (searchSort) {
            searchSort.addEventListener(
                "change",
                filterSearchMovies
            );
        }
    }

    // Chi tiết
    renderMovieDetail();

    // Đặt vé
    renderBookingPage();

    // Thanh toán
    renderPaymentPage();

    // Thành công
    renderSuccessPage();

    // Lịch sử
    renderHistory();

    // Yêu thích
    renderFavorites();

    // Đăng ký
    const registerForm =
        document.getElementById("registerForm");

    if (registerForm) {
        registerForm.addEventListener(
            "submit",
            registerUser
        );
    }

    // Đăng nhập
    const loginForm =
        document.getElementById("loginForm");

    if (loginForm) {
        loginForm.addEventListener(
            "submit",
            loginUser
        );
    }

    // Liên hệ
    const contactForm =
        document.getElementById("contactForm");

    if (contactForm) {
        contactForm.addEventListener(
            "submit",
            contactFormSubmit
        );
    }

    const contactContent =
        document.getElementById("contactContent");

    const charCount =
        document.getElementById("charCount");

    if (contactContent && charCount) {
        contactContent.addEventListener(
            "input",
            function() {
                charCount.textContent =
                    contactContent.value.length;
            }
        );
    }

    const clearButton =
        document.getElementById("clearContact");

    if (clearButton) {
        clearButton.addEventListener(
            "click",
            function() {
                const form =
                    document.getElementById("contactForm");

                if (form) form.reset();

                if (charCount) {
                    charCount.textContent = "0";
                }

                [
                    "contactNameError",
                    "contactEmailError",
                    "contactPhoneError",
                    "contactContentError",
                    "contactMessage"
                ].forEach(function(id) {
                    const element =
                        document.getElementById(id);

                    if (element) {
                        element.textContent = "";
                    }
                });
            }
        );
    }

    // Về chúng tôi
    setupAboutPage();

    // Header đăng nhập / đăng xuất
    updateLoginStatus();
    initAdminDashboard();
});
