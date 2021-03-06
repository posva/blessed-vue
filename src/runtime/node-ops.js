/* @flow */
import blessed from 'blessed'
export { setAttribute } from 'util/attrs'
import { refreshNode } from './util'
import { transformStaticStyle, normalizeStyleBinding } from 'util/style'

export function createElement (tagName: string, vnode: VNode) {
  const data = vnode.data || {}
  const { staticStyle, style } = data
  const el = blessed[tagName](Object.assign({ parent: vnode.elm }, data.attrs, {
    style: staticStyle ? transformStaticStyle(staticStyle) : normalizeStyleBinding(style)
  }))
  el.elm = el
  return el
}

export function createElementNS (namespace: string, tagName: string) {
  return createElement(tagName)
}

export function createTextNode (text: string, options: Object = {}): Text {
  return blessed['text'](Object.assign({ content: text, hidden: text.trim() === '' }, options))
}

export function createComment (text: string): Comment {
  return createTextNode(text, { hidden: true })
}

export function insertBefore (parentNode, newNode, referenceNode) {
  parentNode.insertBefore(newNode, referenceNode)
  refreshNode(parentNode)
}

export function removeChild (node, child) {
  child.destroy()
  node.remove(child)
  refreshNode(node)
}

export function appendChild (node, child) {
  node.append(child)
  refreshNode(node)
}

export function parentNode (node) {
  return node.parent
}

export function nextSibling (node) {
  const siblings = node.parent.children
  const index = siblings.indexOf(node)
  const isLast = index === siblings.length - 1
  return isLast ? null : siblings[index + 1]
}

export function tagName (node): string {
  return node.type
}

export function setTextContent (node, text: string) {
  node.setContent(text)
  refreshNode(node)
}
