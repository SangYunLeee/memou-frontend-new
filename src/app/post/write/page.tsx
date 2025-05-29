'use client'
import SlateEditorComponent from "./_component/SlateEditor";

export default function WritePage() {
  return (
    <div className="flex flex-col gap-4 border border-gray-300 p-6 max-w-4xl mx-auto w-full min-h-[73vh]">
      <input
        className="w-full h-10 border-b-1 border-gray-300 focus:outline-none text-[1.3rem]"
        type="text"
        name="title"
        placeholder="제목을 입력하세요"
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            event.preventDefault();
          }
        }}
      />
      <SlateEditorComponent className="flex-1 focus:outline" />
    </div>
  );
}
