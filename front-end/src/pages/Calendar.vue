<template>
  <div class="app">
    <div class="app-main">
      <FullCalendar class="app-calendar" :options="calendarOptions">
      </FullCalendar>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import '@fullcalendar/core/vdom'; // solve problem with Vite
import FullCalendar, {
  CalendarOptions,
  EventApi,
  DateSelectArg,
  EventClickArg,
} from '@fullcalendar/vue3';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';

// 일정 생성
let eventGuid = 0;
// eslint-disable-next-line prefer-const
function createEventId() {
  return String(eventGuid++);
}

const Calendar = defineComponent({
  components: {
    FullCalendar,
  },
  data() {
    return {
      calendarOptions: {
        plugins: [
          dayGridPlugin,
          timeGridPlugin,
          interactionPlugin, // needed for dateClick
          listPlugin,
        ],
        headerToolbar: {
          left: 'prev,next today', // 이전, 다음, 오늘로 이동하는 버튼
          center: 'title', // 월-연도 표시
          right: 'dayGridMonth,timeGridDay,listWeek', // 월, 주, 일 frame
        },
        initialView: 'dayGridMonth', // 첫 화면 default 값이 오늘 날짜
        expandRows: true,
        editable: true, // 수정(day에서 drag로 시간 늘이고 줄이기 가능)
        selectable: true, // select한 일자 drag 가능
        dayMaxEvents: true, // event 갯수가 많아서 칸 초과했을 때 +개수로 표기
        nowIndicator: true, // 현재 시간 마크
        locale: 'ko', // 한국어 설정
        navLinks: true, // 날짜를 선택하면 Day 캘린더나 Week 캘린더로 링크
        select: this.handleDateSelect, // 날짜 선택 후 event 등록
        eventClick: this.handleEventClick, // 등록된 event 클릭 했을때 event(현재 delete)
        eventsSet: this.handleEvents, // event가 등록되거나 변경 되었을 때
      } as CalendarOptions,
      currentEvents: [] as EventApi[],
    };
  },
  methods: {
    handleDateSelect(selectInfo: DateSelectArg) {
      let title = prompt('Please enter a new title for your event');
      let calendarApi = selectInfo.view.calendar;

      calendarApi.unselect(); // clear date selection

      if (title) {
        calendarApi.addEvent({
          id: createEventId(),
          title,
          start: selectInfo.startStr,
          end: selectInfo.endStr,
          allDay: selectInfo.allDay,
        });
      }
    },

    handleEventClick(clickInfo: EventClickArg) {
      if (
        confirm(
          `Are you sure you want to delete the event '${clickInfo.event.title}'`
        )
      ) {
        clickInfo.event.remove();
      }
    },
    handleEvents(events: EventApi[]) {
      this.currentEvents = events;
    },
  },
});

export default Calendar;
</script>

<style lang="css">
.app {
  display: flex;
  min-height: 100%;
  font-family: Arial, Helvetica Neue, Helvetica, sans-serif;
  font-size: 14px;
}

.app-main {
  flex-grow: 1;
  padding: 3em;
}

.fc {
  /* the calendar root */
  max-width: 1100px;
  margin: 0 auto;
}
</style>
