'use client'

export default function TitleInput({className}: {className?: string}) {
  return (
    <input
      className={`${className}`}
      type="text"
      name="title"
      placeholder="제목을 입력하세요"
      onKeyDown={(event) => {
        if (event.key === 'Enter') {
          event.preventDefault();
        }
      }}
    />
  )
}