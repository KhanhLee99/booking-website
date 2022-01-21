import React, { Children } from 'react';
import PropTypes from 'prop-types';
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";

CalendarLoading.propTypes = {

};
const localizer = momentLocalizer(moment);
// let allViews = Object.keys(Calendar.Views).map(k => Calendar.Views[k]);
const DnDCalendar = withDragAndDrop(Calendar);

function CalendarLoading(props) {
    const { events, blockList, onNavigate, moveEvent, onEventResize } = props;
    return (
        <DnDCalendar
            selectable
            defaultDate={moment().toDate()}
            defaultView="month"
            events={events}
            localizer={localizer}
            onEventDrop={moveEvent} // move
            onEventResize={onEventResize}
            resizable
            startAccessor="start"
            endAccessor="end"
            views={{ month: true }}
            components={{
                dateCellWrapper: ({ children, value }) => {
                    let index = blockList.findIndex(item => (item.getDate() === value.getDate() && item.getFullYear() === value.getFullYear() && item.getMonth() === value.getMonth()));
                    return React.cloneElement(Children.only(children), {
                        style: {
                            ...children.style,
                            backgroundColor: index != -1 ? 'red' : null,
                        },
                    });
                },
                // dateHeader: (value) => {
                //     return loading ? <Skeleton height={30} /> : <>{value.label}</>
                // }
            }}
            // step={60}
            style={{ height: "100vh" }}
            showMultiDayTimes
            onSelectEvent={event => {
                // dispatch(openEditEventDialog(event));
            }}
            onSelectSlot={slotInfo => {
                // dispatch(openNewEventDialog({
                //     start: slotInfo.start,
                //     end: slotInfo.end
                // }))
            }
            }
            // monthDayCustomHeader={<CustomComponent />}
            // eventPropGetter={(eventStyleGetter)}
            onNavigate={onNavigate}
        />
    );
}

export default CalendarLoading;