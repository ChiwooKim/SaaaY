<template>
  <q-layout view="lHh Lpr lFf">
    <!-- HEADER -->
    <q-header elevated class="bg-grey-1">
      <div class="inner">
        <q-toolbar>
          <img src="images/logo_100.png" alt="SAAAY Logo" />
          <q-toolbar-title> </q-toolbar-title>

          <div>
            <!-- Right sub-menu -->
            <div class="sub-menu">
              <ul class="menu">
                <li>
                  <a href="/signin">Sign In</a>
                </li>
                <li>
                  <a href="javascript:void(0)">My ProFile</a>
                </li>
                <li>
                  <a href="javascript:void(0)">Null</a>
                </li>
                <li>
                  <a href="javascript:void(0)">Null</a>
                </li>
              </ul>
              <div class="search">
                <input type="text" />
                <span @click="search" class="material-icons">search</span>
              </div>
            </div>
            <!-- Right Tab-menu -->
            <div class="tab-menu">
              <q-tabs align="right">
                <q-route-tab class="item" to="/page1" label="Page One" />
                <q-route-tab class="item" to="/page2" label="Page Two" />
                <q-route-tab class="item" to="/page3" label="Page Three" />
              </q-tabs>
            </div>
          </div>
        </q-toolbar>
      </div>
      <!--BADGES-->
      <div class="badges">
        <div class="badge">
          <img src="images/badge1.png" alt="Badge1" />
        </div>
        <div class="badge">
          <img src="images/badge2.png" alt="Badge2" />
        </div>
      </div>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <!-- footer -->
    <!-- <q-footer elevated class="bg-grey-1 text-white">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" />
          </q-avatar>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer> -->
  </q-layout>
</template>

<script lang="ts">
import * as _ from 'lodash';
import gsap from 'gsap';

export default {
  mounted() {
    /**
     * 페이지 스크롤에 따른 요소 제어
     */
    // 페이지 스크롤에 영향을 받는 요소들을 검색!
    const badgeEl = document.querySelector('header .badges') as HTMLDivElement;
    const toTopEl = document.querySelector('#to-top') as HTMLDivElement;
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
          // 상단으로 스크롤 버튼 보이기!
          gsap.to(toTopEl, 0.2, {
            x: 0,
          });

          // 페이지 스크롤 위치가 500px이 넘지 않으면.
        } else {
          // Badge 요소 보이기!
          gsap.to(badgeEl, 0.6, {
            opacity: 1,
            display: 'block',
          });
          // 상단으로 스크롤 버튼 숨기기!
          gsap.to(toTopEl, 0.2, {
            x: 100,
          });
        }
      }, 300)
    );
  },

  methods: {
    search() {
      /**       * 검색창 제어       */
      // 검색창 요소(.search) 찾기.
      const searchEl = document.querySelector('.search') as HTMLDivElement;

      const searchInputEl = searchEl.querySelector('input') as HTMLDivElement;
      // 검색창 요소를 클릭하면 실행.
      searchEl.addEventListener('click', function () {
        searchInputEl.focus();
      });
      // 검색창 요소 내부 실제 input 요소에 포커스되면 실행.
      searchInputEl.addEventListener('focus', function () {
        searchEl.classList.add('focused');
        searchInputEl.setAttribute('placeholder', '통합검색');
      });
      // 검색창 요소 내부 실제 input 요소에서 포커스가 해제(블러)되면 실행.
      searchInputEl.addEventListener('blur', function () {
        searchEl.classList.remove('focused');
        searchInputEl.setAttribute('placeholder', '');
      });
    },
  },
};
</script>

<style scoped>
ul {
  list-style: none;
}

/* sub-menu */
header .sub-menu {
  display: flex;
}
header .sub-menu ul.menu {
  font-family: Arial, sans-serif;
  display: flex;
}
header .sub-menu ul.menu li {
  position: relative;
}
header .sub-menu ul.menu li::before {
  content: '';
  display: block;
  position: absolute;
  width: 1px;
  height: 12px;
  background-color: #e5e5e5;
  top: 0px;
  bottom: 0px;
  margin: auto;
}
header .sub-menu ul.menu li:first-child::before {
  display: none;
}
header .sub-menu ul.menu li a {
  font-size: 12px;
  padding: 11px 16px;
  display: block;
  color: #656565;
}
header .sub-menu ul.menu li a:hover {
  color: #000;
}
header .sub-menu .search {
  height: 34px;
  position: relative;
  margin: auto;
}
header .sub-menu .search input {
  width: 36px;
  height: 34px;
  padding: 4px 10px;
  border: 1px solid #ccc;
  box-sizing: border-box;
  border-radius: 5px;
  outline: none;
  background-color: #fff;
  color: #777;
  font-size: 12px;
  transition: width 0.4s;
}
header .sub-menu .search input:focus {
  width: 170px;
  border-color: #444444;
}
header .sub-menu .search .material-icons {
  position: absolute;
  color: #000;
  height: 24px;
  top: 0;
  bottom: 0px;
  right: 10px;
  margin: auto;
}
header .sub-menu .search.focused .material-icons {
  opacity: 0;
}

/* tab-menu */
header .tab-menu {
  height: 34px;
  position: relative;
  margin: auto;
}
header .tab-menu .item {
  height: 34px;
  position: relative;
  color: #656565;
  margin: auto;
  font-family: Arial, sans-serif;
}
header .tab-menu .item:hover {
  background-color: #2c2a29;
  color: #97eaff;
  border-radius: 6px 6px 0 0;
}

/*BADGES*/
header .badges {
  position: absolute;
  top: 132px;
  right: 12px;
}
header .badges .badge {
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 12px;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.15);
  cursor: pointer;
}
</style>
