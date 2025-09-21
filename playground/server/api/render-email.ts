import Test from '../../emails/Test.vue'
import { render } from '../../../src/runtime/server/utils/render'

export default defineEventHandler(async () => {
  return render(Test)
})
