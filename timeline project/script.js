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
            $('.slider-single').slick('slickGoTo', currentIndex); // Sync with Slick carousel
        }
    });

    // Click handler for the "Previous" arrow
    $('#prev-slide').on('click', function () {
        console.log('Previous clicked'); // Debug log
        if (currentIndex > 0) {
            currentIndex--; // Move to the previous index
            showSlide(currentIndex); // Update the visible slide
            $('.slider-single').slick('slickGoTo', currentIndex); // Sync with Slick carousel
        }
    });

    // Click handler for timeline years
    timelineYears.on('click', function () {
        const index = $(this).data('year'); // Get the index from the data-year attribute
        console.log('Year clicked:', index); // Debug log
        currentIndex = index; // Update the current index
        showSlide(currentIndex); // Show the corresponding slide
        $('.slider-single').slick('slickGoTo', currentIndex); // Sync with Slick carousel
    });

    $('.slider-single').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        fade: true,
        adaptiveHeight: true,
        infinite: false,
        speed: 100,
        cssEase: 'linear',
    });

    $('.slider-nav')
        .on('init', function (event, slick) {
            $('.slider-nav .slick-slide.slick-current').addClass('is-active');
        })
        .slick({
            slidesToShow: 9,
            slidesToScroll: 9,
            dots: false,
            focusOnSelect: false,
            infinite: false,
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
                        slidesToShow: 3,
                        slidesToScroll: 3,
                    },
                },
            ],
        });

    $('.slider-single').on('afterChange', function (event, slick, currentSlide) {
        console.log('Slide changed to:', currentSlide); // Debug log
        currentIndex = currentSlide; // Synchronize currentIndex with the Slick slide
        showSlide(currentIndex); // Update the visible content and timeline

        $('.slider-nav').slick('slickGoTo', currentSlide); // Sync nav with main slider
        var currrentNavSlideElem = '.slider-nav .slick-slide[data-slick-index="' + currentSlide + '"]';
        $('.slider-nav .slick-slide.is-active').removeClass('is-active');
        $(currrentNavSlideElem).addClass('is-active');
    });

    $('.slider-nav').on('click', '.slick-slide', function (event) {
        event.preventDefault();
        var goToSingleSlide = $(this).data('slick-index');
        currentIndex = goToSingleSlide; // Sync currentIndex with selected slide
        showSlide(currentIndex); // Update the timeline content
        $('.slider-single').slick('slickGoTo', goToSingleSlide); // Navigate to the selected slide
    });
});
