import Layout from '../components/Layout'
import { mockProjects } from '../mock/MockData'

import { getPlans } from '../services/planService'
import { getChatMessages } from '../services/chatService'
import { getPlanProgress } from '../services/progressService'

function Progress() {
  const plans = getPlans()
  const messages = getChatMessages()

  const { finishedCount, totalCount, planPercent } = getPlanProgress(plans)

  return (
    <Layout>
      <div className="space-y-6">
        <div className="bg-white rounded-3xl shadow p-6">
          <h2 className="text-2xl font-bold text-gray-900">学习进度</h2>
          <p className="text-gray-500 mt-2">
            这里会根据你的学习计划和聊天记录展示整体进度。
          </p>
        </div>

        <div className="grid grid-cols-3 gap-5">
          <div className="bg-white rounded-3xl shadow p-6">
            <p className="text-gray-500">学习计划完成度</p>
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
            <p className="text-gray-500">AI 对话数量</p>
            <h3 className="text-3xl font-bold text-gray-900 mt-3">
              {messages.length}
            </h3>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-5">学习任务进度</h3>

          <div className="w-full h-4 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-600 rounded-full transition-all"
              style={{ width: `${planPercent}%` }}
            ></div>
          </div>

          <p className="text-gray-500 mt-3">当前完成度：{planPercent}%</p>
        </div>

        <div className="bg-white rounded-3xl shadow p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-5">项目进度</h3>

          <div className="space-y-5">
            {mockProjects.map((project) => (
              <div
                key={project.id}
                className="border border-gray-100 rounded-2xl p-5"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-bold text-gray-900">{project.name}</h4>
                    <p className="text-gray-500 mt-1">{project.desc}</p>
                  </div>

                  <span className="px-3 py-1 text-sm rounded-full bg-blue-50 text-blue-600">
                    {project.status}
                  </span>
                </div>

                <div className="w-full h-3 bg-gray-100 rounded-full mt-4 overflow-hidden">
                  <div
                    className="h-full bg-blue-600 rounded-full"
                    style={{ width: `${project.progress}%` }}
                  ></div>
                </div>

                <p className="text-gray-500 mt-2">
                  完成进度：{project.progress}%
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Progress