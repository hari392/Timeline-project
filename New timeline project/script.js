$(document).ready(function () {
    // Initialize variables
    let currentIndex = 0; // Track the current slide index
    const timelineSlides = $('.timeline-slide'); // All timeline slides
    const timelineYears = $('.year'); // All year elements

    console.log('Number of timeline slides:', timelineSlides.length); // Debug log

    // Function to show the current slide
    function showSlide(index) {
        console.log('Showing slide:', index); // Debug log
        // Remove the active class from all slides
        timelineSlides.removeClass('active');

        // Add the active class to the current index's slide
        $(timelineSlides[index]).addClass('active');

        // Highlight the active year
        timelineYears.removeClass('active');
        $(`.year[data-year="${index}"]`).addClass('active');
    }

    // Initial display of the first slide
    showSlide(currentIndex);

    // Click handler for the "Next" arrow
    $('#next-slide').on('click', function () {
        console.log('Next clicked'); // Debug log
        if (currentIndex < timelineSlides.length - 1) {
            currentIndex++; // Move to the next index
            showSlide(currentIndex); // Update the visible slide
        }
    });

    // Click handler for the "Previous" arrow
    $('#prev-slide').on('click', function () {
        console.log('Previous clicked'); // Debug log
        if (currentIndex > 0) {
            currentIndex--; // Move to the previous index
            showSlide(currentIndex); // Update the visible slide
        }
    });

    // Click handler for timeline years
    timelineYears.on('click', function () {
        const index = $(this).data('year'); // Get the index from the data-year attribute
        console.log('Year clicked:', index); // Debug log
        currentIndex = index; // Update the current index
        showSlide(currentIndex); // Show the corresponding slide

        // Highlight the active year
        timelineYears.removeClass('active');
        $(this).addClass('active');
    });

    // ---- Slick Slider Integration ----
    // Initialize the main timeline slider
    $('.timeline-content').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        fade: true,
        adaptiveHeight: true,
        infinite: false,
        speed: 100,
        cssEase: 'linear',
    });

    // Sync the years with the content
    $('.timeline-years').slick({
        slidesToShow: 9,
        slidesToScroll: 9,
        asNavFor: '.timeline-content',
        dots: false,
        focusOnSelect: true,
        infinite: false,
        arrows: false,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 5,
                },
            },
            {
                breakpoint: 640,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4,
                },   
            },
            {
                breakpoint: 420,
                settings: {
                    slidesToShow:3 ,
                    slidesToScroll: 3,
                },   
            },
        ],
    });

    // Sync navigation between sliders
    $('.timeline-content').on('afterChange', function (event, slick, currentSlide) {
        $('.timeline-years').slick('slickGoTo', currentSlide);
        const currentYearSlide = `.timeline-years .slick-slide[data-slick-index="${currentSlide}"]`;
        $('.timeline-years .slick-slide').removeClass('is-active');
        $(currentYearSlide).addClass('is-active');
    });

    $('.timeline-years').on('click', '.slick-slide', function (event) {
        event.preventDefault();
        const goToSlide = $(this).data('slick-index');
        $('.timeline-content').slick('slickGoTo', goToSlide);
    });

    // Sync Slick sliders with manual navigation
    $('#next-slide').on('click', function () {
        $('.timeline-content').slick('slickNext');
    });

    $('#prev-slide').on('click', function () {
        $('.timeline-content').slick('slickPrev');
    });
});
