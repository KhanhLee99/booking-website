import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'
import moment from 'moment'
import events from 'events';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import * as ReactDOM from 'react-dom';
import { useDispatch } from 'react-redux';

const localizer = momentLocalizer(moment);

const DragAndDropCalendar = withDragAndDrop(Calendar);

// let allViews = Object.keys(Calendar.Views).map(k => Calendar.Views[k]);

TestBigCalendar.propTypes = {

};

const useStyles = makeStyles(theme => ({
    // root: {
    //     '& .rbc-header': {
    //         padding: '12px 6px',
    //         fontWeight: 600,
    //         fontSize: 14
    //     },
    //     '& .rbc-label': {
    //         padding: '8px 6px'
    //     },
    //     '& .rbc-today': {
    //         backgroundColor: 'transparent'
    //     },
    //     '& .rbc-header.rbc-today, & .rbc-month-view .rbc-day-bg.rbc-today': {
    //         borderBottom: '2px solid ' + theme.palette.secondary.main + '!important'
    //     },
    //     '& .rbc-month-view, & .rbc-time-view, & .rbc-agenda-view': {
    //         padding: 24,
    //         [theme.breakpoints.down('sm')]: {
    //             padding: 16
    //         },
    //         ...theme.mixins.border(0)
    //     },
    //     '& .rbc-agenda-view table': {
    //         ...theme.mixins.border(1),
    //         '& thead > tr > th': {
    //             ...theme.mixins.borderBottom(0)
    //         },
    //         '& tbody > tr > td': {
    //             padding: '12px 6px',
    //             '& + td': {
    //                 ...theme.mixins.borderLeft(1)
    //             }
    //         }
    //     },
    //     '& .rbc-time-view': {
    //         '& .rbc-time-header': {
    //             ...theme.mixins.border(1)
    //         },
    //         '& .rbc-time-content': {
    //             flex: '0 1 auto',
    //             ...theme.mixins.border(1)
    //         }
    //     },
    //     '& .rbc-month-view': {
    //         '& > .rbc-row': {
    //             ...theme.mixins.border(1)
    //         },
    //         '& .rbc-month-row': {
    //             ...theme.mixins.border(1),
    //             borderWidth: '0 1px 1px 1px!important',
    //             minHeight: 128
    //         },
    //         '& .rbc-header + .rbc-header': {
    //             ...theme.mixins.borderLeft(1)
    //         },
    //         '& .rbc-header': {
    //             ...theme.mixins.borderBottom(0)
    //         },
    //         '& .rbc-day-bg + .rbc-day-bg': {
    //             ...theme.mixins.borderLeft(1)
    //         }
    //     },
    //     '& .rbc-day-slot .rbc-time-slot': {
    //         ...theme.mixins.borderTop(1),
    //         opacity: 0.5
    //     },
    //     '& .rbc-time-header > .rbc-row > * + *': {
    //         ...theme.mixins.borderLeft(1)
    //     },
    //     '& .rbc-time-content > * + * > *': {
    //         ...theme.mixins.borderLeft(1)
    //     },
    //     '& .rbc-day-bg + .rbc-day-bg': {
    //         ...theme.mixins.borderLeft(1)
    //     },
    //     '& .rbc-time-header > .rbc-row:first-child': {
    //         ...theme.mixins.borderBottom(1)
    //     },
    //     '& .rbc-timeslot-group': {
    //         minHeight: 64,
    //         ...theme.mixins.borderBottom(1)
    //     },
    //     '& .rbc-date-cell': {
    //         padding: 8,
    //         fontSize: 16,
    //         fontWeight: 400,
    //         opacity: .5,
    //         '& > a': {
    //             color: 'inherit'
    //         }
    //     },
    //     '& .rbc-event': {
    //         borderRadius: 4,
    //         padding: '4px 8px',
    //         backgroundColor: theme.palette.primary.dark,
    //         color: theme.palette.primary.contrastText,
    //         boxShadow: theme.shadows[0],
    //         transitionProperty: 'box-shadow',
    //         transitionDuration: theme.transitions.duration.short,
    //         transitionTimingFunction: theme.transitions.easing.easeInOut,
    //         position: 'relative',
    //         '&:hover': {
    //             boxShadow: theme.shadows[2]
    //         }
    //     },
    //     '& .rbc-row-segment': {
    //         padding: '0 4px 4px 4px'
    //     },
    //     '& .rbc-off-range-bg': {
    //         backgroundColor: theme.palette.type === 'light' ? 'rgba(0,0,0,0.03)' : 'rgba(0,0,0,0.16)'
    //     },
    //     '& .rbc-show-more': {
    //         color: theme.palette.secondary.main,
    //         background: 'transparent'
    //     },
    //     '& .rbc-addons-dnd .rbc-addons-dnd-resizable-month-event': {
    //         position: 'static'
    //     },
    //     '& .rbc-addons-dnd .rbc-addons-dnd-resizable-month-event .rbc-addons-dnd-resize-month-event-anchor:first-child': {
    //         left: 0,
    //         top: 0,
    //         bottom: 0,
    //         height: 'auto'
    //     },
    //     '& .rbc-addons-dnd .rbc-addons-dnd-resizable-month-event .rbc-addons-dnd-resize-month-event-anchor:last-child': {
    //         right: 0,
    //         top: 0,
    //         bottom: 0,
    //         height: 'auto'
    //     }
    // },
    // addButton: {
    //     position: 'absolute',
    //     right: 12,
    //     top: 172,
    //     zIndex: 99
    // }
}));

function TestBigCalendar(props) {
    const dispatch = useDispatch();

    const classes = useStyles(props);
    const headerEl = useRef(null);

    const resizeEvent = (data) => {
        const { start, end } = data;

        this.setState((state) => {
            state.events[0].start = start;
            state.events[0].end = end;
            return { events: [...state.events] };
        });
    };

    const moveEvent = (data) => {
        console.log(data);
    };


    return (

        <div className={clsx(classes.root, "flex flex-col flex-auto relative")}>
            <div ref={headerEl} />
            <DragAndDropCalendar
                className="flex flex-1 container"
                selectable
                localizer={localizer}
                events={events}
                onEventDrop={moveEvent}
                resizable
                onEventResize={resizeEvent}
                defaultView="month"
                defaultDate={new Date(2018, 3, 1)}
                startAccessor="start"
                endAccessor="end"
                // views={allViews}
                step={60}
                showMultiDayTimes
            // components={{
            //     toolbar: (props) => {
            //         return headerEl.current ?
            //             ReactDOM.createPortal(
            //                 <CalendarHeader {...props} />,
            //                 headerEl.current
            //             ) : null;
            //     }
            // }}
            // onNavigate={handleNavigate}
            // onSelectEvent={event => {
            //     dispatch(Actions.openEditEventDialog(event));
            // }}
            // onSelectSlot={slotInfo => dispatch(Actions.openNewEventDialog({
            //     start: slotInfo.start.toLocaleString(),
            //     end: slotInfo.end.toLocaleString()
            // }))}
            />
            {/* <FuseAnimate animation="transition.expandIn" delay={500}>
                <Fab
                    color="secondary"
                    aria-label="add"
                    className={classes.addButton}
                    onClick={() => dispatch(Actions.openNewEventDialog({
                        start: new Date(),
                        end: new Date()
                    }))}
                >
                    <Icon>add</Icon>
                </Fab>
            </FuseAnimate> */}
            {/* <EventDialog /> */}
        </div>
    );
}

export default TestBigCalendar;