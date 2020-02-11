import React, { useEffect }from 'react';
import gsap from 'gsap';
import g from '../utils/gsapScroll';
import { opening, wallWoman } from '../utils/animation';

const ScrollingPage = ({ match }) => {
  // ===== show `Lock n Lock`
  // const showLnL = (el) => {

  // }

  // ===== 마운트
  useEffect(() => {
    const $section_blind = document.querySelector('#section-blind');
    const $LnLContainer = document.querySelector('#LnL-text-container');
    const $LnLText = $LnLContainer.childNodes;

    // # 오프닝
    opening({ $LnLText });


  }, []);

  // ===== 랜더링
  return (
    <div id="scrolling-page-root">
      {/* ===== 블라인드 애니메이션 섹션 ===== */}
      <div id="section-blind" className="section-blind" >
        <div className="fixed-container">

          {/* 텍스트 애니메이션 */}
          <div id="LnL-text-container" className="main-text">
            <span className="text text-0">L</span>
            <span className="text text-1">o</span>
            <span className="text text-2">c</span>
            <span className="text text-3">k</span>
            <span className="text text-4">n</span>
            <span className="text text-5">L</span>
            <span className="text text-6">o</span>
            <span className="text text-7">c</span>
            <span className="text text-8">k</span>
            <span className="text text-9">L</span>
            <span className="text text-10">i</span>
            <span className="text text-11">f</span>
            <span className="text text-12">e</span>
          </div>

          {/* 여자 사람 뒷모습 */}
          <div className="woman-wall-container">
            <img className="woman-wall-img" src="/images/woman-wall.jpg" alt="" />
          </div>

          {/* 핑크 텀블러 */}
          <div className="pink-bottle-container">
            <img className="pink-bottle-img" src="/images/pink_bottle.jpg" alt="" />
          </div>

          {/* 블라인드 배경 */}
          <div className="blind-bg" />
        </div>
      </div>

      {/* ===== 텀블러 드롭 애니메이션 ===== */}
      <div id="section-drop-bottle" className="section-drop-bottle" >
      </div>
    </div>
  );
};

export default ScrollingPage;