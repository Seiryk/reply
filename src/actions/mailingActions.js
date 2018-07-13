import * as api from '../utils/axios/axios';
import { LOAD_ALL_MAILING_ITEMS, DELETE_MAILING_ITEM,  SUCCESS, MAILING_LOADER } from '../utils/constants';

const arr = [
  {
      name: 'mailing item 1',
      settings: {},
      id: '6856856',
      creatorId: '3'
  },
  {
      name: 'mailing item 2',
      settings: {},
      id: '34234',
      creatorId: '9'

  },
  {
      name: 'mailing item 3',
      settings: {},
      id: '23523',
      creatorId: '4'

  },
];
export const getMailingItems = (arg) => dispatch => {
//   console.log(arg)
  // api.post(arg, 'url', (resp) => {
  //     alert('user added');
  dispatch({ type: MAILING_LOADER});
  setTimeout(()=> {
      dispatch({ type: LOAD_ALL_MAILING_ITEMS + SUCCESS, data: arr });
  },1000)
      // dispatch({ type: ADD_USER, data: resp.data });
  //   }
  //   , (err) => {
  //     console.log(err);
  //   });
}
export const deleteMailingItem = (arg) => dispatch => {
  console.log(arg)
  // api.post(arg, 'url', (resp) => {
  //     alert('user added');
  dispatch({ type: MAILING_LOADER});
  setTimeout(()=> {
      dispatch({ type: DELETE_MAILING_ITEM + SUCCESS, data: arg });
  },1000)
      // dispatch({ type: ADD_USER, data: resp.data });
  //   }
  //   , (err) => {
  //     console.log(err);
  //   });
}

