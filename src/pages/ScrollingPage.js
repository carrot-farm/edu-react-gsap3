import React, { useEffect, useCallback }from 'react';
import gsap from 'gsap';
import g from '../utils/gsapScroll';
// import gsap, { TweenMax, TimelineMax } from 'gsap';
// import * as ScrollMagic from "scrollmagic";
// import { ScrollMagicPluginGsap } from "scrollmagic-plugin-gsap";


const ScrollingPage = ({ match }) => {
  let tl;
  let containerY;
  // let boxHeight;

  // ===== 현재 위치 퍼센트
  const getScrollPercent = () => {
    const container = document.querySelector('.container');
    const scrollY = window.scrollY;
    const documentHeight = document.body.clientHeight;
    const windowHeight = window.innerHeight;
    // const containerY = container.offsetTop;
    const containerHeight = container.clientHeight;
    // const scPercent = Math.max((scrollY - containerY)  / (containerHeight), 0); // 지정한 컨테이너 엘리먼트 의 끝까지 스크롤 시 스크롤 비율.
    // const scPercent = Math.max(scrollY / (documentHeight - windowHeight), 0); // 전체 윈도우 스크롤 시 현재 스크롤 비율
    const scPercent = Math.max((scrollY - containerY) / (300), 0); // 지정한 길이만큼의 현재 스크롤 비율

    // console.log('> ', scPercent, documentHeight,  windowHeight, containerHeight, containerY);
    // const containerPercent = scrollY / ()


    return ({scrollY, documentHeight, windowHeight, scPercent});
  }


  // ===== 애니메이션
  const play = useCallback(() => {
    console.log('> play ani');
    // tl.play();
  }, []);


  // ===== 마운트
  useEffect(() => {
    // const tween1 = TweenMax.to('.box', 2, {
    //   x: 700
    // });
    // ScrollMagicPluginGsap(ScrollMagic, TweenMax, TimelineMax);

    // var controller = new ScrollMagic.Controller();
    // var tween = TweenMax.fromTo("#animate1", 1,
		// 								{left: -100},
		// 								{left: 100, repeat: -1, yoyo: true});

    // const scene = new ScrollMagic.Scene({
    //   triggerElement: "#container", duration: 200, offset: -50
    // })
    // .setTween(tween)
    // // .addIndicators({name: "loop"})
    // .addTo(controller);

    const container = document.querySelector('.container');
    const el = document.querySelector('.box');


    containerY = container.offsetTop;
    tl = gsap.timeline({ paused: true });
    tl.to(el, {y: 400, onComplete: () => console.log('> done')});
    // tl.to(el, {duration: 3, y: 400, onComplete: () => console.log('> done')});
    // console.log('> >', tl);
    g.go(
      [tl],
      a => console.log('> ddd : ', a)
    )


    // console.log('> scrollPercent : ', getScrollPercent())
    // window.addEventListener('scroll', ()=>{
    //   const { scPercent } = getScrollPercent();
    //   // console.log('> scrollPercent : ', scPercent);
    //   setTimeout(() => tl.progress(scPercent), 50);
    // });

  }, []);




  // ===== 랜더링
  return (
    <div>
      <p style={{height: 300}}>
        ScrollingPage
      </p>
      <div className="root-container"
        style={{ width:800, height: 2000, margin: 'auto', backgroundColor: '#f5f5f5'}}
      >
        {/* ===== container ===== */}
        <div className="container" id="container"
          style={{ height: 500, border: '1px solid'}}
        >
          <div className="box" id="box"
            style={{width:100, height: 100, background:'#ff9547'}}
          ></div>
          <button onClick={play}>play</button>
        </div>
      </div>
    </div>
  );
};

export default ScrollingPage;