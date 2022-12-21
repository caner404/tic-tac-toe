import BaseGameStats from "@/components/BaseGameStats.vue";
import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";

describe("BaseGameStats Tests", () => {
  it("player is team cross and plays against cpu", () => {
    const statsCrossTitle = "X (YOU)";
    const wrapper = mount(BaseGameStats, {
      props: {
        team: "cross",
        score: 0,
        title: "YOU",
      },
    });
    expect(wrapper.find('[data-test="stats-title"]').text()).toBe(
      statsCrossTitle
    );
    expect(wrapper.find('[data-test="stats-value"]').text()).toBe("0");
  });
  it("player is team circle and plays against another player", () => {
    const statsCrossTitle = "X (P1)";
    const wrapper = mount(BaseGameStats, {
      props: {
        team: "cross",
        score: 0,
        title: "P1",
      },
    });
    expect(wrapper.find('[data-test="stats-title"]').text()).toBe(
      statsCrossTitle
    );
    expect(wrapper.find('[data-test="stats-value"]').text()).toBe("0");
  });
  it("player is team circle and plays against cpu", () => {
    const statsCrossTitle = "O (YOU)";
    const wrapper = mount(BaseGameStats, {
      props: {
        team: "circle",
        score: 0,
        title: "YOU",
      },
    });
    expect(wrapper.find('[data-test="stats-title"]').text()).toBe(
      statsCrossTitle
    );
    expect(wrapper.find('[data-test="stats-value"]').text()).toBe("0");
  });
  it("player is team circle and plays against another player", () => {
    const statsCrossTitle = "O (P2)";
    const wrapper = mount(BaseGameStats, {
      props: {
        team: "circle",
        score: 0,
        title: "P2",
      },
    });
    expect(wrapper.find('[data-test="stats-title"]').text()).toBe(
      statsCrossTitle
    );
    expect(wrapper.find('[data-test="stats-value"]').text()).toBe("0");
  });
  it("enemy is team cross and enemy is cpu", () => {
    const statsCircleTitle = "X (CPU)";
    const wrapper = mount(BaseGameStats, {
      props: {
        team: "cross",
        score: 0,
        title: "CPU",
      },
    });
    expect(wrapper.find('[data-test="stats-title"]').text()).toBe(
      statsCircleTitle
    );
    expect(wrapper.find('[data-test="stats-value"]').text()).toBe("0");
  });
  it("enemy is team circle and enemy is cpu", () => {
    const statsCircleTitle = "O (CPU)";
    const wrapper = mount(BaseGameStats, {
      props: {
        team: "circle",
        score: 0,
        title: "CPU",
      },
    });
    expect(wrapper.find('[data-test="stats-title"]').text()).toBe(
      statsCircleTitle
    );
    expect(wrapper.find('[data-test="stats-value"]').text()).toBe("0");
  });
  it("enemy is team cross and enemy is another player", () => {
    const statsCircleTitle = "X (P1)";
    const wrapper = mount(BaseGameStats, {
      props: {
        team: "cross",
        score: 0,
        title: "P1",
      },
    });
    expect(wrapper.find('[data-test="stats-title"]').text()).toBe(
      statsCircleTitle
    );
    expect(wrapper.find('[data-test="stats-value"]').text()).toBe("0");
  });
  it("enemy is team circle and enemy is another player", () => {
    const statsCircleTitle = "O (P2)";
    const wrapper = mount(BaseGameStats, {
      props: {
        team: "circle",
        score: 0,
        title: "P2",
      },
    });
    expect(wrapper.find('[data-test="stats-title"]').text()).toBe(
      statsCircleTitle
    );
    expect(wrapper.find('[data-test="stats-value"]').text()).toBe("0");
  });
});
