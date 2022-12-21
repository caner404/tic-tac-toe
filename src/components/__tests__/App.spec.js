import { describe, it, expect } from "vitest";
import { mount, shallowMount } from "@vue/test-utils";
import App from "@/App.vue";
import TheGameBoard from "@/components/layouts/TheGameBoard.vue";
import TheGameMenu from "@/components/layouts/TheGameMenu.vue";
import BaseModal from "@/components/BaseModal.vue";
import { store } from "@/store";

describe("App.vue Test", () => {
  it("TheGameboard doesnt render ", () => {
    const wrapper = mount(App);
    expect(wrapper.findComponent(TheGameBoard).exists()).toBe(false);
  });
  it("TheGameboard render ", () => {
    store.isGameboardActive = true;
    const wrapper = mount(App);
    expect(wrapper.findComponent(TheGameBoard).exists()).toBe(true);
  });
  it("TheGamemenu does render ", () => {
    const wrapper = mount(App);
    expect(wrapper.findComponent(TheGameMenu).exists()).toBe(false);
  });
  it("TheGamemenu doesn't render", () => {
    store.isGameboardActive = true;
    const wrapper = mount(App);
    expect(wrapper.findComponent(TheGameMenu).exists()).toBe(false);
  });
  it("BaseModal doesnt render ", () => {
    const wrapper = mount(App);
    expect(wrapper.findComponent(BaseModal).exists()).toBe(false);
  });
  it("BaseModal does render", () => {
    store.showModal = true;
    const wrapper = mount(App);
    expect(wrapper.findComponent(BaseModal).exists()).toBe(true);
  });
});
