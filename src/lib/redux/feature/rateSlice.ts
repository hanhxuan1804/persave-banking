import { createRate, getRate, updateRate } from '@/lib/actions/rate.action';
import { createAppSlice } from '@/lib/redux/createAppSlice';
import { ActionsResponse, Rate } from '@/types';

declare type RateStatus = 'idle' | 'loading' | 'failed';
interface RateState {
  rates: Rate;
  status: RateStatus;
}

const initialState: RateState = {
  rates: {
    USD: 1,
    EUR: 0.935,
    JPY: 160.36,
    CNY: 7.27,
    KRW: 1391,
    VND: 23572,
  },
  status: 'idle',
};

export const rateSlice = createAppSlice({
  name: 'rate',
  initialState,
  reducers: (create) => ({
    fetchRates: create.asyncThunk(
      async () => {
        const dbRate = ActionsResponse.fromJSON(await getRate()).getData() as {
          $id: string;
          rates: string;
          updatedAt: Date;
        };
        if (!dbRate) {
          // fetch the data from API
          const response = await fetch(
            `https://v6.exchangerate-api.com/v6/83ef8e9bb315be7909dc8c52/latest/USD`
          ).then((response) => response.json());
          if (response.result === 'error') {
            return response;
          }
          await createRate({
            rates: JSON.stringify(JSON.stringify(response.conversion_rates)),
            updatedAt: new Date(),
          });
          return response;
        }
        if (
          new Date(dbRate.updatedAt).toDateString() !==
          new Date().toDateString()
        ) {
          const response = await fetch(
            `https://v6.exchangerate-api.com/v6/83ef8e9bb315be7909dc8c52/latest/USD`
          ).then((response) => response.json());
          if (response.result === 'error') {
            return response;
          }
          await updateRate({
            $id: dbRate.$id,
            rates: JSON.stringify(JSON.stringify(response.conversion_rates)),
            updatedAt: new Date(),
          });
          return response;
        }
        return { conversion_rates: JSON.parse(dbRate.rates) };
      },
      {
        pending: (state) => {
          state.status = 'loading';
        },
        fulfilled: (state, action) => {
          state.status = 'idle';
          if (action.payload.result === 'error') {
            // console.log(action.payload);
          }
          if (action.payload.conversion_rates) {
            state.rates = action.payload.conversion_rates;
          }
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
