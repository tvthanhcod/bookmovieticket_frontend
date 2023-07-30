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


const handleDateItemClick = (dateInfo, index) => {
    $('.main__content-showtime-date .main__content-showtime-date-list .main__content-showtime-date-item').removeClass('active__content-datetime')
    $(`.main__content-showtime-date .main__content-showtime-date-list .main__content-showtime-date-item:nth-child(${index + 1})`).addClass('active__content-datetime')
    const objectreq = JSON.parse(localStorage.getItem('objectreq'))
    if (!objectreq) {
        const requestApi = {}
        requestApi['date_pick'] = dateInfo['date']
        if (requestApi['date_pick']) {
            localStorage.setItem('objectreq', JSON.stringify(requestApi))
        }
    } else {
        const newObj = { ...objectreq, date_pick: dateInfo['date'] }
        localStorage.setItem('objectreq', JSON.stringify(newObj))
        const newDataFromlocalStorage = JSON.parse(localStorage.getItem('objectreq'))
        if (newDataFromlocalStorage['theater_id'] && newDataFromlocalStorage['date_pick']) {
            const formatDate = (date) => {
                return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`.toString()
            }
            const thearterId = newDataFromlocalStorage['theater_id']
            const newDate = new Date(newDataFromlocalStorage['date_pick'])
            const datePick = formatDate(newDate)
            $.ajax({
                url: `http://localhost:8000/api/v1/theater/detail/${thearterId}/${datePick}`,
                method: 'GET',
                contentType: 'application/json',
                success: (response) => {
                    renderShowtime(response)
                },

                error: (status, error) => {

                }
            })
        } else {
            renderShowtime()
        }
    }
}


// html showtime date
{
    const newNextDays = nextDays.map(date => {
        const month = date.getMonth() + 1
        const day = date.getDate()
        const dayofweek = getDayOfWeek(date)
        return {
            date,
            month,
            day,
            dayofweek
        }
    })
    const showtimeDateList = $('.main__content-showtime-date .main__content-showtime-date-list')
    let htmlshowtimedates = ""
    newNextDays.forEach((item => {
        htmlshowtimedates += `<li class="main__content-showtime-date-item">
                                <p>${item.day}/${item.month}</p>
                                <p>${item.dayofweek}</p>
                            </li>`
    }))
    showtimeDateList.html(htmlshowtimedates)
    $('.main__content-showtime-date .main__content-showtime-date-list .main__content-showtime-date-item').on('click', function () {
        const index = $(this).index();
        handleDateItemClick(newNextDays[index], index);

    })
}



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

const renderShowtime = (dataDetail) => {

    const format = (starTime) => {
        const formatStartTime = starTime.split(':').map(value => value)
        const result = `${formatStartTime[0]}:${formatStartTime[1]}`
        return result
    }
    const mainContentShowtimeList = $('.main__content-showtime-list')
    let htmlShowtime = ""
    const movieIds = []
    const showtimeIds = []
    if (dataDetail) {
        dataDetail.data.forEach((item) => {
            htmlShowtime += `<li class="main__content-showtime-item">
                            <div class="main__content-showtime-item-thumbnail">
                                <img src="${item.thumbnail}"
                                    alt="">
                            </div>
                            <div class="main__content-showtime-item-option">
                                <h3 class="main__content-showtime-item-name">
                                    ${item.title}
                                </h3>
                                <p class="main__content-showtime-item-duration">Thời Lượng Phim: 1h50</p>
                                <ul class="main__content-showtime-item-taglist">
                                    ${item.data.map(item => {
                movieIds.push(item.movie_id)
                return item.data_detail.map(movie => {
                    showtimeIds.push(movie.showtime_id)
                    return `<li class="main__content-showtime-item-tag">${format(movie.start_time)}</li>`
                }).join(" ")
            }).join(" ")}
                                </ul>
                            </div>
                        </li>`
        })

        mainContentShowtimeList.html(htmlShowtime)
    }
    mainContentShowtimeList.html(htmlShowtime)
    $('.main__content-showtime-item-option .main__content-showtime-item-taglist .main__content-showtime-item-tag').on('click', function () {
        console.log(1)
        const index = $(this).index()
        const showtimeId = showtimeIds[index]
        const showtimeIdFromLocalstorage = JSON.parse(localStorage.getItem('objecTicket'))
        if (showtimeIdFromLocalstorage) {
            localStorage.clear('objecTicket')
        } else {
            const objecTicket = {}
            objecTicket['showtimeId'] = showtimeId
            localStorage.setItem('objecTicket', JSON.stringify(objecTicket))
            location.href = "http://127.0.0.1:5500/choose-seat.html"
        }
    })

}

const handleActiveContentTheaterItem = (theater, index) => {
    $('.main__content-showtime-date .main__content-showtime-date-list .main__content-showtime-date-item').removeClass('active__content-datetime')
    renderShowtime()
    $('.main__content-theater .main__content-theater-list .main__content-theater-item').removeClass('active__content-item')
    $(`.main__content-theater .main__content-theater-list .main__content-theater-item:nth-child(${index + 1})`).addClass('active__content-item')
    const objectreq = JSON.parse(localStorage.getItem('objectreq'))
    if (!objectreq) {
        const requestApi = {}
        requestApi['theater_id'] = theater['_id']
        if (requestApi['theater_id']) {
            localStorage.setItem('objectreq', JSON.stringify(requestApi))
        }
    } else {
        const newObj = { ...objectreq, theater_id: theater['_id'] }
        localStorage.setItem('objectreq', JSON.stringify(newObj))
    }
}

//function render theater from area
const renderTheater = (dataTheater) => {
    const mainContentTheaterList = $('.main__content-theater .main__content-theater-list')
    let htmlTheater = `<li class="main__content-col-2-item main__content-theater-item">Rạp Phim</li>`
    dataTheater.forEach(value => {
        htmlTheater += `<li class="main__content-col-2-item main__content-theater-item">${value.name}</li>`
    })

    mainContentTheaterList.html(htmlTheater)

    $('.main__content-theater .main__content-theater-list .main__content-theater-item').on('click', function () {
        const index = $(this).index();
        handleActiveContentTheaterItem(dataTheater[index - 1], index);
    });
}

const handleActiveContentAreaItem = (area, index) => {
    $('.main__content-showtime-date .main__content-showtime-date-list .main__content-showtime-date-item').removeClass('active__content-datetime')
    renderShowtime()
    $('.main__content-area .main__content-area-list .main__content-area-item').removeClass('active__content-item')
    $(`.main__content-area .main__content-area-list .main__content-area-item:nth-child(${index + 1})`).addClass('active__content-item')
    $.ajax({
        url: `http://localhost:8000/api/v1/theater/${area._id}`,
        metthod: "GET",

        success: (response) => {
            renderTheater(response)
        },

        error: (error) => {
            // handle Toast error
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


