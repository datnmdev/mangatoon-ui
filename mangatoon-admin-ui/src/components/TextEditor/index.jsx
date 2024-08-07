import { Editor } from "@tinymce/tinymce-react";

function TextEditor({
    value = '',
    height = 240,
    placeholder,
    disabled = false,
    onChange
}) {
    return (
        <div className="h-[240px]">
            <Editor
                apiKey='5xrrong39ll877mk6qiv7lpczyhxkalmp62f9o36f6nfd9r2'
                value={value}
                init={{
                    height,
                    menubar: false,
                    placeholder,
                    plugins: [
                        'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                        'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                        'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount',
                    ],
                    toolbar: 'undo redo | blocks | ' +
                        'bold italic forecolor | alignleft aligncenter ' +
                        'alignright alignjustify | bullist numlist outdent indent | ' +
                        'removeformat | link image | help',
                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                }}
                onEditorChange={onChange}
                disabled={disabled}
            />
        </div>
    )
}

export default TextEditor