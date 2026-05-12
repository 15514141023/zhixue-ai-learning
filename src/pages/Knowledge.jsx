import { useState } from 'react'
import Layout from '../components/Layout'
import { mockKnowledgeCards } from '../mock/MockData'

import { getPlans } from '../services/planService'
import { getChatMessages } from '../services/chatService'
import { getPlanProgress } from '../services/progressService'
import {
  getKnowledgeSummary,
  saveKnowledgeSummary,
  removeKnowledgeSummary,
} from '../services/knowledgeService'

function Knowledge() {
  const [activeCard, setActiveCard] = useState(mockKnowledgeCards[0])

  // 是否正在编辑总结
  const [isEditingSummary, setIsEditingSummary] = useState(false)

  // 编辑框里的总结内容
  const [summaryText, setSummaryText] = useState('')

  const plans = getPlans()
  const messages = getChatMessages()

  const { finishedCount, totalCount, planPercent } = getPlanProgress(plans)

  function generateKnowledgeSummary(card) {
    if (card.type === 'react') {
      return `根据你的学习情况，AI 为你总结出以下 React 基础知识：

一、你当前的学习进度
你目前已经完成 ${finishedCount} / ${totalCount} 个学习任务，整体完成度为 ${planPercent}%。
从你的学习计划来看，你正在从 React 基础逐步过渡到项目实战阶段。

二、React 基础核心知识
1. JSX 是 JavaScript 和 HTML 的结合写法，用来描述页面结构。
2. 组件是 React 的核心，页面可以拆成多个可复用的小组件。
3. props 用来实现父组件向子组件传递数据。
4. state 用来保存组件内部会变化的数据。
5. 当 state 发生变化时，React 会重新渲染页面。

三、结合你当前项目的理解
在你的智学项目里：
- Chat.jsx 是聊天页面组件
- ChatMessage.jsx 是单条消息组件
- QuickPrompt.jsx 是快捷提示词组件
- Layout.jsx 是整体布局组件

这说明你已经开始使用组件化思想开发项目了。`
    }

    if (card.type === 'hooks') {
      return `根据你的学习记录，AI 为你整理了 Hooks 的学习总结：

一、你需要重点掌握的 Hooks
1. useState
用来保存页面中的状态数据，比如输入框内容、聊天记录、学习计划列表。

2. useRef
用来获取页面中的某个 DOM 元素，比如你的 messageEndRef，用来实现聊天窗口自动滚动到底部。

3. useEffect
适合处理状态变化后的副作用，比如：
- 页面加载后请求数据
- 监听 messages 变化后保存到 localStorage
- 绑定或清除事件

二、你当前项目里的 Hooks 使用情况
你已经在 Chat.jsx 中使用了：
- useState 保存 messages 和 input
- useRef 定位聊天列表底部
- localStorage 保存聊天记录

三、下一步建议
你可以继续学习 useEffect，把保存聊天记录和自动滚动逻辑从 sendMessage 里抽出来，让代码更清晰。`
    }

    if (card.type === 'project') {
      return `根据你的项目进度，AI 为你生成了项目开发总结：

一、当前项目名称
智学 AI 学习助手

二、你已经完成的模块
1. Chat 页面：AI 聊天、模拟回复、聊天记录保存
2. Training 页面：学习计划展示、点击完成、localStorage 保存
3. Progress 页面：学习进度统计
4. Home 页面：首页学习概览
5. Knowledge 页面：知识库卡片和 AI 总结展示

三、项目目前的技术点
- React 组件化开发
- React Router 页面路由
- Tailwind CSS 页面样式
- mockData 模拟后端数据
- localStorage 本地持久化
- useState 管理页面状态
- useRef 实现自动滚动

四、简历包装方向
这个项目可以包装成：
一个基于 React 的 AI 学习辅助平台，支持学习计划管理、AI 问答、学习进度统计和知识总结。`
    }

    if (card.type === 'storage') {
      return `根据你的代码，AI 为你总结 localStorage 的使用方式：

一、localStorage 的作用
localStorage 是浏览器提供的本地存储能力，可以让数据在页面刷新后依然保留。

二、你的项目里保存了什么
1. zhixue_chat_messages：保存聊天记录
2. zhixue_plans：保存学习计划完成状态
3. zhixue_knowledge_summary_xxx：保存用户修改后的知识总结

三、你封装的 storage.js
你写了三个核心函数：
1. getStorage：读取数据
2. setStorage：保存数据
3. removeStorage：删除数据

四、为什么要 JSON.stringify 和 JSON.parse
因为 localStorage 只能保存字符串。
数组和对象要先用 JSON.stringify 转成字符串。
读取时再用 JSON.parse 转回数组或对象。

五、下一步理解
以后你接数据库时，其实就是把：
setStorage()
换成：
axios.post()

把：
getStorage()
换成：
axios.get()

整体思路是一样的。`
    }

    return '暂无总结内容。'
  }

  // 获取最终展示的总结内容
  function getFinalSummary(card) {
    if (!card) return '暂无总结内容。'

    const savedSummary = getKnowledgeSummary(card.id)

    if (savedSummary) {
      return savedSummary
    }

    return generateKnowledgeSummary(card)
  }

  // 保存用户修改后的总结
  function handleSaveSummary() {
    if (!activeCard) return

    if (!summaryText.trim()) {
      alert('总结内容不能为空')
      return
    }

    saveKnowledgeSummary(activeCard.id, summaryText)

    alert('知识总结已保存')
    setIsEditingSummary(false)
  }

  // 恢复 AI 默认总结
  function handleResetSummary() {
    if (!activeCard) return

    const confirmReset = window.confirm('确定要恢复为 AI 默认总结吗？')

    if (!confirmReset) return

    removeKnowledgeSummary(activeCard.id)
    setSummaryText(generateKnowledgeSummary(activeCard))
    setIsEditingSummary(false)
  }

  // 点击卡片
  function handleCardClick(card) {
    setActiveCard(card)
    setIsEditingSummary(false)
    setSummaryText('')
  }

  // 点击编辑总结
  function handleEditSummary() {
    setSummaryText(getFinalSummary(activeCard))
    setIsEditingSummary(true)
  }

  return (
    <Layout>
      <div className="space-y-6">
        <div className="bg-white rounded-3xl shadow p-6">
          <h2 className="text-2xl font-bold text-gray-900">知识库</h2>
          <p className="text-gray-500 mt-2">
            点击知识卡片，查看 AI 根据你的学习计划和聊天记录生成的知识总结。
          </p>
        </div>

        <div className="grid grid-cols-3 gap-5">
          {mockKnowledgeCards.map((card) => (
            <button
              key={card.id}
              onClick={() => handleCardClick(card)}
              className={`text-left rounded-3xl shadow p-6 transition border ${
                activeCard.id === card.id
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-gray-900 border-transparent hover:border-blue-200 hover:shadow-lg'
              }`}
            >
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold">{card.title}</h3>
                <span
                  className={`text-xs px-3 py-1 rounded-full ${
                    activeCard.id === card.id
                      ? 'bg-white/20 text-white'
                      : 'bg-blue-50 text-blue-600'
                  }`}
                >
                  {card.tag}
                </span>
              </div>

              <p
                className={`mt-4 text-sm leading-6 ${
                  activeCard.id === card.id ? 'text-blue-50' : 'text-gray-500'
                }`}
              >
                {card.desc}
              </p>
            </button>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-5">
          <div className="bg-white rounded-3xl shadow p-6">
            <p className="text-gray-500">学习任务完成度</p>
            <h3 className="text-3xl font-bold text-gray-900 mt-3">
              {planPercent}%
            </h3>
          </div>

          <div className="bg-white rounded-3xl shadow p-6">
            <p className="text-gray-500">已完成任务</p>
            <h3 className="text-3xl font-bold text-gray-900 mt-3">
              {finishedCount} / {totalCount}
            </h3>
          </div>

          <div className="bg-white rounded-3xl shadow p-6">
            <p className="text-gray-500">AI 对话记录</p>
            <h3 className="text-3xl font-bold text-gray-900 mt-3">
              {messages.length} 条
            </h3>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow p-8">
          <div className="flex justify-between items-start border-b border-gray-100 pb-5">
            <div>
              <h3 className="text-2xl font-bold text-gray-900">
                {activeCard.title}
              </h3>
              <p className="text-gray-500 mt-2">
                AI 根据你的学习情况生成的阶段性知识总结
              </p>
            </div>

            <span className="px-4 py-2 rounded-full bg-blue-50 text-blue-600 text-sm">
              {activeCard.tag}
            </span>
          </div>

          <div className="mt-6">
            <div className="mb-4 flex gap-3">
              {!isEditingSummary ? (
                <>
                  <button
                    onClick={handleEditSummary}
                    className="rounded-xl bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
                  >
                    编辑总结
                  </button>

                  <button
                    onClick={handleResetSummary}
                    className="rounded-xl bg-gray-200 px-4 py-2 text-sm text-gray-700 hover:bg-gray-300"
                  >
                    恢复 AI 默认总结
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={handleSaveSummary}
                    className="rounded-xl bg-green-600 px-4 py-2 text-sm text-white hover:bg-green-700"
                  >
                    保存修改
                  </button>

                  <button
                    onClick={() => setIsEditingSummary(false)}
                    className="rounded-xl bg-gray-200 px-4 py-2 text-sm text-gray-700 hover:bg-gray-300"
                  >
                    取消
                  </button>
                </>
              )}
            </div>

            {isEditingSummary ? (
              <textarea
                value={summaryText}
                onChange={(e) => setSummaryText(e.target.value)}
                className="h-96 w-full rounded-2xl border border-gray-200 p-4 leading-8 text-gray-700 outline-none focus:border-blue-500"
              />
            ) : (
              <div className="whitespace-pre-wrap leading-8 text-gray-700">
                {getFinalSummary(activeCard)}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Knowledge