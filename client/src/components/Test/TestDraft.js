import React from 'react';
import PropTypes from 'prop-types';
import { Editor, EditorState } from "draft-js";
import "draft-js/dist/Draft.css";

TestDraft.propTypes = {

};

function TestDraft(props) {
    const [editorState, setEditorState] = React.useState(() =>
        EditorState.createEmpty()
    );

    const editor = React.useRef(null);
    function focusEditor() {
        editor.current.focus();
    }
    return (
        <div
            style={{ border: "1px solid black", minHeight: "6em", cursor: "text" }}
            onClick={focusEditor}
        >
            <Editor
                ref={editor}
                editorState={editorState}
                onChange={setEditorState}
                placeholder="Write something!"
            />
        </div>
    );
}

export default TestDraft;