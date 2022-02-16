<template>
  <div class="app">
    <div class="app-main">
      <FullCalendar class="app-calendar" :options="calendarOptions">
      </FullCalendar>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import "@fullcalendar/core/vdom"; // solve problem with Vite
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useStore } from "src/store";
import { Cookies, useQuasar } from "quasar";

export default {
  components: {
    FullCalendar,
  },
  setup() {
    const $store = useStore();
    const $q = useQuasar();
    const accessToken = Cookies.get("access_token");
    let currentEvents = [];

    // // 이미 등록되어있는 이벤트는 eventSet에 추가(created)
    $store.dispatch("schedule/getEvent").catch(console.log);
    // let start_data = $store.state.schedule.events;
    // console.log("1qaz", start_data);

    // // 일정 생성하기
    const handleDateSelect = (arg) => {
      const now = new Date();
      if (arg.start <= now) {
        $q.dialog({
          title: "지난 시간입니다.",
          message: "당일 일정은 Day에서 이용해주세요!",
        }).onCancel(() => {
          // console.log('>>>> Cancel')
        });
      } else {
        $q.dialog({
          title: "일정 관리",
          message: "시간 설정은 Day에서 이용해주세요",
          prompt: {
            model: "",
            type: "text", // optional
          },
          cancel: true,
          persistent: true,
        })
          .onOk((data) => {
            let calendarApi = arg.view.calendar;
            calendarApi.addEvent({
              title: data,
              start: arg.start,
              end: arg.end,
              allDay: arg.allDay,
            });
            // create
            const create_data = {
              id: "",
              title: data,
              start: arg.start,
              end: arg.end,
              allDay: arg.allDay,
            };
            $store
              .dispatch("schedule/createEvent", create_data)
              .catch(console.log);
          })
          .onCancel(() => {
            // console.log('>>>> Cancel')
          })
          .onDismiss(() => {
            // console.log('I am triggered on both OK and Cancel')
          });
      }
    };

    // // 일정 삭제하기
    const handleEventClick = (arg) => {
      // console.log(arg.event);
      $q.dialog({
        title: "Delete Schedule",
        message: "일정을 삭제하시겠습니까?",
        cancel: true,
        persistent: true,
      }).onOk(() => {
        // backend를 통해 db에 있는 일정도 삭제
        const delete_data = {
          title: arg.event.title,
          start: arg.event.start,
          end: arg.event.end,
          allDay: arg.event.allDay,
        };
        console.log(arg.event.title, arg.event.start);
        $store.dispatch("schedule/deleteEvent", delete_data);
        arg.event.remove();
      });
    };

    // 등록되었을 배열에 추가, 일정이 바뀐 events들 확인 후 backend에 data 전달하고 배열에서 제거
    const changeEvent = (events) => {
      currentEvents = events;
      if (currentEvents.length === 1) {
        // all-day가 true인 경우 시간일정이 바뀌었다는 것이므로 update로 보내기
        for (let i = 0; i < currentEvents.length; i++) {
          const update_data = {
            title: currentEvents[i].title,
            start: currentEvents[i].start,
            end: currentEvents[i].end,
            allDay: currentEvents[i].allDay,
          };
          $store.dispatch("schedule/updateEvent", update_data);
        }
      }
      currentEvents = [];
    };
    // fullcalendar options
    const calendarOptions = {
      plugins: [
        timeGridPlugin,
        dayGridPlugin,
        interactionPlugin, // needed for dateClick
      ],
      headerToolbar: {
        left: "prev,next today", // 이전, 다음, 오늘로 이동하는 버튼
        center: "title", // 월-연도 표시
        right: "dayGridMonth timeGridDay", // 월, 주, 일 frame
      },
      buttonText: {
        today: "Today",
        month: "Month",
        day: "Day",
      },
      initialView: "dayGridMonth", // 첫 화면 default 값이 오늘 날짜
      displayEventEnd: true,
      duration: { hours: 1 },
      forceEventDuration: true,
      expandRows: true,
      selectOverlap: false,
      slotEventOverlap: false, // 동일시간 대 불가능
      editable: true, // 수정(day에서 drag로 시간 늘이고 줄이기 가능)
      selectable: true, // select한 일자 drag 가능
      dayMaxEvents: true, // event 갯수가 많아서 칸 초과했을 때 +개수로 표기
      nowIndicator: true, // 현재 시간 마크
      navLinks: true, // 날짜를 선택하면 Day 캘린더나 Week 캘린더로 링크
      events: $store.state.schedule.events,
      //   [
      //     {
      //       id: 1,

      //       title: "Test1",

      //       start: "2022-02-17T04:30:00.000Z",
      //       end: "2022-02-17T05:30:00.000Z",
      //     },

      //     {
      //       id: 2,

      //       title: "Test2",

      //       start: "2022-02-18T07:00:00.000Z",

      //       end: "2022-02-18T07:00:00.000Z",
      //     },
      //   ],
      select: handleDateSelect, // 날짜 선택 후 event 등록
      eventClick: handleEventClick,
      eventsSet: changeEvent, // 등록한 일정, 변경된 일정 check
    };

    return {
      calendarOptions,
    };
  },
};
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
