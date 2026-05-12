import { getStorage, setStorage, removeStorage } from '../utils/storage'

const SUMMARY_KEY_PREFIX = 'zhixue_knowledge_summary_'

// 获取某张知识卡片的用户自定义总结
export function getKnowledgeSummary(cardId) {
  return getStorage(`${SUMMARY_KEY_PREFIX}${cardId}`, '')
}

// 保存某张知识卡片的用户自定义总结
export function saveKnowledgeSummary(cardId, summary) {
  setStorage(`${SUMMARY_KEY_PREFIX}${cardId}`, summary)
}

// 删除某张知识卡片的用户自定义总结
export function removeKnowledgeSummary(cardId) {
  removeStorage(`${SUMMARY_KEY_PREFIX}${cardId}`)
}