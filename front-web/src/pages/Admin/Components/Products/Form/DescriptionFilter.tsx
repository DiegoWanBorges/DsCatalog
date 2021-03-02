import { Control, Controller } from "react-hook-form"
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import {FormState} from './'
import Toolbar from "./Toolbar";

type Props ={
    control: Control<FormState>;
}

const DescriptionFilter = ({ control }:Props) => {
    return (
        <>
            <Controller
                name="description"
                control={control}
                defaultValue=""
                render={({ value,onChange }) => (
                    <Editor
                        toolbarClassName="toolbar-container"
                        editorClassName="editor-container"
                        editorState={value}
                        onEditorStateChange={onChange}
                        toolbar={Toolbar}
                    />
                )}
            />

        </>
    )
}

export default DescriptionFilter;