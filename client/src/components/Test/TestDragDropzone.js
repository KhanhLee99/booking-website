import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDropzone } from 'react-dropzone'
import listingApi from '../../api/listingApi';
import { uuid } from "uuidv4";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

TestDragDropzone.propTypes = {

};

const onDragEnd = (result, columns, setColumns) => {
    if (!result.destination) return;
    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
        const sourceColumn = columns[source.droppableId];
        const destColumn = columns[destination.droppableId];
        const sourceItems = [...sourceColumn.items];
        const destItems = [...destColumn.items];
        const [removed] = sourceItems.splice(source.index, 1);
        destItems.splice(destination.index, 0, removed);
        setColumns({
            ...columns,
            [source.droppableId]: {
                ...sourceColumn,
                items: sourceItems
            },
            [destination.droppableId]: {
                ...destColumn,
                items: destItems
            }
        });
    } else {
        const column = columns[source.droppableId];
        const copiedItems = [...column.items];
        const [removed] = copiedItems.splice(source.index, 1);
        copiedItems.splice(destination.index, 0, removed);
        setColumns({
            ...columns,
            [source.droppableId]: {
                ...column,
                items: copiedItems
            }
        });
    }
};

function TestDragDropzone(props) {


    const [files, setFiles] = useState([]);
    const [params, setParams] = useState(new FormData());
    const [photos, setPhotos] = useState([]);
    const [columns, setColumns] = useState({
        ["123"]: {
            items: []
        },
    });

    const { getRootProps, getInputProps } = useDropzone({
        accept: 'image/*',
        onDrop: acceptedFiles => {

            const uploaders = acceptedFiles.map(file =>
                Object.assign(file, {
                    preview: URL.createObjectURL(file)
                })
            )
            setFiles(files.concat(uploaders));
        }
    });

    // photos upload
    const thumbs = files.map(file => (
        <div style={thumb} key={file.name}>
            <div style={thumbInner}>
                <img
                    src={file.preview}
                    style={img}
                />
            </div>
        </div>
    ));

    // photos added
    const defaultThumbs = photos.map(photo => (
        <div style={thumb} key={photo.id}>
            <div style={thumbInner}>
                <img
                    src={photo.photo_url}
                    style={img}
                />
            </div>
        </div>
    ))

    useEffect(() => {
        // Make sure to revoke the data uris to avoid memory leaks
        files.forEach(file => URL.revokeObjectURL(file.preview));
    }, [files]);

    useEffect(() => {
        const fetchListingDetail = async () => {
            await listingApi.getListingById(101).then(res => {
                let tmp = res.data.data.photos;
                tmp.forEach(item => item.id = item.id.toString())
                setPhotos(res.data.data.photos);
                setColumns({
                    ["123"]: {
                        items: tmp
                    },
                })
            });
        }

        fetchListingDetail();

        return () => {
            setPhotos([]);
        }
    }, []);

    return (

        <div className='row'>
            <DragDropContext
                onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
            >
                {Object.entries(columns).map(([columnId, column], index) => {
                    return (
                        <div
                            className="add-listing-section"
                            key={columnId}
                        >
                            <Droppable droppableId={columnId} key={columnId}>
                                {(provided, snapshot) => {
                                    return (
                                        <div
                                            className="submit-section"
                                            {...provided.droppableProps}
                                            ref={provided.innerRef}
                                        >
                                            <aside style={thumbsContainer}>
                                                {column.items.map((item, index) => {
                                                    return (
                                                        <Draggable
                                                            key={item.id}
                                                            draggableId={item.id}
                                                            index={index}
                                                        >
                                                            {(provided, snapshot) => {
                                                                return (
                                                                    <div style={thumbInner}
                                                                        key={item.id}
                                                                        ref={provided.innerRef}
                                                                        {...provided.draggableProps}
                                                                        {...provided.dragHandleProps}
                                                                    >
                                                                        <img
                                                                            src={item.photo_url}
                                                                            style={img}
                                                                        />
                                                                    </div>
                                                                );
                                                            }}
                                                        </Draggable>
                                                    );
                                                })}
                                            </aside>

                                            {provided.placeholder}
                                        </div>
                                    );
                                }}
                            </Droppable>
                        </div>
                        // </div>
                    );
                })}
            </DragDropContext>
        </div>
    );
}

export default TestDragDropzone;

const thumbsContainer = {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    marginTop: 16
};

const thumb = {
    display: 'inline-flex',
    borderRadius: 2,
    border: '1px solid #eaeaea',
    marginBottom: 10,
    marginRight: 10,
    width: 120,
    height: 140,
    padding: 4,
    boxSizing: 'border-box',
};

const thumbInner = {
    display: 'flex',
    minWidth: 0,
    overflow: 'hidden'
};

const img = {
    display: 'block',
    width: 'auto',
    // height: '100%',
    height: '200px',
    width: '200px',
    userSelect: "none",
};