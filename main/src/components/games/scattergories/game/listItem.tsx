import React from 'react'
import { categoryLabels } from './utils'
import './listItem.css'

export default function ListItem(props: { index: number, listItem: string }) {
  return (
    <span className="list-item">{categoryLabels(props.index)}) {!props.listItem ? "Generate a list before you start!" : props.listItem}</span>
  )
}