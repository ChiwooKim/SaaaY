<template>
  <div class="subcontent">
    <h2 class="row justify-center">{{ now }}</h2>

    <div class="row justify-center">
      <div style="display: flex; max-width: 1200px; width: 100%">
        <q-calendar-month
          ref="calendar"
          v-model="selectedDate"
          :day-min-height="120"
          animated
          bordered
          locale="ko-kr"
          @change="onChange"
          @moved="onMoved"
          @click-date="onClickDate"
          @click-day="onClickDay"
          @click-head-day="onClickHeadDay"
        />
      </div>
    </div>
    <calendar-bar @prev="onPrev" @today="onToday" @next="onNext" />
  </div>
</template>

<script>
import { QCalendarMonth } from '@quasar/quasar-ui-qcalendar/src/index.js';
import '@quasar/quasar-ui-qcalendar/src/QCalendarVariables.sass';
import '@quasar/quasar-ui-qcalendar/src/QCalendarTransitions.sass';
import '@quasar/quasar-ui-qcalendar/src/QCalendarMonth.sass';

import { defineComponent } from 'vue';
import CalendarBar from '../components/CalendarBar.vue';

const today = new Date();
const year = today.getFullYear(); // 년도
const month = today.getMonth() + 1; // 월
const date = today.getDate(); // 일
const month_english = today.toLocaleString('default', { month: 'long' });

export default defineComponent({
  name: 'MonthDark',
  components: {
    CalendarBar,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    QCalendarMonth,
  },
  data() {
    return {
      // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
      selectedDate: year + '-' + month + '-' + date,
      // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
      now: year + '년 ' + month_english,
    };
  },
  methods: {
    onToday() {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      this.$refs.calendar.moveToToday();
    },
    onPrev() {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      this.$refs.calendar.prev();
    },
    onNext() {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      this.$refs.calendar.next();
    },
    onMoved(data) {
      // 월 이동할 때<이전, 다음 페이지 눌렀을 때>
      console.log('onMoved', data);
    },
    onChange(data) {
      // 달력이 변경될 때
      console.log('onChange', data);
    },
    onClickDate(data) {
      // calendar의 날짜(숫자) 클릭했을 때
      console.log('onClickDate', data);
    },
    onClickDay(data) {
      // calendar의 날짜(공백) 부분 클릭했을 때
      console.log('onClickDay', data);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      // const date_data = data.scope.timestamp.date;
      // console.log(date_data);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      // void this.$router.push({ path: '/day', params: { pickDate: date_data } });
    },
    onClickHeadDay(data) {
      // 요일 클릭
      console.log('onClickHeadDay', data);
    },
  },
});
</script>
