import { requireComponentHeaderComment } from './require-component-header-comment.js'
import { noUseState } from './no-use-state.js'
import { useStateWithNoteComment } from './use-state-with-note-comment.js'

export const rules = Object.freeze({
  'require-component-header-comment': requireComponentHeaderComment,
  'no-use-state': noUseState,
  'use-state-with-note-comment': useStateWithNoteComment,
})
