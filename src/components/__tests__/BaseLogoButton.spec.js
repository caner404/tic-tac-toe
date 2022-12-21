import { describe, it, expect } from "vitest";
import { shallowMount, mount } from "@vue/test-utils";
import BaseLogoButton from "@/components/BaseLogoButton.vue";
import IconCircleSmall from "@/components/icons/IconCircleSmall.vue";
import IconCrossSmall from "@/components/icons/IconCrossSmall.vue";
import IconRestart from "@/components/icons/IconRestart.vue";

describe("BaseLogoButton.vue Test", () => {
  it("displays a circle and is not active", () => {
    const wrapper = shallowMount(BaseLogoButton, {
      props: {
        mode: "circle",
        isActivePlayer: false,
      },
      slots: {
        default: IconCircleSmall,
      },
    });

    expect(wrapper.findComponent(IconCircleSmall).exists()).toBe(true);
    expect(wrapper.classes()).toContain("circle");
    expect(wrapper.classes("active")).toBe(false);
  });
  it("displays a circle and is active", () => {
    const wrapper = mount(BaseLogoButton, {
      props: {
        mode: "circle",
        isActivePlayer: true,
      },
      slots: {
        default: IconCircleSmall,
      },
    });

    expect(wrapper.findComponent(IconCircleSmall).exists()).toBe(true);
    expect(wrapper.classes()).toContain("circle");
    expect(wrapper.classes("active")).toBe(true);
  });
  it("displays a cross and is not active", () => {
    const wrapper = mount(BaseLogoButton, {
      props: {
        mode: "cross",
        isActivePlayer: false,
      },
      slots: {
        default: IconCrossSmall,
      },
    });
    expect(wrapper.findComponent(IconCrossSmall).exists()).toBe(true);
    expect(wrapper.classes()).toContain("cross");
    expect(wrapper.classes("active")).toBe(false);
  });
  it("displays a cross and is active", () => {
    const wrapper = mount(BaseLogoButton, {
      props: {
        mode: "cross",
        isActivePlayer: true,
      },
      slots: {
        default: IconCrossSmall,
      },
    });
    expect(wrapper.findComponent(IconCrossSmall).exists()).toBe(true);
    expect(wrapper.classes()).toContain("cross");
    expect(wrapper.classes("active")).toBe(true);
  });
  it("displays restart button", () => {
    const wrapper = mount(BaseLogoButton, {
      props: {
        mode: "restart",
        isActivePlayer: false,
      },
      slots: {
        default: IconRestart,
      },
    });

    expect(wrapper.findComponent(IconRestart).exists()).toBe(true);
    expect(wrapper.classes()).toContain("restart");
    expect(wrapper.classes("active")).toBe(false);
  });
});
