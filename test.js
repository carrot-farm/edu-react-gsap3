console.clear();
// const diagonalHeight = diagonalGroup.get(0).getBBox().height;

$(function() {
  var $window = $(window);
  var scrollTop = $window.scrollTop();
  const diagonalGroup = $("#Layer_1-2");
  var lastScrollTop = 0;
  var scrollDir;

  var timeline = new Timeline
  Max({ paused: true }).to(diagonalGroup, 1, {
    yPercent: -95
  });

  var proxyTween = TweenLite.to({}, 400, {});

  TweenLite.defaultEase = Linear.easeNone;

  $window.on("scroll", function() {
    //get document height
    var documentHeight = $(document).height();
    //get window height
    var windowHeight = $window.height();
    //get distance of window scrollbar
    scrollTop = $(window).scrollTop();

    var scrollPercent = Math.max( scrollTop / (documentHeight - windowHeight), 0 );

    scrollDir = scrollTop < lastScrollTop;
    // get difference to use as new progress
    var scrollDiff = (scrollTop - lastScrollTop) / (documentHeight - windowHeight);

    // make sure new progress is between 0 and 1 to avoid jumps
    var newProgress = Math.min(Math.max(0, proxyTween.progress() + scrollDiff), 1);
    proxyTween.progress(newProgress);

    if (scrollDir) {
      proxyTween.reverse();
    } else {
      proxyTween.play();
    }

    lastScrollTop = scrollTop;
  });

  TweenLite.ticker.addEventListener("tick", function() {
    var progress = timeline.progress();
    // ease can be anything from 0.5 to 0.01
    // Change ease to tweak effect
    progress += (proxyTween.progress() - progress) * 0.04;
    timeline.progress(progress);
  });
});
