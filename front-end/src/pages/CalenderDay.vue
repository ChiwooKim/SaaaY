<template>
  <div class="subcontent">
    <navigation-bar @today="onToday" @prev="onPrev" @next="onNext" />

    <div class="row justify-center">
      <div style="display: flex; max-width: 800px; width: 100%; height: 800px">
        <q-calendar-day
          ref="calendar"
          locale="ko-kr"
          v-model="selectedDate"
          :hour24-format="hour24"
          bordered
          animated
          :interval-minutes="15"
          :interval-count="96"
          :interval-height="15"
          time-clicks-clamped
          :selected-dates="selectedDates"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { QCalendarDay } from '@quasar/quasar-ui-qcalendar/src/index.js';
import {
  copyTimestamp,
  getDateTime,
} from '@quasar/quasar-ui-qcalendar/src/index.js';
import '@quasar/quasar-ui-qcalendar/src/QCalendarVariables.sass';
import '@quasar/quasar-ui-qcalendar/src/QCalendarTransitions.sass';
import '@quasar/quasar-ui-qcalendar/src/QCalendarDay.sass';
import { defineComponent } from 'vue';
import NavigationBar from '../components/CalendarBar.vue';

let today = new Date();
let year = today.getFullYear(); // 년도
let month = today.getMonth() + 1; // 월
let date = today.getDate(); // 일

export default defineComponent({
  name: 'DayHour24Format',
  components: {
    NavigationBar,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    QCalendarDay,
  },
  data() {
    return {
      // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
      selectedDate: year + '-' + month + '-' + date,
      hour24: true,
      selectedDates: [],
    };
  },
  methods: {
    onToggleTime({ scope }) {
      console.log('click-time (scope)', scope);
      if (scope === undefined) {
        return;
      }
      // make a copy of the timestamp

      const ts: Timestamp = copyTimestamp(scope.timestamp);
      // get date with time

      const t = getDateTime(ts);
      // toggle to/from array
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      if (this.selectedDates.includes(t)) {
        // remove the date
        for (let i = 0; i < this.selectedDates.length; ++i) {
          if (t === this.selectedDates[i]) {
            this.selectedDates.splice(i, 1);
            break;
          }
        }
      } else {
        // add the date if not outside
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        if (scope.outside !== true) {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          this.selectedDates.push(t);
        }
      }
    },
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
  },
});
</script>
