<template>
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
</template>

<script lang="ts">
import gsap from 'gsap';

export default {
  mounted() {
    /**
     * 순서대로 나타나는 기능
     */
    // 나타날 요소들(.fade-in) 찾기.
    const fadeEls = document.querySelectorAll('.visual .fade-in');
    // 수정할 부분
    let index = 0;
    // 나타날 요소들을 하나씩 반복해서 처리!
    fadeEls.forEach(function (fadeEl) {
      // 각 요소들을 순서대로(delay) 보여지게 함!
      gsap.to(fadeEl, 1, {
        delay: (index + 1) * 0.7,
        opacity: 1,
      });
    });
  },
};
</script>

<style scoped>
/*VISUAL*/
.visual {
  margin-top: 120px;
  background-image: url('../../public/images/cover_macbook3.png');
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
  top: 340px;
  left: 130px;
}
.visual .title .btn {
  position: absolute;
}

.visual .visual_1.image {
  position: absolute;
  bottom: 325px;
  right: 420px;
}
.visual .visual_2.image {
  position: absolute;
  bottom: 325px;
  right: 130px;
}
.visual .visual_3.image {
  position: absolute;
  bottom: 325px;
  right: 275px;
}
.visual .visual_4.image {
  position: absolute;
  bottom: 120px;
  right: 420px;
}
.visual .visual_5.image {
  position: absolute;
  bottom: 120px;
  right: 265px;
}
.visual .fade-in {
  opacity: 0;
}
</style>
