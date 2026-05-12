import Layout from '../components/Layout'
import { mockDashboard, mockProjects } from '../mock/MockData'

import { getPlans } from '../services/planService'
import { getChatMessages } from '../services/chatService'
import { getPlanProgress } from '../services/progressService'

function Home() {
  const plans = getPlans()
  const messages = getChatMessages()

  const { finishedCount, totalCount, planPercent } = getPlanProgress(plans)

  const mainProject = mockProjects[0]

  return (
    <Layout>
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl shadow p-8 text-white">
          <h2 className="text-3xl font-bold">欢迎回来，{mockDashboard.username}</h2>
          <p className="mt-3 text-blue-100">
            当前方向：{mockDashboard.direction}。今天继续推进你的学习项目吧。
          </p>
        </div>

        <div className="grid grid-cols-4 gap-5">
          <div className="bg-white rounded-3xl shadow p-6">
            <p className="text-gray-500">连续学习</p>
            <h3 className="text-3xl font-bold text-gray-900 mt-3">
              {mockDashboard.studyDays} 天
            </h3>
          </div>

          <div className="bg-white rounded-3xl shadow p-6">
            <p className="text-gray-500">完成任务</p>
            <h3 className="text-3xl font-bold text-gray-900 mt-3">
              {finishedCount} / {totalCount}
            </h3>
          </div>

          <div className="bg-white rounded-3xl shadow p-6">
            <p className="text-gray-500">学习完成度</p>
            <h3 className="text-3xl font-bold text-gray-900 mt-3">
              {planPercent}%
            </h3>
          </div>

          <div className="bg-white rounded-3xl shadow p-6">
            <p className="text-gray-500">AI 对话</p>
            <h3 className="text-3xl font-bold text-gray-900 mt-3">
              {messages.length} 条
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-5">
          <div className="bg-white rounded-3xl shadow p-6">
            <h3 className="text-xl font-bold text-gray-900">今日任务</h3>
            <p className="text-gray-500 mt-3">{mockDashboard.todayTask}</p>

            <div className="mt-6">
              <p className="text-sm text-gray-500 mb-2">学习计划进度</p>
              <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-600 rounded-full"
                  style={{ width: `${planPercent}%` }}
                ></div>
              </div>
              <p className="text-gray-500 mt-2">{planPercent}%</p>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow p-6">
            <h3 className="text-xl font-bold text-gray-900">当前项目</h3>
            <p className="text-gray-900 font-bold mt-4">{mainProject.name}</p>
            <p className="text-gray-500 mt-2">{mainProject.desc}</p>

            <div className="mt-6">
              <p className="text-sm text-gray-500 mb-2">项目进度</p>
              <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-600 rounded-full"
                  style={{ width: `${mainProject.progress}%` }}
                ></div>
              </div>
              <p className="text-gray-500 mt-2">{mainProject.progress}%</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-5">最近学习计划</h3>

          <div className="grid gap-4">
            {plans.slice(0, 3).map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center border border-gray-100 rounded-2xl p-4"
              >
                <div>
                  <h4 className="font-bold text-gray-900">{item.title}</h4>
                  <p className="text-gray-500 mt-1">{item.desc}</p>
                </div>

                <span
                  className={`px-3 py-1 text-sm rounded-full ${
                    item.done
                      ? 'bg-green-100 text-green-700'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {item.done ? '已完成' : '未完成'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Home