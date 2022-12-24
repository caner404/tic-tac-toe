import { describe, it, expect, vi } from "vitest";
import { createTestingPinia } from "@pinia/testing";
import { mount } from "@vue/test-utils";
import TheGameMenu from "@/components/layouts/TheGameMenu.vue";

describe("TheGameMenu.vue Test", () => {
  it("renders message when component is created", () => {
    const wrapper = mount(TheGameMenu, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
          }),
        ],
      },
    });
    const gameMenu = wrapper.get("[data-test='gameMenu']");
    expect(gameMenu.attributes("data-test")).toBe("gameMenu");
  });
});
