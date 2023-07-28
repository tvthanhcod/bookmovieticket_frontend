const sliderDots = $('.slider__movie-dots')
const NUMBER_ITEM_IN_PAGE = 7


const formatDate = (date) => {
    return `${date.getDate()}/${date.getMonth() + 1}`.toString()
}

const dataFakeMovie = await $.ajax({
    url: "http://localhost:8000/api/v1/movie",
    method: "GET",
    contentType: 'application/json',
    success: (response) => {
        return response
    },

    error: (xhr, status, error) => {
        return error
    }
})

// const redirectToDetailMovie = (id) => {
//     window.location.href = `http://localhost:5500/book-movie-detail.html?movieid=${id}`
// }

const SliderListMovie = $('.slider__movie-list')
let movieData = ""
dataFakeMovie.forEach((movie) => {
    const newDateFromCreateAt = new Date(movie.createAt)
    const timeMovieUpdateSystem = formatDate(newDateFromCreateAt)
    movieData += `<li class="slider__movie-item" onclick=" window.location.href = 'http://localhost:5500/book-movie-detail.html?movieid=${movie._id}' ">
                        <article class="slider__movie-card">
                            <div class="slider__movie-card-img">
                                <img src="${movie.thumbnail}"
                                    alt="">
                                <div class="slider__movie-card-img-tag">Mua vé</div>
                            </div>
                            <p class="slider__movie-card-name">${movie.title}</p>
                            <p class="slider__movie-card-showdate">${timeMovieUpdateSystem}</p>
                        </article>
                    </li>`
})
SliderListMovie.html(movieData)


const sliderItem = $('.slider__movie-item')
const WIDTH_SLIDERITEM = sliderItem.width()
const TOTAL_NUMBER_ITEM = dataFakeMovie.length
const NUMBER_DOT = Math.ceil(TOTAL_NUMBER_ITEM / NUMBER_ITEM_IN_PAGE)
const handleSlide = (index) => {
    $('.slider__movie-dot-item').removeClass('active-dot')
    $(`.slider__movie-dot-item:nth-child(${index + 1})`).addClass('active-dot !important')
    SliderListMovie.css('transform', `translateX(-${(index) * WIDTH_SLIDERITEM}px)`)
}
let addDot = ""
for (let i = 0; i < NUMBER_DOT; i++) {
    addDot += `<li class="slider__movie-dot-item ${i === 0 ? 'active-dot' : ""}" onclick="
         $('.slider__movie-dot-item').removeClass('active-dot')
    $('.slider__movie-dot-item:nth-child(${i + 1})').addClass('active-dot !important')
    $('.slider__movie-list').css('transform', 'translateX(-${(i) * WIDTH_SLIDERITEM}px)')
    "></li>`
}
sliderDots.html(addDot)




// handle buy ticket by theater
const showtimeDateList = $('.main__content-showtime-date .main__content-showtime-date-list')
// function get number next day
const getNextNDays = (startDate, n) => {
    const nextDays = [];
    for (let i = 0; i < n; i++) {
        const nextDate = new Date(startDate.getTime());
        nextDate.setDate(nextDate.getDate() + i);
        nextDays.push(nextDate);
    }
    return nextDays;
}

// Lấy ngày hiện tại
const currentDate = new Date();
// Lấy 6 ngày tiếp theo
const numberOfDays = 6;
const nextDays = getNextNDays(currentDate, numberOfDays);

const getDayOfWeek = (date) => {
    const daysOfWeek = ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'];
    const dayIndex = date.getDay();
    return daysOfWeek[dayIndex];
}

const newNextDays = nextDays.map(date => {
    const month = date.getMonth() + 1
    const day = date.getDate()
    const dayofweek = getDayOfWeek(date)
    return {
        month,
        day,
        dayofweek
    }
})

// html showtime date
let htmlshowtimedates = ""
newNextDays.forEach((item => {
    htmlshowtimedates += `<li class="main__content-showtime-date-item">
                                <p>${item.day}/${item.month}</p>
                                <p>${item.dayofweek}</p>
                            </li>`
}))
showtimeDateList.html(htmlshowtimedates)


// handle area theater
const contentArea = $('.main__content-area .main__content-area-list')
const areas = await $.ajax({
    url: "http://localhost:8000/api/v1/theater/area",
    method: "GET",
    contentType: "application/json",
    success: (response) => {
        return response
    },

    error: (error) => {
        return error
    }
})

const handleActiveContentAreaItem = (area, index) => {
    $('.main__content-area .main__content-area-list .main__content-area-item').removeClass('active__content-item')
    $(`.main__content-area .main__content-area-list .main__content-area-item:nth-child(${index + 1})`).addClass('active__content-item')
    $.ajax({
        url: `http://localhost:8000/api/v1/theater/${area._id}`,
        metthod: "GET",

        success: (response) => {
            const mainContentTheaterList = $('.main__content-theater .main__content-theater-list')
            let htmlTheater = `<li class="main__content-col-2-item main__content-area-item">Rạp Phim</li>`
            response.forEach(value => {
                htmlTheater += `<li class="main__content-col-2-item main__content-theater-item">${value.name}</li>`
            })

            mainContentTheaterList.html(htmlTheater)
        },

        error: () => {

        }
    })
}

if (Array.isArray(areas)) {
    let htmlContentArea = `<li class="main__content-col-2-item main__content-area-item">Khu Vực</li>`;
    areas.map((area) => {
        htmlContentArea +=
            `<li class="main__content-col-2-item main__content-area-item">
                <span>${area.address}</span>
                <span>${area.number_theater}</span>
            </li>`;
    });

    contentArea.html(htmlContentArea);

    $('.main__content-area .main__content-area-list .main__content-area-item').on('click', function () {
        const index = $(this).index();
        handleActiveContentAreaItem(areas[index - 1], index);
    });
}


