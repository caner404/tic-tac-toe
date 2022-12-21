import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import BaseModalButton from "@/components/BaseModalButton.vue";

describe("BaseModalButton.vue Test", () => {
  const validEmitTypes = ["cancel", "quit", "nextRound", "restart"];
  it("Modal Button primary displays 'Next round' when the round is played to the end", () => {
    const emitType = "nextRound";
    const wrapper = mount(BaseModalButton, {
      props: {
        mode: "primary",
        text: "Next round",
        emitEventType: emitType,
      },
    });

    wrapper.find("button").trigger("click");

    expect(wrapper.text()).toBe("Next round");
    expect(wrapper.emitted()).toHaveProperty(emitType);
    expect(validEmitTypes.includes(emitType)).toBe(true);
  });
  it("Modal Button primary displays 'yes,restart' when the restart button is clicked", () => {
    const emitType = "restart";
    const wrapper = mount(BaseModalButton, {
      props: {
        mode: "primary",
        text: "yes,restart",
        emitEventType: emitType,
      },
    });

    wrapper.find("button").trigger("click");

    expect(wrapper.text()).toBe("yes,restart");
    expect(wrapper.emitted()).toHaveProperty(emitType);
    expect(validEmitTypes.includes(emitType)).toBe(true);
  });
  it("Modal Button secondary displays 'quit' when the round is played to the end", () => {
    const emitType = "quit";
    const wrapper = mount(BaseModalButton, {
      props: {
        mode: "secondary",
        text: "quit",
        emitEventType: emitType,
      },
    });

    wrapper.find("button").trigger("click");

    expect(wrapper.text()).toBe("quit");
    expect(wrapper.emitted()).toHaveProperty(emitType);
    expect(validEmitTypes.includes(emitType)).toBe(true);
  });
  it("Modal Button secondary displays 'no,cancel' when we click restart button", () => {
    const emitType = "cancel";
    const wrapper = mount(BaseModalButton, {
      props: {
        mode: "secondary",
        text: "no,cancel",
        emitEventType: emitType,
      },
    });

    wrapper.find("button").trigger("click");

    expect(wrapper.text()).toBe("no,cancel");
    expect(wrapper.emitted()).toHaveProperty(emitType);
    expect(validEmitTypes.includes(emitType)).toBe(true);
  });
});
