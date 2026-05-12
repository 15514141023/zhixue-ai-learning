import { mockPlans } from '../mock/MockData'
import { getStorage, setStorage } from '../utils/storage'

const PLAN_KEY = 'zhixue_plans'

// 获取学习计划
export function getPlans() {
  return getStorage(PLAN_KEY, mockPlans)
}

// 保存学习计划
export function savePlans(plans) {
  setStorage(PLAN_KEY, plans)
}

// 根据标题新增学习计划
export function addPlanByTitle(title) {
  const plans = getPlans()

  const newPlan = {
    id: Date.now(),
    title,
    desc: '由 AI 根据你的指令自动创建的学习计划。',
    done: false,
  }

  const newPlans = [...plans, newPlan]

  savePlans(newPlans)

  return {
    newPlan,
    newPlans,
  }
}

// 根据关键词删除学习计划
export function deletePlanByKeyword(keyword) {
  const plans = getPlans()

  const target = plans.find((item) => item.title.includes(keyword))

  if (!target) {
    return {
      success: false,
      target: null,
      newPlans: plans,
    }
  }

  const newPlans = plans.filter((item) => item.id !== target.id)

  savePlans(newPlans)

  return {
    success: true,
    target,
    newPlans,
  }
}

// 根据关键词标记学习计划完成
export function completePlanByKeyword(keyword) {
  const plans = getPlans()

  const target = plans.find((item) => item.title.includes(keyword))

  if (!target) {
    return {
      success: false,
      target: null,
      newPlans: plans,
    }
  }

  const newPlans = plans.map((item) => {
    if (item.id === target.id) {
      return {
        ...item,
        done: true,
      }
    }

    return item
  })

  savePlans(newPlans)

  return {
    success: true,
    target,
    newPlans,
  }
}

// 根据 id 切换完成状态，给 Training 页面用
export function togglePlanDoneById(id) {
  const plans = getPlans()

  const newPlans = plans.map((item) => {
    if (item.id === id) {
      return {
        ...item,
        done: !item.done,
      }
    }

    return item
  })

  savePlans(newPlans)

  return newPlans
}

// 根据 id 删除学习计划，给 Training 页面用
export function deletePlanById(id) {
  const plans = getPlans()

  const newPlans = plans.filter((item) => item.id !== id)

  savePlans(newPlans)

  return newPlans
}

// 获取学习计划进度，给 Chat 页面用
export function getPlanProgress() {
  const plans = getPlans()

  const totalCount = plans.length
  const finishedCount = plans.filter((item) => item.done).length
  const percent = totalCount === 0 ? 0 : Math.round((finishedCount / totalCount) * 100)
  const unfinishedPlans = plans.filter((item) => !item.done)

  return {
    plans,
    totalCount,
    finishedCount,
    percent,
    unfinishedPlans,
  }
}