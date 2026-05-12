// 计算学习计划完成情况
export function getPlanProgress(plans = []) {
  const totalCount = plans.length
  const finishedCount = plans.filter((item) => item.done).length

  const planPercent =
    totalCount === 0 ? 0 : Math.round((finishedCount / totalCount) * 100)

  return {
    totalCount,
    finishedCount,
    planPercent,
  }
}

// 获取未完成计划
export function getUnfinishedPlans(plans = []) {
  return plans.filter((item) => !item.done)
}

// 获取已完成计划
export function getFinishedPlans(plans = []) {
  return plans.filter((item) => item.done)
}