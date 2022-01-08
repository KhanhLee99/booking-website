import React, { useCallback, useEffect } from 'react';
import { TextField, Button, Dialog, DialogActions, DialogContent, Icon, IconButton, Typography, Toolbar, AppBar, FormControlLabel, Switch } from '@material-ui/core';
// import FuseUtils from '@fuse/FuseUtils';
import useForm from './useForm';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { closeEditEventDialog, closeNewEventDialog } from '../../../app/reducer/eventSlice';
// import * as Actions from './store/actions';
import './eventDialog.scss';
import blockBookingApi from '../../../api/blockBookingApi';

const defaultFormState = {
    id: 1,
    title: '',
    allDay: true,
    start: new Date(),
    end: new Date(),
    desc: ''
};

function EventDialog(props) {
    const dispatch = useDispatch();
    const eventDialog = useSelector((state) => state.eventSlice.eventDialog);

    const { form, handleChange, setForm } = useForm(defaultFormState);
    let start = moment(form.start).format(moment.HTML5_FMT.DATETIME_LOCAL_SECONDS);
    let end = moment(form.end).format(moment.HTML5_FMT.DATETIME_LOCAL_SECONDS);

    const initDialog = useCallback(
        () => {
            /**
             * Dialog type: 'edit'
             */
            if (eventDialog.type === 'edit' && eventDialog.data) {
                setForm({ ...eventDialog.data });
            }

            /**
             * Dialog type: 'new'
             */
            if (eventDialog.type === 'new') {
                setForm({
                    ...defaultFormState,
                    ...eventDialog.data,
                    id: 1
                });
            }
        },
        [eventDialog.data, eventDialog.type, setForm],
    );

    useEffect(() => {
        /**
         * After Dialog Open
         */
        console.log(eventDialog.props);
        if (eventDialog.props.open) {
            initDialog();
        }
    }, [eventDialog.props.open, initDialog]);

    function closeComposeDialog() {
        eventDialog.type === 'edit' ? dispatch(closeEditEventDialog()) : dispatch(closeNewEventDialog());
    }

    function canBeSubmitted() {
        return (
            form.title.length > 0
        );
    }

    async function handleSubmit(event) {

        event.preventDefault();


        if (eventDialog.type === 'new') {
            const params = {
                start_date: form.start,
                end_date: form.end,
                note: form.desc,
                listing_id: 1
            }
            await blockBookingApi.blockBooking(params).then(res => {
                console.log(res);
            });
            console.log(form)

            // dispatch(Actions.addEvent(form));
        }
        // else {
        //     dispatch(Actions.updateEvent(form));
        // }
        // closeComposeDialog();
    }

    function handleRemove() {
        // dispatch(Actions.removeEvent(form.id));
        // closeComposeDialog();
    }

    return (
        <Dialog {...eventDialog.props} onClose={closeComposeDialog} fullWidth maxWidth="xs" component="form">


            <AppBar position="static">
                <Toolbar className="flex w-full">
                    <Typography variant="subtitle1" color="inherit">
                        {eventDialog.type === 'new' ? 'New Event' : 'Edit Event'}
                    </Typography>
                </Toolbar>
            </AppBar>

            <form noValidate onSubmit={handleSubmit}>
                <DialogContent classes={{ root: "p-16 pb-0 sm:p-24 sm:pb-0" }}>
                    <TextField
                        id="title"
                        label="Title"
                        className="mt-8 mb-16 k-title-tf"
                        InputLabelProps={{
                            shrink: true
                        }}
                        inputProps={{
                            max: end
                        }}
                        name="title"
                        value={form.title}
                        onChange={handleChange}
                        variant="outlined"
                        autoFocus
                        required
                        fullWidth
                    />

                    {/* <FormControlLabel
                        className="mt-8 mb-16"
                        label="All Day"
                        control={
                            <Switch
                                checked={form.allDay}
                                id="allDay"
                                name="allDay"
                                onChange={handleChange}
                            />
                        } /> */}

                    <TextField
                        id="start"
                        name="start"
                        label="Start"
                        type="datetime-local"
                        className="mt-8 mb-16"
                        InputLabelProps={{
                            shrink: true
                        }}
                        inputProps={{
                            max: end
                        }}
                        value={start}
                        onChange={handleChange}
                        variant="outlined"
                        fullWidth
                    />

                    <TextField
                        id="end"
                        name="end"
                        label="End"
                        type="datetime-local"
                        className="mt-8 mb-16"
                        InputLabelProps={{
                            shrink: true
                        }}
                        inputProps={{
                            min: start
                        }}
                        value={end}
                        onChange={handleChange}
                        variant="outlined"
                        fullWidth
                    />

                    <TextField
                        className="mt-8 mb-16 k-desc-tf"
                        id="desc" label="Description"
                        type="text"
                        name="desc"
                        value={form.desc}
                        onChange={handleChange}
                        multiline rows={5}
                        variant="outlined"
                        fullWidth
                    />
                </DialogContent>

                {eventDialog.type === 'new' ? (
                    <DialogActions className="justify-between pl-8 sm:pl-16">
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            disabled={!canBeSubmitted()}
                        >
                            Add
                        </Button>
                    </DialogActions>
                ) : (
                    <DialogActions className="justify-between pl-8 sm:pl-16">
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            disabled={!canBeSubmitted()}
                        > Save
                        </Button>
                        <IconButton onClick={handleRemove}>
                            <Icon>delete</Icon>
                        </IconButton>
                    </DialogActions>
                )}
            </form>
        </Dialog>
    );
}

export default EventDialog;
