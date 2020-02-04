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
    if(res.length === length){ return res; }
  }
  return res;
});

/** ============================================================
 * @ 전체 평가
============================================================ */
const takeAll = (iter) => {
  return take(Infinity, iter);
};


const map = curry((f, iter) => {
  return takeAll(L.map(f, iter));
});


const each = curry((f, iter) => {
  return map(a => go1(f(a), s => a), iter);
});


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
const getProgress = ({scrollY, startY, duration}) => {
  // _.log('> getProgress : ', Math.max((scrollY - startY) / duration, 0));
  return Math.max((scrollY - startY) / duration, 0);
};

/** ============================================================
 * @ 스크롤 이벤트
============================================================ */
const scEvt = ({evt, startY, duration, tl}) => {
  const scrollY = window.scrollY;
  // _.log('> scEvt : ', scrollY, startY, duration);
  tl.progress(getProgress({scrollY, startY, duration}))
}


 /** ============================================================
  * @ gsap
  * gsap scroll 애니메이션 객체
  ============================================================ */
const gsapc = {};

// ===== 시작
gsapc.go = (tls, ...arg) => go(
  tls,
  L.map(gsapc.setOptions()),
  // L.map(a => (each()))
  L.map(a => (gsapc.addScEvt(a), a)),
  // each(a => ),
  takeAll,
  _.log
);


// ===== 옵션 셋팅
gsapc.setOptions = curry((_options, tl) => {
  const options = {
    duration: 500, // 애니메이션 기간(초)
    startY: tl._recent._targets[0].offsetTop, // 애니메이션 시작 좌표(px)
    ..._options,
  };
  // _.log('> ', tl)
  return {
    tl,
    ...options,
  };
});


// ===== 시간 설정
gsapc.duration = curry((s, gsap) => {
  gsap.duration = s;
  return gsap;
});


// ===== 이벤트 바인딩
gsapc.addScEvt = (gsap) => {
  const { startY, duration, tl } = gsap;

  window.addEventListener('scroll',
    evt =>  scEvt({evt, startY, duration, tl}),
      false);
  return gsap;
};


// ===== indicator 생성
gsapc.indicator = curry(({start, end, trigger}, gsap) => {
  const _start = {
    name: 'start',
    ...start
  };
  const _end = {
    name: 'end',
    ...end
  };
  const _trigger = {
    name: 'trigger',
    ...trigger
  };

  _.log('> indicator : ', gsap.tl)


});


// ===== 애니메이션 시작
gsapc.play = (gsap) => {
  const { startY, duration } = gsap;

  window.addEventListener('scroll', ()=>{
    setTimeout(() =>
      gsap.tl.progress(
        getProgress({startY, duration})), 50);
  });

  return gsap;
};



export default gsapc;