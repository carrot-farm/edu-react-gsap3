import gsap from 'gsap';
import g from './gsapScroll';


/** ========================================================
 * 첫번째 `Lock n Lock Life` 애니메이션
 ======================================================== */
export const opening = ({triggerEl, targetEl, $LnLText}) => {
  const tl1 = gsap.timeline({ paused: true });
  const tl2 = gsap.timeline({ paused: true });
  const tl3 = gsap.timeline({ paused: true, defaults: { duration: 2 } });
  // const tl = gsap.timeline();


  tl1.to(
    [
      $LnLText[0],
      $LnLText[5],
      $LnLText[9],
    ],
    // { opacity: 0 },
    { opacity: 1, delay: -3 }
  );

  tl2.fromTo([$LnLText[3], $LnLText[8]],
    {
      // opacity: 0,
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
    {
      opacity: 0,
      y: '-=100px'
    },
    {
      opacity: 1,
      y: 0,
      stagger: {
        amount: 0.5,
        grid: 'auto',
        from: 'center'
      }
    }
  )
  .fromTo('.woman-wall-container',
    {
      css: {
        width: 800,
        height: 530,
        left: "50%",
        top: "50%",
        xPercent: -50,
        yPercent: -50,
        scale: 0,
      },
    },
    {
      delay: 3,
      duration: 3,
      scale: 1
    }
  )
  .to('.woman-wall-container',
    {
      xPercent: -55
    }
    )
    .fromTo('.woman-wall-img',
    {
      clip: 'rect(0px, 800px, 500px, 0px)',
    },
    {
      duration: 2,
      clip: 'rect(0px, 600px, 500px, 0px)',
      x: -200
    },
  )
  .to(
    [
      $LnLText[0], $LnLText[1],
      $LnLText[2], $LnLText[3],
      $LnLText[4], $LnLText[5],
      $LnLText[6], $LnLText[7],
      $LnLText[8]
    ], {
      delay: 0.5,
      autoAlpha: 0,
      y: '+=100%',
      stagger: 0.1
    },
    '+=1'
  )
  .to('.blind-bg', {
    autoAlpha: 0
  })
  .to(
    [
      $LnLText[9], $LnLText[10],
      $LnLText[11], $LnLText[12],
    ],
    {
      delay: -0.5,
      x: -300,
      stagger: 0.08
    }
  )
  .fromTo('.pink-bottle-img',
    {
      clip: "rect(560px, 300px, 560px, 0px)"
    },{
      delay: 2,
      duration: 3,
      clip: "rect(0px, 300px, 560px, 0px)"
    },
  )
  ;


  g.progress([tl1, tl2, tl3], {
    triggerEl: '#section-blind',
    fixedEl: '.fixed-container',
    duration: 3000,
    triggerYPercent: 0,
    smooth: 0.08,
    showIndicator: true,
  });
};


/** ========================================================
 * 벽 여자 렌더링
 ======================================================== */
export const dropBottle = () => {
  const blueBottleEl = document.querySelector('.left-drop-bottle_blue-bottle');
  const handleEl = document.querySelector('.left-drop-bottle_handle');
  const containerEl = document.querySelector('.left-drop-bottle-container');
  const textEl = document.querySelectorAll('.left-drop-text');
  const rightBottleEl = document.querySelectorAll('.right-drop-bottle_blue-bottle');

  const handle = gsap.timeline({ paused: true, yoyo: true, repeat: -1 });
  const con = gsap.timeline({ paused: true });

  console.log('> ', textEl)

  // ===== 핸들 흔들리기
  handle.fromTo(handleEl,
    {
      css: {
        top: 70,
        rotate: 105
      },
    },
    {
      duration: 1.5,
      rotate: 75,
      ease: 'power2.inOut',
    }
  )

  // =====
  con
  .to(containerEl,
    {
      // delay: 1,
      duration: 2.5,
      clip: 'rect(170px, 800px, 330px, 0px)',
      ease: 'power3.out',
    }
  )
  .to(blueBottleEl,
    {
      // delay: 2,
      duration: 2.5,
      rotate: 160,
      y: '+=350',
      x: '+=50',
      ease: 'power4.in',
    }
  )
  .to(containerEl,
    {
      duration: 2,
      clip: 'rect(0px, 800px, 500px, 0px)',
      ease: 'power3.out',
    },
    '-=1.5'
  )
  .fromTo(textEl,
    {
      x: '+=200px',
      opacity: 0
    },
    {
      x: '-=200px',
      opacity: 1,
      stagger: 0.1
    },
    '-=1.5',
  )
  .fromTo(rightBottleEl,
    {
      y: '-=900px',
    },
    {
      duration: 2,
      y: 0,
      rotate: 360,
      ease: 'power2.in',
      transformOrigin: 'center center'
    },
    '-=1.5'
  )

  g.trigger([handle, con], {
    triggerEl: '#section-drop-bottle',
    // fixedEl: '.fixed-container',
    duration: 3000,
    triggerYPercent: 50,
    // smooth: 0.08,
    showIndicator: true,
  });

  // handle.play();
  // con.play();
};