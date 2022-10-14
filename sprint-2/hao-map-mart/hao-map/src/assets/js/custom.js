// to get current year
function getYear() {
    var currentDate = new Date();
    var currentYear = currentDate.getFullYear();
    document.querySelector("#displayYear").innerHTML = currentYear;
}

getYear();

// client section owl carousel
$(".client_owl-carousel").owlCarousel({
    loop: true,
    margin: 20,
    dots: false,
    nav: true,
    navText: [],
    autoplay: true,
    autoplayHoverPause: true,
    navText: [
        '<i class="fa fa-angle-left" aria-hidden="true"></i>',
        '<i class="fa fa-angle-right" aria-hidden="true"></i>'
    ],
    responsive: {
        0: {
            items: 1
        },
        768: {
            items: 2
        }
    }
});

/** google_map js **/

function myMap() {
    var mapProp = {
        center: new google.maps.LatLng(40.712775, -74.005973),
        zoom: 18,
    };
    var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
}

const buttons = document.querySelectorAll('.social-buttons button');

buttons.forEach(button => {

  button.addEventListener('mousemove', e => {
    const x = e.layerX - 60;
    const y = e.layerY - 60;
    const i = e.target.querySelector('i');
    const bg = e.target.querySelector('.bg');
    i.style.transform = `translate(${x / 4}px, ${y / 4}px)`;
    bg.style.transform = `translate(${x / 8}px, ${y / 8}px)`;
  });

  button.addEventListener('mouseenter', e => {
    const i = e.target.querySelector('i');
    const bg = e.target.querySelector('.bg');
    i.style.transition = 'all .15s ease';
    bg.style.transition = 'all .15s ease';
    setTimeout(() => {
      i.style.transition = '';
      bg.style.transition = '';
    }, 150);
  });

  button.addEventListener('mouseleave', e => {
    const i = e.target.querySelector('i');
    const bg = e.target.querySelector('.bg');
    i.style.transition = 'all .25s ease';
    bg.style.transition = 'all .25s ease';
    i.style.transform = `translate(${0}px, ${0}px)`;
    bg.style.transform = `translate(${0}px, ${0}px)`;
    setTimeout(() => {
      i.style.transition = '';
      bg.style.transition = '';
    }, 250);
  });

});

