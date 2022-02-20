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
import HeaderHost from '../../../features/Host/components/HeaderHost';
import './styles.scss';
import CalendarLoading from './CalendarLoading';
import { getDaysArray } from '../../../@helper/helper';


const localizer = momentLocalizer(moment);
// let allViews = Object.keys(Calendar.Views).map(k => Calendar.Views[k]);
const DnDCalendar = withDragAndDrop(Calendar);

DnDCalendarr.propTypes = {

};

function DnDCalendarr(props) {
    const { id } = useParams();
    const dispatch = useDispatch();

    const [blockList, setBlockList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [events, setEvents] = useState([]);
    const [date, setDate] = useState(moment(moment().toDate()).format('YYYY-MM-DD'));

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
            try {
                const params = {
                    month: date
                }
                // setLoading(true);
                await reservationApi.getReservationInMonth(id, params).then(res => {
                    const tmpEvent = [];
                    res.data.data.forEach(element => tmpEvent.push({ start: element.checkin_date, end: element.checkout_date, title: element.username }));
                    setEvents(tmpEvent)
                })
            } catch (err) {
                console.log(err.message)
            }
        }

        const getBlockInMonth = async () => {
            try {
                const params = {
                    month: date
                }
                setLoading(true);
                await blockBookingApi.getBlockInMonth(id, params).then(res => {
                    let tmp = [];
                    res.data.data.forEach(item => tmp = tmp.concat(getDaysArray(new Date(item.start_date), new Date(item.end_date))));
                    setBlockList(tmp);
                    setLoading(false);
                })
            } catch (err) {
                console.log(err.message)
            }
        }

        fetchReservations();
        getBlockInMonth();

        return () => {
            setEvents([]);
            setBlockList([]);
        }

    }, [date]);

    useState(() => {
    }, [blockList]);

    // const getDaysArray = function (start, end) {
    //     for (var arr = [], dt = new Date(start); dt <= end; dt.setDate(dt.getDate() + 1)) {
    //         arr.push(new Date(dt));
    //     }
    //     return arr;
    // };

    const onNavigate = (date, view) => {
        setDate(moment(date).format('YYYY-MM-DD'));
    }


    return (
        <div id="wrapper" style={{ background: '#f6f6f6' }}>
            <HeaderHost />
            <div className='container' style={{ marginTop: '100px' }}>
                {/* {loading ?
                    // <DnDCalendar
                    //     localizer={localizer}
                    //     components={{
                    //         dateCellWrapper: ({ children, value }) => {
                    //             return React.cloneElement(Children.only(children), {
                    //                 style: {
                    //                     backgroundColor: 'white',
                    //                 },
                    //             });
                    //         },
                    //         dateHeader: () => (
                    //             <Skeleton height={30} />
                    //         )
                    //     }}
                    //     style={{ height: "100vh" }}
                    // />
                    <>Loading</>
                    : */}
                <div className={loading ? 'filtering' : null}>

                    <CalendarLoading
                        events={events}
                        blockList={blockList}
                        onNavigate={onNavigate}
                        moveEvent={moveEvent}
                        onEventResize={onEventResize}
                    />
                </div>

                {/* } */}
                <EventDialog
                    id={id}
                />
            </div>
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