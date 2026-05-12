function ChatMessage({ role, content }) {
  const isUser = role === 'user'

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[75%] rounded-3xl px-5 py-4 leading-7 ${
          isUser
            ? 'bg-blue-600 text-white rounded-br-md'
            : 'bg-white text-gray-800 shadow rounded-bl-md'
        }`}
      >
        <div className="text-sm font-semibold mb-1">
          {isUser ? '我' : '智学 AI'}
        </div>
        <div className="whitespace-pre-line">{content}</div>
      </div>
    </div>
  )
}

export default ChatMessage