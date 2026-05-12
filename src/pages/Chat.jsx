import { useState, useRef } from "react"
import Layout from "../components/Layout"
import ChatMessage from "../components/ChatMessage"
import QuickPrompt from "../components/QuickPrompt"
import { quickPrompts } from "../mock/MockData"

import {
  getChatMessages,
  saveChatMessages,
  clearChatMessages,
} from "../services/chatService"

import {
  addPlanByTitle,
  deletePlanByKeyword,
  completePlanByKeyword,
  getPlanProgress,
} from "../services/planService"

function Chat() {
  const [messages, setMessages] = useState(getChatMessages)

  const [input, setInput] = useState("")

  const messageEndRef = useRef(null)

  function sendMessage() {
    const text = input.trim()

    if (!text) return

    const userMessage = {
      role: "user",
      content: text,
    }

    const commandReply = handleAiCommand(text)

    const aiMessage = {
      role: "ai",
      content: commandReply || generateMockReply(text),
    }

    const newMessages = [...messages, userMessage, aiMessage]

    setMessages(newMessages)
    saveChatMessages(newMessages)
    setInput("")

    setTimeout(() => {
      messageEndRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "end",
      })
    }, 0)
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      sendMessage()
    }
  }

  function clearChat() {
    const defaultMessages = [
      {
        role: "ai",
        content: "聊天记录已清空。你可以重新告诉我：你现在想学什么？",
      },
    ]

    clearChatMessages()
    setMessages(defaultMessages)
  }

  return (
    <Layout>
      <div className="h-[calc(100vh-64px)] flex flex-col bg-white rounded-3xl shadow overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-100 bg-white flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">AI 学习助手</h2>
            <p className="text-gray-500 mt-1">
              和 AI 对话，生成学习路线、任务计划、代码解释和复习建议。
            </p>
          </div>

          <button
            onClick={clearChat}
            className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-xl hover:bg-red-100 hover:text-red-600 transition"
          >
            清空聊天
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-6 bg-gray-50">
          <div className="max-w-4xl mx-auto space-y-5">
            {messages.map((msg, index) => (
              <ChatMessage key={index} role={msg.role} content={msg.content} />
            ))}

            <div ref={messageEndRef}></div>
          </div>
        </div>

        <div className="border-t border-gray-100 bg-white px-6 py-5">
          <div className="max-w-4xl mx-auto">
            <div className="flex gap-3">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="例如：我想学 React，帮我安排一周学习计划"
                className="flex-1 border border-gray-200 rounded-2xl px-5 py-4 outline-none focus:border-blue-500"
              />

              <button
                onClick={sendMessage}
                className="px-6 py-4 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 transition"
              >
                发送
              </button>
            </div>

            <div className="flex flex-wrap gap-2 mt-4">
              {quickPrompts.map((item) => (
                <QuickPrompt key={item} text={item} setInput={setInput} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

function handleAiCommand(question) {
  const text = question.trim()

  // 1. 新增学习计划：xxx
  if (text.startsWith("新增学习计划：") || text.startsWith("新增学习计划:")) {
    const title = text
      .replace("新增学习计划：", "")
      .replace("新增学习计划:", "")
      .trim()

    if (!title) {
      return "你想新增学习计划，但是没有写计划内容。格式可以这样：新增学习计划：学习 useEffect"
    }

    const { newPlan } = addPlanByTitle(title)

    return `已帮你新增学习计划：

「${newPlan.title}」

你可以去 Training 页面查看，Progress 和 Home 页面也会自动更新。`
  }

  // 2. 删除 xxx
  if (text.startsWith("删除")) {
    const keyword = text.replace("删除", "").replace("这个学习计划", "").trim()

    if (!keyword) {
      return "你想删除学习计划，但是没有说明要删除哪一个。格式可以这样：删除 React Router"
    }

    const result = deletePlanByKeyword(keyword)

    if (!result.success) {
      return `没有找到包含「${keyword}」的学习计划，暂时无法删除。`
    }

    return `已帮你删除学习计划：

「${result.target.title}」

当前还剩 ${result.newPlans.length} 个学习计划。`
  }

  // 3. 把 xxx 标记为完成
  if (text.includes("标记为完成") || text.includes("完成")) {
    const keyword = text
      .replace("把", "")
      .replace("标记为完成", "")
      .replace("这个学习计划", "")
      .replace("学习计划", "")
      .replace("完成", "")
      .trim()

    if (!keyword) {
      return "你想标记完成，但是没有说明是哪一个计划。格式可以这样：把 React Hooks 标记为完成"
    }

    const result = completePlanByKeyword(keyword)

    if (!result.success) {
      return `没有找到包含「${keyword}」的学习计划，暂时无法标记完成。`
    }

    return `已帮你把学习计划标记为完成：

「${result.target.title}」

你的学习进度已经更新。`
  }

  // 4. 查看学习进度
  if (
    text.includes("查看学习进度") ||
    text.includes("学习进度") ||
    text.includes("进度怎么样")
  ) {
    const { totalCount, finishedCount, percent, unfinishedPlans } =
      getPlanProgress()

    return `这是你当前的学习进度：

总任务数：${totalCount} 个
已完成：${finishedCount} 个
未完成：${totalCount - finishedCount} 个
完成度：${percent}%

${
  unfinishedPlans.length > 0
    ? `接下来建议你优先完成：\n${unfinishedPlans
        .slice(0, 3)
        .map((item, index) => `${index + 1}. ${item.title}`)
        .join("\n")}`
    : "你当前所有学习计划都已经完成，可以开始添加新的学习目标。"
}`
  }

  return null
}

function generateMockReply(question) {
  if (question.includes("React") || question.includes("react")) {
    return `可以。你现在可以按这个顺序学习 React：

1. 组件和 JSX
2. props 父传子
3. useState 状态管理
4. useEffect 副作用
5. 组件拆分
6. React Router 页面跳转
7. 项目实战

建议你不要一直看教程，学完 Hooks 后就直接做一个完整项目，比如这个“智学 AI 学习平台”。`
  }

  if (question.includes("路线") || question.includes("学习路线")) {
    return `我建议你按这条路线走：

第一阶段：HTML / CSS / JavaScript 基础巩固
第二阶段：React 组件、Hooks、路由
第三阶段：完成一个前端项目
第四阶段：学习后端接口和数据库
第五阶段：把项目升级成全栈项目
第六阶段：整理简历和面试项目介绍

你现在最重要的是：先把前端成品做出来。`
  }

  if (question.includes("项目") || question.includes("拆解")) {
    return `可以把这个项目拆成 6 个模块：

1. AI 聊天学习助手
2. 学习画像生成
3. 学习路线页面
4. 任务看板
5. 能力测评
6. 学习报告

第一阶段先做前端，不接后端。数据用 localStorage 保存，后面再换成数据库。`
  }

  if (question.includes("今天") || question.includes("任务")) {
    return `你今天可以完成这 3 个任务：

1. 完成 AI 聊天主界面
2. 学会 React Router 的基本用法
3. 把聊天记录保存到 localStorage

完成后，你这个项目就已经有“产品雏形”了。`
  }

  if (question.includes("useEffect")) {
    return `useEffect 是 React 里处理“副作用”的 Hook。

比如：
1. 页面加载时请求数据
2. 监听某个状态变化
3. 操作 localStorage
4. 设置定时器

简单理解：
useState 管数据，useEffect 管数据变化之后要做的事。`
  }

  return `我理解你的问题是：“${question}”。

目前这是前端模拟回复版本。后面接入真实 AI 接口后，我可以根据你的问题实时生成学习建议、代码解释和任务规划。

现在你可以继续问我：
1. 如何学习前端
2. 如何拆解项目
3. 如何安排今天任务
4. 某段代码是什么意思`
}

export default Chat