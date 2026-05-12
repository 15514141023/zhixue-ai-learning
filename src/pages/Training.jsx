import { useState } from 'react'
import Layout from '../components/Layout'

import {
  getPlans,
  togglePlanDoneById,
  deletePlanById,
} from '../services/planService'

import { getPlanProgress } from '../services/progressService'

function Training() {
  const [plans, setPlans] = useState(getPlans)

  const { finishedCount, totalCount, planPercent } = getPlanProgress(plans)

  function handleToggleDone(id) {
    const newPlans = togglePlanDoneById(id)
    setPlans(newPlans)
  }

  function handleDeletePlan(id) {
    const confirmDelete = window.confirm('确定要删除这个学习计划吗？')

    if (!confirmDelete) return

    const newPlans = deletePlanById(id)
    setPlans(newPlans)
  }

  return (
    <Layout>
      <div className="space-y-6">
        <div className="bg-white rounded-3xl shadow p-6">
          <h2 className="text-2xl font-bold text-gray-900">学习计划</h2>
          <p className="text-gray-500 mt-2">
            当前完成 {finishedCount} / {totalCount} 个任务，完成度 {planPercent}%
          </p>

          <div className="w-full h-3 bg-gray-100 rounded-full mt-5 overflow-hidden">
            <div
              className="h-full bg-blue-600 rounded-full transition-all"
              style={{ width: `${planPercent}%` }}
            ></div>
          </div>
        </div>

        <div className="grid gap-4">
          {plans.length === 0 ? (
            <div className="bg-white rounded-3xl shadow p-8 text-center text-gray-500">
              暂时还没有学习计划。你可以去 Chat 页面输入：
              <span className="font-bold text-gray-900">
                新增学习计划：学习 React Router
              </span>
            </div>
          ) : (
            plans.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-3xl shadow p-6 flex justify-between items-center"
              >
                <div>
                  <h3
                    className={`text-lg font-bold ${
                      item.done ? 'text-gray-400 line-through' : 'text-gray-900'
                    }`}
                  >
                    {item.title}
                  </h3>

                  <p className="text-gray-500 mt-2">
                    {item.desc || '暂无描述'}
                  </p>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => handleToggleDone(item.id)}
                    className={`px-5 py-3 rounded-2xl transition ${
                      item.done
                        ? 'bg-green-100 text-green-700 hover:bg-green-200'
                        : 'bg-gray-100 text-gray-700 hover:bg-blue-100 hover:text-blue-600'
                    }`}
                  >
                    {item.done ? '取消完成' : '标记完成'}
                  </button>

                  <button
                    onClick={() => handleDeletePlan(item.id)}
                    className="px-5 py-3 rounded-2xl bg-red-50 text-red-600 hover:bg-red-100 transition"
                  >
                    删除
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </Layout>
  )
}

export default Training