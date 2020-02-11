import gsap from 'gsap';
import g from './gsapScroll';


/** ========================================================
 * 첫번째 `Lock n Lock Life` 애니메이션
 ======================================================== */
export const opening = ({triggerEl, targetEl, $LnLText}) => {
  const tl1 = gsap.timeline({ paused: true });
  const tl2 = gsap.timeline({ paused: true });
  const tl3 = gsap.timeline({ paused: true });
  const tl4 = gsap.timeline({ paused: true });
  // const tl = gsap.timeline();

  tl1.fromTo(
    [
      $LnLText[0],
      $LnLText[5],
      $LnLText[9],
    ],
    { opacity: 0 }, {opacity: 1, delay: -3},
  );

  tl2.fromTo([$LnLText[3], $LnLText[8]],
    {
      opacity: 0,
      y: '-=100px'
    },
    { opacity: 1,
      delay: -2,
      y: 0,
    }
  );

  tl3.fromTo(
    [
      $LnLText[1], $LnLText[2],
      $LnLText[4], $LnLText[6],
      $LnLText[7], $LnLText[10],
      $LnLText[11], $LnLText[12],
    ],
    { opacity: 0,
      y: '-=100px'
    }, {
      opacity: 1,
      y: 0,
      stagger: {
        amount: 0.5,
        grid: 'auto',
        from: 'center'
      }
    }
  )
  .fromTo('.woman-wall-container', {
    scale: 0
  }, {
    scale: 1
  })
  .to('.woman-wall-container', {
    delay: 0.05,
    x: '-=180px',
    width: 510
  })
  .to('.woman-wall-img', {
    x: '-=180px'
  }, '-=1')
  .to('.blind-bg', {
    autoAlpha: 0
  })
  .to(
    [
      $LnLText[0], $LnLText[1],
      $LnLText[2], $LnLText[3],
      $LnLText[4], $LnLText[5],
      $LnLText[6], $LnLText[7],
      $LnLText[8]
    ], {
      autoAlpha: 0,
      y: '+=100%',
      stagger: 0.1
    },
  )
  .to(
    [
      $LnLText[9], $LnLText[10],
      $LnLText[11], $LnLText[12],
    ],
    {
      delay: -0.5,
      x: '-=180px',
      stagger: 0.08
    }
  )
  .fromTo('.pink-bottle-img',
    {
      clip: "rect(560px, 300px, 560px, 0px)"
    },{
      clip: "rect(0px, 300px, 560px, 0px)"
    }
  )
  ;


  g.progress([tl1, tl2, tl3], {
    triggerEl: '#section-blind',
    fixedEl: '.fixed-container',
    duration: 2000,
    triggerYPercent: 0,
    smooth: 0.08,
    showIndicator: true,
  });
};


/** ========================================================
 * 벽 여자 렌더링
 ======================================================== */
export const wallWoman = ({ $container }) => {
  // const tl1 = gsap.timeline();
  // const tl1 = gsap.timeline({ paused: true });

  // tl1.fromTo($container, {
  //   scale: 0,
  // }, {
  //   // duration: 10,
  //   scale: 1
  // });

  // g.progress([tl1], {
  //   triggerEl: '#sesection-wall-woman',
  //   fixedEl: '.fixed-container',
  //   duration: 500,
  //   triggerYPercent: 0,
  //   smooth: 0.08,
  //   // showIndicator: true,
  // });
};