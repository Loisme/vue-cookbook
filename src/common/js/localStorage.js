const APP_TAG = 'cookbook';
const MENU_COLLECTION = 'menu_collection';
const MENU_HISTORY = 'menu_history';
const SEARCH_HISTORY = 'search_history';

/** 新增&&修改本地缓存
 *  @param {string} id 唯一id
 *  @param {string} key 标示
 *  @param {string} value 新增&修改的值
 */
export function saveToLocal(id, key, value) {
  let seller = window.localStorage.__seller__; // 专用字段__seller__
  if (!seller) {
    // 刚开始的初始化
    seller = {};
    seller[id] = {};
  } else {
    // 如果window.localStorage.__seller__已经有了
    // 因为读取的值是字符串的json，所以需要解析成json形式
    seller = JSON.parse(seller);
    // 需要判断seller中是否有属性id，没有的话需要给他进行定义
    if (!seller[id]) {
      seller[id] = {};
    }
  }
  seller[id][key] = value; // 设置不同id下的key的值

  // 由于存储只能是字符串的值，需要将JSON转化成字符串的json形式
  // 存储的localStorage的变量名是：_seller_
  window.localStorage.__seller__ = JSON.stringify(seller);
}
/** 查询本地缓存
 *  @param {string} id 唯一id
 *  @param {string} key 标示
 *  @param {string} def 如果查询不到显示的值
 */
export function loadFromLocal(id, key, def) {
  // 获取本地缓存
  let seller = window.localStorage.__seller__;
  if (!seller) {
    // 如果该变量还没有存储在localStorage中，那么需要返回一个默认值
    return def;
  }
  // 解析json数据
  seller = JSON.parse(seller)[id];
  if (!seller) {
    return def;
  }

  let ret = seller[key];
  return ret || def;
}

export function addIntoCollectionList(menuItem) {
  let isCollected = hasCollected(menuItem.id);
  if (!isCollected) {
    let collection = getCollectionList();
    collection.unshift(menuItem);
    saveCollectionList(collection);
  }
}

export function deleteFromCollectionList(menuItem) {
  let id = menuItem.id;
  let collectionList = getCollectionList();
  let index = collectionList.findIndex(item => {
    return item.id === id;
  });
  if (index > -1) {
    collectionList.splice(index, 1);
    saveCollectionList(collectionList);
  }
}

export function hasCollected(id) {
  let result = getCollectionList().find(item => {
    return item.id === id;
  });
  return !!result;
}

export function includeOnList(list, id) {
  let result = list.find(item => {
    return item.id === id;
  });
  return !!result;
}

export function addIntoHistoryList(menuItem) {
  let historyList = getHistoryList();
  let isCollected = includeOnList(historyList, menuItem.id);
  if (!isCollected) {
    historyList.unshift(menuItem);
    const limit = 10;
    if (historyList.length > limit) {
      historyList.splice(limit, historyList.length - limit);
    }
    saveHistoryList(historyList);
  }
}

export function addIntoSearchHistoryList(search) {
  let notEmpty = search.trim().length > 0;
  let historyList = getSearchHistoryList();
  let result = historyList.find(str => {
    return str === search;
  });
  if (!result && notEmpty) {
    historyList.unshift(search);
    const limit = 10;
    if (historyList.length > limit) {
      historyList.splice(limit, historyList.length - limit);
    }
    saveSearchHistoryList(historyList);
  }
}

export function deleteSearchHistory() {
  let emptyList = [];
  saveSearchHistoryList(emptyList);
}

export function getSearchHistoryList() {
  return loadFromLocal(APP_TAG, SEARCH_HISTORY, []);
}

function saveSearchHistoryList(history) {
  saveToLocal(APP_TAG, SEARCH_HISTORY, history);
}

export function getHistoryList() {
  return loadFromLocal(APP_TAG, MENU_HISTORY, []);
}

function saveHistoryList(history) {
  saveToLocal(APP_TAG, MENU_HISTORY, history);
}

export function getCollectionList() {
  return loadFromLocal(APP_TAG, MENU_COLLECTION, []);
}

function saveCollectionList(collection) {
  saveToLocal(APP_TAG, MENU_COLLECTION, collection);
}
