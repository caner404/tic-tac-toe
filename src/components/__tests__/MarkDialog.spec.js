import { describe, it, expect, vi } from "vitest";
import { createTestingPinia } from "@pinia/testing";
import { mount } from "@vue/test-utils";
import MarkDialog from "@/components/MarkDialog.vue";

describe("MarkDialog.vue Test", () => {
  it("renders message when component is created", () => {
    const wrapper = mount(MarkDialog, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
          }),
        ],
      },
    });
    const mark = wrapper.get('[data-test="mark"]');
    expect(mark.text()).toContain("Remember: x goes first");
  });
});
