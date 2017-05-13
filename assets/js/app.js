// Wistia Video Time Trigger
window._wq = window._wq || [];

// target our video by the first 3 characters of the hashed ID
_wq.push({ id: 'cecdwaq3dz', onReady: function (video) {

    // qhwn video play crosses specific time, action is called
    video.bind('crosstime', 133, function () {
      $('#bundle').show('slow');
    });
  }, });

// Phone Number and Open Hours
$.getJSON('https://www.algaecal.com/wp-json/acf/v2/options', function(data) {
  let phone = data.acf.default_phone_number;
  $("#phone-number").text(phone);
	$("#phone-number").attr("href", "tel:" + phone.replace(/\D/g,'') );

  let currentdate = new Date();
  let day = currentdate .getDay();
  let time = currentdate .getHours() + '' +currentdate .getMinutes();
  let officeHours = data.acf.office_hours;
  let opened = false;
  $.each(officeHours, function(key,val) {
        if(day >= 1 & day <= 5) {
          if(time >= val.starting_time && time <= val.closing_time) {
            opened = true;
          }
        }
    });
  if(opened) {
    $("#open-hours").text('Speak to our Bone Health Specialists!');
  } else {
    $("#open-hours").text('We are currently closed!');
  }
});


// 7 Year Guarantee Modal
$.getJSON('https://www.algaecal.com/wp-json/acf/v2/options', function(data) {
	let title = data.acf["7yr_title"];
	let copy = data.acf["7yr_full_copy"];
	let seal = data.acf.seven_year_guarantee_seal;
	$(".modal-title").text(title);
	$(".modal-body").html(copy);
	$(".modal-body").append('<p class="text-center"><img src="' + seal.url + '" alt="7 Year Guarantee" height="" width=""></p>');
	const iframe = document.createElement('iframe')
	iframe.setAttribute('id', 'modalVideo');
	const url = document.querySelector('.video-container p').innerHTML;
	iframe.setAttribute('src', url);
	const videoContainer = document.querySelector('.video-container');
	videoContainer.appendChild(iframe);
	$('.video-container p').remove();
	$('#modalVideo').attr('allowtransparency', "true");
	$('#modalVideo').attr('frameborder', "0");
	$('#modalVideo').attr('scrolling',"no");
	$('#modalVideo').attr('class',"wistia_embed");
	$('#modalVideo').attr('name',"wistia_embed");
	$('#modalVideo').attr('width',"100%");
});
