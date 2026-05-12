export const quickPrompts = [
  '帮我制定 React 学习路线',
  '帮我拆解一个前端项目',
  '解释一下 useEffect',
  '帮我生成今日学习计划',
  '这个项目怎么写进简历',
]

export const mockPlans = [
  {
    id: 1,
    title: 'React 基础学习',
    desc: '学习 JSX、组件、props、state、事件处理',
    done: true,
  },
  {
    id: 2,
    title: 'React Hooks',
    desc: '学习 useState、useEffect、useRef、useMemo',
    done: false,
  },
  {
    id: 3,
    title: 'React Router',
    desc: '掌握页面跳转、嵌套路由、动态路由',
    done: false,
  },
  {
    id: 4,
    title: '项目实战',
    desc: '完成智学 AI 学习助手主界面',
    done: false,
  },
]

export const mockProjects = [
  {
    id: 1,
    name: '智学 AI 学习助手',
    progress: 45,
    status: '开发中',
    desc: '基于 React 的 AI 学习辅助平台，支持学习路线生成、项目拆解和聊天记录保存。',
  },
  {
    id: 2,
    name: '个人简历网站',
    progress: 70,
    status: '优化中',
    desc: '用于展示个人信息、项目经历、技能栈和联系方式。',
  },
]

export const mockDashboard = {
  username: 'River',
  direction: '前端开发',
  todayTask: '完善 Chat 页面和 localStorage 数据保存',
  studyDays: 7,
  finishedTasks: 12,
  projectProgress: 45,
}

export const mockKnowledgeCards = [
  {
    id: 1,
    title: 'React 基础知识总结',
    tag: 'React',
    desc: '根据你的学习记录，总结组件、JSX、props 和 state 的核心知识。',
    type: 'react',
  },
  {
    id: 2,
    title: 'Hooks 学习总结',
    tag: 'Hooks',
    desc: '总结 useState、useEffect、useRef 的使用场景和区别。',
    type: 'hooks',
  },
  {
    id: 3,
    title: '前端项目开发总结',
    tag: '项目',
    desc: '总结你在智学项目中涉及的页面、组件和数据流。',
    type: 'project',
  },
  {
    id: 4,
    title: 'localStorage 本地存储总结',
    tag: '存储',
    desc: '总结聊天记录和学习计划如何保存到浏览器本地。',
    type: 'storage',
  },
]