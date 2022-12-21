import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import TheGameMenu from "@/components/layouts/TheGameMenu.vue";

describe("TheGameMenu.vue Test", () => {
  it("renders message when component is created", () => {
    const wrapper = mount(TheGameMenu);
    const gameMenu = wrapper.get("[data-test='gameMenu']");
    expect(gameMenu.attributes("data-test")).toBe("gameMenu");
  });
});
