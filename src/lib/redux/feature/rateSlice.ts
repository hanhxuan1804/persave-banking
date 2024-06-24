import { createAppSlice } from '@/lib/redux/createAppSlice';
import { Rate } from '@/types';

declare type RateStatus = 'idle' | 'loading' | 'failed';
interface RateState {
  rates: Rate;
  status: RateStatus;
}

const initialState: RateState = {
  rates: {
    USD: 1,
    EUR: 1,
    JPY: 1,
    CNY: 1,
    KRW: 1,
    VND: 1,
  },
  status: 'idle',
};

export const rateSlice = createAppSlice({
  name: 'rate',
  initialState,
  reducers: (create) => ({
    fetchRates: create.asyncThunk(
      async () => {
        // fetch the data from API
        const response = await fetch(
          `https://v6.exchangerate-api.com/v6/83ef8e9bb315be7909dc8c52/latest/USD`
        ).then((response) => response.json());

        return response.conversion_rates;
      },
      {
        pending: (state) => {
          state.status = 'loading';
        },
        fulfilled: (state, action) => {
          state.status = 'idle';
          state.rates = action.payload;
        },
        rejected: (state) => {
          state.status = 'failed';
        },
      }
    ),
    resetRates: create.reducer((state) => {
      state.rates = initialState.rates;
      state.status = initialState.status;
    }),
  }),
  selectors: {
    selectRates: (state) => state.rates,
    selectStatus: (state) => state.status,
  },
});

export const { fetchRates, resetRates } = rateSlice.actions;

export const { selectRates, selectStatus } = rateSlice.selectors;
