import gsap from 'gsap';
const _ = {};
const L = {}; // 지연적으로 동작하는 함수에 네임 스페이스 적용.
_.log = console.log;

/** ============================================================
 * @ 커링
 * 인자가 2개 이상일 경우는 함수에 인자를 전부 넘기면서 실행을 하고
 * 인자가 1개일 경우는 다음에 ...bs를 받는 함수를 리턴하면서
 * 다음번에 실행되도록 한다.
 ============================================================ */
const curry = f => (a, ...bs) =>
  bs.length ? f(a, ...bs) : (...bs) => f(a, ...bs);


/** ============================================================
 * @ 지정된만큼 값을 저장 후 리턴
 ============================================================ */
const take = curry(function (length, iter){
  let res = [];
  for(const a of iter){
    // 순회한 값을 배열에 집어 넣는다.
    res.push(a);
    // 지정된 length 와 length가 같을 경우에는 저장된 값을 리터
    if(res.length === length) { return res; }
  }
  return res;
});

/** ============================================================
 * @ 전체 평가
============================================================ */
const takeAll = (iter) => {
  return take(Infinity, iter);
};


// const map = curry((f, iter) => {
//   return takeAll(L.map(f, iter));
// });


// const each = curry((f, iter) => {
//   return map(a => go1(f(a), s => a), iter);
// });


/** ============================================================
 * @ 누적 처리를 함수에게 위임 한다.
 ============================================================ */
const reduce = curry(function(f, acc, iter) {
  // 3번째가 아닌 2번째 파라메터가 이터레이터 일 경우 처리.
  if(arguments.length === 2){
    iter = acc[Symbol.iterator](); // acc의 iterator을 넘김.
    acc = iter.next().value;
  }

  for(const a of iter){
    acc = f(acc, a);
  }
  return acc;
});


/** ============================================================
 * @ 리스트가 있다면 함수에 값을 넘겨 주면서 실행 시킨다.
 ============================================================ */
L.map = curry(function*(f, iter){
  for(const a of iter){
    yield f(a);
  }
});

/** ============================================================
 * @ 함수 자체를 축약.
 * a로 시작해서 함수가 들어올 함수로 누적해 나간다.
 * 실행되면 다음과 같은형태로 동작한다. eg) add(add(1, 2), 3)
 ============================================================ */
const go1 = (a, f) => a instanceof Promise ? a.then(f) : f(a);
const go = (...as) => reduce(go1, as);


/** ============================================================
* @ 현재 애니메이션의 시간동안 움직일 시간 비율을 구한다.
============================================================ */
const getProgress = ({ startY, duration, triggerYPercent }) => {
  const scrollY = window.scrollY;
  const winHeight = window.innerHeight;
  // _.log('> getProgress : ', startY, duration, triggerYPercent, scrollY, winHeight );
  return Math.max((scrollY - startY + (winHeight * triggerYPercent / 100) ) / duration, 0);
};


// /** ============================================================
//  * @ 스크롤시 파라메터 변환해서 전달
//  ============================================================ */
//  const convertEvtParmas = ({startY, duration, triggerYPercent, tl}) => {
//   const scrollY = window.scrollY;
//   const winHeight = window.innerHeight;
//   const curProgress = getProgress({scrollY, startY, duration, winHeight, triggerYPercent});
//   return ({
//     winHeight,
//     scrollY,
//     curProgress,
//   });
// };

const reduceTl = (tl, endProgress) => {
  let progress = tl.progress();
  progress += (endProgress - progress) * 0.05;
  // console.log('> progress : ', endProgress, progress);
  if(progress < endProgress) {
    // reduceTl(progress, endProgress);
  }
};

/** ============================================================
 * @ 스크롤 이벤트
============================================================ */
const evt = {};
// ===== progress
evt.progress = ({tl, curProgress}) => {
  tl.progress(curProgress);
};

// ===== progressTicker
evt.progressTicker = ({tl, curProgress, type}) => {
  // tl.progress(curProgress);
  _.log('> type : ', type)
};

// ===== trigger
evt.trigger = ({tl, curProgress}) => {
  (curProgress > 0) ? tl.play() : tl.reverse();
};


/** ============================================================
  * @ indicator 엘리먼트 생성
============================================================ */
const indicatorTemplate = ({startY, endY}) => {
  return `
    <div style="position:absolute;right:20px;top:${startY}px;overflow:visibie;white-space:nowrap;font-size:0.8rem;z-index:10000;text-align:right;">
      <div style="padding:0 5px;border-bottom:1px solid;line-height:0.9rem;color:blue;min-width:20px;margin-top:-0.95rem">START</div>
      ${endY ? `<div style="position:absolute;top:${endY}px;padding:0 5px;border-top:1px solid;line-height:0.9rem;color:red;min-width:20px;">END</div>` : ''}
    </div>
  `;
};

const triggerTemplate = ({triggerYPercent}) => `
  <div style="position:fixed;right:20px;top:${triggerYPercent}%;overflow:visible;white-space:nowrap;font-size:0.8rem;line-height:0.9rem;z-index:10001;">
    <div style="color:green;line-height:0.95rem;border-bottom:1px solid;min-width:50px;">
      <div style="position:absolute;top:-0.9rem;">TRIGGER</div>
    </div>
  </div>
`;

/** ============================================================
  * @ 텍스트를 엘리먼트로 변경.
============================================================ */
const el = html => {
  const wrap = document.createElement("div");
  wrap.innerHTML = html;
  return wrap.children[0];
};


/** ============================================================
 * @ 엘리먼트내에 다른 엘리먼트 덧붙임.
============================================================ */
const append = (parent, child) => parent.appendChild(child);


/** ============================================================
* @ gsap
* gsap scroll 애니메이션 객체
============================================================ */
const gsapc = {};

// =====
gsapc.play = (type) => (tls, options) =>
  go(
    tls,
    L.map(gsapc.setOptions({...options, type})), // 옵션 셋팅
    L.map(a => (gsapc.addScEvt(evt[type], a), a)), // 스크롤 이벤트 바인딩
    L.map(a => {
      gsap.ticker.add((...args) => {
        if(a.curProgress !== undefined){
          let progress = a.tl.progress();
          progress += (a.curProgress - progress) * 0.05;
          a.tl.progress(progress)
          _.log('> ticker : ', a.curProgress, a.tl.progress(), a.curProgress)
        }
      })
      return a;
    }),
    L.map(a => (a.showIndicator && gsapc.indicator(a), a)), // indicator 생성
    takeAll, // 전체 평가
  );


// ===== 시작
gsapc.progress = gsapc.play('progress');
gsapc.progressTicker = gsapc.play('progressTicker');
gsapc.trigger = gsapc.play('trigger');


// ===== 옵션 셋팅
gsapc.setOptions = curry((_options, tl) => {
  const options = {
    type: 'progress', // 애니메이션 방식("trigger"[트리거로 한번만 실행], "progress"[duration동안 실행])
    startY: tl._recent._targets[0].offsetTop, // 애니메이션 시작 좌표(px)
    duration: 100, // 애니메이션 스크롤 기간(px)
    triggerYPercent: 50, // 트리거 y 축 좌표(%)
    showIndicator: false, // indicator 표시 유무
    ..._options,
  };
  // _.log('> ', tl)
  // # trigger 일 경우 duration 없음.
  if(options.type === 'trigger') {
    options.duration = 0;
  }

  return {
    tl,
    ...options,
  };
});


// ===== 이벤트 바인딩
gsapc.addScEvt = (f, data) => {

  window.addEventListener('scroll', evt => {
    data.curProgress = getProgress(data);
    f(data)
  }, false);

  return data;
};


// ===== indicator 생성
gsapc.indicator = ({startY, duration, triggerYPercent}) => {
  // console.log('> indicator : ');
  // # 인디케이터 생성
  append(document.body,
    el(indicatorTemplate({startY, endY: duration})));

  // # 트리거 생성.
  append(document.body,
    el(triggerTemplate({triggerYPercent})));
};




export default gsapc;