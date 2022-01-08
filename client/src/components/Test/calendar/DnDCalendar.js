import React, { useState, Children, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import EventDialog from './EventDialog';
import { useDispatch } from 'react-redux';
import { openEditEventDialog, openNewEventDialog } from '../../../app/reducer/eventSlice';
import CustomComponent from './CustomComponent';
import reservationApi from '../../../api/reservationApi';
import blockBookingApi from '../../../api/blockBookingApi';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useParams } from 'react-router-dom';


const localizer = momentLocalizer(moment);
// let allViews = Object.keys(Calendar.Views).map(k => Calendar.Views[k]);
const DnDCalendar = withDragAndDrop(Calendar);

DnDCalendarr.propTypes = {

};

function DnDCalendarr(props) {
    const { id } = useParams();
    const dispatch = useDispatch();

    const [blockList, setBlockList] = useState([]);
    const [loading, setLoading] = useState(false);

    const [events, setEvents] = useState([{
        start: moment().toDate(),
        end: moment().add(0, "days").toDate(),
        title: "Some title",
    }]);

    const onEventResize = (data) => {
        const { start, end } = data;
        setEvents(...events, events[0].start = start, events[0].end = end)
        return { events: [...events] };
    };

    const moveEvent = (data) => {
        console.log(data);
    };

    const eventStyleGetter = (event, start, end, isSelected) => {
        console.log(event);
        var backgroundColor = '#' + event.hexColor;
        var style = {
            backgroundColor: 'transparent',
            borderRadius: '0px',
            opacity: 0.8,
            color: 'black',
            border: '0px',
            display: 'block',
            fontSize: '30px',
            textAlign: 'center',
            marginLeft: '4px',

        };
        return {
            style: style
        };
    };



    useEffect(() => {
        const fetchReservations = async () => {
            const params = {
                month: '2022-01-01'
            }
            await reservationApi.getReservationInMonth(2, params).then(res => {
                const tmpEvent = [];
                res.data.data.forEach(element => tmpEvent.push({ start: element.checkin_date, end: element.checkout_date, title: element.username }));
                setEvents(tmpEvent)
            })
        }

        const getBlockInMonth = async () => {
            const params = {
                month: '01-01-2022'
            }
            await blockBookingApi.getBlockInMonth(id, params).then(res => {
                let tmp = [];
                res.data.data.forEach(item => tmp = tmp.concat(getDaysArray(new Date(item.start_date), new Date(item.end_date))));
                setBlockList(tmp);
            })
        }

        fetchReservations();
        getBlockInMonth();

        return () => {
            setEvents([]);
            setBlockList([]);
        }

    }, []);

    useState(() => {
    }, [blockList]);

    const getDaysArray = function (start, end) {
        for (var arr = [], dt = new Date(start); dt <= end; dt.setDate(dt.getDate() + 1)) {
            arr.push(new Date(dt));
        }
        return arr;
    };


    return (
        <div className="App">
            {loading ? <DnDCalendar
                localizer={localizer}
                components={{
                    dateCellWrapper: ({ children, value }) => {
                        return React.cloneElement(Children.only(children), {
                            style: {
                                backgroundColor: 'white',
                            },
                        });
                    },
                    dateHeader: () => (
                        <Skeleton height={30} />
                    )
                }}
                style={{ height: "100vh" }}
            /> : <DnDCalendar
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
                // views={allViews}
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
                }}
                step={60}
                style={{ height: "100vh" }}
                showMultiDayTimes
                onSelectEvent={event => {
                    dispatch(openEditEventDialog(event));
                }}
                onSelectSlot={slotInfo => {
                    dispatch(openNewEventDialog({
                        start: slotInfo.start.toLocaleString(),
                        end: slotInfo.end.toLocaleString()
                    }))
                }
                }
                monthDayCustomHeader={<CustomComponent />}
                eventPropGetter={(eventStyleGetter)}
            />}
            <EventDialog />
        </div>
    );
}

export default DnDCalendarr;

const CURRENT_DATE = moment().toDate();

// example implementation of a wrapper
const ColoredDateCellWrapper = ({ children, value }) =>

    React.cloneElement(Children.only(children), {
        style: {
            ...children.style,
            backgroundColor: value < CURRENT_DATE ? 'lightgreen' : 'lightblue',
        },
    });

    // {
    //     event?: ReactClass<any>,
    //     eventWrapper?: ReactClass<any>,
    //     dayWrapper?: ReactClass<any>,
    //     dateCellWrapper?: ReactClass<any>,
    //     toolbar?: ReactClass<any>,
    //     agenda?: {
    //       date?: ReactClass<any>,
    //       time?: ReactClass<any>,
    //       event?: ReactClass<any>
    //     },
    //     day?: {
    //       header?: ReactClass<any>,
    //       event?: ReactClass<any>
    //     },
    //     week?: {
    //       header?: ReactClass<any>,
    //       event?: ReactClass<any>
    //     },
    //     month?: {
    //       header?: ReactClass<any>,
    //       dateHeader?: ReactClass<any>,
    //       event?: ReactClass<any>
    //     }
    //   }