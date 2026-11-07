import { defineEventHandler } from 'h3'
import { renderEmailComponent } from '#imports'

export default defineEventHandler(() => renderEmailComponent('Code'))
