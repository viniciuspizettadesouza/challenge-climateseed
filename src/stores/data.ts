import { defineStore } from 'pinia';
import {IAggregatedData, IDataState, ITempAggregatedData} from '../models/GraphModel'

const defaultDataState: IDataState = {
  results: [
    { entityId: 1, categoryId: 2, kco2e: 10000 },
    { entityId: 1, categoryId: 2, kco2e: 155 },
    { entityId: 1, categoryId: 3, kco2e: 120 },
    { entityId: 1, categoryId: 5, kco2e: 1 },
    { entityId: 1, categoryId: 6, kco2e: 90 },
    { entityId: 1, categoryId: 7, kco2e: 1500 },
    { entityId: 2, categoryId: 2, kco2e: 800 },
    { entityId: 2, categoryId: 2, kco2e: 100 },
    { entityId: 2, categoryId: 3, kco2e: 126 },
    { entityId: 2, categoryId: 5, kco2e: 20 },
    { entityId: 2, categoryId: 6, kco2e: 60 },
    { entityId: 2, categoryId: 7, kco2e: 1200 },
    { entityId: 3, categoryId: 2, kco2e: 1050 },
    { entityId: 3, categoryId: 2, kco2e: 155 },
    { entityId: 3, categoryId: 3, kco2e: 120 },
    { entityId: 3, categoryId: 5, kco2e: 1 },
    { entityId: 3, categoryId: 6, kco2e: 90 },
    { entityId: 3, categoryId: 7, kco2e: 1500 },
  ],
  organisations: [
    { id: 1, name: 'Climateseed', numberOfEmployees: 100, turnover: 1000000000 },
    { id: 2, name: 'Acme Corp', numberOfEmployees: 10, turnover: 20000 },
    { id: 3, name: 'Fast Co2', numberOfEmployees: 50, turnover: 35000 }
  ],
  categories: [
    { id: 1, name: 'Travel', categoryId: null },
    { id: 2, name: 'Business travel', categoryId: 1, scope: 'Scope 2' },
    { id: 3, name: 'Vehicule fleet', categoryId: 1, scope: 'Scope 2' },
    { id: 4, name: 'Digital', categoryId: null, },
    { id: 5, name: 'Website', categoryId: 4, scope: 'Scope 1' },
    { id: 6, name: 'Videoconference', categoryId: 4, scope: 'Scope 2' },
    { id: 7, name: 'IT Material', categoryId: 4, scope: 'Scope 3' }
  ]
};

export const useDataStore = defineStore({
  id: 'dataStore',
  state: (): IDataState => ({ ...defaultDataState }),
  getters: {
    aggregatedData(state): IAggregatedData {
      const data = state.results.reduce((sum, r) => {
        const organisation = this.organisations.find(o => o.id === r.entityId).name;
        sum[organisation] = sum[organisation] || { organisation, kco2e: 0 };
        sum[organisation].kco2e += r.kco2e;
        return sum;
      }, {});
      const series = Object.values(data as ITempAggregatedData).map(d => d.kco2e);
      const legend = Object.keys(data);
      return { series, legend };
    },
    aggregatedDataTypeBar() {
      const series = this.aggregatedData.series;
      return [{ data: series }];
    },
    chartOptions() {
      return {
        chart: {
          type: 'donut',
          stacked: true,
          height: '100%',
          width: '100%',
        },
        colors: ['#26C281', '#4B77BE', '#E43A45'],
        labels: this.aggregatedData.legend,
        dataLabels: {
          enabled: false,
        },
        legend: {
          labels: {
            colors: '#ffffff',
          },
        },
        stroke: {
          width: 3,
          colors: ['transparent'],
        },
        plotOptions: {
          pie: {
            expandOnClick: false,
            donut: {
              size: '85%',
              labels: {
                show: true,
                borderRadius: 15,
                total: {
                  show: true,
                  showAlways: true,
                  color: '#ffffff'
                },
                value: {
                  color: '#ffffff'
                }
              }
            }
          }
        }
      };
    },
  },
});
