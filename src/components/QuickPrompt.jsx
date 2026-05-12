function QuickPrompt({ text, setInput }) {
  return (
    <button
      onClick={() => setInput(text)}
      className="px-4 py-2 bg-gray-100 text-gray-600 rounded-full text-sm hover:bg-blue-50 hover:text-blue-600 transition"
    >
      {text}
    </button>
  )
}

export default QuickPrompt