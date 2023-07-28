const slider = $('.slider__movie-list')
const sliderDots = $('.slider__movie-dots')
const NUMBER_ITEM_IN_PAGE = 7
const SliderListMovie = $('.slider__movie-list')
// import callApiSecure from "../utils/callApiSecure.js"

// const dataFakeMovie = [
//     {
//         name: "Xứ Sở Các Nguyên Tố",
//         time: "23/06",
//         thumbnail: "https://cdn.moveek.com/storage/media/cache/tall/63770ab4815ff892960382.jpeg"
//     },
//     {
//         name: "Nhiệm Vụ Bất Khả Thi",
//         time: "23/06",
//         thumbnail: "https://cdn.moveek.com/storage/media/cache/tall/648684ccb1181861295524.jpeg"
//     },
//     {
//         name: "Thước Phim Kinh Hoàng",
//         time: "23/06",
//         thumbnail: "https://cdn.moveek.com/storage/media/cache/tall/64b8dc1a6f6dd023132319.jpeg"
//     },
//     {
//         name: "Trăm Năm Hạnh Phúc",
//         time: "23/06",
//         thumbnail: "https://cdn.moveek.com/storage/media/cache/tall/64ad382602590139110098.jpeg"
//     },
//     {
//         name: "Tay Đua kiệt Xuất",
//         time: "23/06",
//         thumbnail: "https://cdn.moveek.com/storage/media/cache/tall/6499679f0a90c199943080.jpeg"
//     },
//     {
//         name: "Qúy Công Tử",
//         time: "23/06",
//         thumbnail: "https://cdn.moveek.com/storage/media/cache/tall/64911e751380a710492120.jpeg"
//     },
//     {
//         name: "Bỗng Dưng Được Yêu",
//         time: "23/06",
//         thumbnail: "https://cdn.moveek.com/storage/media/cache/tall/649bab9b06904598773867.jpeg"
//     },
//     {
//         name: "Ma Sơ Trục Qủy",
//         time: "23/06",
//         thumbnail: "https://cdn.moveek.com/storage/media/cache/tall/648686865f243539742872.jpg"
//     },
//     {
//         name: "Ruby Thủy Qúai",
//         time: "23/06",
//         thumbnail: "https://cdn.moveek.com/storage/media/cache/tall/646dd07dbc26b912398438.jpg"
//     },

// ]

// format date

const formatDate = (date) => {
    return `${date.getDate()}/${date.getMonth()}`.toString()
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


const dataFakeBlog = [
    {
        title: "The Moon: Nhiệm Vụ Cuối Cùng - Bom tấn Hàn Quốc có D.O., Kim Hee Ae ra rạp Việt",
        typeBlog: "Tin điện ảnh",
        userPost: "anan681",
        time: "2 ngày trước",
        description: "The Moon: Nhiệm Vụ Cuối Cùng - bom tấn viễn tưởng với sự tham gia của dàn diễn viên toàn sao Sul Kyung-gu, Doh Kyung-soo, Kim Hee-ae đang thu hút sự chú ý trên toàn cầu.",
        thumbnail: "https://cdn.moveek.com/storage/media/cache/medium/64b9ff4c54320591097940.jpeg"
    },
    {
        title: "Fanti - Phim Việt duy nhất tháng 7 có gì đáng mong đợi?",
        typeBlog: "Tin điện ảnh",
        userPost: "anan681",
        time: "4 ngày trước",
        description: "Fanti là một trong số ít phim Việt mạnh dạn đi theo thể loại thriller (giật gân) đồng thời tập trung khai thác nỗi ám ảnh số của những người trẻ muốn dấn thân vào thế  showbiz.",
        thumbnail: "https://cdn.moveek.com/storage/media/cache/medium/64b004da9faf3470778757.jpg"
    },
    {
        title: "10 Bộ phim Cannes nhất định phải xem qua một lần",
        typeBlog: "Tin điện ảnh",
        userPost: "anan681",
        time: "5 ngày trước",
        description: "Từ Á sang Âu, đây là những phim Cannes cần phải xem để dung dưỡng tình yêu điện ảnh.",
        thumbnail: "https://cdn.moveek.com/storage/media/cache/medium/64b399f40ca26875887986.jpg"
    },
    {
        title: "The Moon: Nhiệm Vụ Cuối Cùng - Bom tấn Hàn Quốc có D.O., Kim Hee Ae ra rạp Việt",
        typeBlog: "Tin điện ảnh",
        userPost: "anan681",
        time: "2 ngày trước",
        description: "The Moon: Nhiệm Vụ Cuối Cùng - bom tấn viễn tưởng với sự tham gia của dàn diễn viên toàn sao Sul Kyung-gu, Doh Kyung-soo, Kim Hee-ae đang thu hút sự chú ý trên toàn cầu.",
        thumbnail: "https://cdn.moveek.com/storage/media/cache/medium/64b9ff4c54320591097940.jpeg"
    },
    {
        title: "Điểm lại những gương mặt cộm cán của Tổ chức Áo Đen xuất hiện trong Conan Movie 26: Tàu Ngầm Sắt Màu Đen",
        typeBlog: "Tin điện ảnh",
        userPost: "anan681",
        time: "2 ngày trước",
        description: "Conan Movie 26: Tàu Ngầm Sắt Màu Đen trở lại với sự xuất hiện của các nhân vật khét tiếng đến từ Tổ chức Áo Đen.",
        thumbnail: "https://cdn.moveek.com/storage/media/cache/medium/64b2e54fcc493470451476.jpg"
    },
    {
        title: "[Review] Insidious 5 Quỷ Quyệt Cửa Đỏ Vô Định (Insidious: The Red Door)",
        typeBlog: "Tin điện ảnh",
        userPost: "anan681",
        time: "3 ngày trước",
        description: "Insidious 5 Quỷ Quyệt Cửa Đỏ Vô Định có lẽ nên là phần phim cuối của thương hiệu đình đám này.",
        thumbnail: "https://cdn.moveek.com/storage/media/cache/small/64adec081acfd640446488.jpg"
    },
]

const dataFakeReview = [
    {
        title: "[Review] Conan Movie 26: Tàu Ngầm Sắt Màu Đen",
        userPost: "leslienguyen",
        time: "8 ngày trước",
        thumbnail: "https://cdn.moveek.com/storage/media/cache/small/64ae7240eb8ef242253821.jpeg"
    },
    {
        title: "[Review] Insidious 5 Quỷ Quyệt Cửa Đỏ Vô Định (Insidious: The Red Door)",
        userPost: "leslienguyen",
        time: "8 ngày trước",
        thumbnail: "https://cdn.moveek.com/storage/media/cache/small/64adec081acfd640446488.jpg"
    },
    {
        title: "The Big Bang Theory - Sitcom đình đám các mọt phim không thể bỏ qua!",
        userPost: "leslienguyen",
        time: "8 ngày trước",
        thumbnail: "https://cdn.moveek.com/storage/media/cache/small/64acd2cc1c540698844302.jpeg"
    },
    {
        title: "[Review] Celebrity (Netflix) – Vạch trần cuộc sống hào nhoáng",
        userPost: "leslienguyen",
        time: "8 ngày trước",
        thumbnail: "https://cdn.moveek.com/storage/media/cache/small/64ab4efba851c944425216.jpg"
    },
    {
        title: "[Review] Delete (Netflix) – Gây tò mò đến tận phút cuối cùng",
        userPost: "leslienguyen",
        time: "8 ngày trước",
        thumbnail: "https://cdn.moveek.com/storage/media/cache/small/64a87e58590cf468000271.jpg"
    },
]
// const TOTAL_NUMBER_ITEM = dataFakeMovie.length
const TOTAL_NUMBER_ITEM = dataFakeMovie.length
const NUMBER_DOT = Math.ceil(TOTAL_NUMBER_ITEM / NUMBER_ITEM_IN_PAGE)
let movieData = ""
dataFakeMovie.forEach(movie => {
    const newDateFromCreateAt = new Date(movie.createAt)
    const timeMovieUpdateSystem = formatDate(newDateFromCreateAt)
    movieData += `<li class="slider__movie-item">
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
// add html to slider movie
SliderListMovie.html(movieData)

//function handle dots of slider movie
const sliderItem = $('.slider__movie-item')
const WIDTH_SLIDERITEM = sliderItem.width()
// const handleSlide = (index) => {
//     $('.slider__movie-dot-item').removeClass('active-dot')
//     $(`.slider__movie-dot-item:nth-child(${index + 1})`).addClass('active-dot !important')
//     slider.css('transform', `translateX(-${(index) * WIDTH_SLIDERITEM}px)`)
// }
// add dot html to slider movie
let addDot = ""
for (let i = 0; i < NUMBER_DOT; i++) {
    addDot += `<li class="slider__movie-dot-item ${i === 0 ? 'active-dot' : ""}" onclick="
    $('.slider__movie-dot-item').removeClass('active-dot')
    $('.slider__movie-dot-item:nth-child(${i + 1})').addClass('active-dot !important')
    $('.slider__movie-list').css('transform', 'translateX(-${(i) * WIDTH_SLIDERITEM}px)')
    "></li>`
}

sliderDots.html(addDot)


const homeBlogList = $('.home__blog-list')
let blogData = ""
dataFakeBlog.forEach(blog => {
    blogData += `<li class="home__blog-item">
                        <div class="home__blog-item-img">
                            <img src="${blog.thumbnail}"
                                alt="">
                        </div>
                        <div class="home__blog-item-content">
                            <h3>${blog.title}</h3>
                            <p>
                                <a href="#">${blog.typeBlog}</a> <span> . </span>
                                <a href="#">${blog.userPost}</a> <span> . </span>
                                <time datetime="">${blog.time}</time>
                            </p>
                            <p>${blog.description}</p>
                        </div>
                    </li>`
})
homeBlogList.html(blogData)

const homeReviewList = $('.home__review-list')
let reviewData = ""
dataFakeReview.forEach(review => {
    reviewData += `<li class="home__review-item">
                        <div class="home__review-item-img">
                            <img src="${review.thumbnail}"
                                alt="">
                        </div>
                        <div class="home__review-item-content">
                            <h3>${review.title}</h3>
                            <p>
                                <a href="#">${review.userPost}</a> <span> . </span>
                                <time datetime="">${review.time}</time>
                            </p>
                        </div>
                    </li>`
})
homeReviewList.html(reviewData)


