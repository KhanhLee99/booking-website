import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import IncDecFormQty from '../IncDecFormQty';
import './styles.scss';
import IncDecBedType from '../IncDecBedType';
import { useDispatch } from 'react-redux';
import { pushToDetailRooms, updateDetailRooms } from '../../../../app/reducer/hostSlice';

AddBeds.propTypes = {

};

function AddBeds(props) {
    const dispatch = useDispatch();
    const { number, bedTypes, detailRooms } = props;

    const [isHidden, setIsHidden] = useState(false);
    const [qtyDouble, setQtyDouble] = useState(0);
    const [qtyQueen, setQtyQueen] = useState(0);
    const [qtySingle, setQtySingle] = useState(0);
    const [qtySofa, setQtySofa] = useState(0);


    const handleAddBeds = () => {
        setIsHidden(!isHidden);
    }

    const handleInc = (type) => {
        const bed_type_item = {
            room: `Bed room ${number}`,
            detail: {
                bed_type_id: type,
                bed_count: 0
            }
        }

        if (type == 1) {
            bed_type_item.detail.bed_count = qtyDouble + 1;
            setQtyDouble(qtyDouble + 1);
        } else if (type == 2) {
            bed_type_item.detail.bed_count = qtyQueen + 1;
            setQtyQueen(qtyQueen + 1);
        } else if (type == 3) {
            bed_type_item.detail.bed_count = qtySingle + 1;
            setQtySingle(qtySingle + 1);
        } else if (type == 4) {
            bed_type_item.detail.bed_count = qtySofa + 1;
            setQtySofa(qtySofa + 1);
        }

        const idx = detailRooms.findIndex(({ name }) => name === `Bed room ${number}`);
        if (idx != -1) {

            const tmp = detailRooms[idx].bed_type;
            const index = tmp.findIndex(({ bed_type_id }) => bed_type_id === type);
            dispatch(updateDetailRooms(bed_type_item))
        } else {
            dispatch(pushToDetailRooms({
                name: `Bed room ${number}`,
                bed_type: [bed_type_item.detail]
            }))
        }
    }

    function qtyValue(index) {
        if (index == 1) return qtyDouble;
        if (index == 2) return qtyQueen;
        if (index == 3) return qtySingle;
        if (index == 4) return qtySofa;
    }

    return (
        <div className='add_bed_type_box'>
            <div className='add-bed-type'>
                <div className='bed-info'>
                    <p className='bed-name'>Bed room {number}</p>
                    <p className='bed-count'>0 beds</p>
                </div>
                <div className='add-bed-button'>
                    <button onClick={() => handleAddBeds()}>{isHidden ? 'Done' : 'Add beds'}</button>
                </div>
            </div>
            {isHidden ? (
                <div className='bed-types hidden-bed-types' >
                    {
                        bedTypes.map((item, index) => {
                            return (
                                <IncDecBedType
                                    key={index}
                                    type={index + 1}
                                    title={item.name}
                                    qty={
                                        qtyValue(index + 1)
                                    }
                                    handleInc={handleInc}
                                />
                            )
                        }
                        )
                    }
                </div>
            ) : null}

            {/* <div className="_npr1df" /> */}

        </div>
    );
}

export default AddBeds;