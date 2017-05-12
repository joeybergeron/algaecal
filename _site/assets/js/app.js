// Wistia Video Time Trigger
window._wq = window._wq || [];

// target our video by the first 3 characters of the hashed ID
_wq.push({ id: 'cecdwaq3dz', onReady: function (video) {

    // qhwn video play crosses specific time, action is called
    video.bind('crosstime', 133, function () {
      $('#bundle').show('slow');
    });
  }, });
