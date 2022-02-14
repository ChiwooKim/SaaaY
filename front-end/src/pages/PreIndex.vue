<template>
  <section>
    <!--DESCRIPTIONS-->
    <div class="description img_1 scroll-spy">
      <div class="text-group">
        <div class="title back-to-position to-right delay-0">
          Share <br />
          Anything
        </div>
      </div>
      <div class="title">
        <a href="#/main" class="btn btn--brown">입장하기</a>
      </div>
    </div>
    <!--DESCRIPTIONS-->
    <div class="description img_2 scroll-spy">
      <div class="title">
        <a href="#/main" class="btn btn--brown">입장하기</a>
      </div>
      <div class="text-group">
        <div class="title back-to-position to-left delay-0">
          Share <br />
          Anytime
        </div>
      </div>
    </div>

    <!--DESCRIPTIONS-->
    <div class="description img_3 scroll-spy">
      <div class="text-group">
        <div class="title back-to-position to-right delay-0">
          Share <br />
          Anywhere
        </div>
      </div>
      <div class="title">
        <a href="#/main" class="btn btn--brown">입장하기</a>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import ScrollMagic from 'scrollmagic';

export default {
  mounted() {
    //  * 요소가 화면에 보여짐 여부에 따른 요소 관리
    // 관리할 요소들 검색!
    const spyEls = document.querySelectorAll('.description.scroll-spy');
    console.log(spyEls);
    // 요소들 반복 처리!
    spyEls.forEach(function (spyEl) {
      new ScrollMagic.Scene({
        // 감시할 장면(Scene)을 추가
        triggerElement: spyEl, // 보여짐 여부를 감시할 요소를 지정
        triggerHook: 0.7, // 화면의 80% 지점에서 보여짐 여부 감시
      })
        .setClassToggle(spyEl, 'show') // 요소가 화면에 보이면 show 클래스 추가
        .addTo(new ScrollMagic.Controller()); // 컨트롤러에 장면을 할당(필수!)
    });
  },
};
</script>

<style lang="scss" scoped>
section {
  font-family: 'Playfair Display', serif;
  .btn {
    font-family: 'Nanum Gothic', sans-serif;
  }
}

/*BACK TO POSITION*/
.back-to-position {
  opacity: 0;
  transition: 1s;
  &.to-right {
    transform: translateX(-150px);
  }
  &.to-left {
    transform: translateX(150px);
  }
}

.show .back-to-position {
  opacity: 1;
  transform: translateX(0);
  &.delay-0 {
    transition-delay: 0s;
  }
  &.delay-1 {
    transition-delay: 0.3s;
  }
  &.delay-2 {
    transition-delay: 0.6s;
  }
  &.delay-3 {
    transition-delay: 0.9s;
  }
}

.description {
  /* <!--DESCRIPTIONS--> */
  background-repeat: no-repeat;
  background-position: center;
  background-attachment: fixed;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 150px;
  &.img_1 {
    background-image: url('../../public/images/description_bg1.jpg');
  }
  &.img_2 {
    background-image: url('../../public/images/description_bg2.jpg');
  }
  &.img_3 {
    background-image: url('../../public/images/description_bg3.jpg');
  }
  .text-group {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }
  .title {
    display: flex;
    justify-content: center;
    color: #fff;
    padding: 0 20px;
    font-size: 7vw;
    font-weight: bold;
  }
}
</style>
