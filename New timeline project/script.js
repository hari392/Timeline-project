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
});
