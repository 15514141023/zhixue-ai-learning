const CHAT_KEY = 'zhixue_chat_messages'

const defaultMessages = [
  {
    role: 'ai',
    content:
      '你好，我是你的 AI 学习助手。我可以帮你制定学习路线、拆解项目任务、解释代码、生成复习计划。你可以先告诉我：你现在想学什么？',
  },
]

// 获取聊天记录
export function getChatMessages() {
  try {
    const savedMessages = localStorage.getItem(CHAT_KEY)

    if (savedMessages) {
      return JSON.parse(savedMessages)
    }

    return defaultMessages
  } catch (error) {
    console.error('获取聊天记录失败：', error)
    return defaultMessages
  }
}

// 保存聊天记录
export function saveChatMessages(messages) {
  try {
    localStorage.setItem(CHAT_KEY, JSON.stringify(messages))
  } catch (error) {
    console.error('保存聊天记录失败：', error)
  }
}

// 清空聊天记录
export function clearChatMessages() {
  try {
    localStorage.removeItem(CHAT_KEY)
  } catch (error) {
    console.error('清空聊天记录失败：', error)
  }
}