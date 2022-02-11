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
                <q-route-tab class="item" to="/" label="Main" />
                <q-route-tab class="item" to="/calendar" label="Calendar" />
                <q-route-tab class="item" to="/page3" label="Page Three" />
              </q-tabs>
            </div>
          </div>
        </q-toolbar>
      </div>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <!-- footer -->
    <footer>
      <div class="inner">
        <ul class="menu">
          <li>
            <a href="javascript:void(0)" class="white">개인정보처리방침</a>
          </li>
          <li>
            <a href="javascript:void(0)">영상정보처리기기 운영관리 방침</a>
          </li>
          <li><a href="javascript:void(0)">홈페이지 이용약관</a></li>
          <li><a href="javascript:void(0)">위치정보 이용약관</a></li>
          <li><a href="javascript:void(0)">이용약관</a></li>
          <li><a href="javascript:void(0)">이용약관</a></li>
        </ul>
        <div class="info">
          <span>사업자등록번호 000-00-00000</span>
          <span>(주)SAAAY 코리아 대표 홍길동</span>
          <span>TEL : 02) 0000-0000 / FAX : 02) 0000-0000</span>
          <span>개인정보 책임자 : 홍길동</span>
        </div>
        <p class="copyright">
          &copy; <span class="this-year"></span> Say Anything Anytime Anywhere
          Yours
        </p>
      </div>
    </footer>
    <!--TO TOP BUTTON-->
    <div @click="bottomclick" id="to-top">
      <div class="material-icons">arrow_upward</div>
    </div>
  </q-layout>
</template>

<script lang="ts">
import * as _ from 'lodash';
// import gsap from 'gsap';

export default {
  mounted() {
    /**
     * 페이지 스크롤에 따른 요소 제어
     */
    // 페이지 스크롤에 영향을 받는 요소들을 검색!
    const toTopEl = document.querySelector('#to-top') as HTMLDivElement;

    // 페이지에 스크롤 이벤트를 추가!
    // 스크롤이 지나치게 자주 발생하는 것을 조절(throttle, 일부러 부하를 줌)
    window.addEventListener(
      'scroll',
      _.throttle(function () {
        // 페이지 스크롤 위치가 500px이 넘으면.
        if (window.scrollY > 500) {
          // 상단으로 스크롤 버튼 보이기!
          gsap.to(toTopEl, 0.2, {
            opacity: 1,
            x: 0,
          });
          // 페이지 스크롤 위치가 500px이 넘지 않으면.
        } else {
          // 상단으로 스크롤 버튼 숨기기!
          gsap.to(toTopEl, 0.2, {
            opacity: 0,
            x: 100,
          });
        }
      }, 300)
    );

    /**
     * 올해가 몇 년도인지 계산
     */
    const thisYear = document.querySelector('.this-year') as HTMLDivElement;
    thisYear.textContent = String(new Date().getFullYear());
  },

  methods: {
    /**       * 검색창 제어       */
    // 검색창 요소(.search) 찾기.
    search() {
      const searchEl = document.querySelector('.search') as HTMLDivElement;

      const searchInputEl = searchEl.querySelector('input') as HTMLDivElement;
      // 검색창 요소를 클릭하면 실행.
      searchInputEl.focus();
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

    // 상단으로 스크롤 버튼을 클릭하면,
    bottomclick() {
      // 페이지 위치를 최상단으로 부드럽게(0.7초 동안) 이동.
      gsap.to(window, 0.7, {
        scrollTo: 0,
      });
      // });
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

/*   FOOTER */
footer {
  background-color: #272727;
  border-top: 1px solid #333;
}
footer .inner {
  padding: 40px 0 60px 0;
}
footer .menu {
  display: flex;
  justify-content: center;
}
footer .menu li {
  position: relative;
}
footer .menu li::before {
  content: '';
  width: 3px;
  height: 3px;
  background-color: #555;
  position: absolute;
  top: 0;
  bottom: 0;
  right: -1px;
  margin: auto;
}

footer .menu li:last-child::before {
  display: none;
}
footer .menu li a {
  display: block;
  color: #ccc;
  font-size: 12px;
  font-weight: 700;
  padding: 15px;
}
footer .menu li a.white {
  color: white;
}

footer .info {
  margin-top: 30px;
  text-align: center;
}
footer .info span {
  margin-right: 20px;
  color: #999;
  font-size: 12px;
}
footer .info span:last-child {
  margin-right: 0;
}
footer .copyright {
  color: #999;
  font-size: 12px;
  text-align: center;
  margin-top: 12px;
}
footer .logo {
  margin: 30px auto 0;
}

#to-top {
  opacity: 0;
  position: fixed;
  bottom: 30px;
  right: 30px;
  z-index: 9;
  width: 42px;
  height: 42px;
  background-color: #333;
  color: #fff;
  border: 2px solid #fff;
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
