import { describe, test, expect, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import DefaultGraphs from './DefaultGraphs.vue';
import { setActivePinia, createPinia } from 'pinia';

describe('DefaultGraphs Tests', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  test('renders a donut chart by default', async () => {
    const wrapper = mount(DefaultGraphs);

    expect(wrapper.find('apexchart[type="donut"]').exists()).toBe(true);
    expect(wrapper.find('apexchart[type="bar"]').exists()).toBe(false);
  });

  test('toggles between donut and bar charts when the button is clicked', async () => {
    const wrapper = mount(DefaultGraphs);

    await wrapper.find('button').trigger('click');

    expect(wrapper.find('apexchart[type="donut"]').exists()).toBe(false);
    expect(wrapper.find('apexchart[type="bar"]').exists()).toBe(true);
  });
});
