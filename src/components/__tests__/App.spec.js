import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { mount } from "@vue/test-utils";
import { createTestingPinia } from "@pinia/testing";
import App from "@/App.vue";
import TheGameBoard from "@/components/layouts/TheGameBoard.vue";
import TheGameMenu from "@/components/layouts/TheGameMenu.vue";
import StartGameButton from "@/components/StartGameButton.vue";
import BaseModal from "@/components/BaseModal.vue";
import { useMainStore } from "@/stores/main";
import { useGameboardStore } from "@/stores/gameBoard";

describe("App.vue Test", () => {
  let wrapper = null;
  let mainStore = null;

  beforeEach(() => {
    wrapper = mount(App, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
            initialState: {
              main: {
                showModal: false,
                gameBoard: {
                  isGameboardActive: false,
                },
              },
            },
          }),
        ],
      },
    });
    mainStore = useMainStore();
  });
  afterEach(() => {
    wrapper.unmount();
  });
  it("render App", () => {
    expect(wrapper.findComponent(TheGameBoard).exists()).toBe(false);
    expect(wrapper.findComponent(TheGameMenu).exists()).toBe(true);
    expect(wrapper.findComponent(BaseModal).exists()).toBe(false);
  });

  it("TheGameboard is active and we see the modal", () => {
    const wrapper2 = mount(App, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
            initialState: {
              main: {
                showModal: true,
                gameBoard: {
                  isGameboardActive: true,
                },
              },
            },
          }),
        ],
      },
    });
    expect(wrapper2.findComponent(TheGameMenu).exists()).toBe(false);
    expect(wrapper2.findComponent(TheGameBoard).exists()).toBe(true);
    expect(wrapper2.findComponent(BaseModal).exists()).toBe(true);
  });
});
