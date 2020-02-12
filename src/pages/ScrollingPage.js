import React, { useEffect }from 'react';
import gsap from 'gsap';
import g from '../utils/gsapScroll';
import { opening, dropBottle } from '../utils/animation';

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

    // # 텀블러 떨어지기
    dropBottle();


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

          {/* # 블라인드 배경 */}
          <div className="blind-bg" />
        </div>
      </div>

      {/* ===== 텀블러 드롭 섹션 ===== */}
      <div id="section-drop-bottle" className="section-drop-bottle" >

        <div className="left-drop-bottle-container">
          {/* # 왼쪽  */}
          <h3 className="left-drop-text-container">
            <span className="left-drop-text">감</span>
            <span className="left-drop-text">각</span>
            <span className="left-drop-text">적</span>
            <br />
            <span className="left-drop-text">라</span>
            <span className="left-drop-text">인</span>
            <span className="left-drop-text">으</span>
            <span className="left-drop-text">로</span>
          </h3>
          <img className="left-drop-bottle_table" src="/images/white-table.png" alt="white table" />
          <img className="left-drop-bottle_handle" src="/images/bus_handle_ring-removebg-preview.png" alt="bus handle" />
          <img className="left-drop-bottle_blue-bottle" src="/images/blue_bottle.png" alt="blue bottle" />
        </div>

        {/* # 오른쪽  */}
        <div className="right-drop-text-container">
          <img className="right-drop-bottle_table" src="/images/white-table.png" alt="white table" />
          <img className="right-drop-bottle_blue-bottle" src="/images/blue_bottle.png" alt="blue bottle" />
        </div>

      </div>
    </div>
  );
};

export default ScrollingPage;