// movie, theater, showtime
const objectDataMovieBook = JSON.parse(localStorage.getItem('infoObjectBookTicket'))
if (objectDataMovieBook) {

    // load info current book movie
    const seatContentPreview = $('.choose__seat-content-right .choose__seat-content-right-preview')
    const seatContentMain = $('.choose__seat-content-left-main .choose__seat-content-left-main-seat')
    const { movie, theater_id, theater_name, showtime_id, showtime, room_id } = objectDataMovieBook


    { //block code handle render data seat...
        let html = ""
        const dataSeatRoomOfTheater = await $.ajax({
            url: `http://localhost:8000/api/v1/theater/room?roomId=${room_id}&theaterId=${theater_id}`,
            method: 'GET',
            contentType: 'application/json',
            success: (response) => {
                return response
            },

            error: (status, error) => {
                return error
            }
        })

        if (dataSeatRoomOfTheater) {
            const { seat_total, seats_vip, seats_couple, seats_booked } = dataSeatRoomOfTheater
            for (let i = 1; i <= seat_total; i++) {
                if (seats_booked.includes(i)) {
                    html += `<li class="choose__seat-content-left-main-seat-item bought">${i}</li>`
                } else if (seats_vip.includes(i)) {
                    html += `<li class="choose__seat-content-left-main-seat-item vip">${i}</li>`
                } else if (seats_couple.includes(i)) {
                    html += `<li class="choose__seat-content-left-main-seat-item couple">${i}</li>`
                } else {
                    html += `<li class="choose__seat-content-left-main-seat-item ">${i}</li>`
                }
            }
            seatContentMain.html(html)
        }
        seatContentMain.html(html)
        $(`.choose__seat-content-left-main-seat-item`).on('click', function () {
            const seatNumber = $(this).html().trim()
            const index = $(this).index() + 1
            handleClickSeat(seatNumber, index)
        })
    }// end block code

    const renderContentPreview = (seatBooked) => {
        let html = `<h2 class="preview__movie-name">${movie}</h2>
                    <p class="preview__theater">${theater_name}</p>
                    <p class="preview__schedule">Suất chiếu: ${showtime}</p>
                    `
        if (seatBooked) {
            html += `<p class="preview__schedule"> Ghế: ${seatBooked.join(", ")}</p>`
        } else {
            html += `<p class="preview__schedule"> Ghế: ...</p>`
        }
        seatContentPreview.html(html)
    }

    let seatsBooked = []
    const handleClickSeat = (seatNumber, index) => {
        $(`.choose__seat-content-left-main-seat-item:nth-child(${index})`).addClass('your_choose')

        seatsBooked.includes(seatNumber) ? (
            $(`.choose__seat-content-left-main-seat-item:nth-child(${index})`).removeClass('your_choose'),
            $(`.choose__seat-content-left-main-seat-item:nth-child(${index}):before`).css('background-color', 'transparent'),
            seatsBooked = seatsBooked.filter(seat => seat !== seatNumber)
        )
            : seatsBooked.push(seatNumber)
        renderContentPreview(seatsBooked)
    }

    renderContentPreview()


    // load info seats of room in theater



} else {
    location.href = "http://127.0.0.1:5500/index.html"
}