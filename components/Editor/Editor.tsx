import { Controlled as CodeMirror } from 'react-codemirror2'
import Script from 'next/script'

interface EditorProps {
  value: string
  onChange: (value: string) => void
  language: string
}

const Editor = ({ value, language, onChange }: EditorProps) => (
  <>
    <div className="editor">
      <CodeMirror
        value={value}
        onBeforeChange={(_, __, value) => onChange(value)}
        options={{
          mode: language,
          theme: 'dracula',
          lineNumbers: true,
        }}
      />
    </div>
    <style jsx>{`
      .editor {
        margin-top: 1rem;
        margin-bottom: 1rem;
        border: 1px solid var(--secondary-color);
      }
    `}</style>
  </>
)

export default Editor
