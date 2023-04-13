import { render, screen } from "@testing-library/vue"
import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import HelloWorld from '../HelloWorld.vue'

describe.concurrent('HelloWorld', () => {
  it('renders properly', async () => {
    const mssg = "Hello Vitest!"
    render(HelloWorld, { props: { msg: mssg } })
    const view = await screen.findByText(mssg)
    expect(view.className).toBe('green')
    expect(view.innerHTML).toBe(mssg)
    expect(view.tagName).toBe('H1')
  })
})
