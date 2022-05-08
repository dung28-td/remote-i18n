/**
 * @jest-environment jsdom
 */

import React from 'react'
import { createRoot } from 'react-dom/client'
import { act } from 'react-dom/test-utils'
import format from "../format";
import type { Obj, RenderHTML } from '../types';

globalThis.IS_REACT_ACT_ENVIRONMENT = true

const translations = {
  me: "me",
  world: "world",
  hello: "Hello {name}!",
  hello_world: "Hello {&world}!",
  hello_world_and_me: "Hello {&world} and {&me}!",
  hello_bye: "Hello {&bye}!",
  hello_world_single_html: "Hello <b>world</b>!",
  hello_world_multiple_html: "Hello <b>world</b> and <small>me</small>!",
  hello_world_nested_html: "Hello <b>world and <small>me</small></b>!",
  hello_world_html_attributes: "Hello <span id='id' className='class1 class2' data-testid='test'>world</span>!",
  html_with_breakline: "Hello <br /> world!"
}

const template: Obj<RenderHTML> = {
  b: ({ children }) => <b>{children}</b>,
  small: ({ children }) => <small>{children}</small>,
  span: ({ attributes, children }) => <span {...attributes}>{children}</span>,
  br: () => <br />
}

describe("format translation", () => {
  it("without values", () => {
    const message = format(translations, 'world')
    expect(message).toEqual("world")
  })

  it("with values", () => {
    const message = format(translations, 'hello', { name: "world" })
    expect(message).toEqual("Hello world!")
  })

  describe("dynamic lookup", () => {
    it ("match", () => {
      const message = format(translations, 'hello_world')
      expect(message).toEqual("Hello world!")
    })

    it ("match multiple", () => {
      const message = format(translations, 'hello_world_and_me')
      expect(message).toEqual("Hello world and me!")
    })

    it ("no match", () => {
      const message = format(translations, 'hello_bye')
      expect(message).toEqual("Hello {&bye}!")
    })
  })

  describe("rich translation", () => {
    let container: HTMLDivElement = null

    beforeEach(() => {
      container = document.createElement('div')
      document.body.appendChild(container)
    })

    afterEach(() => {
      document.body.removeChild(container)
      container = null
    })

    it ("single HTML tag", () => {
      const message = format(translations, 'hello_world_single_html', undefined, template)
      act(() => {
        createRoot(container).render(<>{message}</>)
      })
      expect(container.innerHTML).toBe("Hello <b>world</b>!")
    })

    it ("multiple HTML tags", () => {
      const message = format(translations, 'hello_world_multiple_html', undefined, template)
      act(() => {
        createRoot(container).render(<>{message}</>)
      })
      expect(container.innerHTML).toBe("Hello <b>world</b> and <small>me</small>!")
    })

    it ("nested HTML tags", () => {
      const message = format(translations, 'hello_world_nested_html', undefined, template)
      act(() => {
        createRoot(container).render(<>{message}</>)
      })
      expect(container.innerHTML).toBe("Hello <b>world and <small>me</small></b>!")
    })

    it ("HTML with attributes", () => {
      const message = format(translations, 'hello_world_html_attributes', undefined, template)
      act(() => {
        createRoot(container).render(<>{message}</>)
      })
      expect(container.innerHTML).toBe("Hello <span id=\"id\" class=\"class1 class2\" data-testid=\"test\">world</span>!")
    })

    it ("HTML with breakline", () => {
      const message = format(translations, 'html_with_breakline', undefined, template)
      act(() => {
        createRoot(container).render(<>{message}</>)
      })
      expect(container.innerHTML).toBe("Hello <br> world!")
    })
  })
})