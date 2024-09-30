function animateCounter(id, start, end, duration) {
    let obj = document.getElementById(id);
    let current = start;
    let range = end - start;
    let increment = end > start ? 1 : +1;
    let stepTime = Math.abs(Math.floor(duration / range));
    
    let timer = setInterval(function() {
        current += increment;
        obj.textContent = current;
        if (current == end) {
            clearInterval(timer);
        }
    }, stepTime);
}


$(document).ready(function() {
    animateCounter('counter', 1901, 2024, 3000); 
});


$("#timeline-1").timeline();