<template>
  <!--BADGES-->
  <div class="badges">
    <div class="badge">
      <img src="images/badge1.png" alt="Badge1" />
    </div>
    <div class="badge">
      <img src="images/badge2.png" alt="Badge2" />
    </div>
  </div>

  <!--VISUAL-->
  <section class="visual">
    <div class="q-pa-md">
      <div class="inner">
        <div class="fade-in">
          <img
            src="images/visual_1.jpg"
            alt="visual_1"
            class="visual_1 image"
          />
        </div>
        <div class="fade-in">
          <img
            src="images/visual_2.jpg"
            alt="visual_2"
            class="visual_2 image"
          />
        </div>
        <div class="fade-in">
          <img
            src="images/visual_3.jpg"
            alt="visual_3"
            class="visual_3 image"
          />
        </div>
        <div class="fade-in">
          <img
            src="images/visual_4.jpg"
            alt="visual_4"
            class="visual_4 image"
          />
        </div>
        <div class="fade-in">
          <img
            src="images/visual_5.jpg"
            alt="visual_5"
            class="visual_5 image"
          />
        </div>
        <div class="title">
          <a href="javascript:void(0)" class="btn btn--brown">입장하기</a>
        </div>
      </div>
    </div>
  </section>

  <!-- SOFTWARE -->
  <section class="software">
    <div class="inner">
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide">
            <img src="images/logo-vue.png" alt="vue" />
          </div>
          <div class="swiper-slide">
            <img src="images/logo-quasar.png" alt="quasar" />
          </div>
          <div class="swiper-slide">
            <img src="images/logo-Typescript.png" alt="Typescript" />
          </div>
          <div class="swiper-slide">
            <img src="images/logo-openvidu.png" alt="openvidu" />
          </div>
          <div class="swiper-slide">
            <img src="images/logo-nodejs.png" alt="nodejs" />
          </div>
          <div class="swiper-slide">
            <img src="images/logo-Neo4j.png" alt="Neo4j" />
          </div>
        </div>
      </div>
    </div>
  </section>

  <!--DESCRIPTIONS-->
  <section class="description-1 scroll-spy">
    <div class="inner">
      <div class="text-group">
        <img
          src="images/description1_cat.png"
          alt="anything"
          class="title back-to-position to-left delay-0"
        />
      </div>
    </div>
  </section>

  <!--DESCRIPTIONS-->
  <section class="description-2 scroll-spy">
    <div class="inner">
      <div class="text-group">
        <img
          src="images/description2_cat.png"
          alt="anytime"
          class="title back-to-position to-right delay-0"
        />
      </div>
    </div>
  </section>

  <!--DESCRIPTIONS-->
  <section class="description-3 scroll-spy">
    <div class="inner">
      <div class="text-group">
        <img
          src="images/description3_cat.png"
          alt="anywhere"
          class="title back-to-position to-left delay-0"
        />
      </div>
    </div>
  </section>
</template>

<script lang="ts">
// Import Swiper Vue.js components
import { Swiper } from 'swiper';
import * as _ from 'lodash';
// Import Swiper styles
import 'swiper/css';
import gsap from 'gsap';
import ScrollMagic from 'scrollmagic';

export default {
  mounted() {
    //  * 페이지 스크롤에 따른 요소 제어
    // 페이지 스크롤에 영향을 받는 요소들을 검색!
    const badgeEl = document.querySelector('.badges') as HTMLDivElement;

    // 페이지에 스크롤 이벤트를 추가!
    // 스크롤이 지나치게 자주 발생하는 것을 조절(throttle, 일부러 부하를 줌)
    window.addEventListener(
      'scroll',
      _.throttle(function () {
        // 페이지 스크롤 위치가 500px이 넘으면.
        if (window.scrollY > 500) {
          // Badge 요소 숨기기!
          gsap.to(badgeEl, 0.6, {
            opacity: 0,
            display: 'none',
          });
          // 페이지 스크롤 위치가 500px이 넘지 않으면.
        } else {
          // Badge 요소 보이기!
          gsap.to(badgeEl, 0.6, {
            opacity: 1,
            display: 'block',
          });
        }
      }, 300)
    );

    new Swiper('.software .swiper-container', {
      autoplay: {
        // 자동 재생 여부
        delay: 500, // 5초마다 슬라이드 바뀜
      },
      loop: true, // 반복 재생 여부
      slidesPerView: 5, // 한 번에 보여줄 슬라이드 개수
      spaceBetween: 10, // 슬라이드 사이 여백
      centeredSlides: true, // 1번 슬라이드가 가운데 보이기
    });

    //  * 순서대로 나타나는 기능
    // 나타날 요소들(.fade-in) 찾기.
    const fadeEls = document.querySelectorAll('.visual .fade-in');
    // 나타날 요소들을 하나씩 반복해서 처리!
    fadeEls.forEach(function (fadeEl, index) {
      // 각 요소들을 순서대로(delay) 보여지게 함!
      gsap.to(fadeEl, 1, {
        delay: (index + 1) * 0.3,
        opacity: 1,
      });
    });

    //  * 요소가 화면에 보여짐 여부에 따른 요소 관리
    // 관리할 요소들 검색!
    const spyEls = document.querySelectorAll('section.scroll-spy');
    // 요소들 반복 처리!
    spyEls.forEach(function (spyEl) {
      new ScrollMagic.Scene({
        // 감시할 장면(Scene)을 추가
        triggerElement: spyEl, // 보여짐 여부를 감시할 요소를 지정
        triggerHook: 0.8, // 화면의 80% 지점에서 보여짐 여부 감시
      })
        .setClassToggle(spyEl, 'show') // 요소가 화면에 보이면 show 클래스 추가
        .addTo(new ScrollMagic.Controller()); // 컨트롤러에 장면을 할당(필수!)
    });
  },
};
</script>

<style scoped>
/*BADGES*/
.badges {
  position: fixed;
  top: 132px;
  right: 12px;
}
.badges .badge {
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 12px;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.15);
  cursor: pointer;
}

/*VISUAL*/
.visual {
  margin-bottom: 40px;
  background-image: url('../../public/images/cover_macbook.png');
  background-position: center;
  background-repeat: no-repeat;
}
.visual .inner {
  height: 646px;
  /* background-color: orange; */
}

.visual .inner img {
  border-radius: 10px;
}

.visual .title {
  position: absolute;
  bottom: 250px;
  right: 380px;
}
.visual .title .btn {
  position: absolute;
}

.visual .visual_1.image {
  position: absolute;
  top: 100px;
  left: 180px;
}
.visual .visual_2.image {
  position: absolute;
  top: 100px;
  left: 490px;
}
.visual .visual_3.image {
  position: absolute;
  top: 100px;
  left: 630px;
}
.visual .visual_4.image {
  position: absolute;
  bottom: 130px;
  left: 180px;
}
.visual .visual_5.image {
  position: absolute;
  bottom: 130px;
  left: 490px;
}
.visual .fade-in {
  opacity: 0;
}

/*  SOFTWARE  */
.software {
  background-color: #eee;
}
.software .inner {
  padding: 20px 0;
}
.software .swiper-container {
  width: calc(360px * 3 + 20px);
  height: 70px;
  margin-left: calc((360 * 3 + 20px) / -2);
  overflow: hidden;
}
.software .swiper-container img {
  margin: auto;
}

/*BACK TO POSITION*/
.back-to-position {
  opacity: 0;
  transition: 1s;
}
.back-to-position.to-right {
  transform: translateX(-150px);
}
.back-to-position.to-left {
  transform: translateX(150px);
}
.show .back-to-position {
  opacity: 1;
  transform: translateX(0);
}
.show .back-to-position.delay-0 {
  transition-delay: 0s;
}
.show .back-to-position.delay-1 {
  transition-delay: 0.3s;
}
.show .back-to-position.delay-2 {
  transition-delay: 0.6s;
}
.show .back-to-position.delay-3 {
  transition-delay: 0.9s;
}
/* <!--DESCRIPTIONS--> */
.description-1 {
  background-image: url('../../public/images/description_bg1.jpg');
  background-repeat: no-repeat;
  background-position: center;
  background-attachment: fixed;
  background-size: cover;
  height: 700px;
}
.description-1 .inner {
  padding: 110px 0;
}
.description-1 .text-group {
  display: flex;
  justify-content: flex-end;
  flex-wrap: wrap;
}
.description-1 .text-group .title {
  margin-bottom: 40px;
}

.description-2 {
  background-image: url('../../public/images/description_bg2.jpg');
  background-repeat: no-repeat;
  background-position: center;
  background-attachment: fixed;
  background-size: cover;
  height: 700px;
}
.description-2 .inner {
  padding: 110px 0;
}
.description-2 .text-group {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
}
.description-2 .text-group .title {
  margin-bottom: 40px;
}

.description-3 {
  background-image: url('../../public/images/description_bg3.jpg');
  background-repeat: no-repeat;
  background-position: center;
  background-attachment: fixed;
  background-size: cover;
  height: 700px;
}
.description-3 .inner {
  padding: 110px 0;
}
.description-3 .text-group {
  display: flex;
  justify-content: flex-end;
  flex-wrap: wrap;
}
.description-3 .text-group .title {
  margin-bottom: 40px;
}
</style>
