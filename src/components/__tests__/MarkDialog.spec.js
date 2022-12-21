import { describe, it, expect } from "vitest";
import { shallowMount } from "@vue/test-utils";
import MarkDialog from "@/components/MarkDialog.vue";

describe("MarkDialog.vue Test", () => {
  it("renders message when component is created", () => {
    const wrapper = shallowMount(MarkDialog);
    const mark = wrapper.get('[data-test="mark"]');
    expect(mark.text()).toContain("Remember: x goes first");
  });
});
