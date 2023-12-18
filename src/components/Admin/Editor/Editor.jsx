import React, { useEffect, useState } from 'react'
import { useQuill } from 'react-quilljs'
import BlotFormatter from 'quill-blot-formatter'
import 'quill/dist/quill.snow.css'
import { useDebounce } from '../../../hooks/useDebounce'

const Editor = ({ onContentChange, initialContent }) => {
    const [editorContent, setEditorContent] = useState('')
    const { quill, quillRef, Quill } = useQuill({
        modules: { blotFormatter: {} }
    })

    if (Quill && !quill) {
        Quill.register('modules/blotFormatter', BlotFormatter)
    }

    // Sử dụng debounce để tránh spamming sự thay đổi
    const debouncedContent = useDebounce(editorContent, 500)

    useEffect(() => {
        // Gọi hàm onContentChange khi giá trị đã được debounce
        onContentChange(debouncedContent)
    }, [debouncedContent, onContentChange])

    useEffect(() => {
        if (quill) {
            quill.on('text-change', (delta, oldContents) => {
                const htmlContent = quill.root.innerHTML
                setEditorContent(htmlContent)
            })

            // Set the initial content when the Quill editor is ready
            if (initialContent) {
                quill.clipboard.dangerouslyPasteHTML(initialContent)
            }
        }
    }, [quill, initialContent])

    return (
        <div>
            <div ref={quillRef} />
        </div>
    )
}

export default Editor
