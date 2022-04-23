import format from "../format";

const translations = {
  me: "me",
  world: "world",
  hello: "Hello {name}!",
  hello_world: "Hello {&world}!",
  hello_world_and_me: "Hello {&world} and {&me}!",
  hello_bye: "Hello {&bye}!",
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
})